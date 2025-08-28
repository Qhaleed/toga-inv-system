const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "db.sqlite3");
const db = new sqlite3.Database(dbPath);

// Create tables and insert sample data
db.serialize(() => {
  // Create accounts table
  db.run(`CREATE TABLE IF NOT EXISTS accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    surname TEXT NOT NULL,
    middle_initial TEXT,
    id_number TEXT,
    course TEXT,
    role TEXT DEFAULT 'student',
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create inventory table
  db.run(`CREATE TABLE IF NOT EXISTS inventory (
    inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER,
    toga_size TEXT,
    tassel_color TEXT,
    hood_color TEXT,
    has_cap INTEGER DEFAULT 1,
    rent_date DATE,
    return_date DATE,
    is_overdue INTEGER DEFAULT 0,
    return_status TEXT DEFAULT 'Not Returned',
    payment_status TEXT DEFAULT 'Unpaid',
    evaluation_status TEXT DEFAULT 'Not Evaluated',
    remarks TEXT,
    item_condition TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts (account_id)
  )`);

  // Create evaluation table
  db.run(`CREATE TABLE IF NOT EXISTS evaluation (
    evaluation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    inventory_id INTEGER,
    gown_condition TEXT,
    gown_repair TEXT,
    gown_damage TEXT,
    gown_remarks TEXT,
    hood_condition TEXT,
    hood_repair TEXT,
    hood_damage TEXT,
    hood_remarks TEXT,
    tassel_condition TEXT,
    tassel_missing INTEGER,
    tassel_damage TEXT,
    tassel_remarks TEXT,
    cap_condition TEXT,
    cap_deform TEXT,
    cap_remarks TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inventory_id) REFERENCES inventory (inventory_id)
  )`);

  // Create items table
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_type TEXT NOT NULL,
    variant TEXT,
    quantity INTEGER DEFAULT 0,
    item_status TEXT DEFAULT 'In Good Condition',
    return_status TEXT DEFAULT 'Returned',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert sample accounts
  const accounts = [
    [
      "admin123@gmail.com",
      "password123",
      "System",
      "Admin",
      "A",
      "ADM001",
      "N/A",
      "admin",
    ],
    [
      "admin@toga.edu",
      "admin2024",
      "System",
      "Admin",
      "B",
      "ADM002",
      "N/A",
      "admin",
    ],
    [
      "student1@toga.edu",
      "student123",
      "Juan",
      "Dela Cruz",
      "M",
      "STU001",
      "BSIT",
      "student",
    ],
    [
      "student2@toga.edu",
      "student456",
      "Maria",
      "Reyes",
      "L",
      "STU002",
      "BSCS",
      "student",
    ],
  ];

  accounts.forEach((account) => {
    db.run(
      `INSERT OR IGNORE INTO accounts (email, password, first_name, surname, middle_initial, id_number, course, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      account
    );
  });

  // Insert sample items
  const items = [
    ["cap", "M", 50, "In Good Condition", "Returned"],
    ["cap", "L", 30, "Damaged", "Not Returned"],
    ["tassel", "Red", 100, "In Good Condition", "Returned"],
    ["tassel", "Blue", 80, "For Repair", "Returned"],
    ["gown", "Small", 40, "In Good Condition", "Returned"],
    ["gown", "Medium", 60, "For Repair", "Not Returned"],
    ["hood", "Black", 25, "Damaged", "Missing"],
    ["hood", "White", 10, "In Good Condition", "Returned"],
  ];

  items.forEach((item) => {
    db.run(
      `INSERT OR IGNORE INTO items (item_type, variant, quantity, item_status, return_status)
       VALUES (?, ?, ?, ?, ?)`,
      item
    );
  });

  console.log("Database initialized with sample data!");
});

db.close();
