/**
 * Created by HetyTse on 2016/8/19.
 */
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

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


module.exports.connection=connection;