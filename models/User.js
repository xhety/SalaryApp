/**
 * Created by htxie on 2016/8/15.
 */
function User(user) {
    this.id=user.id;
    this.name = user.name;
    this.email=user.email;
    this.username = user.username;
    this.password = user.password;
    this.isadmin=user.isadmin;

};
module.exports = User;