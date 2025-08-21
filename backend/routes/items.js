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

    // console.log("All the items in the items database: ");
    // console.log(items);


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

  try {
    // Check if an item with the same type, variant, status, and return status exists
    const [existingItems] = await db.pool.query(
      `SELECT * FROM items WHERE item_type = ? AND 
      (variant = ? OR (variant IS NULL AND ? IS NULL)) AND 
      item_status = ? AND return_status = ?`,
      [item_type, variant, variant, item_status, return_status]
    );

    if (existingItems.length > 0) {
      // Update the existing item's quantity
      const [result] = await db.pool.query(
        `UPDATE items SET quantity = quantity + ? WHERE id = ?`,
        [quantity, existingItems[0].id]
      );
      return res.status(200).json({ message: "Item quantity updated successfully." });
    } else {
      // Insert a new item if no matching item exists
      const [result] = await db.pool.query(
        `INSERT INTO items (item_type, variant, item_status, return_status, quantity) 
         VALUES (?, ?, ?, ?, ?)`,
        [item_type, variant, item_status, return_status, quantity]
      );
      return res.status(201).json({ message: "Item added successfully." });
    }
  } catch (error) {
    console.error("Error adding inventory item:", error);
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
    // Use proper NULL handling for variants
    const [existingItems] = await db.pool.query(
      "SELECT * FROM items WHERE item_type = ? AND (variant = ? OR (variant IS NULL AND ? IS NULL)) AND item_status = ? AND return_status = ?",
      [item_type, variant, variant, item_status, return_status]
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

// PATCH - Update inventory stock items
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  console.log("PATCH request received for item ID:", id);
  console.log("Requested quantity update:", quantity);

  if (quantity === undefined || typeof quantity !== "number" || quantity < 0) {
    console.error("Invalid quantity provided:", quantity);
    return res.status(400).json({
      error: "Invalid quantity. Please provide a non-negative number.",
    });
  }

  try {
    // Check if the item exists
    const [existingItem] = await db.pool.query("SELECT * FROM items WHERE id = ?", [id]);

    if (existingItem.length === 0) {
      console.error("Item not found for ID:", id);
      return res.status(404).json({ error: "Item not found." });
    }

    console.log("Existing item details:", existingItem[0]);

    // Update the quantity
    const [result] = await db.pool.query("UPDATE items SET quantity = ? WHERE id = ?", [quantity, id]);

    if (result.affectedRows === 0) {
      console.error("Failed to update item quantity for ID:", id);
      return res.status(500).json({ error: "Failed to update item quantity." });
    }

    console.log("Item quantity updated successfully for ID:", id, "New quantity:", quantity);
    res.status(200).json({ message: "Item quantity updated successfully.", id, quantity });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH - Update inventory stock items and handle lending logic
router.patch("/lend/:id", async (req, res) => {
  const { id } = req.params;
  const { item_type, variant, quantity } = req.body;

  console.log("Lend request received for item type:", item_type);
  console.log("Variant:", variant);
  console.log("Requested quantity:", quantity);

  if (!item_type || typeof quantity !== "number" || quantity <= 0) {
    console.error("Invalid request parameters:", { item_type, variant, quantity });
    return res.status(400).json({
      error: "Invalid request. Please provide item_type, variant, and a positive quantity.",
    });
  }

  try {
    // Check if sufficient items are available in "Returned" status
    const [returnedItems] = await db.pool.query(
      "SELECT * FROM items WHERE item_type = ? AND variant = ? AND return_status = 'Returned' AND item_status = 'In Good Condition'",
      [item_type, variant]
    );

    if (returnedItems.length === 0 || returnedItems[0].quantity < quantity) {
      console.error("Insufficient inventory for lending:", returnedItems);
      return res.status(400).json({
        error: `Insufficient inventory for ${item_type} (${variant || "N/A"}). Requested: ${quantity}, Available: ${returnedItems[0]?.quantity || 0}`,
      });
    }

    // Decrease the quantity of "Returned" items
    const newReturnedQuantity = returnedItems[0].quantity - quantity;
    await db.pool.query("UPDATE items SET quantity = ? WHERE id = ?", [
      newReturnedQuantity,
      returnedItems[0].id,
    ]);

    console.log(
      `Decreased "Returned" quantity for ${item_type} (${variant || "N/A"}). New quantity: ${newReturnedQuantity}`
    );

    // Check if "Not Returned" items exist for the same type and variant
    const [notReturnedItems] = await db.pool.query(
      "SELECT * FROM items WHERE item_type = ? AND variant = ? AND return_status = 'Not Returned' AND item_status = 'In Good Condition'",
      [item_type, variant]
    );

    if (notReturnedItems.length > 0) {
      // Increase the quantity of "Not Returned" items
      const newNotReturnedQuantity = notReturnedItems[0].quantity + quantity;
      await db.pool.query("UPDATE items SET quantity = ? WHERE id = ?", [
        newNotReturnedQuantity,
        notReturnedItems[0].id,
      ]);

      console.log(
        `Increased "Not Returned" quantity for ${item_type} (${variant || "N/A"}). New quantity: ${newNotReturnedQuantity}`
      );
    } else {
      // Create a new entry for "Not Returned" items if it doesn't exist
      await db.pool.query(
        "INSERT INTO items (item_type, variant, item_status, return_status, quantity) VALUES (?, ?, 'In Good Condition', 'Not Returned', ?)",
        [item_type, variant, quantity]
      );

      console.log(
        `Created new "Not Returned" entry for ${item_type} (${variant || "N/A"}) with quantity: ${quantity}`
      );
    }

    res.status(200).json({
      message: `Successfully lent ${quantity} ${item_type} (${variant || "N/A"}).`,
    });
  } catch (error) {
    console.error("Error processing lend request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH - Set items to returned
router.patch("/set-returned/:id", async (req, res) => {
  const { id } = req.params;
  const { item_type, variant, quantity } = req.body;

  console.log("Set Returned request received for item type:", item_type);
  console.log("Variant:", variant);
  console.log("Quantity to return:", quantity);

  if (!item_type || typeof quantity !== "number" || quantity <= 0) {
    console.error("Invalid request parameters:", { item_type, variant, quantity });
    return res.status(400).json({
      error: "Invalid request. Please provide item_type, variant, and a positive quantity.",
    });
  }

  try {
    // Check if sufficient items are available in "Not Returned" status
    const [notReturnedItems] = await db.pool.query(
      "SELECT * FROM items WHERE item_type = ? AND (variant = ? OR (variant IS NULL AND ? IS NULL)) AND return_status = 'Not Returned' AND item_status = 'In Good Condition'",
      [item_type, variant, variant]
    );

    if (notReturnedItems.length === 0 || notReturnedItems[0].quantity < quantity) {
      console.error("Insufficient inventory for setting to returned:", notReturnedItems);
      return res.status(400).json({
        error: `Insufficient inventory for ${item_type} (${variant || "N/A"}). Requested: ${quantity}, Available: ${notReturnedItems[0]?.quantity || 0}`,
      });
    }

    // Decrease the quantity of "Not Returned" items
    const newNotReturnedQuantity = notReturnedItems[0].quantity - quantity;
    console.log(`Decreasing "Not Returned" quantity for item_type: ${item_type}, variant: ${variant || "N/A"}, quantity: ${quantity}`);
    await db.pool.query("UPDATE items SET quantity = ? WHERE id = ?", [
      newNotReturnedQuantity,
      notReturnedItems[0].id,
    ]);

    console.log(
      `Decreased "Not Returned" quantity for ${item_type} (${variant || "N/A"}). New quantity: ${newNotReturnedQuantity}`
    );

    // Check if "Returned" items exist for the same type and variant
    const [returnedItems] = await db.pool.query(
      "SELECT * FROM items WHERE item_type = ? AND (variant = ? OR (variant IS NULL AND ? IS NULL)) AND return_status = 'Returned' AND item_status = 'In Good Condition'",
      [item_type, variant, variant]
    );

    if (returnedItems.length > 0) {
      // Increase the quantity of "Returned" items
      const newReturnedQuantity = returnedItems[0].quantity + quantity;
      console.log(`Increasing "Returned" quantity for item_type: ${item_type}, variant: ${variant || "N/A"}, quantity: ${quantity}`);
      await db.pool.query("UPDATE items SET quantity = ? WHERE id = ?", [
        newReturnedQuantity,
        returnedItems[0].id,
      ]);

      console.log(
        `Increased "Returned" quantity for ${item_type} (${variant || "N/A"}). New quantity: ${newReturnedQuantity}`
      );
    } else {
      // Create a new entry for "Returned" items if it doesn't exist
      await db.pool.query(
        "INSERT INTO items (item_type, variant, item_status, return_status, quantity) VALUES (?, ?, 'In Good Condition', 'Returned', ?)",
        [item_type, variant, quantity]
      );

      console.log(
        `Created new "Returned" entry for ${item_type} (${variant || "N/A"}) with quantity: ${quantity}`
      );
    }

    res.status(200).json({
      message: `Successfully set ${quantity} ${item_type} (${variant || "N/A"}) to returned.`,
    });
  } catch (error) {
    console.error("Error processing set returned request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
