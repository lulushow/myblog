var express = require('express');
var router = express.Router();

var articleController = require("../controller/article");

router.get('/newArticle.html', function (req, res, next) {
    res.render('article/newArticle', {
        title: '新随笔',
        username: req.session.username
    });
});

router.post('/addArticle', articleController.addArticle);

router.post('/getArticle', articleController.getArticle);

router.get('/readArticle.html', function (req, res, next) {
    res.render('article/readArticle', {
        username: req.session.username
    })
});

router.post('/searchArticle', articleController.searchArticle);

router.post('/updateArticle', articleController.update);

module.exports = router;