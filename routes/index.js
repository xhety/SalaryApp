var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,next) {
  console.log("Access the index route root categary,and the login will return");
  res.render('login', { title: 'OA系统' });
  next();
});
router.get('/oa', function (req, res,next) {
  console.log(req.user);
  if (req.user.isadmin==1) {
    res.render('admin/index', {title: '人事信息管理',user:req.user});
  } else {
    res.render('salary', {title: '工资信息查看',user:req.user});
  }
next();
});

router.all('admin/staff', function (req, res,next) {
  console.log("FUCK ME");
  if (req.user.isadmin==1) {
    res.render('admin/staff', {title: '人事信息管理',user:req.user});
  } else {
    res.render('salary', {title: '工资信息查看',user:req.user});
  }
  next();
});

module.exports = router;
