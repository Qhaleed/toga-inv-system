//backend for inventory page (sample code only para mag work ang website)
const express = require('express');
const router = express.Router();
const db = require('../database/db');
require('dotenv').config();

router.get('/', async (req, res) => {

    try {
        const [rows] = await db.pool.query("SELECT * FROM inventory");
        res.json(rows);
    } catch (error) {
        console.log("Unable to fetch inventory");
    }

});

module.exports = router;
