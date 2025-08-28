CREATE DATABASE TogaInventory;

USE TogaInventory;

-- create accounts table
CREATE TABLE accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    middle_initial VARCHAR(5),
    id_number VARCHAR(50),
    course VARCHAR(100),
    role ENUM('admin', 'student') DEFAULT 'student',
    status ENUM(
        'pending',
        'approved',
        'rejected'
    ) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create inventory table

CREATE TABLE inventory (
    inventory_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT,
    toga_size ENUM(
        'XS',
        'S',
        'M',
        'L',
        'XL',
        '2XL',
        '3XL'
    ),
    tassel_color VARCHAR(50),
    hood_color VARCHAR(50),
    has_cap BOOLEAN DEFAULT 1,
    rent_date DATE,
    return_date DATE,
    is_overdue BOOLEAN DEFAULT 0,
    return_status ENUM(
        'Returned',
        'Not Returned',
        'Missing'
    ) DEFAULT 'Not Returned',
    payment_status ENUM('Paid', 'Unpaid') DEFAULT 'Unpaid',
    evaluation_status ENUM('Evaluated', 'Not Evaluated') DEFAULT 'Not Evaluated',
    remarks TEXT,
    item_condition VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts (account_id)
);

-- create evaluation table

CREATE TABLE evaluation (
    evaluation_id INT PRIMARY KEY AUTO_INCREMENT,
    inventory_id INT,
    -- Gown evaluation fields
    gown_condition VARCHAR(50),
    gown_repair TEXT,
    gown_damage TEXT,
    gown_remarks TEXT,
    -- Hood evaluation fields
    hood_condition VARCHAR(50),
    hood_repair TEXT,
    hood_damage TEXT,
    hood_remarks TEXT,
    -- Tassel evaluation fields
    tassel_condition VARCHAR(50),
    tassel_missing BOOLEAN,
    tassel_damage TEXT,
    tassel_remarks TEXT,
    -- Cap evaluation fields
    cap_condition VARCHAR(50),
    cap_deform TEXT,
    cap_remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inventory_id) REFERENCES inventory (inventory_id)
);

-- create items table

CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_type ENUM(
        'cap',
        'tassel',
        'gown',
        'hood'
    ) NOT NULL,
    variant VARCHAR(100), -- Size for gown/cap, Color for tassel/hood
    quantity INT DEFAULT 0,
    item_status ENUM(
        'In Good Condition',
        'For Repair',
        'Damaged'
    ) DEFAULT 'In Good Condition',
    return_status ENUM(
        'Returned',
        'Not Returned',
        'Missing'
    ) DEFAULT 'Returned',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
    items (
        item_type,
        variant,
        quantity,
        item_status,
        return_status
    )
VALUES (
        'cap',
        'M',
        50,
        'In Good Condition',
        'Returned'
    ),
    (
        'cap',
        'L',
        30,
        'Damaged',
        'Not Returned'
    ),
    (
        'tassel',
        'Red',
        100,
        'In Good Condition',
        'Returned'
    ),
    (
        'tassel',
        'Blue',
        80,
        'For Repair',
        'Returned'
    ),
    (
        'gown',
        'Small',
        40,
        'In Good Condition',
        'Returned'
    ),
    (
        'gown',
        'Medium',
        60,
        'For Repair',
        'Not Returned'
    ),
    (
        'hood',
        'Black',
        25,
        'Damaged',
        'Missing'
    ),
    (
        'hood',
        'White',
        10,
        'In Good Condition',
        'Returned'
    );
-- add sample admin account
INSERT INTO
    accounts (
        email,
        password,
        first_name,
        surname,
        middle_initial,
        id_number,
        course,
        role
    )
VALUES (
        'admin123@gmail.com',
        'password123',
        'System',
        'Admin',
        'A',
        'ADM001',
        'N/A',
        'admin'
    ),
    (
        'admin@toga.edu',
        'admin2024',
        'System',
        'Admin',
        'B',
        'ADM002',
        'N/A',
        'admin'
    );

-- add sample student accounts
INSERT INTO
    accounts (
        email,
        password,
        first_name,
        surname,
        middle_initial,
        id_number,
        course,
        role
    )
VALUES (
        'student1@toga.edu',
        'student123',
        'Juan',
        'Dela Cruz',
        'M',
        'STU001',
        'BSIT',
        'student'
    ),
    (
        'student2@toga.edu',
        'student456',
        'Maria',
        'Reyes',
        'L',
        'STU002',
        'BSCS',
        'student'
    );