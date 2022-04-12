const User = require("../models/user.model");
const Address = require("../models/address.model");
const Customer = require("../models/customer.model");
const Employee = require("../models/employee.model");
const bcrypt = require("bcryptjs");
const uuid = require('uuid');


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const address = new Address({
        addressId: "ADDR-" + uuid.v4(),
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zipcode: req.body.address.zipcode
    });

    // constructor
    const user = new User({
        userId: "USER-" + uuid.v4(),
        fname: req.body.user.fname,
        lname: req.body.user.lname,
        addressId: address.addressId,
        phone: req.body.user.phone,
        email: req.body.user.email,
        userName: req.body.user.userName,
        password: bcrypt.hashSync(req.body.user.password, 4),
        roleCode: req.body.userRole.roleCode
    });

    // Save Address in the database
    Address.create(address, (err, addressData) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error in creating User Address"
            });
        else {

            User.create(user, (err, userData) => {
                if (err)
                    res.status(500).send({
                        message: err.message || "Error creating User Data"
                    })
                else {
                    if(user.roleCode && user.roleCode == "E"){
                        Employee.create(new Employee({
                            employeeId : "EMPL-" + uuid.v1(),
                            userId: user.userId,
                            salary: req.body.employee.salary || 5000,
                            role: req.body.employee.role
                        }), (err, employeeData) => {
                            if (err)
                                res.status(500).send({
                                    message: err.message || "Error creating User Data"
                                })
                            else
                                res.send({userData: {...userData}, address: {...addressData}, employeeData: {...employeeData}})
                        });
                    }
                    else if(user.roleCode && user.roleCode == "C") {
                        Customer.create(new Customer({
                            customerId : "CUST-" + uuid.v1(),
                            userId: user.userId,
                            custCredits: 0
                        }), (err, customerData) => {
                            if (err)
                                res.status(500).send({
                                    message: err.message || "Error creating User Data"
                                })
                            else
                                res.send({userData: {...userData}, address: {...addressData}, customerData: {...customerData}})
                        });

                    } else {
                        res.status(500).send({
                            message: err.message || "Error creating User Data"
                        })
                    }
                }
            });
        }
    });
};

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    })
}
