const {connection} = require("../config/db.config");

// constructor
const Employee = function(employee) {
    this.employeeId = employee.employeeId;
    this.userId = employee.userId;
    this.salary = employee.salary;
    this.role = employee.role;
};

Employee.create = (newEmployee, result) => {
    connection.query("INSERT INTO Employee SET ?", newEmployee, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created employee: ", { ...newEmployee });
        result(null, { ...newEmployee });
    });
};

Employee.updateSalaryById = (userId, newSalary, result) => {
    connection.query("UPDATE Employee SET salary = ? WHERE userId = ?",
        [newSalary, userId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the userId
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated employee salary" );
            result(null, { res });
        })
};

Employee.findByUserId = (userId, result) => {
    connection.query(`SELECT * FROM Employee WHERE userId = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found employee: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found employee with the user id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Employee;