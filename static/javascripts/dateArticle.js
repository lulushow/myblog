$(document).ready(function () {
    var queryDate = getparm();
    var username = $("#userNAME").text();
    $.ajax({
        url: '/article/dateArticle',
        dataType: "json",
        type: "post",
        data: {
            username: username,
            date: queryDate
        },
        success: function (result) {
            var articleHtml = '';
            if (result.code === 200){
                if (result.resultdata && result.resultdata.length){
                    var articles = result.resultdata;
                    for (var i =0; i<articles.length; i++){
                        var abstract = removeHTMLTag(articles[i].articleContent).substr(0,300);
                        abstract = abstract+ "......";
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

            $("#dateArticles").html(articleHtml);
        }
    })
});

function getparm(){
    var url=location.href;
    var tmp1=url.split("?")[1];
    var id=tmp1.split("=")[0];
    var idValue=tmp1.split("=")[1];
    return idValue;
}