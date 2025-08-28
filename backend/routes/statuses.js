// filepath: /home/res/computerScience/toga-inv-system/backend/routes/statuses.js
const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET items and summary (for ItemStatus page)
router.get("/", (req, res) => {
  db.db.all("SELECT * FROM items", [], (err, items) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ error: "Database connection error" });
    }

    // Compute summary
    const summary = {
      byStatus: {},
      byVariant: {},
      byType: {},
    };

    for (const item of items) {
      if (item.item_status) {
        summary.byStatus[item.item_status] =
          (summary.byStatus[item.item_status] || 0) + (item.quantity || 0);
      }
      if (item.variant) {
        summary.byVariant[item.variant] =
          (summary.byVariant[item.variant] || 0) + (item.quantity || 0);
      }
      if (item.item_type) {
        summary.byType[item.item_type] =
          (summary.byType[item.item_type] || 0) + (item.quantity || 0);
      }
    }

    res.status(200).json({ items, summary });
  });
});

module.exports = router;
