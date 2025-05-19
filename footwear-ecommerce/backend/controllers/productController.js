const products = require("../data/products")

// Get all products
exports.getProducts = (req, res) => {
  res.status(200).json(products)
}

// Get product by ID
exports.getProductById = (req, res) => {
  const product = products.find((p) => p.id === req.params.id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.status(200).json(product)
}

// Get products by category
exports.getProductsByCategory = (req, res) => {
  const { category } = req.params

  const filteredProducts = products.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()))

  res.status(200).json(filteredProducts)
}

// Create a new product
exports.createProduct = (req, res) => {
  const newProduct = {
    id: (products.length + 1).toString(),
    ...req.body,
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
}

// Update a product
exports.updateProduct = (req, res) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id)

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" })
  }

  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
  }

  res.status(200).json(products[productIndex])
}

// Delete a product
exports.deleteProduct = (req, res) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id)

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" })
  }

  const deletedProduct = products.splice(productIndex, 1)[0]

  res.status(200).json({ message: "Product deleted successfully" })
}

// Search products
exports.searchProducts = (req, res) => {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({ message: "Search query is required" })
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(query.toLowerCase())),
  )

  res.status(200).json(filteredProducts)
}

// Get featured products
exports.getFeaturedProducts = (req, res) => {
  const featuredProducts = products.filter((p) => p.featured)
  res.status(200).json(featuredProducts)
}
