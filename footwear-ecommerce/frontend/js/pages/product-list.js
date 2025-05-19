import { fetchProducts } from "../services/product-service.js"
import { createProductCard } from "../components/product-card.js"

export async function loadProductListPage(category = "all") {
  const contentContainer = document.getElementById("content-container")

  // Show loading state
  contentContainer.innerHTML = `
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  `

  try {
    // Fetch products
    let products = await fetchProducts()

    // Filter by category if needed
    if (category && category !== "all") {
      products = products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase()))
    }

    // Format category name for display
    const displayCategory =
      category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1) + "'s Collection"

    // Prepare HTML content
    const productListHTML = `
      <div class="container mx-auto py-8 px-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold mb-2">${displayCategory}</h1>
            <p class="text-gray-600">${products.length} products</p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <div class="relative">
              <select id="sort-select" class="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <div class="relative">
              <select id="filter-select" class="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="all">Filter by: All</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="sports">Sports</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="products-grid">
          <!-- Product cards will be inserted here -->
        </div>
      </div>
    `

    // Update content
    contentContainer.innerHTML = productListHTML

    // Add product cards
    const productsGrid = document.getElementById("products-grid")
    products.forEach((product) => {
      productsGrid.appendChild(createProductCard(product))
    })

    // Add event listeners for sorting and filtering
    document.getElementById("sort-select").addEventListener("change", (e) => {
      sortProducts(e.target.value)
    })

    document.getElementById("filter-select").addEventListener("change", (e) => {
      filterProducts(e.target.value)
    })
  } catch (error) {
    console.error("Error loading product list page:", error)
    contentContainer.innerHTML = `
      <div class="container mx-auto py-16 px-4 text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
        <p class="mb-8">We're having trouble loading the products. Please try again later.</p>
        <button class="btn btn-primary" onclick="location.reload()">Refresh Page</button>
      </div>
    `
  }
}

function sortProducts(sortBy) {
  const productsGrid = document.getElementById("products-grid")
  const productCards = Array.from(productsGrid.children)

  productCards.sort((a, b) => {
    const aName = a.querySelector("h3").textContent
    const bName = b.querySelector("h3").textContent
    const aPrice = Number.parseFloat(a.querySelector(".font-bold").textContent.replace("₹", ""))
    const bPrice = Number.parseFloat(b.querySelector(".font-bold").textContent.replace("₹", ""))

    if (sortBy === "price-low") {
      return aPrice - bPrice
    } else if (sortBy === "price-high") {
      return bPrice - aPrice
    } else if (sortBy === "name") {
      return aName.localeCompare(bName)
    }

    // Default sorting (by id)
    return 0
  })

  // Clear and re-append sorted cards
  productsGrid.innerHTML = ""
  productCards.forEach((card) => {
    productsGrid.appendChild(card)
  })
}

function filterProducts(filterBy) {
  const productsGrid = document.getElementById("products-grid")
  const productCards = Array.from(productsGrid.children)

  productCards.forEach((card) => {
    const category = card.querySelector("p").textContent.toLowerCase()

    if (filterBy === "all" || category.includes(filterBy.toLowerCase())) {
      card.classList.remove("hidden")
    } else {
      card.classList.add("hidden")
    }
  })
}
