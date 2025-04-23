// server.js
const express = require('express');
const app = express();

app.listen(5001, () => console.log('Server running on port 5001'));

const userRouter = require('./routes/users');
app.use('/users', userRouter);


const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;
// console.log('SECRET_KEY:', SECRET_KEY);


// Arrays for admin and student accounts
const adminAccounts = [
    { email: "admin123@gmail.com", password: "password123" },
    { email: "admin@toga.edu", password: "admin2024" }
];

const studentAccounts = [
    { email: "student1@toga.edu", password: "student123" },
    { email: "student2@toga.edu", password: "student456" }
];

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the credentials match an admin account
    const adminUser = adminAccounts.find(
        admin => admin.email === email && admin.password === password
    );

    // Check if the credentials match a student account
    const studentUser = studentAccounts.find(
        student => student.email === email && student.password === password
    );

    // If neither admin nor student credentials match
    if (!adminUser && !studentUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Determine role based on which array contained the user
    const role = adminUser ? 'admin' : 'student';

    // Include role in the JWT token
    const token = jwt.sign({ email, role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, role });
});

// Protected routed 
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});



app.get('/', (req, res) => {
    res.send("Hello niga, backend is running")
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

// Middleware for role-based access control
function checkRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }
        next();
    };
}

// Example of protected routes with role-based access
app.get('/admin-only', verifyToken, checkRole('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin area', user: req.user });
});

app.get('/student-only', verifyToken, checkRole('student'), (req, res) => {
    res.json({ message: 'Welcome to the student area', user: req.user });
});

