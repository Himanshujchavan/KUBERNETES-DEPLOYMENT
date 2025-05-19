const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const productRoutes = require("./routes/productRoutes")
const authRoutes = require("./routes/authRoutes")

// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// JWT Middleware
app.use((req, res, next) => {
  // Skip authentication for public routes
  if (req.path === "/api/auth/login" || req.path === "/api/auth/register" || req.method === "GET") {
    return next()
  }

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" })
  }

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" })
  }
})

// Routes
app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)

// Home route
app.get("/", (req, res) => {
  res.send("Footwear E-Commerce API is running")
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
