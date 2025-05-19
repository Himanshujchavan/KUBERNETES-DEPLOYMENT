import { getCartItems, clearCart } from "../services/cart-service.js"
import { navigateTo } from "../app.js"

export function loadCheckoutPage() {
  const contentContainer = document.getElementById("content-container")

  // Get cart items
  const cartItems = getCartItems()

  // Check if cart is empty
  if (cartItems.length === 0) {
    contentContainer.innerHTML = `
      <div class="container mx-auto py-16 px-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 class="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p class="text-gray-600 mb-8">You need to add items to your cart before checking out.</p>
        <button class="btn btn-primary" onclick="navigateTo('/')">Shop Now</button>
      </div>
    `

    // Add event listener for the button
    document.querySelector("button[onclick=\"navigateTo('/')\"]").addEventListener("click", (e) => {
      e.preventDefault()
      navigateTo("/")
    })

    return
  }

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal + shipping

  // Prepare HTML content
  const checkoutHTML = `
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <form id="checkout-form" class="space-y-8">
            <!-- Shipping Information -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="p-6 border-b">
                <h2 class="text-lg font-semibold">Shipping Information</h2>
              </div>
              
              <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" id="first-name" name="first-name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                  </div>
                  
                  <div>
                    <label for="last-name" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" id="last-name" name="last-name" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                  </div>
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" name="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                </div>
                
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" name="phone" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                </div>
                
                <div>
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" id="address" name="address" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" id="city" name="city" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                  </div>
                  
                  <div>
                    <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" id="state" name="state" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                  </div>
                  
                  <div>
                    <label for="pincode" class="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                    <input type="text" id="pincode" name="pincode" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Payment Information -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="p-6 border-b">
                <h2 class="text-lg font-semibold">Payment Information</h2>
              </div>
              
              <div class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="radio" name="payment-method" value="card" class="mr-2" checked>
                      <span>Credit/Debit Card</span>
                    </label>
                    
                    <label class="flex items-center">
                      <input type="radio" name="payment-method" value="upi" class="mr-2">
                      <span>UPI</span>
                    </label>
                    
                    <label class="flex items-center">
                      <input type="radio" name="payment-method" value="cod" class="mr-2">
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>
                
                <div id="card-payment-fields">
                  <div>
                    <label for="card-number" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label for="expiry-date" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                    
                    <div>
                      <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" id="cvv" name="cvv" placeholder="123" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                  </div>
                </div>
                
                <div id="upi-payment-fields" class="hidden">
                  <div>
                    <label for="upi-id" class="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <input type="text" id="upi-id" name="upi-id" placeholder="name@upi" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between">
              <button type="button" class="text-primary hover:text-primary-dark" onclick="navigateTo('/cart')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Cart
              </button>
              
              <button type="submit" class="btn btn-primary">
                Place Order
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div class="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
            <div class="p-6 border-b">
              <h2 class="text-lg font-semibold">Order Summary</h2>
            </div>
            
            <div class="p-6">
              <div class="max-h-64 overflow-y-auto mb-4">
                ${cartItems
                  .map(
                    (item) => `
                  <div class="flex items-start gap-4 mb-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                    <div class="flex-1">
                      <h3 class="font-medium">${item.name}</h3>
                      <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold">₹${item.price * item.quantity}</p>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
              
              <div class="border-t pt-4 space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-semibold">₹${subtotal}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600">Shipping</span>
                  <span class="font-semibold">${shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                
                <div class="border-t pt-2 flex justify-between">
                  <span class="font-semibold">Total</span>
                  <span class="font-bold text-lg">₹${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  // Update content
  contentContainer.innerHTML = checkoutHTML

  // Add event listeners
  document.querySelector("button[onclick=\"navigateTo('/cart')\"]").addEventListener("click", (e) => {
    e.preventDefault()
    navigateTo("/cart")
  })

  // Payment method toggle
  const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]')
  paymentMethodRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const cardFields = document.getElementById("card-payment-fields")
      const upiFields = document.getElementById("upi-payment-fields")

      if (radio.value === "card") {
        cardFields.classList.remove("hidden")
        upiFields.classList.add("hidden")
      } else if (radio.value === "upi") {
        cardFields.classList.add("hidden")
        upiFields.classList.remove("hidden")
      } else {
        cardFields.classList.add("hidden")
        upiFields.classList.add("hidden")
      }
    })
  })

  // Form submission
  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault()

    // Show order confirmation
    showOrderConfirmation()
  })
}

function showOrderConfirmation() {
  const contentContainer = document.getElementById("content-container")

  const confirmationHTML = `
    <div class="container mx-auto py-16 px-4 text-center">
      <div class="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 class="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      <p class="text-gray-600 mb-8 max-w-md mx-auto">Thank you for your purchase. Your order has been received and is being processed.</p>
      
      <div class="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto mb-8">
        <div class="flex justify-between mb-4">
          <span class="text-gray-600">Order Number:</span>
          <span class="font-semibold">#${Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
        
        <div class="flex justify-between mb-4">
          <span class="text-gray-600">Order Date:</span>
          <span class="font-semibold">${new Date().toLocaleDateString()}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-gray-600">Estimated Delivery:</span>
          <span class="font-semibold">${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
        </div>
      </div>
      
      <button class="btn btn-primary" onclick="navigateTo('/')">Continue Shopping</button>
    </div>
  `

  // Update content
  contentContainer.innerHTML = confirmationHTML

  // Add event listener for the button
  document.querySelector("button[onclick=\"navigateTo('/')\"]").addEventListener("click", (e) => {
    e.preventDefault()

    // Clear the cart
    clearCart()

    // Navigate to home page
    navigateTo("/")
  })
}
