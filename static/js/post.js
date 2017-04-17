var data  = {}; 
data.field = {
            author: "吴斐",
            title: "this is a title",
            date: "2017-4-10", 
            imgSrc: "../img/logo.png",
            body: "返回值一个新的字符串。包括字符串 stringObject 从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。说明\
                   String 对象的方法 slice()、substring() 和 substr() （不建议使用）都可返回字符串的指定部分。slice() 比 substring() 要灵活一些，因为它允许使用负数作为参数。slice() 与 substr() 有所不同，因为它用两个字符的位置来指定子串，而 substr() 则用字符位置和长度来指定子串。\
                   还要注意的是，String.slice() 与 Array.slice() 相似。xxxxxxxxxxasdkdlasdkjasddddddddjsalsdddddddddddddddddddddddabcsbbbbbasdjjad\
                   11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
}

window.onload = function(){
    var postBlog = Vue.extend({
        template: 
                '<div class = "post">\
                    <post-head :title="field.title" :author="field.author" :date="field.date"></post-head>\
                    <post-media :imgSrc="field.imgSrc"></post-media>\
                    <post-body :body="field.body"></post-body>\
                    <post-premalink></post-premalink>\
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
                template: '<div class = "post-content"><p>{{bodyContent}}</p></div>', 
                props: ["body"], 
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
                    bus.$on("postToggle", function(){
                        _this.counter++; 
                        console.log(_this.counter); 
                    })
                }
            }, 

            'post-premalink': {
                template: '<button class = "btn-default" @click = "readAll" v-text = "buttonText"></button>', 
                data: function(){
                    return {counter: 0}; 
                }, 
                computed: {
                    buttonText: function(){
                        return this.counter % 2 ? "收起" : "阅读全文"; 
                    }
                },
                methods: {
                    readAll: function(e){
                        bus.$emit("postToggle"); 
                        this.counter++; 
                    }
                }
            }
        }
    }); 
    var bus = new Vue(); 
    Vue.component('post', postBlog); 
    var vm = new Vue({
        el: '#app', 
        data: data
    })
}