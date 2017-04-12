$("#post-pages-btn").click(function(e){
    // $.get("/ajax_getAllBlogs/")
    //     .done(function(data, status, xhr){
    //         console.log(data); 
    //     })
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
                console.log(data); 
                var pages = $.parseJSON(data.content); 
                console.log("here"); 
                console.log(pages); 
                console.log($("#data-show")); 
                $("#data-show").fadeOut(); 
                $.each(pages, function(){
                    _allPages.display(this); 
                }); 
            }
        })
    }, 

    display: function(page){
        console.log(page);
        // fake-data
        page.fields = {
            author: "吴斐",
            date: "2017-4-10", 
            imgSrc: "http://image.golaravel.com/b/60/0540baaed781628b02aac992d1c8f.png",
            body: "返回值一个新的字符串。包括字符串 stringObject 从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。说明\
String 对象的方法 slice()、substring() 和 substr() （不建议使用）都可返回字符串的指定部分。slice() 比 substring() 要灵活一些，因为它允许使用负数作为参数。slice() 与 substr() 有所不同，因为它用两个字符的位置来指定子串，而 substr() 则用字符位置和长度来指定子串。\
还要注意的是，String.slice() 与 Array.slice() 相似。xxxxxxxxxxasdkdlasdkjasddddddddjsalsdddddddddddddddddddddddabcsbbbbbasdjjad\
11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
        }
        // fake-data
        // console.log(document.getElementById(this.container)); 
        document.getElementById(this.container.slice(1)).innerHTML = "";  
        this.loadPage(page); 

    }, 

    loadPage: function(page){    
        console.log("shad"); 
        var article = $("<article></article>").addClass("post"),
            head = $("<div></div>").addClass("post-head"),
            media = $("<div></div>").addClass("feature-media"), 
            content = $("<div></div>").addClass("post-content"), 
            premalink = $("<div></div>").addClass("post-premalink"); 

        head.html('<h1 class="post-title">' + page.pk + '</h1>'
                + '<div class = "post-meta"> <span class = "author">作者：<a href = "">' + page.fields.author
                +  '</a></span>' + '<span class = "post-date" title = ' + page.fields.date + '>' + page.fields.date
                + '</span></div>'); 

        media.html('<img src = ' + page.fields.imgSrc + "></img>"); 
        console.log(page.fields.body); 
        console.log(page.fields.body.slice(0, 100)); 
        var mainIdea = page.fields.body.slice(0, 100); 
        $("<p></p>").html(mainIdea).appendTo(content); 

        $("<a>阅读全文</a>")
            .addClass("btn btn-default read-all")
            .on("click", function(e){
                // content.remove(); 
                console.log("jjj"); 
                console.log(page); 
                // $("<p></p>").html(page.fields.body).appendTo(content); 
                content.find("p").html(page.fields.body); 
                console.log(content); 
                console.log(content.find("p").text()); 
            })
            .appendTo(premalink); 

        head.appendTo(article); 
        media.appendTo(article); 
        content.appendTo(article); 
        premalink.appendTo(article); 
        article.hide().fadeIn().appendTo(this.container); 
        
    }
}

// 点击阅读全文后的ajax数据
// var argu = " + "123" +  ">\S+)"; 
$.get("/ajax_getBlogDetail/123")
        .done(function(data, status, xhr){
            console.log("asdks");
            console.log(data); 
        })


// $(".post .post-premalink .read-all").click(function(e){
//     var title = $.parents(".post").find(".post-head .post-title").text();   //获取按钮的祖先元素中的title属性
//     var argu = "(?P<" + title +  ">\S+)"; 


// })

