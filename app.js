var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
//var conn=require('./db');
var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport验证
app.use(session({secret: 'blog.fens.me',resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());


//mysql
var mysql=require('mysql');
var settings = require('./settings');

var HOST=settings.host;
var PORT=settings.port;
var USER=settings.user;
var DATABASE=settings.database;
var PASSWORD=settings.password;

var connection = mysql.createConnection({
    host     :HOST,
    user     : USER,
    password : PASSWORD,
    port: PORT,
    database: DATABASE,
});

//------------------------------------------------------------

passport.use('local', new LocalStrategy(
    function (username, password, done) {
      // var user = {
      //   id: '1',
      //     name:'宋钟基',
      //     username: 'xhety@163.com',
      //     password: '111',
      //     isAdmin: false
      // }; // 可以配置通过数据库方式读取登陆账号
        var user;
        var strSql ='select * from t_user where loginname=?';
        // conn.connection.connect;
        connection.query(strSql,[username],function(err,rows,fields){
            if (err) {
              console.log('[SELECT ERROR] -',err.message);
            }

            if(rows==undefined ||  rows.length<0){
                return done(null, false, {message: '用户名不存在.'});
            }else{
                if (password !== rows[0].Password) {
                    return done(null, false, {message: '密码不正确.'});
                }
                user = {
                    id: rows[0].Id,
                    username:rows[0].UserName,
                    loginname: rows[0].LoginName,
                    password: rows[0].Password,
                    isadmin: rows[0].IsAdmin
                }


            }
        });

      return done(null, user);
    }
));

passport.serializeUser(function (user, done) {//保存user对象
  done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
  done(null, user);//可以通过数据库方式操作
});
app.get('/', routes);
app.all('/oa', isLoggedIn).get('/oa', routes);

app.post('/login',
     passport.authenticate('local', {
         successRedirect: '/oa',
     failureRedirect: '/'
    }));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
      res.render('public/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    res.render('public/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
