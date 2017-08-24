$("#logout").click(function () {
    console.log("click logout");
    var username = $("#userNAME").text();
    $.ajax({
        url: '/logout',
        dataType: "json",
        type: "post",
        data: {username: username},
        success: function (result) {
            if (result.resultCode === 0){
                location.href = '/login.html';
            }
        }
    })
});