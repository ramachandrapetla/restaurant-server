const {connection} = require("../config/db.config");

const OrderDetail =  function(orderDetail){
    this.orderId = orderDetail.orderId;
    this.itemId = orderDetail.itemId;
    this.quantity = orderDetail.quantity;
};

OrderDetail.insertDetails = (orderDetail, result) => {
    console.log("Order Details : ", orderDetail);
    connection.query("INSERT INTO OrderDetail SET ?", orderDetail, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { ...orderDetail });
    });
}

module.exports = OrderDetail;