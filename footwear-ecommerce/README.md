# KUBERNETES DEPLOYMENT
## Footwear E-Commerce Application

A complete e-commerce solution for footwear with separate frontend and backend components.

---

## 📁 Project Structure – *Footwear E-commerce Platform*

```
footwear-ecommerce/
├── frontend/                # Frontend application (HTML, CSS, JavaScript)
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript logic
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-specific JS files
│   │   └── services/       # API call utilities and services
│   ├── index.html          # Entry point HTML file
│   └── package.json        # Frontend dependencies and scripts
│
├── backend/                # Backend application (Node.js/Express)
│   ├── controllers/        # Business logic and request handlers
│   ├── routes/             # API route definitions
│   ├── data/               # Static or mock data (optional DB seed)
│   ├── server.js           # Main server file
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies and scripts
│
└── README.md               # Project documentation
```

---



## Features

- Responsive design for all devices
- Product listing with filtering and sorting
- Product details with image gallery
- Shopping cart functionality
- Checkout process
- JWT Authentication
- Backend API with in-memory data storage

## Frontend

The frontend is built with HTML, CSS, and JavaScript, featuring:

- Tailwind CSS for styling
- Framer Motion for animations
- Client-side routing
- Local storage for cart persistence

## Backend

The backend is built with Node.js and Express, featuring:

- RESTful API for products
- JWT authentication
- In-memory data storage
- Environment variable configuration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/Himanshujchavan/KUBERNETES-DEPLOYMENT.git
   cd footwear-ecommerce
   \`\`\`

2. Install backend dependencies:
   \`\`\`
   cd backend
   npm install
   \`\`\`

3. Configure environment variables:
   - Create a `.env` file in the backend directory
   - Add your JWT secret:
     \`\`\`
     JWT_SECRET=y28cdf075011d51b33d99da4b4ef2da187aa52363273ce4d0000714cbf9298b29afc55621b4af356a725532ca77ea2951a6556b290954ae89d24b888b74ba6e6e
     PORT=5000
     \`\`\`

4. Start the backend server:
   \`\`\`
   npm run dev
   \`\`\`

5. In a new terminal, install frontend dependencies:
   \`\`\`
   cd ../frontend
   npm install
   \`\`\`

6. Start the frontend server:
   \`\`\`
   npm start
   \`\`\`

7. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?query=keyword` - Search products
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create a new product (requires authentication)
- `PUT /api/products/:id` - Update a product (requires authentication)
- `DELETE /api/products/:id` - Delete a product (requires authentication)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

## Color Theme

| Element       | Color                    |
| ------------- | ------------------------ |
| Background    | `#f9fafb` (light gray)   |
| Primary Color | `#1e3a8a` (indigo blue)  |
| Accent Color  | `#f59e0b` (amber/yellow) |
| Text          | `#1f2937` (dark gray)    |
| Font          | `'Poppins', sans-serif`  |

## Running the Backend

1. **Navigate to the backend directory**:

```shellscript
cd backend
```


2. **Install dependencies**:

```shellscript
npm install
```


3. **Create .env file** (if not already created):
Create a file named `.env` in the backend directory with the following content:

```plaintext
JWT_SECRET=28cdf075011d51b33d99da4b4ef2da187aa52363273ce4d0000714cbf9298b29afc55621b4af356a725532ca77ea2951a6556b290954ae89d24b888b74ba6e6e
PORT=5000
```


4. **Start the backend server**:

```shellscript
npm run dev
```

You should see a message like: `Server running on port 5000`




## Running the Frontend

1. **Open a new terminal window/tab**
2. **Navigate to the frontend directory**:

```shellscript
cd frontend
```


3. **Install dependencies** (if you have any frontend dependencies):

```shellscript
npm install
```


4. **Serve the frontend files**:
Since the frontend is using vanilla HTML/CSS/JS, you can use any static file server. If you have Node.js installed, you can use:

```shellscript
npx serve
```

Or if you've installed the serve package globally:

```shellscript
serve
```

Alternatively, you can use any other static file server like Python's http.server:

```shellscript
python -m http.server 3000
```


5. **Access the application**:
Open your browser and navigate to:

```plaintext
http://localhost:3000
```
