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

User.findByUserName = (userName, result) => {
    connection.query(`SELECT * FROM Users WHERE userName = ?`, [userName], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAllUsers = (result) => {
    let query = "SELECT * FROM Users";

    connection.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};

module.exports = User;