# Inventra — Inventory Management System

A full-stack inventory management system for tracking products, managing stock levels, processing customer orders, and monitoring restock queues — all from a single dashboard.

---

## 🔗 Live Links

| Resource | URL |
|---|---|
| **Frontend (Live)** | https://inventory-frontend-pi-eight.vercel.app |
| **Backend (API)** | _your-backend-url.railway.app_ |
| **GitHub (Frontend)** | _https://github.com/yourusername/inventory-frontend_ |
| **GitHub (Backend)** | _https://github.com/yourusername/inventory-backend_ |

---

## ✨ Features

### Auth
- JWT-based login & registration
- Protected routes with middleware
- Demo account access

### Product & Category Management
- Create, view, and manage product categories
- Add products with name, price, stock quantity, min threshold
- Auto status: `Active` / `Out of Stock`

### Stock Handling
- Automatic stock deduction on order placement
- Warning when quantity exceeds available stock
- Order blocked if stock is insufficient
- Product auto-marked `Out of Stock` when stock hits 0

### Order Management
- Place orders with multiple products
- Real-time stock validation before confirmation
- Order status flow: `Pending → Confirmed → Shipped → Delivered`
- Cancel orders (restores stock automatically)
- Filter and sort orders by status, date, total

### Restock Queue
- Products below minimum threshold auto-added to queue
- Priority levels: `High / Medium / Low` based on stock ratio
- Manually restock from queue
- Auto-removed from queue once stock is restored

### Dashboard
- Revenue overview (confirmed orders only)
- Orders today, pending count
- Low stock and restock queue alerts
- Recent orders table

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, React Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel (Frontend), Railway (Backend) |
| HTTP Client | Axios |

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

---

### Backend Setup
```bash
# 1. Clone the backend repo
git clone https://github.com/yourusername/inventory-backend
cd inventory-backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
```

Fill in your `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventra
JWT_SECRET=your_jwt_secret_key
```
```bash
# 4. Start the server
node server.js
# Server running on http://localhost:5000
```

---

### Frontend Setup
```bash
# 1. Clone the frontend repo
git clone https://github.com/yourusername/inventory-frontend
cd inventory-frontend

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.example .env.local
```

Fill in your `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
```bash
# 4. Start the dev server
npm run dev
# App running on http://localhost:3000
```

---

## 📁 Project Structure

### Backend
```
inventory-backend/
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── categoryController.js
│   ├── order.controller.js
│   └── restockController.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   ├── Order.js
│   └── RestockQueue.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   └── restockRoutes.js
├── middleware/
│   └── auth.middleware.js
├── .env
└── server.js
```

### Frontend
```
inventory-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   └── (dashboard)/
│       ├── dashboard/
│       ├── products/
│       ├── categories/
│       ├── orders/
│       │   ├── constants.js
│       │   ├── utils.js
│       │   ├── StatusBadge.jsx
│       │   ├── StatsRow.jsx
│       │   ├── Toolbar.jsx
│       │   ├── OrderCard.jsx
│       │   ├── OrderItemsTable.jsx
│       │   ├── OrderActions.jsx
│       │   ├── CreateOrderModal.jsx
│       │   └── page.jsx
│       ├── stock/
│       └── restock/
├── components/
│   ├── Sidebar.jsx
│   └── StatCard.jsx
├── hooks/
│   ├── useOrders.js
│   ├── useProducts.js
│   └── useRestockQueue.js
└── services/
    └── api.js
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create product |
| PATCH | `/api/products/:id/deduct-stock` | Deduct stock |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category |
| DELETE | `/api/categories/:id` | Delete category |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Place new order |
| PUT | `/api/orders/:id/status` | Update order status |
| PUT | `/api/orders/:id/cancel` | Cancel order (restores stock) |

### Restock Queue
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/restock-queue` | Get full queue |
| PATCH | `/api/restock-queue/:id/restock` | Restock a product |
| DELETE | `/api/restock-queue/:id` | Remove from queue |

---

## ⚙️ Stock Rules

| Rule | Behavior |
|---|---|
| Qty > stock | Warning shown, order blocked |
| Stock hits 0 | Status → `Out of Stock` |
| Stock < minStock | Auto-added to Restock Queue |
| Order cancelled | Stock restored automatically |
| Restock applied | Removed from queue if above threshold |

---

## 👤 Demo Account
```
Email:    demo@inventra.com
Password: demo1234
```

---

## 📄 License

MIT © 2026 Sabbir
