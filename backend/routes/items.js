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

    // Return the formatted data
    res.status(200).json(items);
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

// POST - Add new inventory stock items
router.post("/", async (req, res) => {
  const { item_type, variant, item_status, return_status, quantity } = req.body;

  // Validate required fields
  if (!item_type || !item_status || !return_status || !quantity) {
    return res.status(400).json({
      error: "Missing required fields. Please provide item_type, item_status, return_status, and quantity.",
    });
  }

  // Validate quantity is a positive number
  if (typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({
      error: "Quantity must be a positive number",
    });
  }

  try {
    // Check if an item with the same type, variant, status, and return status exists
    const [existingItems] = await db.pool.query(
      "SELECT * FROM items WHERE item_type = ? AND variant = ? AND item_status = ? AND return_status = ?",
      [item_type, variant, item_status, return_status]
    );

    if (existingItems.length > 0) {
      // Item exists, update the quantity
      const newQuantity = existingItems[0].quantity + quantity;
      const [result] = await db.pool.query(
        "UPDATE items SET quantity = ? WHERE id = ?",
        [newQuantity, existingItems[0].id]
      );

      return res.status(200).json({
        message: "Stock quantity updated successfully",
        id: existingItems[0].id,
        quantity: newQuantity,
      });
    } else {
      // Item doesn't exist, create a new entry
      const [result] = await db.pool.query(
        "INSERT INTO items (item_type, variant, item_status, return_status, quantity) VALUES (?, ?, ?, ?, ?)",
        [item_type, variant, item_status, return_status, quantity]
      );

      return res.status(201).json({
        message: "New stock item added successfully",
        id: result.insertId,
        item_type,
        variant,
        item_status,
        return_status,
        quantity,
      });
    }
  } catch (error) {
    console.log("Error adding inventory stock: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST - Remove inventory stock items
router.post("/remove", async (req, res) => {
  const { item_type, variant, item_status, return_status, quantity } = req.body;

  console.log("Request received at /remove with the following parameters:");
  console.log("item_type:", item_type);
  console.log("variant:", variant);
  console.log("item_status:", item_status);
  console.log("return_status:", return_status);
  console.log("quantity:", quantity);


  // Validate required fields
  if (!item_type || !item_status || !return_status || !quantity) {
    return res.status(400).json({
      error: "Missing required fields. Please provide item_type, item_status, return_status, and quantity.",
    });
  }

  // Validate quantity is a positive number
  if (typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({
      error: "Quantity must be a positive number",
    });
  }

  try {
    // Check if an item with the same type, variant, status, and return status exists
    const [existingItems] = await db.pool.query(
      "SELECT * FROM items WHERE item_type = ? AND variant = ? AND item_status = ? AND return_status = ?",
      [item_type, variant, item_status, return_status]
    );


    if (existingItems.length === 0) {

      return res.status(404).json({
        error: "Item not found. Cannot remove stock from a non-existent item.",
      });
    }

    const existingItem = existingItems[0];

    // Check if there's enough quantity to remove
    if (existingItem.quantity < quantity) {
      return res.status(400).json({
        error: "Not enough stock to remove. Current quantity is " + existingItem.quantity,
      });
    }

    // Calculate new quantity
    const newQuantity = existingItem.quantity - quantity;

    if (newQuantity === 0) {
      // If quantity becomes zero, remove the item entirely
      const [result] = await db.pool.query(
        "DELETE FROM items WHERE id = ?",
        [existingItem.id]
      );

      return res.status(200).json({
        message: "Stock item removed successfully (zero quantity)",
        id: existingItem.id,
      });
    } else {
      // Update the quantity
      const [result] = await db.pool.query(
        "UPDATE items SET quantity = ? WHERE id = ?",
        [newQuantity, existingItem.id]
      );

      return res.status(200).json({
        message: "Stock quantity reduced successfully",
        id: existingItem.id,
        quantity: newQuantity,
      });
    }
  } catch (error) {
    console.log("Error removing inventory stock: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
