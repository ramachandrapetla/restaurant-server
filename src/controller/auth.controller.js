const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.signin = (req, res) => {
    if (!req.body || !req.body.userName || !req.body.password) {
        res.status(400).send({
            message: "Sign in data missing!"
        });
    }

    User.findByUserName(req.body.userName, (err, data) => {
        if (err)
            res.status(404).send({
                message: "UserName not found"
            })
        else {
            var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
            } else{
            var token = jwt.sign({userId: data.userId}, process.env.SECRET_KEY, {expiresIn: 86400});
                res.status(200).send({
                    userId: data.userId,
                    userName: data.userName,
                    fname: data.fname,
                    lname: data.lname,
                    phone: data.phone,
                    email: data.email,
                    roleCode: data.roleCode,
                    accessToken: token
                })
            }
        }
    });
};