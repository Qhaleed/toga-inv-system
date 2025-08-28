const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../database/db");

// Use a local secret key for JWT (no need for .env)
const SECRET_KEY = "your-local-secret-key-12345";

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email using SQLite
  db.db.all("SELECT * FROM accounts WHERE email = ?", [email], (err, users) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Server error during login" });
    }

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
  });
});

module.exports = router;
