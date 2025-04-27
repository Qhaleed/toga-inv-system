//backend for evaluation page (sample code only para mag work ang website)
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Evaluation route");
});

module.exports = router;
