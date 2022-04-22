const Order = require('../models/orders.model');
const OrderDetail = require('../models/order-detail.model');
const uuid = require('uuid');
const Customer = require('../models/customer.model');

exports.placeOrder = (req, res) => {
    console.log("request body : " ,req.body)
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.findByUserId(req.body.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while placing order"
            });
        else {
            // Create a Order
            const order = new Order({
                orderId: "ORDE-" + uuid.v4(),
                customerId: data.customerId,
                bookingId: req.body.bookingId,
                orderType: req.body.orderType
            });

            const orderDetail = new OrderDetail({
                orderId: order.orderId,
                itemId: req.body.itemId,
                quantity: req.body.quantity
            });


            Order.placeOrder(order, (err, orderData) => {

                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while placing order"
                    });
                else {
                    OrderDetail.insertDetails(orderDetail, (err, detailsData) => {
                        if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while placing order!"
                        });
                        else {
                            res.send({
                                orderId: order.orderId,
                                message: "Order placed successfully"
                            })
                        }
                    })
                }
            });
        }
    })
};


exports.getOrders = (req, res) => {
    const userId = req.params.custId;
    console.log("request body : " ,req.body)
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.findByUserId(userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customer information"
            });
        else {

            Order.getOrdersByCustomerId(data.customerId, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving order"
                    });
                 else {
                     console.log("Data is : ", data);
                     res.send(data);
                 }
            })

        }
    });
}