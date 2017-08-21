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
            var tableHtml = '';
            if (result.code === 200){
                if (result.articles && result.articles.length){
                    tableHtml +='<table border="1">'
                        +'<tr>'
                        +'<th>标题</th>'
                        +'<th>操作</th>'
                        +'<th>操作</th>'
                        +'</tr>';
                    var articles = result.articles;
                    for (var i =0; i<articles.length; i++){
                        tableHtml += '<tr>'+
                            '<td><a href="/article/readArticle.html?id='+articles[i]._id+'">'+articles[i].articleTitle+'</a>('+articles[i].articleTime+')</td>'+
                            '<td><a href="/manage/editArticle.html?id='+articles[i]._id+'">编辑</a></td>'+
                            '<td><a>删除</a></td>'+
                            '</tr>';
                    }
                    tableHtml +='</table>';
                }
            } else if (result.code === 201){
                tableHtml = '<tr><td></td><td></td><td></td></tr>';
            }

            $("#table").html(tableHtml);
        }
    })
});