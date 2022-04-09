const {connection} = require("../config/db.config");

// constructor
const Address = function(address) {
    this.addressId = address.addressId;
    this.street = address.street;
    this.city = address.city;
    this.state = address.state;
    this.zipcode = address.zipcode;
};

Address.create = (newAddress, result) => {
    console.log("Address given is : ", newAddress);
    connection.query("INSERT INTO Address SET ?", newAddress, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { ...newAddress });
    });
};

Address.findById = (id, result) => {
    connection.query(`SELECT * FROM Address WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found address: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Address.getAll = (result) => {
    let query = "SELECT * FROM Address";

    connection.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Addresses: ", res);
        result(null, res);
    });
};

Address.updateById = (addressId, address, result) => {
    connection.query(
        "UPDATE Address SET street = ?, city = ?, state = ?, zipcode = ? WHERE addressId = ?",
        [address.street, address.city, address.state, address.zipcode, address.addressId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Address: ", { addressId: addressId, ...address });
            result(null, { addressId: addressId, ...address });
        }
    );
};

module.exports = Address;