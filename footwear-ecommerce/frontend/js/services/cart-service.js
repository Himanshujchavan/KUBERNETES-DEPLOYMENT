// Initialize cart in localStorage
export function initializeCart() {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]))
  }
}

// Get cart items from localStorage
export function getCartItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

// Add item to cart
export function addToCart(product) {
  const cartItems = getCartItems()

  // Check if product already exists in cart
  const existingItemIndex = cartItems.findIndex((item) => item.id === product.id)

  if (existingItemIndex !== -1) {
    // Update quantity if product already exists
    cartItems[existingItemIndex].quantity += product.quantity || 1
  } else {
    // Add new product to cart
    cartItems.push({
      ...product,
      quantity: product.quantity || 1,
    })
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems))
}

// Update cart item quantity
export function updateCartItem(productId, quantity) {
  const cartItems = getCartItems()

  // Find the item in the cart
  const itemIndex = cartItems.findIndex((item) => item.id === productId)

  if (itemIndex !== -1) {
    // Update quantity
    cartItems[itemIndex].quantity = quantity

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }
}

// Remove item from cart
export function removeCartItem(productId) {
  let cartItems = getCartItems()

  // Filter out the item to remove
  cartItems = cartItems.filter((item) => item.id !== productId)

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems))
}

// Clear cart
export function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]))
}
