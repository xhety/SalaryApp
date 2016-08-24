/**
 * Created by HetyTse on 2016/8/19.
 */
var mysql=require('mysql');
var settings = require('./settings');
var connection = mysql.createConnection(settings);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


module.exports.connection=connection;