import { getCartItems } from "../services/cart-service.js"
import { navigateTo } from "../app.js"
// Add these imports at the top
import { isLoggedIn, getCurrentUser, logout } from "../services/auth-service.js"

export function loadHeader() {
  const headerContainer = document.getElementById("header-container")

  // In the loadHeader function, update the headerHTML to include user menu:
  const user = getCurrentUser()
  const isUserLoggedIn = isLoggedIn()

  const headerHTML = `
    <header class="header py-4 px-6">
      <div class="container mx-auto flex justify-between items-center">
        <div class="logo">
          <a href="/" class="text-2xl font-bold text-primary">FootwearHub</a>
        </div>
        
        <nav class="hidden md:block">
          <ul class="flex space-x-6">
            <li><a href="/" class="hover:text-primary transition-colors">Home</a></li>
            <li><a href="/products/men" class="hover:text-primary transition-colors">Men</a></li>
            <li><a href="/products/women" class="hover:text-primary transition-colors">Women</a></li>
            <li><a href="/products/kids" class="hover:text-primary transition-colors">Kids</a></li>
            <li><a href="/products/sports" class="hover:text-primary transition-colors">Sports</a></li>
          </ul>
        </nav>
        
        <div class="flex items-center space-x-4">
          <div class="search-icon cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div class="cart-icon cursor-pointer relative" id="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span id="cart-count" class="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
        </div>
        
        ${
          isUserLoggedIn
            ? `
          <div class="user-menu relative">
            <button id="user-menu-button" class="flex items-center space-x-1 focus:outline-none">
              <span class="text-sm">${user.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div id="user-dropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden">
              <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</a>
              <button id="logout-btn" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
            </div>
          </div>
        `
            : `
          <a href="/login" class="text-sm hover:text-primary transition-colors">Login</a>
          <a href="/register" class="btn btn-primary py-1 px-3 text-sm">Register</a>
        `
        }
        
        <div class="menu-icon md:hidden cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>
    </div>
  </header>
  
  <!-- Mobile Menu -->
  <div id="mobile-menu" class="md:hidden bg-white py-4 px-6 hidden">
    <ul class="space-y-4">
      <li><a href="/" class="block hover:text-primary transition-colors">Home</a></li>
      <li><a href="/products/men" class="block hover:text-primary transition-colors">Men</a></li>
      <li><a href="/products/women" class="block hover:text-primary transition-colors">Women</a></li>
      <li><a href="/products/kids" class="block hover:text-primary transition-colors">Kids</a></li>
      <li><a href="/products/sports" class="block hover:text-primary transition-colors">Sports</a></li>
      ${
        !isUserLoggedIn
          ? `
        <li><a href="/login" class="block hover:text-primary transition-colors">Login</a></li>
        <li><a href="/register" class="block hover:text-primary transition-colors">Register</a></li>
      `
          : `
        <li><a href="/profile" class="block hover:text-primary transition-colors">Profile</a></li>
        <li><a href="/orders" class="block hover:text-primary transition-colors">Orders</a></li>
        <li><button id="mobile-logout-btn" class="block hover:text-primary transition-colors">Logout</button></li>
      `
      }
    </ul>
  </div>
  
  <!-- Cart Drawer -->
  <div id="cart-drawer" class="cart-drawer p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Your Cart</h2>
      <button id="close-cart" class="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div id="cart-items" class="space-y-4 mb-6">
      <!-- Cart items will be loaded here -->
    </div>
    
    <div class="border-t pt-4">
      <div class="flex justify-between mb-4">
        <span>Subtotal:</span>
        <span id="cart-subtotal" class="font-semibold">₹0</span>
      </div>
      
      <button id="checkout-btn" class="w-full btn btn-primary">Proceed to Checkout</button>
    </div>
  </div>
`

  headerContainer.innerHTML = headerHTML

  // Update cart count
  updateCartCount()

  // Add event listeners
  document.querySelector(".menu-icon").addEventListener("click", toggleMobileMenu)
  document.getElementById("cart-icon").addEventListener("click", toggleCartDrawer)
  document.getElementById("close-cart").addEventListener("click", toggleCartDrawer)
  document.getElementById("checkout-btn").addEventListener("click", () => {
    navigateTo("/checkout")
    toggleCartDrawer()
  })

  // Handle navigation links
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("href").startsWith("/")) {
        e.preventDefault()
        navigateTo(link.getAttribute("href"))
      }
    })
  })

  // Add these event listeners after setting the headerHTML:
  if (isUserLoggedIn) {
    // Toggle user dropdown
    document.getElementById("user-menu-button").addEventListener("click", () => {
      document.getElementById("user-dropdown").classList.toggle("hidden")
    })

    // Handle logout
    document.getElementById("logout-btn").addEventListener("click", handleLogout)

    // Handle mobile logout if it exists
    const mobileLogoutBtn = document.getElementById("mobile-logout-btn")
    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener("click", handleLogout)
    }
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  mobileMenu.classList.toggle("hidden")
}

function toggleCartDrawer() {
  const cartDrawer = document.getElementById("cart-drawer")
  cartDrawer.classList.toggle("open")

  if (cartDrawer.classList.contains("open")) {
    renderCartItems()
  }
}

function updateCartCount() {
  const cartItems = getCartItems()
  const cartCount = document.getElementById("cart-count")

  if (cartCount) {
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0)
  }
}

function renderCartItems() {
  const cartItems = getCartItems()
  const cartItemsContainer = document.getElementById("cart-items")
  const cartSubtotal = document.getElementById("cart-subtotal")

  if (cartItemsContainer) {
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-center text-gray-500">Your cart is empty</p>'
      cartSubtotal.textContent = "₹0"
    } else {
      let subtotal = 0
      let cartHTML = ""

      cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity
        subtotal += itemTotal

        cartHTML += `
          <div class="flex items-center space-x-4">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
              <h3 class="font-medium">${item.name}</h3>
              <p class="text-sm text-gray-500">₹${item.price} × ${item.quantity}</p>
            </div>
            <button class="remove-item text-gray-400 hover:text-red-500" data-id="${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        `
      })

      cartItemsContainer.innerHTML = cartHTML
      cartSubtotal.textContent = `₹${subtotal}`

      // Add event listeners to remove buttons
      document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id
          removeCartItem(id)
          renderCartItems()
          updateCartCount()
        })
      })
    }
  }
}

function removeCartItem(id) {
  let cartItems = getCartItems()
  cartItems = cartItems.filter((item) => item.id !== id)
  localStorage.setItem("cart", JSON.stringify(cartItems))
}

// Add this function at the end of the file:
function handleLogout() {
  logout()
  window.location.href = "/"
}

// Export functions that need to be accessed from other modules
export { updateCartCount }
