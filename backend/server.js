const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database/db.js');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRouter = require('./routes/users');
const evaluationRoute = require('./routes/evaluation');
const invenRoute = require('./routes/inventory');
const authRoute = require('./routes/auth');
const registerRoute = require('./routes/register');

// Routes for db
const accountsRoute = require('./routes/accounts');

app.use('/users', userRouter);
app.use('/evaluation', evaluationRoute);
app.use('/inventory', invenRoute);
app.use('/auth', authRoute);
app.use('/register', registerRoute);
app.use('/accounts', accountsRoute);

// Root Test
app.get('/', (req, res) => {
    res.send("Backend is running");
});

// DB test
app.get('/dashboard', async (req, res) => {
    try {
        const [rows] = await db.pool.query("SELECT * FROM dashboard");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching dashboard data");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));