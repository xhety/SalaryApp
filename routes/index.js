var express = require('express');
var router = express.Router();


module.exports = function (app) {

  /* GET home page. */
  app.get('/', function(req, res) {
    console.log("Access the index route root categary,and the login will return");
    res.render('login', { title: 'OA系统' });
  });
  app.get('/oa', function (req, res) {
    console.log(req.user);
    if (req.user.IsAdmin==1) {
      res.render('admin/index', {title: '人事信息管理',user:req.user});
    } else {
      res.render('salary', {title: '工资信息查看',user:req.user});
    }
  });

  app.get('/admin/staff', function (req, res) {
    console.log("FUCK ME");
    if (req.user.IsAdmin==1) {
      res.render('admin/staff', {title: '人事信息管理',user:req.user});
    } else {
      res.render('admin/index', {title: '工资信息查看',user:req.user});
    }
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
}
