import { register } from "../services/auth-service.js"
import { navigateTo } from "../app.js"

export function loadRegisterPage() {
  const contentContainer = document.getElementById("content-container")

  const registerHTML = `
    <div class="container mx-auto py-12 px-4">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="py-4 px-6 bg-primary text-white text-center">
          <h2 class="text-2xl font-bold">Create an Account</h2>
        </div>
        
        <div class="py-8 px-6">
          <form id="register-form" class="space-y-6">
            <div id="register-error" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"></div>
            
            <div>
              <label for="name" class="block text-gray-700 font-medium mb-2">Full Name</label>
              <input type="text" id="name" name="name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
            </div>
            
            <div>
              <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
              <input type="email" id="email" name="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
            </div>
            
            <div>
              <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
              <input type="password" id="password" name="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
            </div>
            
            <div>
              <label for="confirm-password" class="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirm-password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
            </div>
            
            <div>
              <label class="flex items-center">
                <input type="checkbox" class="mr-2" required>
                <span class="text-sm text-gray-600">I agree to the <a href="#" class="text-primary hover:underline">Terms and Conditions</a></span>
              </label>
            </div>
            
            <div>
              <button type="submit" class="w-full btn btn-primary py-2">Register</button>
            </div>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-gray-600">Already have an account? <a href="/login" class="text-primary hover:underline">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  `

  contentContainer.innerHTML = registerHTML

  // Add event listeners
  document.getElementById("register-form").addEventListener("submit", handleRegister)

  // Handle login link
  document.querySelector("a[href='/login']").addEventListener("click", (e) => {
    e.preventDefault()
    navigateTo("/login")
  })
}

async function handleRegister(e) {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirm-password").value
  const errorElement = document.getElementById("register-error")

  // Validate passwords match
  if (password !== confirmPassword) {
    errorElement.textContent = "Passwords do not match"
    errorElement.classList.remove("hidden")
    return
  }

  try {
    // Clear previous errors
    errorElement.classList.add("hidden")

    // Attempt registration
    const response = await register({ name, email, password })

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
