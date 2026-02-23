# 🚀 How to Run Apna Rosoi - Complete Guide

## Quick Start (3 Terminal Windows)

### **Terminal 1: MongoDB** (Already Running ✅)
MongoDB is already running as a Windows Service. No action needed!

Verify it's running:
```powershell
mongosh
# Should show "test>" prompt
exit
```

---

### **Terminal 2: Start Backend Server**

```powershell
# Navigate to backend directory
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi\backend"

# Start backend
npm run dev

# Expected output:
# Server running on port 5000 ✅
# (MongoDB connects automatically)
```

**Keep this terminal open.** Backend runs on: `http://localhost:5000`

---

### **Terminal 3: Start Frontend App**

```powershell
# Navigate to frontend directory
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi\frontend"

# Start frontend
npm start

# Expected output:
# Compiled successfully ✅
# (Browser opens automatically)
```

**Keep this terminal open.** Frontend runs on: `http://localhost:3000`

---

## 🎯 Once Everything is Running

### **Access the App**
- Open browser: **http://localhost:3000**
- You should see the homepage with restaurants

### **Register Account**
1. Click **"Register"** button
2. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Phone: Your phone number
   - Password: Strong password
   - Role: **Customer** (or Restaurant Owner)
3. Click **"Sign Up"**
4. You're logged in! ✅

### **Browse Restaurants**
1. Click **"Browse Restaurants"**
2. See all available restaurants
3. Click on restaurant to view menu

### **Place an Order**
1. Select restaurant
2. Add items to cart
3. Click cart icon
4. Review items
5. Click "Checkout"
6. Enter delivery address
7. Select payment method
8. Click "Place Order"
9. See real-time order tracking ✅

---

## 📋 Full Setup Command List

### First Time Setup (One Time Only)

```powershell
# 1. Install backend dependencies
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi\backend"
npm install

# 2. Install frontend dependencies
cd "..\frontend"
npm install

# 3. Done! Dependencies installed
```

### Every Time You Want to Run the App

```powershell
# Terminal 1: Check MongoDB (already running)
mongosh
exit

# Terminal 2: Start Backend
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi\backend"
npm run dev

# Terminal 3: Start Frontend (wait 10 seconds after backend starts)
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi\frontend"
npm start
```

---

## 🔄 Startup Sequence (Recommended)

**Step 1:** Open 3 PowerShell windows

**Step 2:** In each window, navigate to project folder:
```powershell
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi"
```

**Step 3:** Window 1 - Verify MongoDB:
```powershell
mongosh
# Show "test>" then type: exit
```

**Step 4:** Window 2 - Start Backend:
```powershell
cd backend
npm run dev
# Wait for: "Server running on port 5000"
```

**Step 5:** Window 3 - Start Frontend:
```powershell
cd frontend
npm start
# Wait for: "Compiled successfully"
```

**Step 6:** Browser opens automatically → http://localhost:3000 ✅

---

## 🐛 Troubleshooting Startup Issues

### "mongosh: command not found"
```powershell
# Try full path
"C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"
```

### Backend starts but "MongoDB connection error"
```powershell
# Check MongoDB service
Get-Service "MongoDB"

# If Stopped, start it
Start-Service "MongoDB"

# Wait 3 seconds then restart backend
```

### Frontend won't compile
```powershell
# Clear cache
cd frontend
rm -r node_modules
npm install
npm start
```

### Port already in use
```powershell
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000
# Then: taskkill /PID <PID> /F

# Or restart computer
```

---

## 📊 Services Running Status

Check if everything is running:

```powershell
# Check MongoDB
mongosh -e "db.version()"
# Should return version number

# Check Backend
curl http://localhost:5000
# Should return some response

# Check Frontend
curl http://localhost:3000
# Should return HTML
```

---

## 🎮 Test User Workflows

### **Customer Workflow**
1. Register as Customer
2. Browse restaurants
3. Select restaurant
4. View menu items
5. Add 2-3 items to cart
6. Go to cart
7. Checkout
8. Enter address
9. Place order
10. Track order ✅

### **Restaurant Owner Workflow**
1. Register as Restaurant Owner
2. Wait for admin approval (or manually approve in MongoDB)
3. View your restaurant
4. Add menu items
5. View incoming orders
6. Update order status
7. Complete order ✅

### **Admin Workflow**
1. Register first account as admin (manually set in MongoDB)
2. Approve restaurants
3. View all orders
4. Monitor users
5. View payments ✅

---

## 📁 Directory Structure for Running

```
apna_Rosoi/
├── backend/                    ← Terminal 2: npm run dev
│   ├── server.js
│   ├── package.json
│   ├── .env                    ← MongoDB connection here
│   └── models/, controllers/, routes/
│
├── frontend/                   ← Terminal 3: npm start
│   ├── src/
│   ├── public/
│   └── package.json
│
└── docs/                       ← Documentation
    ├── README.md
    ├── QUICK_REFERENCE.md
    └── ...
```

---

## 🔑 Important Environment Variables

Check `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/apna_rosoi
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

If anything is missing, update it!

---

## ⚡ Quick Reference

| Service | Port | Command | Status |
|---------|------|---------|--------|
| MongoDB | 27017 | (auto) | ✅ |
| Backend | 5000 | `npm run dev` | Start Terminal 2 |
| Frontend | 3000 | `npm start` | Start Terminal 3 |

---

## 🛑 Stop the App

To stop everything:

```powershell
# In each terminal window
Ctrl + C

# This stops the servers
# MongoDB continues running (service)

# To stop MongoDB service
Stop-Service "MongoDB"

# To restart it
Start-Service "MongoDB"
```

---

## 🔄 Restart the App (After Changes)

1. Backend auto-reloads on file changes (nodemon)
2. Frontend auto-reloads on file changes
3. Just save your files! 🎉

To manually restart:
```powershell
# In backend terminal
Ctrl + C
npm run dev

# In frontend terminal
Ctrl + C
npm start
```

---

## 📝 Summary

**Every time you want to use the app:**

```powershell
# Terminal 1: Check MongoDB
mongosh
exit

# Terminal 2: Start Backend
cd backend
npm run dev

# Terminal 3: Start Frontend (after 10 seconds)
cd frontend
npm start

# Open: http://localhost:3000 ✅
```

**That's it!** The app is ready to use! 🚀

