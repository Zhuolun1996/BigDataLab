window.addEventListener("load", function(){
    $("#write-modal").on("show.bs.modal", function(e){
        var testEditor;
                $(function() {     
                    testEditor = editormd("test-editormd", {
                        width: "100%",
                        height: 200,
                        path : '/static/assert/editor.md/lib/',
                        // markdown : md,
                        watch: false,
                        codeFold : true,
                        saveHTMLToTextarea : true, 
                        searchReplace : true,
                        htmlDecode : "style,script,iframe|on*", 
                        emoji : true,
                        taskList : true,
                        tocm            : true,         // Using [TOCM]
                        tex : true,                   // 开启科学公式TeX语言支持，默认关闭
                        flowChart : true,             // 开启流程图支持，默认关闭
                        sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
                        imageUpload : true,
                        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                        toolbarIcons : function() {
                            return [
                                "undo", "redo", "|", 
                                "bold", "del", "italic", "|",
                                "link", "image","|", 
                                "quote", "list-ul", "list-ol", "hr", "|",
                                "watch", "preview", "fullscreen", "|",
                                "help", 
                            ]
                        },
                        placeholder   : "这是markdown编辑器，具体操作可以参考帮助",
                        // imageUploadURL : "../examples/php/upload.php",
                        onload : function() {
                            console.log('onload', this);
                        }
                    });
                });
    })
})