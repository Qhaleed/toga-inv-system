// API base URL
const API_BASE_URL = 'http://localhost:5001';

// Generic fetch function with error handling
export const fetchAPI = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// API Functions
export const inventoryAPI = {
  getAll: () => fetchAPI('/inventory'),
  search: (searchTerm) => fetchAPI(`/search?search=${encodeURIComponent(searchTerm)}`),
};

export const accountsAPI = {
  getAll: () => fetchAPI('/accounts'),
};

export const itemsAPI = {
  getAll: () => fetchAPI('/items'),
};

export const evaluationAPI = {
  getAll: () => fetchAPI('/evaluation'),
};

export const statusesAPI = {
  getAll: () => fetchAPI('/statuses'),
};
