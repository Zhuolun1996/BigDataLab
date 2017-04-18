const allPost = {
            template: '<div>post {{ $route.params.id }}</div>'
        };

const router = new VueRouter({
                routes: [
                { name: "post", path: '/post/:id', component: allPost }
            ]
        });




var postBlog = Vue.extend({
        template: 
                '<div class = "post">\
                    <post-head :title="field.title" :author="field.author" :date="field.date"></post-head>\
                    <post-media :imgSrc="field.image"></post-media>\
                    <post-body :body="field.body" :index="field.index"></post-body>\
                    <post-premalink :index="field.index"></post-premalink>\
                </div>',
        props: ['field'], 

        components:{
            'post-head': {
                template: 
                        '<div class = "post-head">\
                            <post-title :title="title"></post-title>\
                            <post-meta :date="date" :author="author"></post-meta>\
                         </div>', 
                props: ["author", "title", "date"], 

                components: {
                    'post-title': {
                        props: ["title"],
                        template: '<h1 class = "post-title"> {{ title }}</h1>'
                    }, 
                    'post-meta': {
                        template: 
                            '<div class = "post-meta">\
                                <span>作者: <a>{{author}}</a></span>\
                                <span>日期: {{date}}</span>\
                             </div>',
                        props:["date", "author"]
                    }
                }
            }, 

            'post-media': {
                template: '<div class = "feature-media"><img v-bind:src="imgSrc"></img></div>', 
                props: ["imgSrc"]
            }, 

            'post-body': {
                template: '<div class = "post-content">{{bodyContent}}</div>', 
                props: ["body", "index"], 
                data: function(){
                    return {
                        counter: 0
                    }
                }, 
                computed: {
                    bodyContent: function(){
                        return this.counter % 2 ? this.body : this.body.slice(0, 100); 
                    }
                },
                mounted: function(){
                    var _this = this; 
                    bus.$on("postToggle", function(index){
                        if(_this.index == index)
                            _this.counter++;
                        // console.log(_this.counter); 
                    })
                }
            }, 

            'post-premalink': {
                template: '<button class = "btn btn-default btn-default" @click = "readAll">\
                    <router-link :to="{ name: \'post\', params: { id: index }}" v-text = "buttonText"></router-link>\
                </button>', 
                data: function(){
                    return {counter: 0}; 
                }, 
                props:["index"],
                computed: {
                    buttonText: function(){
                        return this.counter % 2 ? "收起" : "阅读全文"; 
                    }
                },
                methods: {
                    readAll: function(e){
                        var that = this; 
                        bus.$emit("postToggle", that.index); 
                        this.counter++; 
                        // console.log(this.counter);   
                    }
                }
            }
        }
}); 

var bus = new Vue(); 
Vue.component('post', postBlog); 

//这里有个性能问题，每次点击按钮都会进行一个ajax请求，并进行数据处理
$("#post-pages-btn").click(function(e){
    allPages.load(); 
}); 

var allPages = {
    container: "#post-pages", 
    url: "/ajax_getAllBlogs", 
    delay: 5000, 
    data: {},
    load: function(){
        var _allPages = this; 
        $.ajax({
            type: "get", 
            url: this.url, 
            success: function(data){ 
                // ajax成功获取数据后，修饰数据并将数据存储到_allPages.data上可以进行复用
                var pages = $.parseJSON(data.content); 
                $("#data-show").fadeOut();           //隐藏首页的数据可视区域
                $(_allPages.container).fadeIn();
                                                     //得到的json数据修饰
                pages.forEach(function(item, index){
                    item.fields.title = item.pk;
                    item.fields.image = "http://placehold.it/700x300";
                    item.fields.index = index;
                }); 
                // pages[0].fields.body = '<h1>nihaoam </h1>
                _allPages.data.pages = pages;   
                _allPages.vueLoad();
            }
        })
    }, 
    vueLoad: function(){
        var _allPages = this; 
        var vm = new Vue({                   //渲染post区域
            el: "#post-pages", 
            data: _allPages.data, 
            router: router
        });
    }
}


