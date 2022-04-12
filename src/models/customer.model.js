const {connection} = require("../config/db.config");

// constructor
const Customer = function(customer) {
    this.customerId = customer.customerId;
    this.userId = customer.userId;
    this.custCredits = customer.custCredits;
};

Customer.create = (newCustomer, result) => {
    connection.query("INSERT INTO Customer SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created Customer: ", { ...newCustomer });
        result(null, { ...newCustomer });
    });
};

Customer.updateCustCreditsById = (userId, changeValue, result) => {
    connection.query("UPDATE Customer SET custCredits = custCredits + ? WHERE customerId = ?",
        [changeValue, userId],
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

            console.log("updated customer Credits" );
            result(null, { res });
        })
};

Customer.findByUserId = (userId, result) => {
    connection.query('SELECT * FROM Customer WHERE userId =  ?', [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found customer with the user id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Customer;


/*
insert into userRole values("C", "Customer");
insert into userRole values("E", "Employee");
insert into employeeRole values("C", "Chef");
 */
