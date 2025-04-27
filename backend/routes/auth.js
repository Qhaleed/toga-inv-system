const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

//account storage (will convert to db)
const adminAccounts = [
    { email: "admin123@gmail.com", password: "password123" },
    { email: "admin@toga.edu", password: "admin2024" }
];

const studentAccounts = [
    { email: "student1@toga.edu", password: "student123" },
    { email: "student2@toga.edu", password: "student456" }
];

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const adminUser = adminAccounts.find(user => user.email === email && user.password === password);
    const studentUser = studentAccounts.find(user => user.email === email && user.password === password);

    if (!adminUser && !studentUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const role = adminUser ? 'admin' : 'student';
    const token = jwt.sign({ email, role }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, role });
});

module.exports = router;
