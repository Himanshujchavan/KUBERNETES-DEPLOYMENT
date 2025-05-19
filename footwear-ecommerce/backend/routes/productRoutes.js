const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

// Get all products
router.get("/", productController.getProducts)

// Get featured products
router.get("/featured", productController.getFeaturedProducts)

// Search products
router.get("/search", productController.searchProducts)

// Get products by category
router.get("/category/:category", productController.getProductsByCategory)

// Get product by ID
router.get("/:id", productController.getProductById)

// Create a new product
router.post("/", productController.createProduct)

// Update a product
router.put("/:id", productController.updateProduct)

// Delete a product
router.delete("/:id", productController.deleteProduct)

module.exports = router
