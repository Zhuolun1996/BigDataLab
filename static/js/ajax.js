// const allPost = {
//             template: '<div>post {{ $route.params.id }}</div>'
//         };

// const router = new VueRouter({
//                 routes: [
//                 { name: "post", path: '/post/:id', component: allPost }
//             ]
// });





// Vue.component('post', postBlog); 
// console.log("I am doing something in ajax")
//这里有个性能问题，每次点击按钮都会进行一个ajax请求，并进行数据处理
$("#post-pages-btn").click(function(e){
    console.log("doing");
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
                // _allPages.vueLoad();
                console.log(window.data); 
                window.data.pages = pages;
                console.log(window.data);
            }
        })
    }, 
    vueLoad: function(){
        var _allPages = this; 
        var vm = new Vue({                   //渲染post区域
            el: "#post-pages", 
            data: _allPages.data, 
            // router: router
        });
    }
}


