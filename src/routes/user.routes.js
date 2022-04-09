const express = require('express');
const user = require('../controller/user.controller');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.post('/createUser', user.create);

module.exports = router;