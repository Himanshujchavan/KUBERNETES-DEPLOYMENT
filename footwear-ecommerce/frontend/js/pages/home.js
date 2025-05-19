import { fetchProducts } from "../services/product-service.js"
import { createProductCard } from "../components/product-card.js"
import { navigateTo } from "../app.js"

export async function loadHomePage() {
  const contentContainer = document.getElementById("content-container")

  // Show loading state
  contentContainer.innerHTML = `
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  `

  try {
    // Fetch trending products
    const products = await fetchProducts()
    const trendingProducts = products.slice(0, 8) // Get first 8 products as trending

    // Prepare HTML content
    const homeHTML = `
      <!-- Hero Section -->
      <section class="hero bg-primary text-white py-16 px-4 md:py-24">
        <div class="container mx-auto text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-4 slide-in">Step into Style</h1>
          <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto slide-in">Discover the perfect blend of comfort and fashion with our premium footwear collection.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 slide-in">
            <button class="btn btn-accent" onclick="navigateTo('/products/new-arrivals')">Shop New Arrivals</button>
            <button class="btn bg-white text-primary hover:bg-gray-100" onclick="navigateTo('/products/all')">Explore Collection</button>
          </div>
        </div>
      </section>
      
      <!-- Categories Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto">
          <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div class="category-item" onclick="navigateTo('/products/men')">
              <img src="https://picsum.photos/seed/men/300/300" alt="Men's Footwear" class="w-full h-48 md:h-64 object-cover rounded-lg">
              <div class="category-title">Men</div>
            </div>
            
            <div class="category-item" onclick="navigateTo('/products/women')">
              <img src="https://picsum.photos/seed/women/300/300" alt="Women's Footwear" class="w-full h-48 md:h-64 object-cover rounded-lg">
              <div class="category-title">Women</div>
            </div>
            
            <div class="category-item" onclick="navigateTo('/products/kids')">
              <img src="https://picsum.photos/seed/kids/300/300" alt="Kids' Footwear" class="w-full h-48 md:h-64 object-cover rounded-lg">
              <div class="category-title">Kids</div>
            </div>
            
            <div class="category-item" onclick="navigateTo('/products/sports')">
              <img src="https://picsum.photos/seed/sports/300/300" alt="Sports Footwear" class="w-full h-48 md:h-64 object-cover rounded-lg">
              <div class="category-title">Sports</div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Trending Products Section -->
      <section class="py-16 px-4 bg-gray-50">
        <div class="container mx-auto">
          <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center">Trending Now</h2>
          
          <div id="trending-products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Product cards will be inserted here -->
          </div>
          
          <div class="text-center mt-12">
            <button class="btn btn-primary" onclick="navigateTo('/products/all')">View All Products</button>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="py-16 px-4">
        <div class="container mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Quality Materials</h3>
              <p class="text-gray-600">Our shoes are crafted with premium materials for durability and comfort.</p>
            </div>
            
            <div class="text-center">
              <div class="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p class="text-gray-600">Get your favorite footwear delivered to your doorstep within 3-5 business days.</p>
            </div>
            
            <div class="text-center">
              <div class="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Secure Payment</h3>
              <p class="text-gray-600">Multiple secure payment options for a hassle-free shopping experience.</p>
            </div>
          </div>
        </div>
      </section>
    `

    // Update content
    contentContainer.innerHTML = homeHTML

    // Add trending products
    const trendingProductsContainer = document.getElementById("trending-products")
    trendingProducts.forEach((product) => {
      trendingProductsContainer.appendChild(createProductCard(product))
    })

    // Fix navigation for category items
    document.querySelectorAll(".category-item").forEach((item) => {
      item.addEventListener("click", () => {
        const path = item.getAttribute("onclick").match(/navigateTo$$'(.+)'$$/)[1]
        navigateTo(path)
      })
    })

    // Fix navigation for buttons
    document.querySelectorAll("button[onclick]").forEach((button) => {
      button.addEventListener("click", () => {
        const path = button.getAttribute("onclick").match(/navigateTo$$'(.+)'$$/)[1]
        navigateTo(path)
      })
    })
  } catch (error) {
    console.error("Error loading home page:", error)
    contentContainer.innerHTML = `
      <div class="container mx-auto py-16 px-4 text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
        <p class="mb-8">We're having trouble loading the page. Please try again later.</p>
        <button class="btn btn-primary" onclick="location.reload()">Refresh Page</button>
      </div>
    `
  }
}
