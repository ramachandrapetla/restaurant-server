const {connection} = require("../config/db.config");

// constructor
const User = function(user) {
    this.userId = user.userId;
    this.fname = user.fname;
    this.lname = user.lname;
    this.addressId = user.addressId;
    this.phone = user.phone;
    this.email = user.email;
    this.userName = user.userName;
    this.password = user.password;
    this.roleCode = user.roleCode;
};

User.create = (newUser, result) => {
    connection.query("INSERT INTO Users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created User: ", { ...newUser });
        result(null, { ...newUser });
    });
};

module.exports = User;