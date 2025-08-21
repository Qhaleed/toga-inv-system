const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

// Railway.app specific connection handling
const connectionConfig = {
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
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful");
    // connection.release();
    console.log();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testConnection();

async function getTable(email) {
  try {
    const [rows] = await pool.query(`SELECT * FROM accounts WHERE email = ?`, [
      email,
    ]);
    return rows;
  } catch (err) {
    console.error("Database error in getTable:", err);
  }
}
//insert data in registration table
async function registForm({
  email,
  password,
  first_name,
  surname,
  middleInitial,
  idNumber,
  course,
}) {
  const role = "student"; // default role in registration
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
    return result;
  } catch (err) {
    console.error("Database error in registForm:", err);
  }
}

//insert data in evaluation table
async function evalForm({
  inventory_id,
  gown_condition,
  gown_repair,
  gown_damage,
  gown_remarks,
  hood_condition,
  hood_repair,
  hood_damage,
  hood_remarks,
  tassel_condition,
  tassel_missing,
  tassel_damage,
  tassel_remarks,
  cap_condition,
  cap_deform,
  cap_remarks,
}) {
  try {
    const [result] = await pool.query(
      `INSERT INTO evaluation (
                inventory_id,
                gown_condition, gown_repair, gown_damage, gown_remarks,
                hood_condition, hood_repair, hood_damage, hood_remarks,
                tassel_condition, tassel_missing, tassel_damage, tassel_remarks,
                cap_condition, cap_deform, cap_remarks
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        inventory_id,
        gown_condition,
        gown_repair,
        gown_damage,
        gown_remarks,
        hood_condition,
        hood_repair,
        hood_damage,
        hood_remarks,
        tassel_condition,
        tassel_missing,
        tassel_damage,
        tassel_remarks,
        cap_condition,
        cap_deform,
        cap_remarks,
      ]
    );
    console.log("Successfully evaluated");
    return result;
  } catch (err) {
    console.error("Database error in EvalForm:", err);
  }
}

//used JOIN in inventory and evaluation table and get necessary info only
async function fullEvaluationPage() {
  try {
    //i = inventory e = evaluation (column names btw)
    const [result] = await pool.query(`
        SELECT 
          i.inventory_id, i.renters_name, i.course,
          i.toga_size,i.tassel_color, i.hood_color, i.has_cap,
          i.rent_date,i.return_date,i.is_overdue,i.return_status,
          i.payment_status,i.evaluation_status,i.updated_at,
  
          e.gown_condition, e.gown_repair, e.gown_damage, e.gown_remarks,
          e.hood_condition, e.hood_repair, e.hood_damage, e.hood_remarks,
          e.tassel_condition, e.tassel_missing, e.tassel_damage, e.tassel_remarks,
          e.cap_condition, e.cap_deform, e.cap_remarks

        FROM inventory i
        LEFT JOIN evaluation e ON i.inventory_id = e.inventory_id
      `);
    console.log("Full evaluation data fetched");
    return result;
  } catch (err) {
    console.error("Error in fullEvaluationPage:", err);
  }
}

async function evalPage() {
  try {
    const [result] = await pool.query(`SELECT * FROM evaluation`);
    return result;
  } catch (error) {
    console.log("error in getting evaluation table", error);
  }
}

async function updateEval(
  inventory_id,
  gown_condition,
  gown_repair,
  gown_damage,
  gown_remarks,
  hood_condition,
  hood_repair,
  hood_damage,
  hood_remarks,
  tassel_condition,
  tassel_missing,
  tassel_damage,
  tassel_remarks,
  cap_condition,
  cap_deform,
  cap_remarks
) {
  try {
    const [result] = await pool.query(
      `UPDATE evaluation SET
          gown_condition = ?,
          gown_repair = ?,
          gown_damage = ?,
          gown_remarks = ?,
          
          hood_condition = ?,
          hood_repair = ?,
          hood_damage = ?,
          hood_remarks = ?,
  
          tassel_condition = ?,
          tassel_missing = ?,
          tassel_damage = ?,
          tassel_remarks = ?,
  
          cap_condition = ?,
          cap_deform = ?,
          cap_remarks = ?
        WHERE inventory_id = ?`,
      [
        gown_condition,
        gown_repair,
        gown_damage,
        gown_remarks,
        hood_condition,
        hood_repair,
        hood_damage,
        hood_remarks,
        tassel_condition,
        tassel_missing,
        tassel_damage,
        tassel_remarks,
        cap_condition,
        cap_deform,
        cap_remarks,
        inventory_id,
      ]
    );

    return result;
  } catch (error) {
    console.error("Error updating evaluation:", error);
    throw error;
  }
}

async function getAllTable() {
  try {
    const [result] = await pool.query(`
          SELECT 
            a.account_id,
            a.first_name,
            a.surname,
            a.middle_initial,
            a.id_number,
            a.course,
            a.role,
            a.status,
            
            i.inventory_id,
            i.toga_size,
            i.tassel_color,
            i.hood_color,
            i.has_cap,
            i.rent_date,
            i.is_overdue,
            i.return_status,
            i.payment_status,
            i.evaluation_status,
            i.updated_at,

            e.evaluation_id,
            e.gown_condition,
            e.gown_repair,
            e.gown_damage,
            e.gown_remarks,
            e.hood_condition,
            e.hood_repair,
            e.hood_damage,
            e.hood_remarks,
            e.tassel_condition,
            e.tassel_missing,
            e.tassel_damage,
            e.tassel_remarks,
            e.cap_condition,
            e.cap_deform,
            e.cap_remarks

          FROM accounts a
          LEFT JOIN inventory i ON a.account_id = i.account_id
          LEFT JOIN evaluation e ON i.inventory_id = e.inventory_id;
          `);
    return result;
  } catch (err) {
    console.error("Database error in getAllTable:", err);
  }
}

async function updateEvaluationStatus(inventory_id, evaluation_status) {
  try {
    const [result] = await pool.query(
      `UPDATE inventory SET evaluation_status = ? WHERE inventory_id = ?`,
      [evaluation_status, inventory_id]
    );
    return result;
  } catch (err) {
    console.error("Database error in updateEvaluationStatus:", err);
  }
}

async function updateInventoryStatus(inventory_id, status) {
  try {
    const [result] = await pool.query(
      `UPDATE inventory SET status = ? WHERE inventory_id = ?`,
      [status, inventory_id]
    );
    return result;
  } catch (err) {
    console.error("Database error in updateInventoryStatus:", err);
    throw err;
  }
}

module.exports = {
  pool,
  getTable,
  registForm,
  evalForm,
  fullEvaluationPage,
  evalPage,
  updateEval,
  getAllTable,
  updateEvaluationStatus,
  updateInventoryStatus,
};
