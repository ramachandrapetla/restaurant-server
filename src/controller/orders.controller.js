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

    Customer.findByUserId(req.body.orderData[0].userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while placing order"
            });
        else {
            console.log("request Data: " + req.body.orderData);
            let orderData = {
                orderId: "ORDE-" + uuid.v4(),
                customerId: data.customerId,
                bookingId: req.body.orderData[0].bookingId || null,
                orderType: req.body.orderData[0].orderType
            }

            let orderDetails = []
            req.body.orderData.forEach(item => {
                let listItem = {
                    orderId: orderData.orderId,
                    itemId: item.itemId,
                    quantity: item.quantity

                }
                orderDetails.push(listItem);
            });


            Order.placeOrder(orderData, (err, orderData) => {

                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while placing order"
                    });
                else {
                    OrderDetail.insertDetails(orderDetails, (err, detailsData) => {
                        if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while placing order!"
                        });
                        else {
                            res.send({
                                orderId: orderData.orderId,
                                message: "Order placed successfully!!"
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
