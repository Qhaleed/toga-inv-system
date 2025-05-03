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
    // Query the database for the user with the provided email
    const [users] = await db.query("SELECT * FROM accounts WHERE email = ?", [
      email,
    ]);

    // Check if user exists
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // Check if password matches
    // Note: In a production app, passwords should be hashed
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Determine role based on the role field in your accounts table
    const role = user.role || "student"; // Default to student if no role specified

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send response with token and user role
    res.json({
      token,
      role,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || user.username, // Send back name if available
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during authentication" });
  }
});

// Route to verify token and get user info (useful for persistent login)
router.get("/verify-token", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Get fresh user data from database
    const [users] = await db.query(
      "SELECT id, email, name, role FROM accounts WHERE id = ?",
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: users[0],
      role: users[0].role,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
