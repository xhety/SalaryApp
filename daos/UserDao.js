/**
 * Created by htxie on 2016/8/15.
 */
var db=require('../db');
var User=require('../models/User');
User.getUserList = function getUserList(callback) {
    var conn= db.connection;
    var strSql ='select * from t_user';
    conn.query(strSql,function(err,rows,fields){
        if (err) {
            console.log('[SELECT ERROR] -',err.message);
            return done(null, false, {message:err.message});
        }

        return rows;
    });
}

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

module.exports=exports=User;