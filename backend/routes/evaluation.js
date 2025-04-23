const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Evaluation route is active!");
});

module.exports = router;
