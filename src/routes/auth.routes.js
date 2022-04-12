const express = require('express');
const auth = require('../controller/auth.controller');
const router = express.Router();

router.post("/login", auth.signin);


module.exports = router;