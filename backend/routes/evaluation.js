//backend for evaluation page (sample code only para mag work ang website)
const express = require("express");
const router = express.Router();
const db = require("../database/db");
require("dotenv").config();

// Helper function to update evaluation status in inventory table
function updateInventoryEvaluationStatus(inventory_id, res) {
  db.db.run(
    "UPDATE inventory SET evaluation_status = ? WHERE inventory_id = ?",
    ["Evaluated", inventory_id],
    function (err) {
      if (err) {
        console.error("Error updating evaluation status:", err);
        return res
          .status(500)
          .json({ error: "Failed to update evaluation status" });
      }
      console.log("Evaluation saved successfully.");
      res.status(200).json({ message: "Evaluation saved successfully." });
    }
  );
}

// Helper function to create items entries based on evaluation results
function createItemsFromEvaluation(evaluationData, inventory_id) {
  console.log("=== createItemsFromEvaluation called ===");
  console.log("evaluationData:", evaluationData);
  console.log("inventory_id:", inventory_id);

  return new Promise((resolve, reject) => {
    // Get inventory details first to know the toga details and student info
    db.db.get(
      `SELECT inv.toga_size, inv.tassel_color, inv.hood_color, inv.account_id,
              acc.first_name, acc.surname, acc.middle_initial
       FROM inventory inv
       LEFT JOIN accounts acc ON inv.account_id = acc.account_id
       WHERE inv.inventory_id = ?`,
      [inventory_id],
      (err, inventoryData) => {
        if (err) {
          console.error("Error fetching inventory data:", err);
          return reject(err);
        }

        if (!inventoryData) {
          console.error(
            "No inventory data found for inventory_id:",
            inventory_id
          );
          return reject(new Error("Inventory record not found"));
        }

        console.log("Retrieved inventory data:", inventoryData);

        const studentName = `${inventoryData.surname || ""}, ${
          inventoryData.first_name || ""
        }${
          inventoryData.middle_initial
            ? ` ${inventoryData.middle_initial}.`
            : ""
        }`;
        const itemsToCreate = [];

        // Check gown evaluation
        console.log("Checking gown damage:", evaluationData.gown_damage);
        if (
          evaluationData.gown_damage &&
          evaluationData.gown_damage !== "None"
        ) {
          const itemStatus =
            evaluationData.gown_repair === "Repairable"
              ? "For Repair"
              : "Damaged";
          console.log("Adding gown item with status:", itemStatus);
          itemsToCreate.push({
            item_type: "gown",
            variant: inventoryData.toga_size?.toLowerCase(),
            item_status: itemStatus,
            return_status: "Returned",
            quantity: 1,
            damage_type: evaluationData.gown_damage,
            damage_reason: evaluationData.gown_remarks || "No details provided",
            damage_date: new Date().toISOString().split("T")[0],
            damaged_by: studentName,
          });
        }

        // Check hood evaluation
        console.log("Checking hood damage:", evaluationData.hood_damage);
        if (
          evaluationData.hood_damage &&
          evaluationData.hood_damage !== "None"
        ) {
          const itemStatus =
            evaluationData.hood_repair === "Repairable"
              ? "For Repair"
              : "Damaged";
          console.log("Adding hood item with status:", itemStatus);
          itemsToCreate.push({
            item_type: "hood",
            variant: inventoryData.hood_color?.toLowerCase(),
            item_status: itemStatus,
            return_status: "Returned",
            quantity: 1,
            damage_type: evaluationData.hood_damage,
            damage_reason: evaluationData.hood_remarks || "No details provided",
            damage_date: new Date().toISOString().split("T")[0],
            damaged_by: studentName,
          });
        }

        // Check tassel evaluation
        console.log("Checking tassel damage:", evaluationData.tassel_damage);
        if (
          evaluationData.tassel_damage &&
          evaluationData.tassel_damage !== "None"
        ) {
          const itemStatus = "Damaged"; // Tassels are typically not repairable
          console.log("Adding tassel item with status:", itemStatus);
          itemsToCreate.push({
            item_type: "tassel",
            variant: inventoryData.tassel_color?.toLowerCase(),
            item_status: itemStatus,
            return_status: "Returned",
            quantity: 1,
            damage_type: evaluationData.tassel_damage,
            damage_reason:
              evaluationData.tassel_remarks || "No details provided",
            damage_date: new Date().toISOString().split("T")[0],
            damaged_by: studentName,
          });
        }

        // Check cap evaluation
        console.log("Checking cap deform:", evaluationData.cap_deform);
        if (evaluationData.cap_deform && evaluationData.cap_deform !== "None") {
          const itemStatus = "Damaged"; // Caps with deformation are typically damaged
          console.log("Adding cap item with status:", itemStatus);
          itemsToCreate.push({
            item_type: "cap",
            variant: null, // Caps don't have variants
            item_status: itemStatus,
            return_status: "Returned",
            quantity: 1,
            damage_type: evaluationData.cap_deform,
            damage_reason: evaluationData.cap_remarks || "No details provided",
            damage_date: new Date().toISOString().split("T")[0],
            damaged_by: studentName,
          });
        }

        console.log("Items to create:", itemsToCreate);

        // Create all item entries
        if (itemsToCreate.length === 0) {
          console.log("No items to create, resolving");
          return resolve();
        }

        const promises = itemsToCreate.map((item) => {
          return new Promise((resolveItem, rejectItem) => {
            console.log("Inserting item:", item);
            db.db.run(
              `INSERT INTO items (item_type, variant, item_status, return_status, quantity, damage_type, damage_reason, damage_date, damaged_by) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                item.item_type,
                item.variant,
                item.item_status,
                item.return_status,
                item.quantity,
                item.damage_type,
                item.damage_reason,
                item.damage_date,
                item.damaged_by,
              ],
              function (insertErr) {
                if (insertErr) {
                  console.error("Error creating item entry:", insertErr);
                  return rejectItem(insertErr);
                }
                console.log(
                  `Created ${item.item_status} item: ${item.item_type} - ${item.damage_type} by ${item.damaged_by}`
                );
                resolveItem();
              }
            );
          });
        });

        Promise.all(promises)
          .then(() => {
            console.log("All items created successfully");
            resolve();
          })
          .catch((err) => {
            console.error("Error in Promise.all:", err);
            reject(err);
          });
      }
    );
  });
}

router.get("/", async (req, res) => {
  try {
    // Get inventory data with account details, filtered for approved students only
    db.db.all(
      `SELECT 
        inv.*, 
        acc.first_name, 
        acc.surname, 
        acc.email, 
        acc.role, 
        acc.status,
        acc.id_number,
        acc.course
      FROM inventory inv
      LEFT JOIN accounts acc ON inv.account_id = acc.account_id
      WHERE acc.role = 'student' 
        AND inv.return_status = 'Returned'`,
      [],
      (err, rows) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database connection error" });
        }

        // Format the data for frontend consumption
        const formattedTable = rows.map((row) => ({
          ...row,
          updated_at: row.updated_at
            ? row.updated_at.split("T")[0] // remove time part
            : null,
        }));

        res.status(200).json(formattedTable);
      }
    );
  } catch (error) {
    console.log("Evaluation Table database error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const {
    inventory_id,
    gown_condition,
    gown_repair,
    gown_damage,
    gown_remarks,
    hood_condition,
    hood_repair,
    hood_damage,
    hood_remarks,
    tassel_condition,
    tassel_missing,
    tassel_damage,
    tassel_remarks,
    cap_condition,
    cap_deform,
    cap_remarks,
  } = req.body;
  try {
    // Check if evaluation already exists for this inventory_id
    db.db.get(
      "SELECT * FROM evaluation WHERE inventory_id = ?",
      [inventory_id],
      (err, existingEval) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (existingEval) {
          // Update existing evaluation
          db.db.run(
            `UPDATE evaluation SET 
             gown_condition = ?, gown_repair = ?, gown_damage = ?, gown_remarks = ?,
             hood_condition = ?, hood_repair = ?, hood_damage = ?, hood_remarks = ?,
             tassel_condition = ?, tassel_missing = ?, tassel_damage = ?, tassel_remarks = ?,
             cap_condition = ?, cap_deform = ?, cap_remarks = ?
             WHERE inventory_id = ?`,
            [
              gown_condition,
              gown_repair,
              gown_damage,
              gown_remarks,
              hood_condition,
              hood_repair,
              hood_damage,
              hood_remarks,
              tassel_condition,
              tassel_missing,
              tassel_damage,
              tassel_remarks,
              cap_condition,
              cap_deform,
              cap_remarks,
              inventory_id,
            ],
            async function (updateErr) {
              if (updateErr) {
                console.error("Error updating evaluation:", updateErr);
                return res
                  .status(500)
                  .json({ error: "Failed to update evaluation" });
              }

              try {
                // Create items entries based on evaluation results
                await createItemsFromEvaluation(req.body, inventory_id);

                // Update evaluation status to "Evaluated"
                updateInventoryEvaluationStatus(inventory_id, res);
              } catch (error) {
                console.error("Error creating items from evaluation:", error);
                return res
                  .status(500)
                  .json({ error: "Failed to process evaluation results" });
              }
            }
          );
        } else {
          // Insert new evaluation
          db.db.run(
            `INSERT INTO evaluation 
             (inventory_id, gown_condition, gown_repair, gown_damage, gown_remarks,
              hood_condition, hood_repair, hood_damage, hood_remarks,
              tassel_condition, tassel_missing, tassel_damage, tassel_remarks,
              cap_condition, cap_deform, cap_remarks)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              inventory_id,
              gown_condition,
              gown_repair,
              gown_damage,
              gown_remarks,
              hood_condition,
              hood_repair,
              hood_damage,
              hood_remarks,
              tassel_condition,
              tassel_missing,
              tassel_damage,
              tassel_remarks,
              cap_condition,
              cap_deform,
              cap_remarks,
            ],
            async function (insertErr) {
              if (insertErr) {
                console.error("Error inserting evaluation:", insertErr);
                return res
                  .status(500)
                  .json({ error: "Failed to insert evaluation" });
              }

              try {
                // Create items entries based on evaluation results
                await createItemsFromEvaluation(req.body, inventory_id);

                // Update evaluation status to "Evaluated"
                updateInventoryEvaluationStatus(inventory_id, res);
              } catch (error) {
                console.error("Error creating items from evaluation:", error);
                return res
                  .status(500)
                  .json({ error: "Failed to process evaluation results" });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log("error in evaluation table: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
