/**
 * Created by htxie on 2016/8/15.
 */
function User(user) {
    this.UserName = user.UserName;
    this.LoginName = user.LoginName;
    this.Password = user.Password;
    this.IsAdmin=user.IsAdmin;
};
module.exports = User;