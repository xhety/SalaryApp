/**
 * Created by htxie on 2016/8/15.
 */
function User(user) {
    this.Id = user.Id;
    this.EmployeeID = user.EmployeeID;
    this.Department = user.Department;
    this.UserName = user.UserName;
    this.Email = user.Email;
    this.LoginName = user.LoginName;
    this.Password = user.Password;
    this.IsAdmin = user.IsAdmin;
    this.BankName = user.BankName;
    this.BankAccount = user.BankAccount;

};
module.exports = User;