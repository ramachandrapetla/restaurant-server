const {connection} = require('../config/db.config');
const express = require('express');
const booking = require('../controller/booking.controller');
const {authJwt} = require('../middleware');
const router = express.Router();


// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.post("/makeReservation",[authJwt.verifyToken], booking.newBooking);
router.get("/getBookingList/", [authJwt.verifyToken], booking.findAll);
router.get("/getBookingsById/:userId", [authJwt.verifyToken], booking.getBookingsById);


module.exports = router;