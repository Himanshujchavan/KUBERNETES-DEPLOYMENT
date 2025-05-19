# KUBERNETES DEPLOYMENT
COMPANY : CODETECH IT SOLUTION

NAME :Himanshu Jagannath Chavan

Intern ID: CT04DK145

Domain : DevOps

Duration : 4 weeks

Mentor : NEELA SANTOSH



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
|── k8s/
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
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

3. Install backend dependencies:
   \`\`\`
   cd backend
   npm install
   \`\`\`

4. Configure environment variables:
   - Create a `.env` file in the backend directory
   - Add your JWT secret:
     \`\`\`
     JWT_SECRET=y28cdf075011d51b33d99da4b4ef2da187aa52363273ce4d0000714cbf9298b29afc55621b4af356a725532ca77ea2951a6556b290954ae89d24b888b74ba6e6e
     PORT=5000
     \`\`\`

5. Start the backend server:
   \`\`\`
   npm run dev
   \`\`\`

6. In a new terminal, install frontend dependencies:
   \`\`\`
   cd ../frontend
   npm install
   \`\`\`

7. Start the frontend server:
   \`\`\`
   npm start
   \`\`\`

8. Open your browser and navigate to `http://localhost:3000`

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


Here is a clear, step-by-step guide to deploy your microservices-based footwear-ecommerce application on a Kubernetes cluster. This includes YAML configuration file creation, deployment steps, and what to include in the final deliverables.

✅ Goal: Deploy a microservices app (frontend + backend) on Kubernetes and provide YAML files + documentation.

───────────────────────────────
🔧 STEP 1: Prepare Docker Images
───────────────────────────────

1. Go to your backend folder:

   ```bash
   cd backend
   docker build -t your-dockerhub-username/backend:latest .
   docker push your-dockerhub-username/backend:latest
   ```

2. Go to your frontend folder:

   ```bash
   cd ../frontend
   docker build -t your-dockerhub-username/frontend:latest .
   docker push your-dockerhub-username/frontend:latest
   ```

✅ Tip: Replace your-dockerhub-username with your actual Docker Hub username.

───────────────────────────────
📁 STEP 2: Create k8s/ Folder and YAML Files
───────────────────────────────

Inside your project root, create a folder named k8s/ and add the following files:

📄 backend-deployment.yaml

📄 backend-service.yaml

📄 frontend-deployment.yaml

📄 frontend-service.yaml

───────────────────────────────
🚀 STEP 3: Apply YAML Files
───────────────────────────────

1. Go to your project root or k8s/ folder:

   ```bash
   kubectl apply -f k8s/
   ```

2. Check deployments and services:

   ```bash
   kubectl get deployments
   kubectl get pods
   kubectl get services
   ```

───────────────────────────────
🌍 STEP 4: Access the Application
───────────────────────────────

* If using minikube:

  ```bash
  minikube service frontend-service
  ```

* If using cloud Kubernetes:
  Get the external IP:

  ```bash
  kubectl get svc frontend-service
  ```

───────────────────────────────
📝 STEP 5: Create README.md for Documentation
───────────────────────────────

Sample content to include:

# Footwear E-Commerce Kubernetes Deployment

## Microservices Architecture

* Frontend: HTML/CSS/JS
* Backend: Node.js + Express
* Deployed via Kubernetes with 4 YAML files

## 🛠 Deployment Steps

1. Build Docker images:

   ```bash
   docker build -t yourname/frontend:latest ./frontend
   docker build -t yourname/backend:latest ./backend
   docker push yourname/frontend:latest
   docker push yourname/backend:latest
   ```

2. Apply Kubernetes configs:

   ```bash
   kubectl apply -f k8s/
   ```

3. Check deployments and services:

   ```bash
   kubectl get all
   ```

4. Access frontend:

   * Cloud: via external IP
   * Minikube: minikube service frontend-service

---

