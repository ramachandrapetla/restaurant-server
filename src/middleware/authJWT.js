const jwt = require("jsonwebtoken");
const connection = require("../config/db.config");
const User = require("../models/user.model");
require('dotenv').config();

verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
        message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
        }
        req.userId = decoded.id;
        next();
    });

};

isCustomer = (req, res, next) => {
    User.findByUserName(req.body.user.userName, (err, userData) => {
        if (err) {
            res.status(500).send({
                message: "Could not retrieve user data"
            });
        } else {
            if(userData.roleCode == 'C') {
                next();
            }
            return;
        }
    });
}

isEmployee = (req, res, next) => {
    User.findByUserName(req.body.user.userName, (err, userData) => {
        if (err) {
            res.status(500).send({
                message: "Could not retrieve user data"
            });
        } else {
            if(userData.roleCode == 'E') {
                next();
                return;
            }
            res.status(500).send({
                message: "Require Employee Role"
            });
        }
    });
}

isAdmin = (req, res, next) => {
    User.findByUserName(req.body.user.userName, (err, userData) => {
        if (err) {
            res.status(500).send({
                message: "Could not retrieve user data"
            });
        } else {
            if(userData.roleCode == 'A') {
                next();
                return;
            }
            res.status(500).send({
                message: "Require Admin Role"
            });
        }
    });
}

const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isEmployee: isEmployee,
    isCustomer: isCustomer
};

module.exports = authJWT;