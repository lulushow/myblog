var express = require('express');
var router = express.Router();

var articleController = require("../controller/article");

router.get('/newArticle.html', function (req, res, next) {
    if (req.session.username){
        res.render('article/newArticle', {
            title: '新随笔',
            username: req.session.username
        });
    } else {
        res.redirect("login.html");
    }
});

router.post('/addArticle', articleController.addArticle);

router.post('/getArticle', articleController.getArticle);

router.get('/readArticle.html', function (req, res, next) {
    if (req.session.username){
        res.render('article/readArticle', {
            username: req.session.username
        });
    } else {
        res.redirect("login.html");
    }
});

router.post('/searchArticle', articleController.searchArticle);

router.post('/updateArticle', articleController.update);

router.post('/deleteArticle', articleController.delete);

router.post('/queryDateByUsername', articleController.queryDate);

router.get('/getDateArticle', function (req, res, next) {
    if (req.session.username){
        res.render('article/getDateArticle', {
            title:req.query.date,
            username: req.session.username
        });
    } else {
        res.redirect("login.html");
    }
});

router.post('/dateArticle', articleController.dateArticle);

router.post('/queryInfo', articleController.ArticleInfo);

module.exports = router;