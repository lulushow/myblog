;(function ($) {
    validator = $("#registerForm").validate({
        errorPlacement: function (error, element) {
            // 错误信息显示位置
            $(element).parents('.registerRow').find('.registerAlert').append(error);
        },
        errorElement: "span", // 显示错误信息的元素标签，建议统一 span , 如需要其他标签，需自行加样式
        // 验证规则
        rules: {
            username: {
                required: true,
                checkUsername: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 12,
                checkPassword: true
            },
            repassword: {
                required: true,
                equalTo: '#password'
            },
            phone: {
                required: true,
                minlength: 11,
                maxlength: 11,
                checkPhone: true
            },
            email: {
                required: true,
                email: true
            }
        },
        // 错误信息
        messages: {
            username: {
                required: "*请输入用户名"
            },
            password: {
                required: "*请输入密码",
                minlength: "*密码为8-16位字母与数字的组合",
                maxlength: "*密码为8-16位字母与数字的组合"
            },
            repassword: {
                required: "*请确认密码",
                equalTo: "*重复密码不一致"
            },
            phone: {
                required: "*请输入手机号",
                minlength: "*请输入正确的手机号",
                maxlength: "*请输入正确的手机号"
            },
            email: {
                required: "*请输入邮箱地址",
                email: "*邮箱地址错误"
            }
        }
    });

    $.validator.addMethod("checkUsername",function(value,element,params){
        var usernameReg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,8}$/;
        return this.optional(element)||(usernameReg.test(value));
    },"*请输入2-8位用户名，允许中文，字母，数字！");

    $.validator.addMethod("checkPassword",function(value,element,params){
        var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        return this.optional(element)||(passwordReg.test(value));
    },"*请输入6-12位字母与数字的组合！");

    $.validator.addMethod("checkPhone",function(value,element,params){
        var phoneReg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        return this.optional(element)||(phoneReg.test(value));
    },"*请输入正确的手机号！");

    var foo = function (options) {
        var self = this;
        self.options = $.extend({
            parent: $("#registerForm"),
            register: $("[node-type=register]")
        }, options);
        self.bindEvent();
    };

    foo.prototype = {
        bindEvent: function () {
            var self = this;
            self.register();
        },
        register: function (){
            var self = this,
                parent = self.options.parent,
                register = self.options.register;

            register.on("click", function (){
                if (validator.form()){
                    var jqXML = $.ajax({
                        url: "/registerData",
                        dataType: "json",
                        type: "post",
                        data: parent.serialize()
                    });

                    jqXML.done(function (json){
                        if(json.code === 200){
                            alert(json.msg);
                            window.location.href='/login.html'
                        }else{
                            alert(json.msg);
                        }
                    });
                }
            });
        }
    };

    new foo();
})(jQuery);


