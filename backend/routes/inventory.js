//backend for inventory page (sample code only para mag work ang website)
const express = require("express");
const router = express.Router();
const db = require("../database/db");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.pool.query("SELECT * FROM inventory");
    res.json(rows);
  } catch (error) {
    console.error("Unable to fetch inventory:", error);
    res.status(500).json({ error: "Failed to fetch inventory data" });
  }
});

// Add PATCH endpoint to update inventory items
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { renters_name, course, tassel_color, hood_color, toga_size } =
    req.body;

  try {
    // Build dynamic query based on provided fields
    let updateFields = [];
    let queryParams = [];

    if (renters_name !== undefined) {
      updateFields.push("renters_name = ?");
      queryParams.push(renters_name);
    }

    if (course !== undefined) {
      updateFields.push("course = ?");
      queryParams.push(course);
    }

    if (tassel_color !== undefined) {
      updateFields.push("tassel_color = ?");
      queryParams.push(tassel_color);
    }

    if (hood_color !== undefined) {
      updateFields.push("hood_color = ?");
      queryParams.push(hood_color);
    }

    if (toga_size !== undefined) {
      updateFields.push("toga_size = ?");
      queryParams.push(toga_size);
    }

    // If no fields to update, return error
    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Add the ID parameter to queryParams array
    queryParams.push(id);

    const query = `UPDATE inventory SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    const [result] = await db.pool.query(query, queryParams);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    // Fetch the updated record
    const [updatedItem] = await db.pool.query(
      "SELECT * FROM inventory WHERE id = ?",
      [id]
    );

    res.json(updatedItem[0]);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(500).json({ error: "Failed to update inventory item" });
  }
});

module.exports = router;
