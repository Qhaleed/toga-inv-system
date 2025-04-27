//backend for inventory page (sample code only para mag work ang website)
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Inventory route");
});

module.exports = router;
