// filepath: /home/res/computerScience/toga-inv-system/backend/routes/items.js
const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all items - retrieves all data from the items table
router.get("/", async (req, res) => {
  try {
    // Execute the query using the pool from the database module
    const [items] = await db.pool.query("SELECT * FROM items");

    if (!items) {
      console.log("Database returned no data");
      return res.status(500).json({ error: "Database connection error" });
    }

    // Compute stock summary by item_status, variant, and item_type
    const summary = {
      byStatus: {},
      byVariant: {},
      byType: {},
    };
    for (const item of items) {
      // By item_status
      if (item.item_status) {
        summary.byStatus[item.item_status] =
          (summary.byStatus[item.item_status] || 0) + (item.quantity || 0);
      }
      // By variant
      if (item.variant) {
        summary.byVariant[item.variant] =
          (summary.byVariant[item.variant] || 0) + (item.quantity || 0);
      }
      // By item_type
      if (item.item_type) {
        summary.byType[item.item_type] =
          (summary.byType[item.item_type] || 0) + (item.quantity || 0);
      }
    }

    // Return both items and summary
    res.status(200).json({ items, summary });
  } catch (error) {
    console.log("Items table database error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET item by ID - retrieves a specific item by its ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [item] = await db.pool.query("SELECT * FROM items WHERE id = ?", [
      id,
    ]);

    if (item.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item[0]);
  } catch (error) {
    console.log("Error fetching item by ID: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
