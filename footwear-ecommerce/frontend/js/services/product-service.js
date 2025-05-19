// API URL
const API_URL = "http://localhost:5000/api"

// Fetch all products
export function fetchProducts() {
  return fetch(`${API_URL}/products`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      return response.json()
    })
    .catch((error) => {
      console.error("Error fetching products:", error)
      // Fallback to local data if API fails
      return getLocalProducts()
    })
}

// Fetch product by ID
export function fetchProductById(productId) {
  return fetch(`${API_URL}/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch product")
      }
      return response.json()
    })
    .catch((error) => {
      console.error("Error fetching product:", error)
      // Fallback to local data if API fails
      const products = getLocalProducts()
      return products.find((p) => p.id === productId) || null
    })
}

// Fetch products by category
export function fetchProductsByCategory(category) {
  return fetch(`${API_URL}/products/category/${category}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products by category")
      }
      return response.json()
    })
    .catch((error) => {
      console.error("Error fetching products by category:", error)
      // Fallback to local data if API fails
      const products = getLocalProducts()
      return category === "all"
        ? products
        : products.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()))
    })
}

// Search products
export function searchProducts(query) {
  return fetch(`${API_URL}/products/search?query=${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to search products")
      }
      return response.json()
    })
    .catch((error) => {
      console.error("Error searching products:", error)
      // Fallback to local data if API fails
      const products = getLocalProducts()
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()),
      )
    })
}

// Local fallback data
function getLocalProducts() {
  return [
    {
      id: "1",
      name: "Nike Air Max 270",
      price: 12999,
      category: "Men's Footwear",
      image: "https://picsum.photos/seed/nike1/300/300",
    },
    {
      id: "2",
      name: "Adidas Lite Racer",
      price: 4499,
      category: "Men's Footwear",
      image: "https://picsum.photos/seed/adidas1/300/300",
    },
    {
      id: "3",
      name: "Puma Flyer Runner",
      price: 3999,
      category: "Men's Footwear",
      image: "https://picsum.photos/seed/puma1/300/300",
    },
    {
      id: "4",
      name: "Bata Formal Leather",
      price: 2899,
      category: "Men's Footwear",
      image: "https://picsum.photos/seed/bata1/300/300",
    },
    {
      id: "5",
      name: "Woodland Trekking Boots",
      price: 5599,
      category: "Men's Footwear",
      image: "https://picsum.photos/seed/woodland1/300/300",
    },
    {
      id: "6",
      name: "Adidas Ultraboost 21",
      price: 14499,
      category: "Women's Footwear",
      image: "https://picsum.photos/seed/adidas2/300/300",
    },
    {
      id: "7",
      name: "Skechers D'lux Walker",
      price: 5499,
      category: "Women's Footwear",
      image: "https://picsum.photos/seed/skechers1/300/300",
    },
    {
      id: "8",
      name: "Bata Heels",
      price: 2299,
      category: "Women's Footwear",
      image: "https://picsum.photos/seed/bata2/300/300",
    },
    {
      id: "9",
      name: "Mochi Ballerinas",
      price: 1799,
      category: "Women's Footwear",
      image: "https://picsum.photos/seed/mochi1/300/300",
    },
    {
      id: "10",
      name: "Puma Slip-ons",
      price: 3299,
      category: "Women's Footwear",
      image: "https://picsum.photos/seed/puma2/300/300",
    },
    // Add more products as needed
  ]
}
