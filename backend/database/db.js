const dotenv = require("dotenv");
const mysql = require("mysql2/promise"); // use mysql2, not sqlite3

dotenv.config();

// Create a pool connection to MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "TogaInventory", // point to your schema
  port: process.env.DB_PORT || 3306,
});

// Example function using MySQL (Promise-based)
async function getTable(email) {
  try {
    const [rows] = await pool.query("SELECT * FROM accounts WHERE email = ?", [
      email,
    ]);
    return rows;
  } catch (err) {
    console.error("Database error in getTable:", err);
    throw err;
  }
}

async function registForm({
  email,
  password,
  first_name,
  surname,
  middleInitial,
  idNumber,
  course,
}) {
  const role = "student";
  try {
    const [result] = await pool.query(
      `INSERT INTO accounts (email, password, first_name, surname, middle_initial, id_number, course, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        password,
        first_name,
        surname,
        middleInitial,
        idNumber,
        course,
        role,
      ]
    );
    console.log("Successfully registered");
    return result.insertId;
  } catch (err) {
    console.error("Database error in registForm:", err);
    throw err;
  }
}

module.exports = {
  pool,
  getTable,
  registForm,
};
