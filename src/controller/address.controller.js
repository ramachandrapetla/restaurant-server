const Address = require("../models/address.model");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const address = new Address({
        addressId: req.body.addressId,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
    });

    // Save Tutorial in the database
    Address.create(address, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Address."
            });
        else res.send(data);
    });
};

// Retrieve all Address from the database.
exports.findAll = (req, res) => {

    Address.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Find a single Address by Id
exports.findOne = (req, res) => {
    Address.findById(req.params.addressId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Address with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Address with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Address.updateById(
        req.params.addressId,
        new Address(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.addressId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.addressid
                    });
                }
            } else res.send(data);
        }
    );
};
