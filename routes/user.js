/**
 * Created by HetyTse on 2016/8/13.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user', function (req, res, next) {
    console.log(req.user);
    if (req.user.isAdmin) {
        res.render('admin/index', {title: '人事信息管理'});
    } else {
        res.render('salary', {title: '工资信息查看'});
    }

});

module.exports = router;