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

module.exports = pool;