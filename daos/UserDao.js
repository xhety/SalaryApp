/**
 * Created by htxie on 2016/8/15.
 */
var mysql=require('mysql');
var User=require('/models/User');
var settings = require('/settings');
var DB_NAME="tradesalarydb";
var HOST=settings.host;
var PORT=settings.port;
var USER=settings.user;
var DATABASE=settings.database;
var PASSWORD=settings.password;

var connection = mysql.createPool({
    host     :HOST,
    user     : USER,
    password : PASSWORD,
    port: PORT,
    database: DATABASE
});

pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

pool.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error: " + err.message);
            return;
        }
        console.log('USE succeed');
    });

    //保存数据
    User.prototype.save = function save(callback) {
        var user = {
            name : this.name,
            email:this.email,
            username : this.username,
            password : this.password,
            isadmin:this.isadmin
        };

        var insertUser_Sql = "INSERT INTO t_user(id,name,email,username,password,isadmin) VALUES(0,?,?,?,?,?)";

        connection.query(insertUser_Sql, [user.name,user.email,user.username,user.password, user.isadmin], function (err,result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }

            connection.release();

            console.log("invoked[save]");
            callback(err,result);
        });
    };

    //根据用户名得到用户数量
    User.getUserNumByName = function getUserNumByName(username, callback) {

        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM t_user";

        connection.query(getUserNumByName_Sql, function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }

            connection.release();

            console.log("invoked[getUserNumByName]");
            callback(err,result);
        });
    };

    //根据用户名得到用户信息
    User.getUserByUserName = function getUserNumByName(username, callback) {

        var getUserByUserName_Sql = "SELECT * FROM t_user WHERE username = ?";

        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }

            connection.release();

            console.log("invoked[getUserByUserName]");
            callback(err,result);
        });
    };

});