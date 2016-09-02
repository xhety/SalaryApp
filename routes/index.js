var express = require('express');
var router = express.Router();
var UserDao=require('../daos/UserDao');

module.exports = function (app) {
  /* GET home page. */
  app.get('/', function (req, res) {
    res.render('login', {title: 'OA系统'});
  });
  app.get('/oa', function (req, res) {
    console.log(req.user);
    if (req.user.IsAdmin == 1) {
      res.render('admin/index', {title: '人事信息管理', user: req.user});
    } else {
      res.render('salary', {title: '工资信息查看', user: req.user});
    }
  });

//admin/staff
  app.get('/admin/staff', function (req, res) {
    if (req.user.IsAdmin == 1) {
      //获取用户信息
      UserDao.getUserList(function(err,result){
        if (err) {
          console.log("getUserList_Sql Error: " + err.message);
          return;
        }
        res.render('admin/staff', {title: '人事信息管理', user: req.user, userList: result});
      });

    } else {
      res.render('admin/index', {title: '工资信息查看', user: req.user});
    }
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
}
