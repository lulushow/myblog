var express = require('express');
var router = express.Router();

var loginController = require("../controller/login");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{
        title: '博客世界',
        user: 'lulushow',
        owner:''
    });
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
router.get('/userData', loginController.login)

router.post('/registerData', loginController.register);

module.exports = router;
