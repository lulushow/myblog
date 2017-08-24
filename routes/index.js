var express = require('express');
var router = express.Router();

var loginController = require("../controller/login");
var articleController = require("../controller/article");

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
        title: '注册'
    })
});

router.get('/login.html', function (req, res, next) {
    res.render('login', {
        title: '登录'
    })
});
router.post('/userData', loginController.login);

router.post('/registerData', loginController.register);

router.post('/logout', function (req, res, next) {
    req.session.destroy();
    res.send({
        resultCode:0
    });
});

router.get('/management.html', function (req, res, next) {
    if (req.session.username){
        res.render('management',{
            title: '博客管理',
            username: req.session.username
        });
    } else {
        res.redirect("login.html");
    }
});



module.exports = router;
