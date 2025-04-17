// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;
console.log('SECRET_KEY:', SECRET_KEY);
// Temporary key
const hardcodedEmail = "admin123@gmail.com";
const hardcodedPassword = "password123";

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email !== hardcodedEmail || password !== hardcodedPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Protected routed 
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});


app.get('/', (req, res) => {
    res.json({ message: `Backend in running ,SECRET_KEY:  ${SECRET_KEY}` });

})

app.get('/api', (req, res) => {
    res.json({ message: `real shi api` });

})
// Middleware to verify token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(5000, () => console.log('Server running on port 5000'));
