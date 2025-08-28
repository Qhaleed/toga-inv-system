const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Use local SQLite database file
const dbPath = path.resolve(__dirname, "db.sqlite3");

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite database:", err);
  } else {
    console.log("Connected to local SQLite database.");
    // Initialize database with schema
    initializeDatabase();
  }
});

// Initialize database with schema
function initializeDatabase() {
  const schemaPath = path.resolve(__dirname, "db.sql");
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, "utf8");
    db.exec(schema, (err) => {
      if (err) {
        console.error("Error initializing database schema:", err);
      } else {
        console.log("Database schema initialized successfully.");
      }
    });
  }
}

// Get accounts by email
function getTable(email, callback) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM accounts WHERE email = ?", [email], (err, rows) => {
      if (err) {
        console.error("Database error in getTable:", err);
        if (callback) callback(err, null);
        reject(err);
      } else {
        if (callback) callback(null, rows);
        resolve(rows);
      }
    });
  });
}

// Register new user
function registForm(
  { email, password, first_name, surname, middleInitial, idNumber, course },
  callback
) {
  return new Promise((resolve, reject) => {
    const role = "student";
    const status = "pending"; // Set as pending so admin can review and approve

    // Start a transaction to ensure data integrity
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      db.run(
        `INSERT INTO accounts (email, password, first_name, surname, middle_initial, id_number, course, role, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          email,
          password,
          first_name,
          surname,
          middleInitial,
          idNumber,
          course,
          role,
          status,
        ],
        function (err) {
          if (err) {
            console.error("Database error in registForm:", err);
            db.run("ROLLBACK");
            if (callback) callback(err);
            reject(err);
          } else {
            const accountId = this.lastID;
            console.log("Successfully registered account with ID:", accountId);

            // Create initial inventory record with auto-increment inventory_id
            db.run(
              `INSERT INTO inventory (account_id, rent_date, return_status, payment_status, evaluation_status, is_overdue) 
               VALUES (?, date('now'), 'Not Returned', 'Unpaid', 'Not Evaluated', 0)`,
              [accountId],
              function (inventoryErr) {
                if (inventoryErr) {
                  console.error(
                    "Error creating inventory record:",
                    inventoryErr
                  );
                  db.run("ROLLBACK");
                  if (callback) callback(inventoryErr);
                  reject(inventoryErr);
                } else {
                  const inventoryId = this.lastID;
                  console.log(
                    "Successfully created inventory record with ID:",
                    inventoryId
                  );
                  db.run("COMMIT");

                  const result = {
                    insertId: accountId,
                    inventoryId: inventoryId,
                  };
                  if (callback) callback(null, result);
                  resolve(result);
                }
              }
            );
          }
        }
      );
    });
  });
}

// Get all accounts with inventory data
function getAllTable() {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT 
        accounts.*,
        inventory.inventory_id,
        inventory.toga_size,
        inventory.tassel_color,
        inventory.hood_color,
        inventory.has_cap,
        inventory.rent_date,
        inventory.return_date,
        inventory.is_overdue,
        inventory.return_status,
        inventory.payment_status,
        inventory.evaluation_status,
        inventory.remarks,
        inventory.item_condition
      FROM accounts 
      LEFT JOIN inventory ON accounts.account_id = inventory.account_id
    `,
      [],
      (err, rows) => {
        if (err) {
          console.error("Database error in getAllTable:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

module.exports = {
  db,
  getTable,
  registForm,
  getAllTable,
};
