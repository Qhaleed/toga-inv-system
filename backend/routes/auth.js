const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../database/db");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const [users] = await db.pool.query(
      "SELECT * FROM accounts WHERE email = ?",
      [email]
    );
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = users[0];
    // In a real app, compare hashed passwords
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.account_id,
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
