/**
 * Created by HetyTse on 2016/8/13.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {title: '人力资源管理系统登陆'});
});



module.exports = router;
