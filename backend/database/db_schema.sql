-- Toga Inventory System Database Schema
-- Generated on 2025-08-29
-- SQLite database structure with auto-increment IDs and foreign keys

-- Student/Admin accounts table
-- Tracks user registration, status changes with timestamps
CREATE TABLE accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT, -- Auto-generated user ID
    email TEXT UNIQUE NOT NULL, -- Unique login email
    password TEXT NOT NULL, -- Hashed password
    first_name TEXT NOT NULL, -- User first name
    surname TEXT NOT NULL, -- User last name
    middle_initial TEXT, -- Optional middle initial
    id_number TEXT, -- Student ID number
    course TEXT, -- Academic course/program
    role TEXT DEFAULT 'student', -- 'student' or 'admin'
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Account creation timestamp
    updated_at DATETIME -- Last status change timestamp
);

-- Auto-increment sequence table (SQLite internal)
CREATE TABLE sqlite_sequence (name, seq);

-- Toga rental inventory tracking table
-- Links to accounts, tracks sizes, colors, rental status
CREATE TABLE inventory (
    inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, -- Auto-generated inventory ID
    account_id INTEGER, -- Foreign key to accounts table
    toga_size TEXT, -- 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'
    tassel_color TEXT, -- Color based on course
    hood_color TEXT, -- Color based on course  
    has_cap INTEGER DEFAULT 1, -- 1 = yes, 0 = no
    rent_date DATE, -- Date toga was rented
    return_date DATE, -- Date toga was returned
    is_overdue INTEGER DEFAULT 0, -- 1 = overdue, 0 = not overdue
    return_status TEXT DEFAULT 'Not Returned', -- 'Not Returned', 'Returned', 'Returned with Issues'
    payment_status TEXT DEFAULT 'Unpaid', -- 'Paid', 'Unpaid'
    evaluation_status TEXT DEFAULT 'Not Evaluated', -- 'Not Evaluated', 'Completed', 'Evaluated'
    remarks TEXT, -- Additional notes
    item_condition TEXT, -- Condition after evaluation
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Last modification timestamp
    FOREIGN KEY (account_id) REFERENCES accounts (account_id)
);

-- Toga condition evaluation tracking table
-- Detailed evaluation of returned toga items
CREATE TABLE evaluation (
    evaluation_id INTEGER PRIMARY KEY AUTOINCREMENT, -- Auto-generated evaluation ID
    inventory_id INTEGER, -- Foreign key to inventory table
    -- Gown evaluation fields
    gown_condition TEXT, -- Overall gown condition
    gown_repair TEXT, -- Required repairs
    gown_damage TEXT, -- Damage description
    gown_remarks TEXT, -- Gown-specific notes
    -- Hood evaluation fields  
    hood_condition TEXT, -- Overall hood condition
    hood_repair TEXT, -- Required repairs
    hood_damage TEXT, -- Damage description
    hood_remarks TEXT, -- Hood-specific notes
    -- Tassel evaluation fields
    tassel_condition TEXT, -- Overall tassel condition
    tassel_missing INTEGER, -- 1 = missing, 0 = present
    tassel_damage TEXT, -- Damage description
    tassel_remarks TEXT, -- Tassel-specific notes
    -- Cap evaluation fields
    cap_condition TEXT, -- Overall cap condition
    cap_repair TEXT, -- Required repairs
    cap_damage TEXT, -- Damage description
    cap_remarks TEXT, -- Cap-specific notes
    -- Overall evaluation summary
    overall_condition TEXT, -- 'Good', 'Fair', 'Poor', 'Damaged'
    replacement_needed INTEGER DEFAULT 0, -- 1 = needs replacement, 0 = reusable
    total_damage_cost DECIMAL(10, 2) DEFAULT 0.00, -- Cost of damages
    evaluator_notes TEXT, -- General evaluator comments
    evaluated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Evaluation timestamp
    evaluated_by TEXT, -- Staff member who evaluated
    FOREIGN KEY (inventory_id) REFERENCES inventory (inventory_id)
);

-- Physical toga items inventory table
-- Tracks individual physical toga pieces and their status
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Auto-generated item ID
    item_type TEXT NOT NULL, -- 'gown', 'hood', 'tassel', 'cap'
    size TEXT, -- Size for gowns, null for accessories
    color TEXT, -- Item color
    condition_status TEXT DEFAULT 'Available', -- 'Available', 'Rented', 'Damaged', 'Lost'
    last_rental_date DATE, -- Last time item was rented
    times_rented INTEGER DEFAULT 0, -- Usage count
    damage_history TEXT, -- Historical damage notes
    purchase_date DATE, -- When item was acquired
    replacement_cost DECIMAL(10, 2), -- Cost to replace item
    notes TEXT, -- Additional item notes
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Item creation timestamp
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP -- Last modification timestamp
);