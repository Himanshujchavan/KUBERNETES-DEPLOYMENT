import { login } from "../services/auth-service.js"
import { navigateTo } from "../app.js"

export function loadLoginPage() {
  const contentContainer = document.getElementById("content-container")

  const loginHTML = `
    <div class="container mx-auto py-12 px-4">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="py-4 px-6 bg-primary text-white text-center">
          <h2 class="text-2xl font-bold">Login to Your Account</h2>
        </div>
        
        <div class="py-8 px-6">
          <form id="login-form" class="space-y-6">
            <div id="login-error" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"></div>
            
            <div>
              <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
              <input type="email" id="email" name="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
            </div>
            
            <div>
              <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
              <input type="password" id="password" name="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
            </div>
            
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input type="checkbox" class="mr-2">
                <span class="text-sm text-gray-600">Remember me</span>
              </label>
              
              <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            
            <div>
              <button type="submit" class="w-full btn btn-primary py-2">Login</button>
            </div>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-gray-600">Don't have an account? <a href="/register" class="text-primary hover:underline">Register</a></p>
          </div>
        </div>
      </div>
    </div>
  `

  contentContainer.innerHTML = loginHTML

  // Add event listeners
  document.getElementById("login-form").addEventListener("submit", handleLogin)

  // Handle register link
  document.querySelector("a[href='/register']").addEventListener("click", (e) => {
    e.preventDefault()
    navigateTo("/register")
  })
}

async function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const errorElement = document.getElementById("login-error")

  try {
    // Clear previous errors
    errorElement.classList.add("hidden")

    // Attempt login
    const response = await login({ email, password })

    // Redirect to home page on success
    navigateTo("/")

    // Reload the page to update header with user info
    window.location.reload()
  } catch (error) {
    // Display error message
    errorElement.textContent = error.message
    errorElement.classList.remove("hidden")
  }
}
