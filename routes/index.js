var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{
        title: '博客园',
        user: 'lulushow',
        owner:'lu'
    });
});

module.exports = router;
