const express = require('express');
const foodMenu = require('../controller/food-menu.controller');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.post('/addItem', foodMenu.create);
router.get('/findAll', foodMenu.findAll);

module.exports = router;