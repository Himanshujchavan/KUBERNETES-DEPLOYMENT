import { addToCart } from "../services/cart-service.js"
import { navigateTo } from "../app.js"
import { updateCartCount } from "./header.js"

export function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card group"

  card.innerHTML = `
    <div class="relative overflow-hidden">
      <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300">
      <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button class="quick-view-btn bg-white text-primary px-4 py-2 rounded-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          Quick View
        </button>
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
      <p class="text-gray-600 text-sm mb-2">${product.category}</p>
      <div class="flex justify-between items-center">
        <span class="font-bold text-lg">₹${product.price}</span>
        <button class="add-to-cart-btn bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  `

  // Add event listeners
  card.querySelector(".quick-view-btn").addEventListener("click", (e) => {
    e.stopPropagation()
    navigateTo(`/products/detail/${product.id}`)
  })

  card.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
    e.stopPropagation()
    addToCart(product)
    updateCartCount()

    // Show added to cart notification
    showAddedToCartNotification(product.name)
  })

  // Make the entire card clickable
  card.addEventListener("click", () => {
    navigateTo(`/products/detail/${product.id}`)
  })

  return card
}

function showAddedToCartNotification(productName) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className =
    "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transform translate-y-10 opacity-0 transition-all duration-300"
  notification.textContent = `${productName} added to cart`

  // Add to DOM
  document.body.appendChild(notification)

  // Trigger animation
  setTimeout(() => {
    notification.classList.remove("translate-y-10", "opacity-0")
  }, 10)

  // Remove after delay
  setTimeout(() => {
    notification.classList.add("translate-y-10", "opacity-0")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}
