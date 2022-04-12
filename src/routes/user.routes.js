const express = require('express');
const user = require('../controller/user.controller');
const { verifySignUp } = require('../middleware');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

router.post('/createUser',[verifySignUp.validateUserData, verifySignUp.checkDuplicateUsername], user.create);
router.get('/getAllUsers', user.getAllUsers);

module.exports = router;