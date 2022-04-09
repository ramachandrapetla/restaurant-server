const {connection} = require("../config/db.config");

// constructor
const UserRole = function(user) {
    this.roleCode = user.userId;
    this.roleName = user.fname;
};

UserRole.addRole = (newUserRole, result) => {
    connection.query("INSERT INTO UserRole SET ?", newUserRole, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created New Role: ", { ...newUserRole });
        result(null, { ...newUserRole });
    });
};

module.exports = UserRole;