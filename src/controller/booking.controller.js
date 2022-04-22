const Booking = require("../models/booking.model");
const uuid = require('uuid');
const User = require("../models/user.model");
const Customer = require("../models/customer.model");
const Table = require("../models/tables.model");

// Create and Save a new Tutorial
exports.newBooking = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log("payload: ", req.body);

    Customer.findByUserId(req.body.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the booking. [getting customer data]"
            });
        else {
            // Save Tutorial in the database
            // Create a Tutorial
            const booking = new Booking({
                bookingId: "BOOK-" + uuid.v4(),
                tableNumber: req.body.tableNumber,
                customerId: data.customerId,
            });
            Booking.newBooking(booking, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the booking. [make booking]"
                    });
                else {
                    Table.updateStatus(booking.tableNumber, "O" , (err, data) => {
                        if (err)
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while updating the tableStatus."
                            });

                        else res.send(data);
                    })
                    
                }
            });
        }
    });

    
};

// Retrieve all food items from the database.
exports.findAll = (req, res) => {

    Booking.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving bookings."
            });
        else res.send(data);
    });
};

exports.getBookingsById = (req, res) => {
    const userId = req.params.userId;
    Booking.getBookingsByUserId(userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving bookings."
            });
        else res.send(data);
    });
}