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
                template: '<button class = "btn btn-default btn-default" @click = "readAll" v-text = "buttonText"></button>', 
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

$("#post-pages-btn").click(function(e){
    allPages.load(); 
}); 

var allPages = {
    container: "#post-pages", 
    url: "/ajax_getAllBlogs", 
    delay: 5000, 
    load: function(){
        var _allPages = this; 
        $.ajax({
            type: "get", 
            url: this.url, 
            success: function(data){ 
                var pages = $.parseJSON(data.content); 
                console.log(pages); 
                $("#data-show").fadeOut();           //隐藏首页的数据可视区域
                $(_allPages.container).fadeIn();
                var data = {}; 
                                                     //得到的json数据修饰
                pages.forEach(function(item, index){
                    item.fields.title = item.pk;
                    item.fields.image = "http://placehold.it/700x300";
                    item.fields.index = index;
                }); 
                pages[0].fields.body = '<h1>nihaoam </h1>'
                data.pages = pages;   
                var vm = new Vue({                   //渲染post区域
                    el: "#post-pages", 
                    data: data
                });
            }
        })
    }
}

// 点击阅读全文后的ajax数据 
// $.get("/ajax_getBlogDetail/123")
//         .done(function(data, status, xhr){
//             console.log("asdks");
//             console.log(data); 
//         })

