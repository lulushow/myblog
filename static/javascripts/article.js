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
                        '<h2 id="articleTitle">'+article.articleTitle+'</h2>'+
                        '<div>posted @ <span id="articleTime">'+article.articleTime+ ' </span>by '+article.username+'</div>'+
                        '<p id="articleContent">'+article.articleContent+'</p>'+
                        '</div>';
                }
            } else if (result.code === 201){
                articleHtml = '<div class="articleDIV">'+ result.article +'</div>';
            }

            $("#article").html(articleHtml);
        }
    })
});