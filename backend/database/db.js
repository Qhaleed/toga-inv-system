/**
 * Supabase Database Connection for Toga Inventory System
 * Replaces SQLite with cloud-hosted PostgreSQL
 */

const { createClient } = require('@supabase/supabase-js');

// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Supabase connection credentials
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  console.error('Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are set');
  // Don't exit in serverless - just log the error
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection on startup (only in development)
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    console.log('✅ Connected to Supabase database successfully');
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error.message);
    console.error('Please check your SUPABASE_URL and SUPABASE_ANON_KEY in .env');
  }
}

// Only test connection in development mode
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  testConnection();
}

// ============================================
// HELPER FUNCTIONS (maintain compatibility with existing code)
// ============================================

/**
 * Get accounts by email
 * Original: db.all("SELECT * FROM accounts WHERE email = ?", [email], callback)
 */
async function getTable(email, callback) {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('email', email);

    if (error) throw error;

    if (callback) callback(null, data);
    return Promise.resolve(data);
  } catch (error) {
    console.error('Database error in getTable:', error);
    if (callback) callback(error, null);
    return Promise.reject(error);
  }
}

/**
 * Register new user with automatic inventory creation
 * Creates account and initial inventory record
 */
async function registForm(
  { email, password, first_name, surname, middleInitial, idNumber, course },
  callback
) {
  try {
    const role = 'student';
    const status = 'pending';

    // Insert account
    const { data: accountData, error: accountError } = await supabase
      .from('accounts')
      .insert([
        {
          email,
          password,
          first_name,
          surname,
          middle_initial: middleInitial,
          id_number: idNumber,
          course,
          role,
          status,
        },
      ])
      .select()
      .single();

    if (accountError) throw accountError;

    const accountId = accountData.account_id;
    console.log('Successfully registered account with ID:', accountId);

    // Create initial inventory record
    const { data: inventoryData, error: inventoryError } = await supabase
      .from('inventory')
      .insert([
        {
          account_id: accountId,
          rent_date: new Date().toISOString().split('T')[0], // Current date
          return_status: 'Not Returned',
          payment_status: 'Unpaid',
          evaluation_status: 'Not Evaluated',
          is_overdue: 0,
        },
      ])
      .select()
      .single();

    if (inventoryError) throw inventoryError;

    const inventoryId = inventoryData.inventory_id;
    console.log('Successfully created inventory record with ID:', inventoryId);

    const result = {
      insertId: accountId,
      inventoryId: inventoryId,
    };

    if (callback) callback(null, result);
    return Promise.resolve(result);
  } catch (error) {
    console.error('Database error in registForm:', error);
    if (callback) callback(error);
    return Promise.reject(error);
  }
}

/**
 * Get all accounts with inventory data (LEFT JOIN)
 * Original: SELECT accounts.*, inventory.* FROM accounts LEFT JOIN inventory...
 */
async function getAllTable() {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select(`
        *,
        inventory (
          inventory_id,
          toga_size,
          tassel_color,
          hood_color,
          has_cap,
          rent_date,
          return_date,
          is_overdue,
          return_status,
          payment_status,
          evaluation_status,
          remarks,
          item_condition
        )
      `);

    if (error) throw error;

    // Flatten the nested structure to match SQLite format
    const flattened = data.flatMap(account => {
      if (account.inventory && account.inventory.length > 0) {
        return account.inventory.map(inv => ({
          ...account,
          inventory: undefined, // Remove nested array
          ...inv, // Spread inventory fields
        }));
      } else {
        // Account with no inventory
        return [{
          ...account,
          inventory: undefined,
          inventory_id: null,
          toga_size: null,
          tassel_color: null,
          hood_color: null,
          has_cap: null,
          rent_date: null,
          return_date: null,
          is_overdue: null,
          return_status: null,
          payment_status: null,
          evaluation_status: null,
          remarks: null,
          item_condition: null,
        }];
      }
    });

    return Promise.resolve(flattened);
  } catch (error) {
    console.error('Database error in getAllTable:', error);
    return Promise.reject(error);
  }
}

// ============================================
// COMPATIBILITY WRAPPER FOR EXISTING ROUTES
// Mimics SQLite db.all, db.run, db.get methods
// ============================================

const db = {
  /**
   * Execute SELECT query (returns multiple rows)
   * Usage: db.all("SELECT * FROM accounts", [], callback)
   */
  all: async (query, params, callback) => {
    try {
      // Parse table name from query
      const tableMatch = query.match(/FROM\s+(\w+)/i);
      if (!tableMatch) throw new Error('Could not parse table name from query');
      
      const tableName = tableMatch[1];
      
      // Build basic query
      let supabaseQuery = supabase.from(tableName).select('*');
      
      // Parse WHERE conditions (simple support)
      const whereMatch = query.match(/WHERE\s+(.+?)(?:ORDER|LIMIT|GROUP|$)/i);
      if (whereMatch && params.length > 0) {
        const whereClause = whereMatch[1].trim();
        
        // Handle simple equality conditions
        if (whereClause.includes('=') && !whereClause.includes('AND') && !whereClause.includes('OR')) {
          const [column] = whereClause.split('=').map(s => s.trim());
          supabaseQuery = supabaseQuery.eq(column, params[0]);
        }
      }
      
      const { data, error } = await supabaseQuery;
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      console.error('Error in db.all:', error);
      callback(error, null);
    }
  },

  /**
   * Execute INSERT/UPDATE/DELETE query
   * Usage: db.run("UPDATE accounts SET status = ? WHERE account_id = ?", [status, id], callback)
   */
  run: async (query, params, callback) => {
    try {
      const isInsert = query.match(/^INSERT/i);
      const isUpdate = query.match(/^UPDATE/i);
      const isDelete = query.match(/^DELETE/i);
      
      // Parse table name
      let tableMatch;
      if (isInsert) tableMatch = query.match(/INTO\s+(\w+)/i);
      else if (isUpdate) tableMatch = query.match(/UPDATE\s+(\w+)/i);
      else if (isDelete) tableMatch = query.match(/FROM\s+(\w+)/i);
      
      if (!tableMatch) throw new Error('Could not parse table name from query');
      const tableName = tableMatch[1];
      
      let result = { changes: 0, lastID: null };
      
      if (isInsert) {
        // Parse column names
        const columnsMatch = query.match(/\(([^)]+)\)/);
        const columns = columnsMatch ? columnsMatch[1].split(',').map(c => c.trim()) : [];
        
        const record = {};
        columns.forEach((col, index) => {
          record[col] = params[index];
        });
        
        const { data, error } = await supabase
          .from(tableName)
          .insert([record])
          .select();
        
        if (error) throw error;
        result = { 
          changes: data.length,
          lastID: data[0]?.id || data[0]?.account_id || data[0]?.inventory_id || data[0]?.evaluation_id
        };
      } else if (isUpdate) {
        // Parse SET clause
        const setMatch = query.match(/SET\s+(.+?)\s+WHERE/i);
        if (!setMatch) throw new Error('Could not parse SET clause');
        
        const sets = setMatch[1].split(',').map(s => s.trim());
        const updates = {};
        
        sets.forEach((set, index) => {
          const [column] = set.split('=').map(s => s.trim());
          updates[column] = params[index];
        });
        
        // Parse WHERE clause
        const whereMatch = query.match(/WHERE\s+(.+)$/i);
        if (!whereMatch) throw new Error('Could not parse WHERE clause');
        
        const [whereColumn] = whereMatch[1].split('=').map(s => s.trim());
        const whereValue = params[params.length - 1];
        
        const { data, error } = await supabase
          .from(tableName)
          .update(updates)
          .eq(whereColumn, whereValue)
          .select();
        
        if (error) throw error;
        result = { changes: data.length };
      } else if (isDelete) {
        // Parse WHERE clause
        const whereMatch = query.match(/WHERE\s+(.+)$/i);
        if (!whereMatch) throw new Error('Could not parse WHERE clause');
        
        const [whereColumn] = whereMatch[1].split('=').map(s => s.trim());
        const whereValue = params[0];
        
        const { data, error } = await supabase
          .from(tableName)
          .delete()
          .eq(whereColumn, whereValue)
          .select();
        
        if (error) throw error;
        result = { changes: data.length };
      }
      
      if (callback) callback.call(result, null);
    } catch (error) {
      console.error('Error in db.run:', error);
      if (callback) callback.call({ changes: 0 }, error);
    }
  },

  /**
   * Execute SELECT query (returns single row)
   * Usage: db.get("SELECT * FROM accounts WHERE account_id = ?", [id], callback)
   */
  get: async (query, params, callback) => {
    try {
      // Use db.all and return first row
      db.all(query, params, (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows && rows.length > 0 ? rows[0] : null);
      });
    } catch (error) {
      console.error('Error in db.get:', error);
      callback(error, null);
    }
  },
};

module.exports = {
  supabase,    // Direct Supabase client for advanced queries
  db,          // Compatibility wrapper for existing routes
  getTable,    // Helper function
  registForm,  // Helper function
  getAllTable, // Helper function
};
