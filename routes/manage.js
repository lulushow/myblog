var express = require('express');
var router = express.Router();

router.get('/editArticle.html', function (req, res, next) {
    if (req.session.username){
        res.render('manage/editArticle', {
            title: '编辑随笔',
            username: req.session.username
        });
    } else {
        res.redirect("login.html");
    }
});

module.exports = router;