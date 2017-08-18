
module.exports = function (req, res, next) {
    if (req.session){
        if (req.session.username){
            console.log('login');

            //session存储
            res.locals.session = {
                username: req.session.username,
                password: req.session.password
            };
        } else {
            console.log('no login');
            res.locals.id = req.session.id;
        }
        console.log('hello, session id:' + req.session.id);
        next();
    }else {
        var err = new Error('MongoDB连接错误，请重新连接');
        err.status = 500;
        next(err);
    }
};