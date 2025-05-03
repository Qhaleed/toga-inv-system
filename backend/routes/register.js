const express = require('express');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../database/db');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

// Registration route
router.post('/', async (req, res) => {
    const {
        email,
        password,
        first_name,
        surname,
        middleInitial,
        idNumber,
        course,
        role = 'student'
    } = req.body;

    try {


        // check if the email exists
        const existingUsers = await db.getTable(email);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // password hash
        //const hashedPass = await bcrypt.hash(password, 10);

        // Insert new values in accounts table
        const result = await db.registForm({ //registForm({ email, password, first_name, surname, middleInitial, idNumber, course })
            email, 
            password, 
            first_name,
            surname,  
            middleInitial,
            idNumber, 
            course
        });
        console.log('Registration successful');

        const token = jwt.sign(
            {
                id: result.insertId,
                email,
                role
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

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