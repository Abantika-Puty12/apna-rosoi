# Installation & Setup Guide

## System Requirements

- Node.js v14+ or v16+
- MongoDB 4.0+
- npm or yarn
- Git

## Step-by-Step Installation

### 1. Clone or Extract Project

```bash
cd apna_Rosoi
```

### 2. Backend Setup

#### a. Install Dependencies
```bash
cd backend
npm install
```

#### b. Create Environment File
```bash
cp .env.example .env
```

#### c. Configure Environment Variables

Edit `backend/.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/apna_rosoi

# JWT Configuration
JWT_SECRET=your_very_secure_jwt_secret_key_change_this
JWT_EXPIRE=7d
BCRYPT_ROUND=10

# Email Configuration (Optional - for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Stripe Payment Configuration
STRIPE_PUBLIC_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_test_your_webhook_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Payment URLs
PAYMENT_SUCCESS_URL=http://localhost:3000/order-success
PAYMENT_CANCEL_URL=http://localhost:3000/checkout
```

#### d. Start MongoDB

**Option 1: Local MongoDB**
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option 2: MongoDB Atlas (Cloud)**
- Visit https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

#### e. Start Backend Server
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### a. Install Dependencies
```bash
cd frontend
npm install
```

#### b. Start Development Server
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Running Both Simultaneously

### Option 1: Using npm concurrently (from root directory)

```bash
# Install root dependencies
npm install

# Run both backend and frontend
npm run dev
```

### Option 2: Using separate terminals

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## Testing the Application

### 1. Access Frontend
- Open browser: `http://localhost:3000`

### 2. Test Registration
- Click "Sign Up"
- Create account with:
  - Name: Test User
  - Email: test@example.com
  - Password: Test@123
  - Phone: 9876543210
  - Role: Customer

### 3. Test API Endpoints (using Postman/Thunder Client)

#### Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "customer"
}
```

#### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```
GET http://localhost:5000/api/users/profile
Authorization: Bearer <token_from_login>
```

#### Get Restaurants
```
GET http://localhost:5000/api/restaurants
```

## Troubleshooting

### MongoDB Connection Failed

**Issue:** Connection refused error
**Solution:**
1. Ensure MongoDB is running
2. Check `MONGODB_URI` in `.env`
3. If using MongoDB Atlas, ensure IP whitelist includes your IP

### Port Already in Use

**Issue:** EADDRINUSE error
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Module Not Found

**Issue:** Cannot find module error
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Error

**Issue:** Cross-Origin Request Blocked
**Solution:**
1. Check `FRONTEND_URL` in backend `.env`
2. Ensure CORS middleware is configured correctly
3. Clear browser cache

### Hot Reload Not Working

**Issue:** Changes not reflected in browser
**Solution:**
1. Check if dev server is running
2. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Restart dev server

## Database Seeding (Optional)

Create sample data for testing:

```bash
cd backend

# Create seed file: scripts/seed.js
# Run seed
node scripts/seed.js
```

## Production Build

### Frontend Build
```bash
cd frontend
npm run build
```

Build artifacts in `frontend/build`

### Backend Production Run
```bash
cd backend
NODE_ENV=production npm start
```

## Next Steps

1. **Add Real Data**
   - Register restaurants
   - Add menu items
   - Create test orders

2. **Configure Payment**
   - Get Stripe test keys
   - Update `.env` file
   - Test payment flow

3. **Setup Email**
   - Configure Gmail App Password
   - Enable notification emails
   - Test email delivery

4. **Deploy**
   - Backend to Heroku/AWS
   - Frontend to Vercel/Netlify
   - Database to MongoDB Atlas

## Getting Help

- Check error logs in terminal
- Review database with MongoDB Compass
- Use browser DevTools for frontend debugging
- Check Postman for API testing
- Review documentation files

---

**Happy Coding! 🚀**
