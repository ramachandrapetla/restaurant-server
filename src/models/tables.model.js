const {connection} = require("../config/db.config");

// constructor
const Table = function(table) {
    this.tableNumber = table.tableNumber;
    this.capacity = table.capacity;
    this.statusCode = table.statusCode;
};

Table.addTable = (newTable, result) => {
    connection.query("INSERT INTO tables SET ?", newUserRole, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Added New table: ", { ...newTable });
        result(null, { ...newTable });
    });
};

Table.updateTable = (tableNumber, statusCode, result) => {
    connection.query("UPDATE tables SET statusCode = ? WHERE tableNumber = ?", 
    [tableNumber, statusCode], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated table status: ");
        result(null, { tableNUmber: tableNumber, statusCode: statusCode });
    });
}

Table.getAllTables = (result) => {
    let query = "SELECT * FROM tables";

    connection.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Tables: ", res);
        result(null, res);
    });
};

module.exports = Table;