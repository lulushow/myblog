$(document).ready(function () {

    var username = $("#userNAME").text();
    $.ajax({
        url: '/article/getArticle',
        dataType: "json",
        type: "post",
        data: {
            username: username
        },
        success: function (result) {
            var articleHtml = '';
            if (result.code === 200){
                if (result.articles && result.articles.length){
                    var articles = result.articles;
                    for (var i =0; i<articles.length; i++){
                        var abstract = removeHTMLTag(articles[i].articleContent).substr(0,300);
                        abstract = abstract+ "...... ";
                        articleHtml += '<div class="articleDIV">'+
                            '<h2><a href="/article/readArticle.html?id='+articles[i]._id+'">'+articles[i].articleTitle+'</a></h2>'+
                            '<p><span>摘要：</span>'+abstract+'<a href="/article/readArticle.html?id='+articles[i]._id+'">阅读全文</a></p>'+
                            '<div class="postInfo">posted @<span>'+articles[i].articleTime+ ' </span>by '+username+"&nbsp;"+'<a href="/manage/editArticle.html?id=' + articles[i]._id + '">编辑</a></div>'+
                            '</div>';
                    }
                }
            } else if (result.code === 201){
                articleHtml = '<div class="articleDIV">'+ result.articles +'</div>';
            }

            $("#articles").html(articleHtml);
        }
    });
});


function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    str=str.replace(/\s/g,''); //将空格去掉
    return str;
}