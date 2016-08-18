var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Access the index route root categary,and the login will return");
  res.render('login', { title: 'OA系统' });
});
router.get('/oa', function (req, res) {
  console.log(req.user);
  if (req.user.isAdmin) {
    res.render('admin/index', {title: '人事信息管理'});
  } else {
    res.render('salary', {title: '工资信息查看'});
  }

});

module.exports = router;
