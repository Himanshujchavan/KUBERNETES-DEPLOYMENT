import { getCartItems, updateCartItem, removeCartItem } from "../services/cart-service.js"
import { navigateTo } from "../app.js"

export function loadCartPage() {
  const contentContainer = document.getElementById("content-container")

  // Get cart items
  const cartItems = getCartItems()

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal + shipping

  // Prepare HTML content
  const cartHTML = `
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-2xl md:text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      ${
        cartItems.length === 0
          ? `
        <div class="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 class="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p class="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <button class="btn btn-primary" onclick="navigateTo('/')">Continue Shopping</button>
        </div>
      `
          : `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="p-6 border-b">
                <h2 class="text-lg font-semibold">Cart Items (${cartItems.length})</h2>
              </div>
              
              <div id="cart-items-container">
                ${cartItems
                  .map(
                    (item) => `
                  <div class="cart-item p-6 border-b flex flex-col sm:flex-row items-start sm:items-center gap-4" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-md">
                    
                    <div class="flex-1">
                      <h3 class="font-semibold text-lg">${item.name}</h3>
                      <p class="text-gray-600 text-sm mb-2">${item.category}</p>
                      <p class="text-sm text-gray-600">Size: ${item.size || "Standard"}</p>
                    </div>
                    
                    <div class="flex items-center">
                      <button class="decrease-qty w-8 h-8 rounded-l-md border flex items-center justify-center hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <input type="number" value="${item.quantity}" min="1" class="item-qty w-12 h-8 border-t border-b text-center focus:outline-none">
                      <button class="increase-qty w-8 h-8 rounded-r-md border flex items-center justify-center hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    
                    <div class="text-right">
                      <p class="font-semibold text-lg">₹${item.price * item.quantity}</p>
                      <button class="remove-item text-sm text-red-500 hover:text-red-700 mt-2">Remove</button>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
              
              <div class="p-6 flex justify-between">
                <button class="text-primary hover:text-primary-dark" onclick="navigateTo('/')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </button>
                
                <button id="update-cart" class="text-primary hover:text-primary-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Update Cart
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div class="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
              <div class="p-6 border-b">
                <h2 class="text-lg font-semibold">Order Summary</h2>
              </div>
              
              <div class="p-6 space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-semibold">₹${subtotal}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600">Shipping</span>
                  <span class="font-semibold">${shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                
                <div class="border-t pt-4 flex justify-between">
                  <span class="font-semibold">Total</span>
                  <span class="font-bold text-lg">₹${total}</span>
                </div>
                
                <button id="checkout-btn" class="w-full btn btn-primary py-3 mt-4">
                  Proceed to Checkout
                </button>
                
                <div class="text-sm text-gray-600 mt-4">
                  <p class="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure checkout
                  </p>
                  <p class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    We accept all major credit cards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      }
    </div>
  `

  // Update content
  contentContainer.innerHTML = cartHTML

  // Add event listeners
  if (cartItems.length > 0) {
    // Continue shopping button
    document.querySelector("button[onclick=\"navigateTo('/')\"]").addEventListener("click", (e) => {
      e.preventDefault()
      navigateTo("/")
    })

    // Checkout button
    document.getElementById("checkout-btn").addEventListener("click", () => {
      navigateTo("/checkout")
    })

    // Update cart button
    document.getElementById("update-cart").addEventListener("click", updateAllCartItems)

    // Quantity buttons
    document.querySelectorAll(".decrease-qty").forEach((button) => {
      button.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-item")
        const quantityInput = cartItem.querySelector(".item-qty")
        const currentValue = Number.parseInt(quantityInput.value)

        if (currentValue > 1) {
          quantityInput.value = currentValue - 1
        }
      })
    })

    document.querySelectorAll(".increase-qty").forEach((button) => {
      button.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-item")
        const quantityInput = cartItem.querySelector(".item-qty")
        const currentValue = Number.parseInt(quantityInput.value)

        quantityInput.value = currentValue + 1
      })
    })

    // Remove item buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-item")
        const itemId = cartItem.dataset.id

        // Remove item from cart
        removeCartItem(itemId)

        // Reload cart page
        loadCartPage()
      })
    })
  }
}

function updateAllCartItems() {
  const cartItems = getCartItems()
  const cartItemElements = document.querySelectorAll(".cart-item")

  cartItemElements.forEach((itemElement) => {
    const itemId = itemElement.dataset.id
    const quantityInput = itemElement.querySelector(".item-qty")
    const newQuantity = Number.parseInt(quantityInput.value)

    // Find the item in the cart
    const cartItem = cartItems.find((item) => item.id === itemId)

    if (cartItem && newQuantity !== cartItem.quantity) {
      // Update item quantity
      updateCartItem(itemId, newQuantity)
    }
  })

  // Reload cart page to reflect changes
  loadCartPage()
}
