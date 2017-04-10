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
                var pages = $.parseJSON(data.content); 
                console.log(pages); 
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
            body: "13324423424234"
        }
        // fake-data 
        // document.getElementById(this.container).innerHTML = "";  
        this.loadPage(page); 
    }, 

    loadPage: function(page){    
        var article = $("<article></article>").addClass("post"),
            head = $("<div></div>").addClass("post-head"),
            media = $("<div></div>").addClass("feature-media"), 
            content = $("<div></div>").addClass("post-content"), 
            premalink = $("<div></div>").addClass("post-premalink"); 

        head.html('<h1 class="post-title">' + page.pk + '</h1>'
                + '<div class = "post-meta"> <span class = "author">作者：<a href = ""></a>' + page.fields.author
                +  '</a></span>' + '<span class = "post-date" title = ' + page.fields.date + '>' + page.fields.date
                + '</span></div>'); 

        media.html('<img src = ' + page.fields.imgSrc + "></img>"); 

        $("<p></p>").html(page.fields.body).appendTo(content); 

        $("<a>阅读全文</a>").addClass("btn btn-default").appendTo(premalink); 

        head.appendTo(article); 
        media.appendTo(article); 
        content.appendTo(article); 
        premalink.appendTo(article); 
        article.hide().fadeIn().appendTo(this.container); 
    }
}


