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
            tableHtml += '<table class="manageTable">'
                + '<tr>'
                + '<th class="post-title">标题</th>'
                + '<th class="doSomething">操作</th>'
                + '<th class="doSomething">操作</th>'
                + '</tr>';
            if (result.code === 200) {
                if (result.articles && result.articles.length) {
                    var articles = result.articles;
                    for (var i = 0; i < articles.length; i++) {
                        tableHtml += '<tr>' +
                            '<td class="inTitle"><a href="/article/readArticle.html?id=' + articles[i]._id + '">' + articles[i].articleTitle + '</a>(' + articles[i].articleTime + ')</td>' +
                            '<td><a href="/manage/editArticle.html?id=' + articles[i]._id + '">编辑</a></td>' +
                            '<td><a href="javascript:;" id="deleteBtn" data-id="' + articles[i]._id + '" data-title="' + articles[i].articleTitle + '">删除</a></td>' +
                            '</tr>';
                    }

                }
            } else if (result.code === 201) {
                tableHtml += '<tr><td></td><td></td><td></td></tr>';
            }
            tableHtml += '</table>';
            $("#table").html(tableHtml);
        }
    });

    $("#delete").click(function () {
        alert("success");
        console.log("gwdv");

    });
});

$(document).on('click', "#deleteBtn", function () {
    var id = $(this).attr('data-id');
    var title = $(this).attr('data-title');
    if (confirm("确认删除《"+title+"》吗？")){
        $.ajax({
            url: '/article/deleteArticle',
            dataType:'json',
            type: "post",
            data: {
                _id:id
            },
            success: function (result) {
                if (result.code === 200){
                    location.href = "/management.html";
                }
            }
        })
    }
});
