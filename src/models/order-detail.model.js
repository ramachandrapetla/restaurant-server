const {connection} = require("../config/db.config");

const OrderDetail =  function(orderDetail){
    this.orderId = orderDetail.orderId;
    this.itemId = orderDetail.itemId;
    this.quantity = orderDetail.quantity;
};

OrderDetail.insertDetails = (orderDetail, result) => {
    console.log("Order-Details.model.js : ", orderDetail);
    let flag = 0;
    for(var i=0; i< orderDetail.length; i++){
        connection.query("INSERT INTO OrderDetail SET ?", orderDetail[i], (err, res) => {
            if (err) {
                console.log("Error Occured: ", err);
                result(err, null);
                flag = 1
                return ;
            }
        });
    }
    result(null, {message: "success"});
}

module.exports = OrderDetail;
