;(function ($) {

    var foo = function (options) {
        var self = this;
        self.options = $.extend({
            parent: $("#loginForm"),
            submit: $("[node-type=submit]")
        }, options);
        self.bindEvent();
    };

    foo.prototype = {
        bindEvent: function () {
            var self = this;
            self.login();
        },
        login: function () {
            var self = this,
                parent = self.options.parent,
                submit = self.options.submit;

            submit.on("click", function () {
                console.log(parent.serialize());
                var jqXML = $.ajax({
                    url: "/userData",
                    dataType: "json",
                    type: "post",
                    data: parent.serialize()
                });

                jqXML.done(function (data) {
                    console.log("AJAX success");
                    if (data.code === 200){
                        location.href = "/";
                    }else if (data.code === 201){
                        alert(data.msg);
                    }
                });
            });
        }
    };

    new foo();
})(jQuery);


