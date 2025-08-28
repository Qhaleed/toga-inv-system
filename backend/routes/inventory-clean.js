//backend for inventory page (sample code only para mag work ang website)
const express = require("express");
const router = express.Router();
const db = require("../database/db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your-secret-key-here";

// Endpoint for rendering data on rows
router.get("/", (req, res) => {
  const fullTable = db.getAllTable();

  // Check if fullTable is undefined or null before proceeding
  if (!fullTable) {
    console.log("Database returned no data");
    return res.status(500).json({ error: "Database connection error" });
  }

  // filter only students lang ang isend sa query
  const filteredTable = fullTable.filter((row) => row.role === "student");

  // loops each row and split the updated_at date to get only the date
  const formattedTable = filteredTable.map((row) => ({
    ...row,
    updated_at: row.updated_at
      ? row.updated_at.split("T")[0] //remove time part
      : null,
  }));

  res.status(200).json(formattedTable);
});

// Add PATCH endpoint to update inventory items
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const {
    tassel_color,
    hood_color,
    toga_size,
    return_status,
    has_cap,
    status,
  } = req.body;

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

  // If status is provided, update it directly using the new function
  if (status !== undefined) {
    db.updateInventoryStatus(id, status, (err) => {
      if (err) {
        console.error("Error updating status:", err);
        return res.status(500).json({ error: "Failed to update status" });
      }

      // If only status is being updated, return early
      if (
        tassel_color === undefined &&
        hood_color === undefined &&
        toga_size === undefined &&
        return_status === undefined &&
        has_cap === undefined
      ) {
        return res.status(200).json({ message: "Status updated successfully" });
      }
    });
  }

  // If there are other fields to update besides status
  if (updateFields.length > 0) {
    // Add the ID parameter to queryParams array
    queryParams.push(id);

    const query = `UPDATE inventory SET ${updateFields.join(
      ", "
    )} WHERE inventory_id = ?`;

    db.db.run(query, queryParams, function (err) {
      if (err) {
        console.error("Error updating inventory item:", err);
        return res.status(500).json({
          error: "Failed to update inventory item: " + err.message,
        });
      }

      return res
        .status(200)
        .json({ message: "Inventory updated successfully" });
    });
  } else if (status === undefined) {
    // If nothing was updated
    res.status(400).json({ error: "No valid fields provided for update" });
  }
});

// Add endpoint to check if user has submitted toga size
router.get("/check-toga-size", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Invalid token" });
  }

  // Check if user has a toga size entry
  db.db.get(
    "SELECT toga_size, tassel_color, hood_color FROM inventory WHERE account_id = ?",
    [decoded.id],
    (err, existingEntry) => {
      if (err) {
        console.error("Error checking toga size:", err);
        return res
          .status(500)
          .json({ error: "Failed to check toga size status" });
      }

      res.json({
        hasSubmitted: existingEntry && existingEntry.toga_size !== null,
        togaSize: existingEntry ? existingEntry.toga_size : null,
        tasselColor: existingEntry ? existingEntry.tassel_color : null,
        hoodColor: existingEntry ? existingEntry.hood_color : null,
      });
    }
  );
});

// Add POST endpoint to submit toga size and other details upon registration
router.post("/", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Invalid token" });
  }

  const { toga_size, has_cap = 1 } = req.body;

  // Validate toga size
  if (!toga_size) {
    return res.status(400).json({ error: "Toga size is required" });
  }

  // Get student's course to determine correct colors
  db.db.get(
    "SELECT course FROM accounts WHERE account_id = ?",
    [decoded.id],
    (err, studentData) => {
      if (err) {
        console.error("Error fetching student data:", err);
        return res.status(500).json({ error: "Failed to fetch student data" });
      }

      if (!studentData) {
        return res.status(404).json({ error: "Student record not found" });
      }

      const course = studentData.course;
      const { tassel_color, hood_color } = determineColorsFromCourse(course);

      // Check if entry already exists
      db.db.get(
        "SELECT inventory_id FROM inventory WHERE account_id = ?",
        [decoded.id],
        (err, existingEntry) => {
          if (err) {
            console.error("Error checking existing entry:", err);
            return res.status(500).json({ error: "Database error" });
          }

          if (existingEntry) {
            // Update existing entry
            db.db.run(
              `UPDATE inventory 
               SET toga_size = ?, tassel_color = ?, hood_color = ?, has_cap = ?, rent_date = date('now')
               WHERE account_id = ?`,
              [toga_size, tassel_color, hood_color, has_cap, decoded.id],
              function (err) {
                if (err) {
                  console.error("Error updating toga details:", err);
                  return res.status(500).json({
                    error: "Failed to update toga details: " + err.message,
                  });
                }

                res.status(200).json({
                  message: "Toga details updated successfully",
                  inventory_id: existingEntry.inventory_id,
                });
              }
            );
          } else {
            // Create new entry with default values
            db.db.run(
              `INSERT INTO inventory 
               (account_id, toga_size, tassel_color, hood_color, has_cap, rent_date, is_overdue, return_status, payment_status, evaluation_status) 
               VALUES (?, ?, ?, ?, ?, date('now'), 0, 'Not Returned', 'Unpaid', 'Not Evaluated')`,
              [decoded.id, toga_size, tassel_color, hood_color, has_cap],
              function (err) {
                if (err) {
                  console.error("Error submitting toga details:", err);
                  return res.status(500).json({
                    error: "Failed to submit toga details: " + err.message,
                  });
                }

                res.status(201).json({
                  message: "Toga details submitted successfully",
                  inventory_id: this.lastID,
                });
              }
            );
          }
        }
      );
    }
  );
});

// Add DELETE endpoint to remove inventory items
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // First check if the inventory item exists
  db.db.get(
    "SELECT * FROM inventory WHERE inventory_id = ?",
    [id],
    (err, existingItem) => {
      if (err) {
        console.error("Error checking inventory item:", err);
        return res.status(500).json({
          error: "Failed to check inventory item: " + err.message,
        });
      }

      if (!existingItem) {
        return res.status(404).json({ error: "Inventory item not found" });
      }

      // If item exists, delete it
      db.db.run(
        "DELETE FROM inventory WHERE inventory_id = ?",
        [id],
        function (err) {
          if (err) {
            console.error("Error deleting inventory item:", err);
            return res.status(500).json({
              error: "Failed to delete inventory item: " + err.message,
            });
          }

          if (this.changes === 0) {
            return res.status(404).json({ error: "Inventory item not found" });
          }

          res.json({
            message: "Inventory item deleted successfully",
            deletedId: id,
          });
        }
      );
    }
  );
});

// Helper function to determine colors based on course
function determineColorsFromCourse(course) {
  // Course to color mapping
  const courseGroups = {
    blue: [
      "Bachelor of Early Childhood Education",
      "Bachelor of Elementary Education",
      "Bachelor of Physical Education",
      "Bachelor of Secondary Education",
      "BECEd",
      "BEEd",
      "BPEd",
      "BSEd",
    ],
    maroon: [
      "BS Biomedical Engineering",
      "BS Computer Engineering",
      "BS Electronics Communication Engineering",
      "Associate in Electronics Engineering Technology",
      "Associate in Computer Networking",
      "BSBME",
      "BSCE",
      "BSECE",
      "AEET",
      "ACN",
    ],
    orange: ["BS Nursing", "BSN"],
    white: [
      "BS Biology",
      "BS Computer Science",
      "BS Information Technology",
      "BS Mathematics",
      "BS Mathematics Sciences",
      "BS New Media and Computer Animation",
      "BS Psychology",
      "BA Communication",
      "BA English Language Studies",
      "BA Interdisciplinary Studies",
      "BA International Studies",
      "BA Philosophy",
      "BSBio",
      "BSCS",
      "BSIT",
      "BSMath",
      "BSMS",
      "BSNMCA",
      "BSPsych",
      "BAC",
      "BAELS",
      "BAIDS",
      "BAIS",
      "BAPhil",
    ],
    yellow: [
      "BS Accountancy",
      "BS Accounting Information System",
      "BS Internal Auditing",
      "BS Management Accounting",
      "BS Business Administration",
      "BS Office Management",
      "BS Legal Management",
      "BSA",
      "BSAIS",
      "BSIA",
      "BSMA",
      "BSBA",
      "BSOM",
      "BSLM",
    ],
  };

  if (!course) {
    return { tassel_color: "blue", hood_color: "blue" }; // Default if no course specified
  }

  // Find the appropriate color for the course
  for (const [color, courses] of Object.entries(courseGroups)) {
    if (courses.some((c) => course.includes(c))) {
      return {
        tassel_color: color.toLowerCase(),
        hood_color: color.toLowerCase(),
      };
    }
  }

  // Default if no match is found
  return { tassel_color: "blue", hood_color: "blue" };
}

module.exports = router;
