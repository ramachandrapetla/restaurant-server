const {connection} = require("../config/db.config");

// constructor
const Booking = function(booking) {
    this.bookingId = booking.bookingId;
    this.tableNumber = booking.tableNumber;
    this.customerId = booking.customerId;
};

Booking.newBooking = (newBooking, result) => {
    connection.query("INSERT INTO Booking SET ?", newBooking, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { ...newBooking });
    });
};

Booking.getBookingsByUserId = (userId, result) => {
    let query = "SELECT Booking.* FROM Booking INNER JOIN Customer ON Customer.customerId = Booking.customerId where Customer.userId = ?";
    connection.query(query, [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Bookings: ", res);
        result(null, res);
    })
}

Booking.getAll = (result) => {
    let query = "SELECT * FROM Booking";

    connection.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Bookings: ", res);
        result(null, res);
    });
};

module.exports = Booking;