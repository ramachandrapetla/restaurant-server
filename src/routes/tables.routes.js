const express = require('express');
const tables = require('../controller/tables.controller');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.post('/addTable', tables.addTable);
router.post('/updateTableStatus', tables.updateTableStatus);
router.get('/getAllTables', tables.getAllTables);

module.exports = router;