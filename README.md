# Apna Rosoi - Food Delivery Application

A modern, full-stack food delivery platform built with React, Node.js, Express, and MongoDB.

## 🏗️ Project Structure

```
apna_rosoi/
├── backend/                 # Node.js/Express server
│   ├── models/             # Database schemas
│   ├── controllers/        # Business logic
│   ├── routes/            # API endpoints
│   ├── middleware/        # Authentication & validation
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment variables template
├── frontend/               # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # State management
│   │   ├── utils/        # Helper functions & API calls
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Entry point
│   ├── public/           # Static files
│   ├── package.json      # Frontend dependencies
│   └── tailwind.config.js # Tailwind CSS config
└── docs/                  # Documentation

## 🎯 Features

### Customer Features
- User Registration & Authentication
- Browse Restaurants by category, rating, delivery time
- Search restaurants and menu items
- Add items to cart with quantity management
- Checkout with delivery address selection
- Multiple payment methods (Card, UPI, Wallet, Cash)
- Real-time order tracking with Socket.io
- Order history and ratings
- Profile management

### Restaurant Owner Features
- Restaurant registration and approval workflow
- Add/Update/Delete menu items
- Accept/Reject orders
- Update order status
- View earnings reports
- Analytics dashboard

### Admin Features
- Approve/Reject restaurants
- Manage users and categories
- Monitor all orders and transactions
- Block suspicious accounts
- View system analytics

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configurations:
```env
MONGODB_URI=mongodb://localhost:27017/apna_rosoi
JWT_SECRET=your_secure_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Start the backend server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

### Run Both Simultaneously (from root directory)

```bash
npm install
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Restaurant Endpoints
- `GET /api/restaurants` - Get all approved restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Register new restaurant
- `PUT /api/restaurants/:id` - Update restaurant
- `PUT /api/restaurants/:id/approve` - Approve restaurant (Admin)

### Menu Endpoints
- `GET /api/menu/restaurant/:restaurantId` - Get menu by restaurant
- `GET /api/menu/:id` - Get menu item details
- `POST /api/menu/:restaurantId` - Add menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item
- `GET /api/menu/search?q=query` - Search menu items

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel order
- `PUT /api/orders/:id/rate` - Rate order

### Payment Endpoints
- `POST /api/payments/intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/:id` - Get payment status

## 🗄️ Database Schema

### User Collection
```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: { latitude, longitude }
  },
  role: String (customer/restaurant/delivery/admin),
  isActive: Boolean,
  emailVerified: Boolean,
  createdAt: Date
}
```

### Restaurant Collection
```
{
  _id: ObjectId,
  name: String,
  owner: ObjectId (ref: User),
  description: String,
  cuisine: [String],
  address: Object,
  rating: Number,
  reviewCount: Number,
  deliveryTime: Number,
  deliveryCharge: Number,
  minOrder: Number,
  isApproved: Boolean,
  isOpen: Boolean,
  totalOrders: Number,
  totalEarnings: Number,
  createdAt: Date
}
```

### MenuItem Collection
```
{
  _id: ObjectId,
  name: String,
  restaurant: ObjectId (ref: Restaurant),
  description: String,
  price: Number,
  category: String,
  image: String,
  isVegetarian: Boolean,
  isSpicy: Boolean,
  preparationTime: Number,
  rating: Number,
  isAvailable: Boolean,
  createdAt: Date
}
```

### Order Collection
```
{
  _id: ObjectId,
  orderNumber: String (unique),
  customer: ObjectId (ref: User),
  restaurant: ObjectId (ref: Restaurant),
  items: [{menuItem, name, quantity, price}],
  deliveryAddress: Object,
  totalAmount: Number,
  subtotal: Number,
  tax: Number,
  deliveryCharge: Number,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  statusHistory: [{status, timestamp, notes}],
  rating: Number,
  review: String,
  createdAt: Date,
  estimatedDeliveryTime: Date
}
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for secure password storage
- **Role-Based Access Control** - Different permissions for different roles
- **HTTPS/TLS** - Secure data transmission
- **Input Validation** - Server-side validation of all inputs
- **CORS** - Cross-Origin Resource Sharing protection
- **Environment Variables** - Sensitive data protection

## 🔌 Real-Time Features

Socket.io is used for real-time order tracking:
- Live order status updates
- Customer and restaurant notifications
- Delivery partner location updates

## 📦 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Stripe Payment Gateway
- Socket.io (Real-time)
- Bcryptjs (Password hashing)
- Nodemailer (Email notifications)

### Frontend
- React.js
- Redux Toolkit (State management)
- React Router (Routing)
- Axios (HTTP client)
- Tailwind CSS (Styling)
- React Icons (Icons)
- Socket.io Client (Real-time)
- React Toastify (Notifications)

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy build folder to Vercel/Netlify
```

## 📝 Environment Variables

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/apna_rosoi
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

STRIPE_PUBLIC_KEY=pk_test_xxxx
STRIPE_SECRET_KEY=sk_test_xxxx

FRONTEND_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For support, email support@apnarosoi.com or open an issue in the repository.

## 📄 License

This project is licensed under the ISC License.

## 🎨 Color Scheme

- **Primary Orange**: #ff6b35
- **Secondary Blue**: #004e89
- **Success Green**: #27ae60
- **Error Red**: #e74c3c
- **Warning Yellow**: #f39c12
- **Light Gray**: #ecf0f1
- **Dark Gray**: #2c3e50

## 🔄 Future Enhancements

- [ ] AI-based food recommendations
- [ ] Live GPS tracking for delivery partners
- [ ] Digital wallet system
- [ ] Subscription/loyalty program
- [ ] Chat support with restaurants
- [ ] Multi-language support
- [ ] Rating and review system improvements
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Admin dashboard with charts

---

**Made with ❤️ by Apna Rosoi Team**
