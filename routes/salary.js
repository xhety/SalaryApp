var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/salary', function(req, res, next) {
    res.render('salary', { title: '工资系统登陆' });
});

module.exports = router;