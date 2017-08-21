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
                        var abstract = articles[i].articleContent.substr(0,300);
                        abstract = abstract+ "......";
                        articleHtml += '<div class="articleDIV">'+
                            '<h2><a href="article/readArticle.html?id='+articles[i]._id+'">'+articles[i].articleTitle+'</a></h2>'+
                            '<p>'+abstract+'</p>'+
                            '<div>posted @ <span>'+articles[i].articleTime+ ' </span>by '+username+'</div>'+
                            '</div>';
                    }
                }
            } else if (result.code === 201){
                articleHtml = '<div class="articleDIV">'+ result.articles +'</div>';
            }

            $("#articles").html(articleHtml);
        }
    })
});