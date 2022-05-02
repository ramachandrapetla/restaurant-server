const {connection} = require("../config/db.config");

// constructor
const Order = function(order) {
    this.orderId = order.orderId;
    this.customerId = order.customerId;
    this.bookingId = order.bookingId;
    this.orderType = order.orderType;
};


Order.placeOrder = (newOrder, result) => {

    console.log("Order Details : ", newOrder);
    connection.query("INSERT INTO Orders SET ?", newOrder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { ...newOrder });
    });
}

Order.getOrdersByCustomerId = (customerId, result) => {
    connection.query(`SELECT orders.orderId, orders.OrderType, sum(quantity*price) as totalPrice 
    FROM orders inner join orderDetail on orders.orderId = orderDetail.orderId 
    inner join foodMenu on orderDetail.itemId = foodMenu.itemId 
    WHERE orders.customerId = ?
    GROUP BY orders.orderId`,
    [customerId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found order details: ",);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    })
}

module.exports = Order;


