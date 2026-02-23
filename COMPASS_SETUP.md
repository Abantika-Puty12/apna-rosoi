# 🔌 MongoDB Compass Setup - Step by Step

## Current Status
✅ MongoDB is installed
✅ MongoDB Compass opened
⏳ Need to create connection and database

---

## Step 1: Add New Connection in Compass

**In MongoDB Compass:**

1. Click **"+ Add new connection"** button (green button on left)
2. A dialog appears
3. In the "Connection String" field, paste or type:
   ```
   mongodb://127.0.0.1:27017
   ```
4. Click **"Connect"** button
5. Wait 2-3 seconds...
6. You should see a list of databases on the left

---

## Step 2: Create Database

**In MongoDB Compass (after connected):**

1. Click the **"+"** button next to "DATABASES" at top
2. Dialog appears asking for:
   - **Database Name:** `apna_rosoi`
   - **Collection Name:** `users`
3. Click **"Create Database"**
4. Done! Database is created ✅

---

## Step 3: Verify Database Created

Look on the left sidebar:
- You should see: **`apna_rosoi`** database
- Inside it: **`users`** collection
- It should show as empty: `0 documents`

---

## After Compass Setup - Restart Backend

Once you've created the database in Compass, open PowerShell:

```powershell
# Go to backend directory
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi\backend"

# Start backend
npm run dev

# You should see:
# Server running on port 5000
# MongoDB connected ✅
```

---

## Then Test Signup

1. Open browser: http://localhost:3000/register
2. Fill in form:
   ```
   Name: Test User
   Email: test@example.com
   Phone: 9999999999
   Password: Test@123
   Confirm: Test@123
   Role: Customer
   ```
3. Click "Sign Up"
4. ✅ Should work!

---

## Troubleshooting Compass Connection

**If "Connect" fails:**

**Error: "connect ECONNREFUSED"**
- MongoDB service might not be running
- Try: `Get-Service "MongoDB"` in PowerShell
- If stopped, start it: `Start-Service "MongoDB"`
- Try connecting again

**Error: "getaddrinfo ENOTFOUND"**
- Wrong connection string
- Use: `mongodb://127.0.0.1:27017`
- Or: `mongodb://localhost:27017`

**Can't see databases after connecting:**
- Wait 5 seconds for Compass to load
- Refresh by clicking the refresh icon
- Check Compass window title - should say "Connected"

---

## Visual Guide

```
MongoDB Compass Window:
├── Left Sidebar
│   ├── DATABASES
│   │   ├── apna_rosoi ✅ (should appear here after step 2)
│   │   │   ├── users ✅ (collection)
│   │   └── admin
│   └── My Queries
├── Connection String: mongodb://127.0.0.1:27017
└── Status: Connected ✅
```

---

**Once done with Compass setup, run this in PowerShell:**

```powershell
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi\backend"
npm run dev
```

Then try signup! 🚀
