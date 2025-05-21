import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.exp) return true;

    // Get expiration time and current time in seconds
    const exp = payload.exp * 1000; // Convert to milliseconds
    const now = Date.now();

    return now >= exp;
  } catch (e) {
    console.log(e)
    return true;
  }
}

export async function handleApiRequest(url, options = {}) {
  const token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    // Clear all auth related data
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");

    // Redirect to login
    window.location.href = "/";
    return null;
  }

  // Add token to headers if it exists
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, options);

    // If we get a 401 Unauthorized response, token is invalid or expired
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      window.location.href = "/";
      return null;
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
