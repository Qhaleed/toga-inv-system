const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/", (req, res) => {
  const { gown_size, tasselColor, hoodColor, cap, account_id, rent_date } =
    req.body;

  // Update the existing inventory record instead of inserting a new one
  db.db.run(
    `UPDATE inventory SET toga_size = ?, tassel_color = ?, hood_color = ?, has_cap = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE account_id = ?`,
    [gown_size, tasselColor, hoodColor, cap ? 1 : 0, account_id],
    function (err) {
      if (err) {
        console.log("db failed:", err);
        return res.status(500).json({
          message: "Failed to update information in inventory",
          error: err.message,
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          message: "No inventory record found for this account",
        });
      }

      res.status(200).json({
        message: "Toga information successfully updated",
      });
    }
  );
});

module.exports = router;
