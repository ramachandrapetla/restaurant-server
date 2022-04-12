const FoodMenu = require("../models/food-menu.model");
const uuid = require('uuid');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const foodItem = new FoodMenu({
        itemId: "ITEM-" + uuid.v4(),
        itemName: req.body.itemName,
        itemDesc: req.body.itemDesc,
        price: req.body.price,
    });

    // Save Tutorial in the database
    FoodMenu.create(foodItem, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Address."
            });
        else res.send(data);
    });
};

// Retrieve all food items from the database.
exports.findAll = (req, res) => {

    FoodMenu.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};