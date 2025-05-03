//backend for inventory page (sample code only para mag work ang website)
const express = require('express');
const router = express.Router();
const db = require('../database/db');
require('dotenv').config();

router.get('/', (req, res) => {
    res.send("Inventory route");
});

module.exports = router;
