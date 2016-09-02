/**
 * Created by HetyTse on 2016/8/13.
 */
var express = require('express');
var router = express.Router();

exports.list = function (req, res) {
    var html = "<h2>你好, " + req.user.UserName + "</h2><a href='/logout'>退出</a>";
    res.send(html);
};