const express = require('express');
const router = express.Router();

const db = require('../database/db')
router.get('/', async (req, res) => {

    try {
        const [rows] = await db.query("SELECT * FROM accounts");
        res.json(rows);


    } catch (err) {
        console.error(err);
        console.log(err)
        res.status(500).send("Cant fetch accounts data")
    }


});

module.exports = router;
