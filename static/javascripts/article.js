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
            var articleHtml = '';
            if (result.code === 200){
                if (result.article.articleTitle){
                    $("#AllTitle").text(result.article.articleTitle);
                    console.log("article success3");
                    var article = result.article;
                    articleHtml += '<div class="articleDIV">'+
                        '<h2>'+article.articleTitle+'</h2>'+
                        '<div class="postInfo">posted @<span>'+article.articleTime+ ' </span>by '+username+"&nbsp;"+'<a href="/manage/editArticle.html?id=' + article._id + '">编辑</a></div>'+
                        '<p>'+article.articleContent+'</p>'+
                        '</div>';
                }
            } else if (result.code === 201){
                articleHtml = '<div class="articleDIV">'+ result.article +'</div>';
            }

            $("#article").html(articleHtml);
        }
    })
});