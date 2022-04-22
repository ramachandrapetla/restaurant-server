const Tables = require('../models/tables.model');

exports.addTable = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const table = new Tables({
        tableNumber: req.body.tableNumber,
        capacity: req.body.capacity,
        statusCode: req.body.statusCode
    });

    // Save Tutorial in the database
    Tables.create(table, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding the table."
            });
        else res.send(data);
    });
};

// Retrieve all tables from the database.
exports.getAllTables = (req, res) => {

    Tables.getAllTables((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tables."
            });
        else res.send(data);
    });
};

// Retrieve all tables availble(status) from the database.
exports.getAllAvailableTables = (req, res) => {

    Tables.getAllAvailableTables((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tables."
            });
        else res.send(data);
    });
};

exports.updateTableStatus = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Tables.updateStatus(
        req.body.tableNumber,
        req.body.statusCode,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found table with number ${req.body.tableNumber}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating table with number " + req.body.tableNumber
                    });
                }
            } else res.send(data);
        }
    );
};
