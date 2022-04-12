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

router.post("/makeReservation", booking.newBooking);
router.get("/getBookingList/", booking.findAll);


module.exports = router;