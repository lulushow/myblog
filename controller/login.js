var userModel = require("../models/login");

var userDAO = {
    save: function (json, callback) {
        var newUser = new userModel(json);

        newUser.save(function (err) {
            callback(err);
        });
    },

    remove: function (json, callback) {
        userModel.remove(json, function (err) {
            callback(err);
        });
    },

    update: function (json, condition, callback) {
        userModel.update(json, condition, function (err) {
            callback(err);
        });
    },

    findByName: function (name, callback) {
        userModel.findOne({username:name}, function (err, doc) {
            callback(err, doc);
        });
    },

    checkLogin: function (name, password, callback) {
        userModel.findOne({username: name, password:password}, function (err, doc) {
            callback(err, doc);
        })
    }
};

exports.register = function (req, res) {
    userDAO.findByName(req.body.username, function (err, doc) {
        if (!err){
            if (!doc){
                var newUser = {
                    username:req.body.username,
                    password: req.body.password,
                    phone: req.body.phone,
                    email: req.body.email
                };
                userDAO.save(newUser, function (err) {
                    console.log(userModel);
                    if (!err){
                        res.send({
                            code: 200,
                            msg: "注册成功（来自后台）"
                        });
                    }
                });
            }else {
                res.send({
                    code: 201,
                    msg: "该用户名已被占用（来自后台）"
                });
            }
        } else {
            console.log(err);
        }
    });
};

exports.login = function (req, res, next) {

    userDAO.checkLogin(req.body.username, req.body.password, function (err, doc) {
        if (!err){
            if (doc){
                //session存储
                req.session.username = req.body.username;
                req.session.password = req.body.password;
                req.session.save();

                res.send({
                    code: 200,
                    msg: "登录成功",
                    username: req.body.username,
                    password: req.body.password
                });
            }else {
                res.send({
                    code: 201,
                    msg: "用户名或密码错误",
                    username: "",
                    password: ""
                });
            }
        }
    });
};

