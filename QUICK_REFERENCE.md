# Apna Rosoi - Quick Reference Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Step 2: Configure Environment
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env` and set:
```env
MONGODB_URI=mongodb://localhost:27017/apna_rosoi
JWT_SECRET=your_secret_key
```

### Step 3: Start Services
```bash
# Terminal 1: Start Backend
cd backend && npm run dev

# Terminal 2: Start Frontend
cd frontend && npm start
```

### Step 4: Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 👤 Test Accounts

### Customer Account
```
Email: customer@test.com
Password: customer123
```

### Restaurant Account
```
Email: restaurant@test.com
Password: restaurant123
```

### Admin Account
```
Email: admin@test.com
Password: admin123
```

## 📋 Common Tasks

### Register New User
```javascript
// Frontend: Use registration form
// OR Backend: POST /api/auth/register
{
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  phone: "9876543210"
}
```

### Create Order
```javascript
// 1. Add items to cart
// 2. Go to checkout
// 3. Enter delivery address
// 4. Select payment method
// 5. Place order
```

### Track Order
```javascript
// After placing order:
// Click "Track Order" button
// See real-time status updates
// Chat with delivery partner (future)
```

### Manage Menu Items (Restaurant)
```bash
POST /api/menu/:restaurantId    # Add item
PUT /api/menu/:id               # Edit item
DELETE /api/menu/:id            # Delete item
GET /api/menu/restaurant/:id    # View all items
```

### Approve Restaurants (Admin)
```bash
PUT /api/restaurants/:id/approve
```

## 🔧 Useful Commands

### Backend Commands
```bash
npm run dev          # Start dev server with nodemon
npm start           # Start production server
npm test            # Run tests
```

### Frontend Commands
```bash
npm start           # Start dev server
npm run build       # Create production build
npm test            # Run tests
npm run eject       # Eject from CRA (irreversible)
```

### MongoDB
```bash
mongod              # Start MongoDB
mongo              # Connect to MongoDB shell
```

### Git Commands
```bash
git init           # Initialize repo
git add .          # Stage all changes
git commit -m "message"  # Commit changes
git push           # Push to remote
```

## 📁 Important Files to Edit

### Backend Configuration
- `backend/.env` - Environment variables
- `backend/server.js` - Main server file
- `backend/routes/*.js` - API endpoints

### Frontend Configuration
- `frontend/src/App.js` - Main app component
- `frontend/src/redux/store.js` - Redux store
- `frontend/src/utils/api.js` - API calls

### Database
- `backend/models/*.js` - Database schemas
- Add indexes in models for performance

## 🧪 Testing with Postman

1. **Import Collection**
   - Create new collection
   - Add requests for each endpoint

2. **Common Test Flow**
   ```
   1. POST /api/auth/register
   2. POST /api/auth/login (save token)
   3. GET /api/users/profile (use token)
   4. GET /api/restaurants
   ```

3. **Headers for Protected Endpoints**
   ```
   Authorization: Bearer <your_jwt_token>
   Content-Type: application/json
   ```

## 🚨 Troubleshooting

### MongoDB Not Connected
```bash
# Check if MongoDB is running
mongod

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/apna_rosoi

# Test connection
mongo mongodb://localhost:27017/apna_rosoi
```

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  (Mac/Linux)
netstat -ano | findstr :5000  (Windows)

# Kill process
kill -9 <PID>  (Mac/Linux)
taskkill /PID <PID> /F  (Windows)
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```bash
# Check FRONTEND_URL in backend/.env
# Should match your frontend URL
FRONTEND_URL=http://localhost:3000
```

## 📊 API Endpoints Cheat Sheet

```
AUTHENTICATION
POST   /auth/register          Register user
POST   /auth/login             Login user
GET    /auth/verify            Verify token

USERS
GET    /users/profile          Get profile
PUT    /users/profile          Update profile
GET    /users                  Get all users (Admin)

RESTAURANTS
GET    /restaurants            Get all restaurants
POST   /restaurants            Create restaurant
GET    /restaurants/:id        Get restaurant details
PUT    /restaurants/:id        Update restaurant
GET    /restaurants/search     Search restaurants

MENU
GET    /menu/restaurant/:id    Get menu
POST   /menu/:id               Add item
PUT    /menu/:id               Update item
DELETE /menu/:id               Delete item
GET    /menu/search            Search menu

CART
GET    /cart                   Get cart
POST   /cart                   Add to cart
PUT    /cart/:itemId           Update quantity
DELETE /cart/:itemId           Remove item
DELETE /cart                   Clear cart

ORDERS
POST   /orders                 Create order
GET    /orders                 Get my orders
GET    /orders/:id             Get order details
PUT    /orders/:id/status      Update status
PUT    /orders/:id/rate        Rate order

PAYMENTS
POST   /payments/intent        Create intent
POST   /payments/confirm       Confirm payment
GET    /payments/:id           Get payment status
```

## 🎨 Color Reference

```
PRIMARY ORANGE:    #FF6B35
SECONDARY BLUE:    #004E89
SUCCESS GREEN:     #27AE60
ERROR RED:         #E74C3C
WARNING YELLOW:    #F39C12
LIGHT GRAY:        #ECF0F1
DARK GRAY:         #2C3E50
```

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in .env
- [ ] Setup HTTPS in production
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Setup firewall rules
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Setup SSL certificates

## 📈 Performance Checklist

- [ ] Enable database indexing
- [ ] Implement caching (Redis)
- [ ] Optimize images
- [ ] Code splitting (React)
- [ ] Setup CDN
- [ ] Monitor API response times
- [ ] Setup load balancing
- [ ] Database query optimization

## 🚀 Deployment Checklist

- [ ] Build frontend
- [ ] Test all endpoints
- [ ] Configure production .env
- [ ] Setup SSL/TLS
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Setup monitoring
- [ ] Configure backups
- [ ] Test payment flow
- [ ] Setup analytics

## 📞 Support Resources

| Resource | Link |
|----------|------|
| Express Docs | https://expressjs.com |
| React Docs | https://react.dev |
| MongoDB Docs | https://docs.mongodb.com |
| Stripe Docs | https://stripe.com/docs |
| Socket.io Docs | https://socket.io/docs |
| Redux Docs | https://redux.js.org |
| Tailwind Docs | https://tailwindcss.com |

## 🎯 Development Tips

1. **Use VS Code Extensions**
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - MongoDB for VS Code
   - REST Client

2. **Browser Dev Tools**
   - Redux DevTools
   - React Developer Tools
   - Network tab for API debugging

3. **Testing Tools**
   - Postman for API testing
   - Jest for unit tests
   - Selenium for E2E testing

4. **Version Control**
   - Commit frequently
   - Use meaningful commit messages
   - Create branches for features

## 📝 Environment Variables Reference

```bash
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/apna_rosoi

# Authentication
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
BCRYPT_ROUND=10

# Email (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Payment
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# URLs
FRONTEND_URL=http://localhost:3000
PAYMENT_SUCCESS_URL=http://localhost:3000/order-success
PAYMENT_CANCEL_URL=http://localhost:3000/checkout
```

## 🔄 Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/awesome-feature

# 2. Make changes and commit
git add .
git commit -m "Add awesome feature"

# 3. Push to remote
git push origin feature/awesome-feature

# 4. Create pull request
# (via GitHub/GitLab interface)

# 5. Merge to main
git checkout main
git merge feature/awesome-feature
```

## 📊 File Structure Reference

```
Backend Files:
├── Models      → Database schemas
├── Controllers → Business logic
├── Routes      → API endpoints
├── Middleware  → Auth, validation
└── Server.js   → Express app

Frontend Files:
├── Components  → Reusable UI
├── Pages       → Page components
├── Redux       → State management
├── Utils       → Helper functions
└── App.js      → Main component
```

---

**Last Updated**: February 22, 2026
**Version**: 1.0.0

**Happy Coding! 🚀**
