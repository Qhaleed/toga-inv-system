const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRouter = require('./routes/users');
const evaluationRoute = require('./routes/evaluation');
const invenRoute = require('./routes/inventory');
const authRoute = require('./routes/auth');

app.use('/users', userRouter);
app.use('/evaluation', evaluationRoute);
app.use('/inventory', invenRoute);
app.use('/auth', authRoute);

// Root Test
app.get('/', (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
