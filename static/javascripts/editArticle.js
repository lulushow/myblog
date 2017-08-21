$(document).ready(function () {
    var id = getparm();
    $.ajax({
        url: '/article/searchArticle',
        dataType: "json",
        type: "post",
        data: {
            id: id
        },
        success: function (result) {
            if (result.code === 200){
                if (result.article.articleTitle){
                    $("#editArticleTitle").val(result.article.articleTitle);
                    $("#editArticleContent").val(result.article.articleContent);
                }
            }
        }
    });

    var editor = $('#editArticleContent').xheditor({
        tools:'full',
        skin:'default',
        showBlocktag:true,
        internalScript:true,
        internalStyle:true,
        width:1000,
        height:400,
        fullscreen:false,
        sourceMode:false,
        forcePtag:true,
        upImgUrl:"upload.php",
        upImgExt:"jpg,jpeg,gif,png"
    });
    editor.focus();
    editor.setSource($("#editArticleContent").val());
    $("#saveModify").click(function () {
        var id = id;
        var titleStr = $("#editArticleTitle").val();
        var contentStr = editor.getSource();
        var myDate = new Date();
        var dateStr = myDate.toLocaleDateString()+" "+myDate.toLocaleTimeString();
        var username = $("#userNAME").text();
        $.ajax({
            url: '/article/updateArticle',
            dataType: "json",
            type: "post",
            data: {
                id: id,
                username: username,
                articleTitle: titleStr,
                articleContent: contentStr,
                articleTime: dateStr
            },
            success: function (result) {
                if (result.code === 200){
                    location.href = '/';
                }
            }
        })
    });
    $("#cancel").click(function () {
        alert("确认取消吗？");
    });
});

function getparm(){
    var url=location.href;
    var tmp1=url.split("?")[1];
    var id=tmp1.split("=")[0];
    var idValue=tmp1.split("=")[1];
    return idValue;
}