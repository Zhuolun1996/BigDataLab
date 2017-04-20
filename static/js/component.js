//单个文章的组件，需要加上动态路由信息
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
                template: '<button class = "btn btn-default btn-default" @click = "readAll" v-text="buttonText">\
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

//文章列表的路由信息
var postList = Vue.extend({
    template:  
    '<div class = "content">\
        <div class = "container">\
            <div class="row">\
                <div class="article-content col-md-10 col-md-offset-1" id = "post-pages">\
                    <post v-for="page in pages" :field="page.fields"></post>\
                </div>\
            </div>\
        </div>\
    </div>',  
    data: function(){
        return {
            pages: {}, 
            url: "/ajax_getAllBlogs"
        }
    }, 
    created: function(){
        this.fetchData(); 
    }, 
    methods: {
        fetchData: function(){
            var that = this; 
                $.ajax({
                    ype: "get", 
                    url: that.url, 
                    success: function(data){ 
                        // ajax成功获取数据后，修饰数据并将数据存储到_allPages.data上可以进行复用
                        var pages = $.parseJSON(data.content); 
                        // $("#data-show").fadeOut();           //隐藏首页的数据可视区域
                        // $(_allPages.container).fadeIn();
                                                     //得到的json数据修饰
                        pages.forEach(function(item, index){
                            item.fields.title = item.pk;
                            item.fields.image = "http://placehold.it/700x300";
                            item.fields.index = index;
                    }); 
                    that.pages = pages;  
                }
            })
        }
    }
});

// Vue.component("post", postBlog);
// Vue.component("post-list", postList);
// var bus = new Vue(); 

// 数据可视化组件
var showData = Vue.extend({
    template: 
        '<div class="container" id = "data-show">\
            <div class="row">\
                <div class = "col-md-4 col-sm-12 carousel">\
                    <carousel></carousel>\
                </div>\
                <div class = "col-md-4 col-sm-12 col-md-offset-2">\
                    <dataChart></dataChart>\
                </div>\
            </div>\
        </div>', 

    components: {
        carousel: {
            template:    
                '<div>\
                    <h2 v-text="carouselTitle"></h2>\
                    <div id = data-carousel></div>\
                 </div>',
            data: function(){
                var data = {}; 
                data.carouselTitle = "热门谣言",  
                data.items = [
                    {"title":'Title 1',"content":'Some attention grabbing details', "image": '/static/img/carousel1.png'},
                    {"title":'Title 2',"content":'Some attention grabbing details again', "image": '/static/img/carousel2.png'},
                    {"title":'Title 3',"content":'Some attention grabbing details and again', "image": '/static/img/carousel3.png'},
                    {"title":'Title 4',"content":'Some attention grabbing details again and again', "image": '/static/img/carousel4.png'},
                    {"title":'Title 5',"content":'Some attention grabbing details one more', "image": '/static/img/carousel5.png'}
                ];
                console.log(data);
                return data; 
            }, 

            mounted: function(){
                var wrap = document.getElementById('data-carousel');
                console.log(this.items);
                var data = this.items; 
                console.log(data);
                carousel(wrap, data, 500, 200);
                    function carousel(wrap, data, width, height){
                        var ul = document.createElement('ul');
                        var banner = document.createElement('div');

                        var index = 0,
                            timer;
                        console.log(data);
                        for(var i=0, j= data.length + 1; i<j; i++){
                            var li = document.createElement('li');
                            var img = document.createElement('img');
                            if(i == data.length){
                                img.src = data[0].image;
                            }
                            else{ 
                                img.src = data[i].image;
                            }
                            li.style.width = img.style.width = width + 'px';
                            li.appendChild(img);
                            ul.appendChild(li);
                        }

                        wrap.appendChild(ul);
                        wrap.appendChild(banner);

                        wrap.style.width = banner.style.width = width + 'px';
                        wrap.style.height = height + 'px';
                        ul.style.width = (data.length + 1) * width +'px';
                        banner.innerHTML = '<h3>' + data[index].title + '</h3>'  + '<p>' + data[index].content + '</p>';


                        var timer = setInterval(function(){

                            move(banner, {bottom: -50}, 1000, 'linear', function(){
                            index++;
                            move(ul, {left: index*(-width)}, 1000, 'easeBoth', function(){

                                if(index >= data.length) ul.style.left = index = 0;

                                banner.innerHTML = '<h3>' + data[index].title + '</h3>' + '<p>' + data[index].content + '</p>';

                                move(banner, {bottom: 0}, 1000, 'linear');

                            });

                            });

                        }, 4000);
                    }
            }
        }, 

        dataChart: {
            template:
                '<div>\
                    <h2>7天内的谣言变化情况</h2>\
                    <div id = "main" style="{width: 400\'px\', height:300\'px\'}"></div>\
                 </div>', 

            mounted: function(){
                var option = {
                    title:{
                        // text: "最近7天举报数据变化情况"
                    }, 
                    tooltip:{
                        trigger: 'axis'
                    }, 
                    legend:{
                        data:["健康养生","食品安全","新科技"]
                    }, 
                    grid:{
                        left: "3%", 
                        right: "4%", 
                        bottom: "3%", 
                        containLabel: true
                    }, 
                    toolbox:{
                        feature: {
                            saveAsImage:{}
                        }
                    },
                    xAxis: {
                        type: "category", 
                        boundaryGap: false,
                        // splitLine: {
                        //     show: false 
                        // }
                        data: ["周一","周二","周三","周四", "周五","周六","周日"]
                    }, 
                    yAxis: {
                        type: "value"
                    }, 
                    series: [
                        {
                            name: "健康养生", 
                            type: "line", 
                            data: [120, 132, 101, 134, 90, 230, 310]
                        }, 
                        {
                            name: "食品安全", 
                            type: "line", 
                            data: [220, 182, 191, 234, 290, 330, 310]
                        }, 
                        {
                            name: "新科技", 
                            type: "line", 
                            data: [150, 192, 289, 389, 101, 220, 404]
                        }
                    ]
                }; 
                var dom = document.getElementById('main'); 
                dom.style.width = "400px"; 
                dom.style.height = "300px";
                var myChart = echarts.init(document.getElementById('main'));
                myChart.setOption(option);
            }
        }
    }
});

Vue.component("post", postBlog);
Vue.component("post-list", postList);
Vue.component("show-data", showData); 
var bus = new Vue();