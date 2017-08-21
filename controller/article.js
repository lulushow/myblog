var Models = require("../models/login");
var articleModel = Models.articleModel;

var articleInfo={};

var articleDAO = {
    save: function (json, callback) {
        var newUser = new articleModel(json);

        newUser.save(function (err) {
            callback(err);
        });
    },

    remove: function (json, callback) {
        articleModel.remove(json, function (err) {
            callback(err);
        });
    },

    update: function (id, update, options, callback) {
        articleModel.findByIdAndUpdate(id, update, options, function (err, doc) {
            callback(err, doc);
        });
    },

    findByName: function (name, callback) {
        articleModel.findOne({username:name}, function (err, doc) {
            callback(err, doc);
        });
    },
    
    findArticles: function (name, callback) {
        articleModel.find({username:name}, function (err, doc) {
            callback(err, doc);
        });
    },

    searchArticle: function (id, callback) {
        articleModel.findById(id, function (err, doc) {
            callback(err, doc);
        });
    }
};

exports.addArticle = function (req, res) {
    articleDAO.save(req.body, function (err, doc) {
        if (!err){
            res.send({
                code: 200,
                msg: "新随笔添加成功（来自后台）"
            });
        }
    })
};

exports.getArticle = function (req, res) {
    console.log(req.body.username);
    articleDAO.findArticles(req.body.username, function (err, doc) {
        if (!err){
            console.log(doc);
            if (doc){
                res.send({
                    code: 200,
                    articles: doc
                })
            } else {
                res.send({
                    code: 201,
                    articles: "这个家伙有点懒，什么也没留下。。。"
                })
            }
        }
    })
};

exports.searchArticle = function (req, res) {
    articleDAO.searchArticle(req.body.id, function (err, doc) {
        if (!err){
            if (doc){
                res.send({
                    code: 200,
                    article: doc
                })
            } else {
                res.send({
                    code: 201,
                    article: "查找错误，请与管理员联系！"
                })
            }
        }
    })
};

exports.update = function (req, res) {
    articleDAO.update(req.body.id, {
        username: req.body.username,
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent,
        articleTime: req.body.articleTime
    }, {
        new: true
    }, function (err, doc) {
        if (!err){
            if (doc.articleTitle){
                res.send({
                    code: 200,
                    article: doc
                })
            }
        }
    })
};

