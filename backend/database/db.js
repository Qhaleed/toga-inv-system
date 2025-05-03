const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Railway.app specific connection handling
const connectionConfig = process.env.DATABASE_URL
    ? {
        // If DATABASE_URL is provided (Railway standard), use that
        uri: process.env.DATABASE_URL,
    }
    : {
        // Otherwise use individual connection parameters
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };

// Create the connection pool
const pool = mysql.createPool({
    ...connectionConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
});

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        // connection.release();
        console.log()
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

testConnection();

async function getTable(email) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM accounts WHERE email = ?`, 
            [email]
        );
        return rows;
    } catch (err) {
        console.error('Database error in getTable:', err);
    }
}

/*
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    surname: "",
    middleInitial: "",
    idNumber: "",
    idImage: [],
    course: "",
*/

async function registForm({ email, password, first_name, surname, middleInitial, idNumber, course }) {
    const role = 'student'; // default role in registration
    try {
        await pool.query(
            `INSERT INTO accounts (email, password, first_name, surname, id_number, middle_initial, course, role)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [email, password, first_name, surname, middleInitial, idNumber, course, role]
        );
        console.log('Successfully registered')
    } catch (err) {
        console.error('Database error in registForm:', err);
    }
}


module.exports = {
    registForm,
    getTable,
    pool  // ← export the pool directly
};