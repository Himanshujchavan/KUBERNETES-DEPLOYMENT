// API URL
const API_URL = "http://localhost:5000/api"

// Register a new user
export function register(userData) {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Registration failed")
        })
      }
      return response.json()
    })
    .then((data) => {
      // Store token in localStorage
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      return data
    })
}

// Login user
export function login(credentials) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Login failed")
        })
      }
      return response.json()
    })
    .then((data) => {
      // Store token in localStorage
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      return data
    })
}

// Logout user
export function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

// Get current user
export function getCurrentUser() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// Check if user is logged in
export function isLoggedIn() {
  return !!localStorage.getItem("token")
}

// Get auth token
export function getToken() {
  return localStorage.getItem("token")
}

// Get current user from API
export function fetchCurrentUser() {
  const token = getToken()

  if (!token) {
    return Promise.reject("No token found")
  }

  return fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user")
      }
      return response.json()
    })
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user))
      return user
    })
}
