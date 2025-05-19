const express = require('express');
const router = express.Router();
const db = require('../database/db');
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const search = req.query.search ? req.query.search.toLowerCase() : "";
    const normalize = str => str.replace(/[\s.,]/g, '').toLowerCase(); //normalize the string by removing spaces and punctuation (para ma search kahit incomplete ang name)
    const fullTable = await db.getAllTable();
    const studentsOnly = fullTable.filter(row => row.role === 'student'); //only students ang irereturn
    const noToga = studentsOnly.filter(row => row.toga_size !== null && row.toga_size !== undefined);// filter out rows with toga size


    // Filter by combined name if search is provided
    const filteredTable = search
      ? noToga.filter(row => {
          // Combine the fields as you display them
          const combinedName = `${row.surname}, ${row.first_name}${row.middle_initial ? " " + row.middle_initial + "." : ""}`.toLowerCase();
          return normalize(combinedName).includes(normalize(search));
        })
      : noToga;

    res.status(200).json(filteredTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;