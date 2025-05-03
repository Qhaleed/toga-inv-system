const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../database/db');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

// Registration Route
router.post('/', async (req, res) => {
    const { email, password, name, role = 'student' } = req.body;

    try {
        // Check if user already exists
        const [existingUsers] = await db.query(
            "SELECT * FROM accounts WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // In a real application, hash the password before storing it
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [result] = await db.query(
            "INSERT INTO accounts (email, password, name, role) VALUES (?, ?, ?, ?)",
            [email, password, name, role]
        );

        // Generate token for new user
        const token = jwt.sign({
            id: result.insertId,
            email,
            role
        }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({
            message: 'Account created successfully',
            token,
            role
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

module.exports = router;