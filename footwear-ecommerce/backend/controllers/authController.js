const jwt = require("jsonwebtoken")
const users = require("../data/users")

// Register a new user
exports.register = (req, res) => {
  const { name, email, password } = req.body

  // Check if user already exists
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" })
  }

  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password, // In a real app, this would be hashed
    role: "user",
  }

  users.push(newUser)

  // Generate JWT token
  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  })
}

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body

  // Find user
  const user = users.find((user) => user.email === email)

  // Check if user exists and password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
}

// Get current user
exports.getCurrentUser = (req, res) => {
  // User is already attached to req by the JWT middleware
  const user = users.find((user) => user.id === req.user.id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
}
