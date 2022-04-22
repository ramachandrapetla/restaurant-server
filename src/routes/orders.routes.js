const express = require('express');
const order = require('../controller/orders.controller');
const {authJwt} = require('../middleware');
const router = express.Router();


// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.post("/place-order", order.placeOrder);
router.get("/get-orders/:custId", order.getOrders );


module.exports = router;