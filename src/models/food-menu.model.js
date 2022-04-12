const {connection} = require("../config/db.config");

// constructor
const FoodMenu = function(foodMenu) {
    this.itemId = foodMenu.itemId;
    this.itemName = foodMenu.itemName;
    this.itemDesc = foodMenu.itemDesc;
    this.price = foodMenu.price;
};

FoodMenu.create = (newItem, result) => {
    connection.query("INSERT INTO FoodMenu SET ?", newItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { ...newItem });
    });
};

FoodMenu.getAll = (result) => {
    let query = "SELECT * FROM FoodMenu";

    connection.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("FoodMenu: ", res);
        result(null, res);
    });
};

module.exports = FoodMenu;