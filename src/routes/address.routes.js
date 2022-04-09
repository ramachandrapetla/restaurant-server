const {connection} = require('../config/db.config');
const express = require('express');
const address = require('../controller/address.controller');
const router = express.Router();


// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.post("/createRecord", address.create);
router.get("/findAll", address.findAll);
router.put("/update/:addressid", address.update);
router.get("/findById/:addressId", address.findOne)


module.exports = router;