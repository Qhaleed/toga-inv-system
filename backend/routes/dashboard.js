const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Dashboard statistics endpoint
router.get("/stats", (req, res) => {
  // Get current stock (items not returned)
  db.db.get(
    "SELECT COUNT(*) as current_stock FROM inventory WHERE return_status = 'Not Returned'",
    [],
    (err, currentStock) => {
      if (err) {
        console.error("Error fetching current stock:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // Get reserved items
      db.db.get(
        "SELECT COUNT(*) as reserved FROM inventory WHERE return_status = 'Reserved'",
        [],
        (err, reserved) => {
          if (err) {
            console.error("Error fetching reserved:", err);
            return res.status(500).json({ error: "Database error" });
          }

          // Get pending evaluation
          db.db.get(
            "SELECT COUNT(*) as pending FROM inventory WHERE evaluation_status = 'Pending Evaluation'",
            [],
            (err, pending) => {
              if (err) {
                console.error("Error fetching pending:", err);
                return res.status(500).json({ error: "Database error" });
              }

              // Get evaluated items
              db.db.get(
                "SELECT COUNT(*) as evaluated FROM inventory WHERE evaluation_status = 'Evaluated'",
                [],
                (err, evaluated) => {
                  if (err) {
                    console.error("Error fetching evaluated:", err);
                    return res.status(500).json({ error: "Database error" });
                  }

                  // Get total available stock by item type
                  db.db.all(
                    `SELECT 
                      item_type,
                      SUM(quantity) as total_quantity,
                      SUM(CASE WHEN item_status = 'In Good Condition' THEN quantity ELSE 0 END) as available,
                      SUM(CASE WHEN item_status = 'For Repair' THEN quantity ELSE 0 END) as for_repair,
                      SUM(CASE WHEN item_status = 'Damaged' THEN quantity ELSE 0 END) as damaged
                    FROM items 
                    GROUP BY item_type`,
                    [],
                    (err, stockSummary) => {
                      if (err) {
                        console.error("Error fetching stock summary:", err);
                        return res
                          .status(500)
                          .json({ error: "Database error" });
                      }

                      res.json({
                        dashboard_stats: {
                          current_stock: currentStock.current_stock,
                          reserved: reserved.reserved,
                          pending_evaluation: pending.pending,
                          evaluated: evaluated.evaluated,
                        },
                        inventory_summary: stockSummary,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

// Get detailed stock information
router.get("/stock-details", (req, res) => {
  db.db.all(
    `SELECT 
      items.id,
      items.item_type,
      items.variant,
      items.quantity,
      items.item_status,
      items.return_status,
      -- Calculate in-use count
      COALESCE(
        (SELECT COUNT(*) 
         FROM inventory 
         WHERE return_status = 'Not Returned' 
         AND CASE 
           WHEN items.item_type = 'gown' THEN inventory.toga_size = items.variant
           WHEN items.item_type = 'tassel' THEN inventory.tassel_color = items.variant
           WHEN items.item_type = 'hood' THEN inventory.hood_color = items.variant
           WHEN items.item_type = 'cap' THEN inventory.toga_size = items.variant AND inventory.has_cap = 1
           ELSE 0
         END), 0
      ) as in_use,
      -- Calculate available count
      (items.quantity - COALESCE(
        (SELECT COUNT(*) 
         FROM inventory 
         WHERE return_status = 'Not Returned' 
         AND CASE 
           WHEN items.item_type = 'gown' THEN inventory.toga_size = items.variant
           WHEN items.item_type = 'tassel' THEN inventory.tassel_color = items.variant
           WHEN items.item_type = 'hood' THEN inventory.hood_color = items.variant
           WHEN items.item_type = 'cap' THEN inventory.toga_size = items.variant AND inventory.has_cap = 1
           ELSE 0
         END), 0
      )) as available
    FROM items
    ORDER BY items.item_type, items.variant`,
    [],
    (err, stockDetails) => {
      if (err) {
        console.error("Error fetching stock details:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json(stockDetails);
    }
  );
});

module.exports = router;
