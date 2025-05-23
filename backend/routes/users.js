const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../database/db");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// binago ko to here para mastore na yung token sa local storage for the user display sa sidebar-clyde
router.get("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const [users] = await db.pool.query(
      "SELECT * FROM accounts WHERE account_id = ?",
      [decoded.id]
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // added firstname query for user side display
    const user = users[0];
    const firstOnly = req.query.firstOnly === "true";

    if (firstOnly) {
      res.json({
        first_name: user.first_name,
      });
    } else {
      res.json({
        first_name: user.first_name,
        middle_initial: user.middle_initial,
        surname: user.surname,
        id_number: user.id_number,
        course: user.course,
        role: user.role,
        status: user.status, // include status in full user response
        account_id: user.account_id
      });
    }
  } catch (err) {
    return res.status(401).json({
      error:
        "di ka logged in && dapat naka protected route para 'di magexist error",
    });
  }
});

module.exports = router;
