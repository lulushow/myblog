var express = require('express');
var router = express.Router();

router.get('/editArticle.html', function (req, res, next) {
    res.render('manage/editArticle', {
        title: '编辑随笔',
        username: req.session.username
    })
});

module.exports = router;