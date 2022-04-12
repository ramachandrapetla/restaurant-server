const {connection} = require('../config/db.config');
const express = require('express');
const address = require('../controller/address.controller');
const {authJwt} = require('../middleware');
const router = express.Router();


// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.post("/createRecord", [authJwt.verifyToken], address.create);
router.get("/findAll", [authJwt.verifyToken], address.findAll);
router.put("/update/:addressid", [authJwt.verifyToken], address.update);
router.get("/findById/:addressId", [authJwt.verifyToken], address.findOne)


module.exports = router;