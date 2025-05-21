//backend for inventory page (sample code only para mag work ang website)
const express = require("express");
const router = express.Router();
const db = require("../database/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");



// Endpoint for rendering data on rows
router.get("/", async (req, res) => {
  try {
    const fullTable = await db.getAllTable();

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
        ? row.updated_at.toISOString().split("T")[0] //remove time part
        : null,
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
  const {
    tassel_color,
    hood_color,
    toga_size,
    return_status,
    has_cap,
    status,
  } = req.body;

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

    // If status is provided, update it directly using the new function
    if (status !== undefined) {
      await db.updateInventoryStatus(id, status);
      // If only status is being updated, return early
      if (
        tassel_color === undefined &&
        hood_color === undefined &&
        toga_size === undefined &&
        status === undefined &&
        has_cap === undefined
      ) {
        return res.status(200).json({ message: "Status updated successfully" });
      }
    }

    // If there are other fields to update besides status
    if (updateFields.length > 0) {
      // Add the ID parameter to queryParams array
      queryParams.push(id);

      const query = `UPDATE inventory SET ${updateFields.join(
        ", "
      )} WHERE inventory_id = ?`;
      await db.pool.query(query, queryParams);
      return res
        .status(200)
        .json({ message: "Inventory updated successfully" });
    }

    // If nothing was updated
    res.status(400).json({ error: "No valid fields provided for update" });
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res
      .status(500)
      .json({ error: "Failed to update inventory item: " + error.message });
  }
});

// Add endpoint to check if user has submitted toga size
router.get("/check-toga-size", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if user has a toga size entry
    const [existingEntry] = await db.pool.query(
      "SELECT toga_size, tassel_color, hood_color FROM inventory WHERE account_id = ?",
      [decoded.id]
    );

    res.json({
      hasSubmitted:
        existingEntry.length > 0 && existingEntry[0].toga_size !== null,
      togaSize: existingEntry.length > 0 ? existingEntry[0].toga_size : null,
      tasselColor:
        existingEntry.length > 0 ? existingEntry[0].tassel_color : null,
      hoodColor: existingEntry.length > 0 ? existingEntry[0].hood_color : null,
    });
  } catch (error) {
    console.error("Error checking toga size:", error);
    res.status(500).json({ error: "Failed to check toga size status" });
  }
});

// Add POST endpoint to submit toga size and other details upon registration
router.post("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { toga_size, has_cap = 1 } = req.body;

    // Validate toga size
    if (!toga_size) {
      return res.status(400).json({ error: "Toga size is required" });
    }

    // Get student's course to determine correct colors
    const [studentData] = await db.pool.query(
      "SELECT course FROM accounts WHERE account_id = ?",
      [decoded.id]
    );

    if (studentData.length === 0) {
      return res.status(404).json({ error: "Student record not found" });
    }

    const course = studentData[0].course;
    const { tassel_color, hood_color } = determineColorsFromCourse(course);

    // Check if entry already exists
    const [existingEntry] = await db.pool.query(
      "SELECT inventory_id FROM inventory WHERE account_id = ?",
      [decoded.id]
    );

    let result;
    if (existingEntry.length > 0) {
      // Update existing entry
      [result] = await db.pool.query(
        `UPDATE inventory 
         SET toga_size = ?, tassel_color = ?, hood_color = ?, has_cap = ?, rent_date = CURRENT_DATE()
         WHERE account_id = ?`,
        [toga_size, tassel_color, hood_color, has_cap, decoded.id]
      );

      res.status(200).json({
        message: "Toga details updated successfully",
        inventory_id: existingEntry[0].inventory_id,
      });
    } else {
      // Create new entry with default values
      [result] = await db.pool.query(
        `INSERT INTO inventory 
         (account_id, toga_size, tassel_color, hood_color, has_cap, rent_date, is_overdue, return_status, payment_status, evaluation_status) 
         VALUES (?, ?, ?, ?, ?, CURRENT_DATE(), 0, 'Not Returned', 'Unpaid', 'Not Evaluated')`,
        [decoded.id, toga_size, tassel_color, hood_color, has_cap]
      );

      res.status(201).json({
        message: "Toga details submitted successfully",
        inventory_id: result.insertId,
      });
    }
  } catch (error) {
    console.error("Error submitting toga details:", error);
    res
      .status(500)
      .json({ error: "Failed to submit toga details: " + error.message });
  }
});

// Add DELETE endpoint to remove inventory items
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // First check if the inventory item exists
    const [existingItem] = await db.pool.query(
      "SELECT * FROM inventory WHERE inventory_id = ?",
      [id]
    );

    if (existingItem.length === 0) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    // If item exists, delete it
    const [result] = await db.pool.query(
      "DELETE FROM inventory WHERE inventory_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.json({
      message: "Inventory item deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res
      .status(500)
      .json({ error: "Failed to delete inventory item: " + error.message });
  }
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
      return { tassel_color: color.toLowerCase(), hood_color: color.toLowerCase() };
    }
  }

  // Default if no match is found
  return { tassel_color: "blue", hood_color: "blue" };
}

module.exports = router;
