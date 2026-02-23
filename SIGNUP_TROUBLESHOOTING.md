# 🔍 Signup Failure Troubleshooting Guide

## Common Reasons Why Signup Fails

### ❌ **Most Likely Issue: MongoDB Not Running**

When you try to signup:
1. Frontend sends data to Backend API
2. Backend tries to save user to MongoDB
3. **MongoDB connection fails** → Signup fails silently

**Check if MongoDB is running:**

```powershell
# Try to connect to MongoDB
mongosh

# If you see an error like "connect ECONNREFUSED", MongoDB is NOT running
```

---

## Solutions

### Solution 1: Start Local MongoDB (Windows)

```powershell
# Open new PowerShell terminal and run:
mongod

# You should see: "waiting for connections on port 27017"

# Keep this running, then try signup again
```

### Solution 2: Use MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create M0 cluster
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/apna_rosoi`
5. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/apna_rosoi
   ```
6. Restart backend server: `npm run dev`

---

## How to Debug

### Step 1: Check Backend Console
Look for errors like:
```
❌ MongoDB connection error: connect ECONNREFUSED ::1:27017
```

If you see this, MongoDB isn't running.

### Step 2: Check Frontend Console (F12)
Open browser Developer Tools:
- Press `F12`
- Go to **Console** tab
- Try signup again
- Look for errors like:
  - `Failed to fetch` - Backend not responding
  - `500 error` - Backend error
  - `Network tab` - See actual request/response

### Step 3: Check Network Request
In Developer Tools (F12):
- Go to **Network** tab
- Try signup
- Click on POST request to `/api/auth/register`
- Check **Response** tab for error message

---

## Step-by-Step Fix

### **STEP 1: Verify MongoDB**
```powershell
# Open new terminal
mongosh

# You should see the MongoDB prompt:
# test>

# If error: "MongooseServerSelectionError", MongoDB isn't running
# Start it first: mongod
```

### **STEP 2: Check Backend Connection**
```powershell
# In backend terminal, look for:
✅ "MongoDB connected"  ← GOOD

# Or error:
❌ "MongoDB connection error" ← BAD - MongoDB not running
```

### **STEP 3: Test Backend API Directly**
```powershell
# Open PowerShell and test the registration endpoint:
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "Test@123"
    phone = "9999999999"
    role = "customer"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type" = "application/json"} `
  -Body $body
```

### **STEP 4: Try Signup Again**
Once MongoDB is connected, signup should work!

---

## Quick Checklist

- [ ] MongoDB is installed
- [ ] MongoDB is running (mongod)
- [ ] .env file has MONGODB_URI
- [ ] Backend shows "MongoDB connected"
- [ ] Backend server is running
- [ ] Frontend server is running
- [ ] You can see both in browser

---

## Error Messages & Solutions

### "Failed to fetch"
```
❌ Backend server not running
✅ Solution: npm run dev (in backend directory)
```

### "500 Internal Server Error"
```
❌ Backend error (check console)
✅ Solution: Check backend terminal for MongoDB connection error
```

### "connect ECONNREFUSED"
```
❌ MongoDB not running
✅ Solution: 
   - Local: Start mongod in new terminal
   - Atlas: Update .env with correct connection string
```

### "Network error"
```
❌ CORS issue or wrong URL
✅ Solution: Check .env FRONTEND_URL matches http://localhost:3000
```

### "Email already exists"
```
❌ You already registered with this email
✅ Solution: Use different email or clear MongoDB: db.users.deleteMany({})
```

---

## Manual Database Check

```powershell
# Open MongoDB shell
mongosh

# Switch to database
use apna_rosoi

# Check if users collection exists
db.users.find()

# See how many users
db.users.count()

# Delete all users (to start fresh)
db.users.deleteMany({})

# Exit
exit
```

---

## Full Startup Sequence

1. **Terminal 1: Start MongoDB**
   ```powershell
   mongod
   ```
   Wait for "waiting for connections on port 27017"

2. **Terminal 2: Start Backend**
   ```powershell
   cd backend
   npm run dev
   ```
   Wait for "Server running on port 5000"

3. **Terminal 3: Start Frontend**
   ```powershell
   cd frontend
   npm start
   ```
   Wait for "Compiled successfully" in browser

4. **Try Signup**
   - Open http://localhost:3000
   - Click Register
   - Fill in form
   - Click Sign Up button

---

## Still Not Working?

1. Check both terminal outputs for error messages
2. Open browser Developer Tools (F12)
3. Check Network tab for response
4. Check Console tab for JavaScript errors
5. Share the error message from:
   - Backend terminal
   - Browser console (F12)
   - Network response (F12 → Network tab)

---

## Quick Test

```powershell
# Verify all 3 are running:

# Test Backend
curl http://localhost:5000

# Test Frontend
curl http://localhost:3000

# Test MongoDB
mongosh -e "db.version()"

# All should return data without errors
```

---

**Let me know what error you see and I can fix it!** 🚀
