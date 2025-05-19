

# Kubernetes Deployment

**Company:** CODETECH IT SOLUTION

**Intern:** Himanshu Jagannath Chavan

**Intern ID:** CT04DK145

**Domain:** DevOps

**Duration:** 4 weeks

**Mentor:** Neela Santosh


---

## Project Overview

This project is a microservices-based **Footwear E-Commerce Platform**, featuring separate frontend and backend components deployed on a Kubernetes cluster. It provides a full-fledged e-commerce experience for footwear products, including responsive design, user authentication, product listing, shopping cart, and checkout functionalities.

---

## Project Structure

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
│   ├── data/               # Static/mock data or DB seeds
│   ├── server.js           # Main server entry point
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies and scripts
│
├── k8s/                   # Kubernetes manifests
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│
└── README.md               # Project documentation (this file)
```

---

## Features

* Fully responsive UI for all device sizes
* Product listing with filtering, sorting, and search functionality
* Detailed product view with image gallery
* Shopping cart with local storage persistence
* Secure checkout process with JWT authentication
* Backend REST API with in-memory data store (can be extended to database)
* Tailwind CSS styling and Framer Motion animations on frontend
* Backend built with Node.js and Express

---

## Technology Stack

| Layer            | Technology                                         |
| ---------------- | -------------------------------------------------- |
| Frontend         | HTML, CSS, JavaScript, Tailwind CSS, Framer Motion |
| Backend          | Node.js, Express, JWT Authentication               |
| Containerization | Docker                                             |
| Orchestration    | Kubernetes                                         |

---

## Prerequisites

* Node.js (v14 or higher)
* Docker installed and running
* Kubernetes cluster (Minikube, Docker Desktop, or cloud provider)
* kubectl CLI configured for your cluster

---

## Local Setup

### Backend

```bash
cd backend
npm install

# Create .env file in backend/ directory with the following:
# JWT_SECRET=<your_jwt_secret>
# PORT=5000

npm run dev
```

Backend server will start on port 5000.

### Frontend

```bash
cd frontend
npm install

# Serve the frontend (using serve or any static file server)
npx serve
# or if globally installed:
serve
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

| Method | Endpoint                          | Description                | Auth Required |
| ------ | --------------------------------- | -------------------------- | ------------- |
| GET    | /api/products                     | Get all products           | No            |
| GET    | /api/products/\:id                | Get product by ID          | No            |
| GET    | /api/products/category/\:category | Get products by category   | No            |
| GET    | /api/products/search?query=       | Search products by keyword | No            |
| GET    | /api/products/featured            | Get featured products      | No            |
| POST   | /api/products                     | Create a new product       | Yes           |
| PUT    | /api/products/\:id                | Update a product           | Yes           |
| DELETE | /api/products/\:id                | Delete a product           | Yes           |
| POST   | /api/auth/register                | Register new user          | No            |
| POST   | /api/auth/login                   | User login                 | No            |
| GET    | /api/auth/me                      | Get current logged-in user | Yes           |

---

## Docker Image Build & Push

1. Build and push backend image:

```bash
cd backend
docker build -t your-dockerhub-username/backend:latest .
docker push your-dockerhub-username/backend:latest
```

2. Build and push frontend image:

```bash
cd ../frontend
docker build -t your-dockerhub-username/frontend:latest .
docker push your-dockerhub-username/frontend:latest
```

> **Note:** Replace `your-dockerhub-username` with your actual Docker Hub username.

---

## Kubernetes Deployment

### Step 1: Create Kubernetes YAML files inside `k8s/`

* `backend-deployment.yaml`
* `backend-service.yaml`
* `frontend-deployment.yaml`
* `frontend-service.yaml`

*(Make sure the images in the YAML files reference the correct Docker Hub images you pushed.)*

---

### Step 2: Apply Kubernetes manifests

```bash
kubectl apply -f k8s/
```

### Step 3: Verify deployment

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

---

### Step 4: Accessing the Application

* **Using Minikube**

```bash
minikube service frontend-service
```

* **Using Cloud Provider**

```bash
kubectl get svc frontend-service
```

Use the External IP to access the frontend.

---

## Color Theme (Frontend UI)

| Element       | Color                  |
| ------------- | ---------------------- |
| Background    | #f9fafb (Light gray)   |
| Primary Color | #1e3a8a (Indigo blue)  |
| Accent Color  | #f59e0b (Amber/yellow) |
| Text          | #1f2937 (Dark gray)    |
| Font          | 'Poppins', sans-serif  |

---
# Screenshort :
![Image](https://github.com/user-attachments/assets/8f259e4c-e768-43f6-976c-3a9960100d4a)
![Image](https://github.com/user-attachments/assets/a493bc9b-4e0b-49e7-8a80-4001580da59a)


