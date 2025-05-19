// Main application file
import { loadHeader } from "./components/header.js"
import { loadFooter } from "./components/footer.js"
import { loadHomePage } from "./pages/home.js"
import { loadProductListPage } from "./pages/product-list.js"
import { loadProductDetailPage } from "./pages/product-detail.js"
import { loadCartPage } from "./pages/cart.js"
import { loadCheckoutPage } from "./pages/checkout.js"
import { loadLoginPage } from "./pages/login.js"
import { loadRegisterPage } from "./pages/register.js"
import { initializeCart } from "./services/cart-service.js"

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart
  initializeCart()

  // Load header and footer
  loadHeader()
  loadFooter()

  // Handle routing
  handleRouting()

  // Listen for navigation events
  window.addEventListener("popstate", handleRouting)
})

function handleRouting() {
  const path = window.location.pathname
  const contentContainer = document.getElementById("content-container")

  // Clear previous content with fade out effect
  contentContainer.style.opacity = 0

  // Wait for fade out to complete
  setTimeout(() => {
    // Route to the appropriate page
    if (path === "/" || path === "/index.html") {
      loadHomePage()
    } else if (path.includes("/products") && path.includes("/detail")) {
      const productId = path.split("/").pop()
      loadProductDetailPage(productId)
    } else if (path.includes("/products")) {
      const category = path.split("/").pop()
      loadProductListPage(category)
    } else if (path === "/cart") {
      loadCartPage()
    } else if (path === "/checkout") {
      loadCheckoutPage()
    } else if (path === "/login") {
      loadLoginPage()
    } else if (path === "/register") {
      loadRegisterPage()
    } else {
      loadHomePage() // Default to home page
    }

    // Fade in new content
    contentContainer.style.opacity = 1
    contentContainer.style.transition = "opacity 0.3s ease"
  }, 300)
}

// Function to navigate to a new page
export function navigateTo(path) {
  window.history.pushState({}, "", path)
  handleRouting()
}
