var express = require('express');
var router = express.Router();

var loginController = require("../controller/login");

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.username){
        res.render('index',{
            title: '博客世界',
            username: req.session.username
        });
    } else {
        res.redirect("login.html");
    }
});

router.get('/register.html', function (req, res, next) {
    res.render('register', {
        title: '注册',
        user: ''
    })
});

router.get('/login.html', function (req, res, next) {
    res.render('login', {
        title: '登录',
        user: ''
    })
});
router.post('/userData', loginController.login);

router.post('/registerData', loginController.register);

router.post('/logout', function (req, res, next) {
    /*console.log(req.body.username);
    console.log(req.session.id);*/
    req.session.destroy();
    res.send({
        resultCode:0
    });
});

router.get('/newArticle.html', function (req, res, next) {
    res.render('newArticle', {
        title: '新随笔'
    });
});

module.exports = router;
