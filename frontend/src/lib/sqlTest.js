// Temporary file to test SQL-related API calls from the frontend
// Usage: import and call these functions in your components

// Example: Fetch all accounts
export async function fetchAccounts() {
  const response = await fetch("http://localhost:5001/accounts");
  if (!response.ok) throw new Error("Failed to fetch accounts");
  return response.json();
}

// Example: Update account status
export async function updateAccountStatus(accountId, status) {
  const response = await fetch(`http://localhost:5001/accounts/${accountId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update account status");
  return response.json();
}

// Example: Fetch all items
export async function fetchItems() {
  const response = await fetch("http://localhost:5001/statuses");
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
}

// Add more functions as needed for other endpoints

// Login function (matches backend routing)
export async function login(email, password) {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

// Example usage for login function
// You can use this in your component or directly for testing
async function testLogin() {
  // Use a valid account from your database
  const email = "admin123@gmail.com";
  const password = "password123";
  try {
    const result = await login(email, password);
    console.log("Login result:", result);
    // You can handle token, user info, etc. here
  } catch (error) {
    console.error("Login error:", error);
  }
}
// Uncomment below to test directly
// testLogin();
