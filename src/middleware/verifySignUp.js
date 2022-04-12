const connection = require('../config/db.config');
const User = require('../models/user.model');


checkDuplicateUsername = (req, res, next) => {
    // Username
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.findByUserName(req.body.user.userName, (err, userData) => {
        if (err) {
            if(err.kind == "not_found") {
                next();
                return;
            }
            else res.status(500).send({
                message: "Could not verify user data! (1)"
            });
        } else {
            res.status(500).send({
                message: "UserName already taken!"
            });
            return;
        }
    });
    
};

validateUserData = (req, res, next) => {
    if (!req.body || !req.body.user || !req.body.userRole ||!req.body.address || !req.body.userRole.roleCode
        || !req.body.user.fname || !req.body.user.lname || !req.body.user.phone || !req.body.user.email
        || !req.body.user.userName || !req.body.user.password || !req.body.address.street || !req.body.address.city
        || !req.body.address.state || !req.body.address.zipcode) {
        res.status(400).send({
            message: "Some information is missing!"
        });
    }

    else if(req.body.userRole.roleCode == "E" && (!req.body.employee || !req.body.employee.salary || !req.body.employee.role)) {
        res.status(400).send({
            message: "Some information is missing!"
        });
    } else {
        next();
    }
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
    validateUserData: validateUserData
};

module.exports = verifySignUp;