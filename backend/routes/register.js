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
        confirmPassword,
        first_name,
        surname,
        idNumber,
        middleInitial,
        course,
        role = 'student'
    } = req.body;

    try {
        // check if the email exists
        const existingUsers = await db.getTable(email);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        //check if email ends with adzu.edu.ph
        const adzuEmail = /^[a-zA-Z0-9._%+-]+@adzu\.edu\.ph$/;
        if (!email || !adzuEmail.test(email)) {
            return res.status(400).json({ message: 'Invalid ADZU email address' });
        }
        
        // password hash
        //const hashedPass = await bcrypt.hash(password, 10);

        //check if password > 8 letters
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }
        
        if (!email || !email.endsWith('@adzu.edu.ph')) {
            return res.status(400).json({ message: 'Email must end with @adzu.edu.ph' });
        }

        //check if both password are correct
        if (password != confirmPassword) {
            return res.status(400).json({ message: 'Password is not matched' });
        }

        //convert first letter of the names to Capital Letters (including m.i.)
        function checkWord(input) { 
            if (!input) return '';
            return input
                .trim()
                .split(/\s+/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        


        // Insert new values in accounts table
        const result = await db.registForm({ //email, password, first_name, surname, middleInitial, idNumber, course
            email, 
            password, 
            first_name: checkWord(first_name),
            surname: checkWord(surname),
            middleInitial: checkWord(middleInitial), 
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