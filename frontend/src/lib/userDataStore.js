// userDataStore.js
// Centralized dynamic array for user info, to be used for dashboard search/filter
import { useState } from "react";

// Singleton pattern for user data array
let userDataArray = [];

export function setUserDataArray(data) {
  userDataArray = data;
}

export function getUserDataArray() {
  return userDataArray;
}

// React hook for components to use and update user data array
export function useUserDataArray() {
  const [userData, setUserData] = useState(userDataArray);
  // Optionally, sync with global array if needed
  return [userData, setUserData];
}
