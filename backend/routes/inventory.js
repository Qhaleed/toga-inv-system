//backend for inventory page (sample code only para mag work ang website)
const express = require("express");
const router = express.Router();
const db = require("../database/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.get('/', async (req, res) => {
  try {
    const fullTable = await db.getAllTable();

    // Check if fullTable is undefined or null before proceeding
    if (!fullTable) {
      console.log("Database returned no data");
      return res.status(500).json({ error: "Database connection error" });
    }

    // filter only students lang ang isend sa query
    const filteredTable = fullTable.filter(row => row.role === 'student');

    // loops each row and split the updated_at date to get only the date
    const formattedTable = filteredTable.map(row => ({
      ...row,
      updated_at: row.updated_at
        ? row.updated_at.toISOString().split('T')[0] //remove time part
        : null
    }));

    res.status(200).json(formattedTable);
  } catch (error) {
    console.log("Inventory Table database error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add PATCH endpoint to update inventory items
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { tassel_color, hood_color, toga_size, return_status, has_cap } = req.body;

  try {
    // Build dynamic query based on provided fields
    let updateFields = [];
    let queryParams = [];

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

    if (return_status !== undefined) {
      updateFields.push("return_status = ?");
      queryParams.push(return_status);
    }

    if (has_cap !== undefined) {
      updateFields.push("has_cap = ?");
      queryParams.push(has_cap);
    }

    // If no fields to update, return error
    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Add the ID parameter to queryParams array
    queryParams.push(id);

    const query = `UPDATE inventory SET ${updateFields.join(", ")} WHERE inventory_id = ?`;

    console.log("Executing query:", query, "with params:", queryParams);

    const [result] = await db.pool.query(query, queryParams);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    // Fetch the updated record with all the joined information
    const [updatedItems] = await db.pool.query(
      `SELECT a.*, i.*
       FROM accounts a
       LEFT JOIN inventory i ON a.account_id = i.account_id
       WHERE i.inventory_id = ?`,
      [id]
    );

    if (!updatedItems || updatedItems.length === 0) {
      return res.status(404).json({ error: "Updated item not found" });
    }

    res.json(updatedItems[0]);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(500).json({ error: "Failed to update inventory item: " + error.message });
  }
});

// Add endpoint to check if user has submitted toga size
router.get('/check-toga-size', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if user has a toga size entry
    const [existingEntry] = await db.pool.query(
      "SELECT toga_size FROM inventory WHERE account_id = ?",
      [decoded.id]
    );

    res.json({
      hasSubmitted: existingEntry.length > 0 && existingEntry[0].toga_size !== null,
      togaSize: existingEntry.length > 0 ? existingEntry[0].toga_size : null
    });
  } catch (error) {
    console.error("Error checking toga size:", error);
    res.status(500).json({ error: "Failed to check toga size status" });
  }
});

module.exports = router;
