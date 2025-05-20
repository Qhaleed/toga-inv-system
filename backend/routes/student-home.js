const express = require('express');
const router = express.Router();
const db = require('../database/db');
require('dotenv').config();

router.post('/', async (req, res) => {
    const {
        gown_size, tasselColor, hoodColor, cap, account_id, rent_date
    } = req.body

    try {
        const inventory = await db.pool.query(`INSERT INTO inventory (account_id, toga_size, tassel_color, hood_color, has_cap, rent_date) 
            VALUES (?, ?, ?, ?, ?, CURDATE())`,
            [account_id, gown_size, tasselColor, hoodColor, cap]
        );

        res.status(200).json({ message: 'Information successfully stored in inventory' });
    } catch (error) {
        console.log("db failed:", error);
        res.status(500).json({ message: 'Failed to store information in inventory', error: error.message });
    }
});

module.exports = router;