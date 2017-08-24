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

    update: function (condition, json, callback) {
        articleModel.update(condition, json, function (err) {
            callback(err);
        })
    },

    findAndUpdate: function (id, update, options, callback) {
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
            articleInfo = doc;
        }
    })
};

exports.getArticle = function (req, res) {
    articleDAO.findArticles(req.body.username, function (err, doc) {
        if (!err){
            if (doc.length!==0){
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
            if (doc.length!==0){
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
    articleDAO.searchArticle(req.body.id, function (err, doc) {
        if (!err){
            if (doc.length!==0){
                var newArticle = {
                    articleTitle: req.body.articleTitle,
                    articleContent: req.body.articleContent,
                    articleTime: req.body.articleTime
                };
                var id = req.body.id;
                articleDAO.update({_id:id}, {$set: newArticle}, function (err) {
                    if (!err){
                        res.send({
                            code: 200
                        })
                    }
                })
            }
        }
    })
};

exports.delete = function (req, res) {
    var del_where = {_id: req.body._id};
    articleDAO.remove(del_where, function (err) {
        if (!err){
            res.send({
                code: 200
            })
        }
    })
};

exports.queryDate = function (req, res) {
    articleDAO.findArticles(req.body.username, function (err, doc) {
        if (!err){
            if (doc){
                var dates = new Array();
                var years = new Array();
                var months = new Array();
                var days = new Array();
                var resultDays = new Array();
                var n=0;
                for (var i=0; i<doc.length; i++){
                    dates[i] = doc[i].articleTime.split(" ")[0];
                    var newvar = dates[i].split("/");
                    years[i] = parseInt(newvar[0]);
                    months[i] = parseInt(newvar[1]);
                    days[i] = parseInt(newvar[2]);
                    if (years[i] === parseInt(req.body.year) && months[i] === parseInt(req.body.month)){
                        if (!(contains(resultDays, days[i]))){
                            resultDays[n] = days[i];
                            n++;
                        }
                    }
                }
                res.send({
                    code: 200,
                    resultdata: resultDays
                })
            } else {
                res.send({
                    code: 201
                })
            }
        }
    })
};

exports.dateArticle = function (req, res) {
    articleDAO.findArticles(req.body.username, function (err, doc) {
        if (!err){
            if (doc){
                var result = new Array();
                var n=0;
                for (var i=0; i< doc.length; i++){
                    var articleTime = doc[i].articleTime.split(" ")[0];
                    if (articleTime === req.body.date){
                        result[n] = doc[i];
                        n++;
                    }
                }
                res.send({
                    code: 200,
                    resultdata: result
                })
            } else {
                res.send({
                    code: 201
                })
            }
        }
    })
};

exports.ArticleInfo = function (req, res, next) {
    articleDAO.findArticles(req.body.username, function (err, doc) {
        if (!err){
            if (doc){
                var startDate = new Date(req.session.createDate);
                var endDate = new Date();
                var dates = GetDateDiff(startDate,endDate);
                var articleNum = doc.length;
                res.send({
                    code: 200,
                    dates: dates,
                    articleNUM: articleNum
                })
            }
        }
    })
};
//是否包含
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
//计算时差
function GetDateDiff(startDate,endDate)
{
    var startTime = startDate.getTime();
    var endTime = endDate.getTime();
    var dates = Math.floor((Math.abs(startTime - endTime))/(1000*60*60*24));
    return  dates;
}