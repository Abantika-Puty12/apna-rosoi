# 🛠️ MongoDB Local Installation Guide (Windows)

## Step 1: Download MongoDB

1. Go to: https://www.mongodb.com/try/download/community
2. Make sure you see this page:
   - Platform: **Windows**
   - Package: **MSI (Installer)**
   - Version: **Latest** (should be 7.x or higher)

3. Click the **Download** button
4. Wait for the .msi file to download (about 200MB)

---

## Step 2: Install MongoDB

1. **Find the downloaded file**
   - Usually in: `C:\Users\YourName\Downloads`
   - Look for: `mongodb-windows-x86_64-X.X.X.msi`

2. **Double-click to run installer**

3. **Installation wizard appears - Follow these steps:**

   **Screen 1: Welcome**
   - Click "Next >"

   **Screen 2: End-User License Agreement**
   - ✅ Check "I accept the terms..."
   - Click "Next >"

   **Screen 3: Custom Setup**
   - Leave as default
   - Click "Next >"

   **Screen 4: Service Configuration** (IMPORTANT!)
   - ✅ **Check "Install MongoDB as a Windows Service"** 
   - ✅ **Check "Run the service as Network Service"**
   - Data Directory: Leave default `C:\data\db`
   - Log Directory: Leave default
   - Click "Next >"

   **Screen 5: MongoDB Compass** (Optional)
   - You can uncheck this (we don't need it)
   - Click "Next >"

   **Screen 6: Ready to Install**
   - Review settings
   - Click "Install"
   - Wait 2-3 minutes...

4. **Installation complete**
   - Click "Finish"

---

## Step 3: Verify MongoDB is Running

Open PowerShell and run:

```powershell
# Test if MongoDB is running
mongosh

# You should see:
# Current Mongosh Log ID: xxxxx
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
# test>

# If you see "test>" prompt, MongoDB is running! ✅

# Exit MongoDB shell:
exit
```

**If you get "mongosh: command not found":**
```powershell
# It might be installed in Program Files, try:
"C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"

# Or add to PATH (advanced)
```

---

## Step 4: Verify MongoDB Service is Running

Open PowerShell as **Administrator**:

```powershell
# Check MongoDB service status
Get-Service "MongoDB"

# You should see:
# Status   Name            DisplayName
# ------   ----            -----------
# Running  MongoDB         MongoDB

# If status is "Stopped", start it:
Start-Service "MongoDB"

# Verify again:
Get-Service "MongoDB"
```

---

## Step 5: Restart Your Backend

Now MongoDB is running, restart the backend:

```powershell
cd "C:\Users\praka\OneDrive\Desktop\apna_Rosoi\backend"

# Kill previous npm process (if any)
# Press Ctrl+C

# Start backend fresh
npm run dev

# You should see:
# Server running on port 5000
# MongoDB connected  ✅
```

---

## Step 6: Test Signup

1. Open browser: http://localhost:3000
2. Click **"Register"**
3. Fill in form:
   ```
   Name: Test User
   Email: test@example.com
   Phone: 9999999999
   Password: Test@123
   Confirm Password: Test@123
   Role: Customer
   ```
4. Click **"Sign Up"**
5. You should see: **"Registration successful!"** ✅

---

## Troubleshooting

### "mongosh: command not found"

Try the full path:
```powershell
"C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"

# If you see "test>" it's working
```

### "Can't connect to port 27017"

MongoDB might not have started. Try:
```powershell
# Check service
Get-Service "MongoDB"

# If Stopped, start it
Start-Service "MongoDB"

# Wait 3 seconds
Start-Sleep 3

# Try again
mongosh
```

### "Address already in use"

MongoDB is already running (good!). Just try signup.

### Installation stuck or failed

1. Uninstall MongoDB:
   - Settings → Apps → Apps & features
   - Find "MongoDB"
   - Click Uninstall
   - Restart computer

2. Download fresh:
   - Clear Downloads folder
   - Download again from: https://www.mongodb.com/try/download/community
   - Run installer again

---

## Verify Everything is Working

```powershell
# Terminal 1: Check MongoDB running
mongosh
# Should show "test>" prompt
exit

# Terminal 2: Check backend connected
cd backend
npm run dev
# Should show "MongoDB connected"

# Terminal 3: Check frontend
# Already running at http://localhost:3000

# Try signup at:
# http://localhost:3000/register
```

---

## Windows Task Manager Check

If you want to verify MongoDB is running:

1. Press **Ctrl + Shift + Esc** (open Task Manager)
2. Go to **Services** tab
3. Look for **"MongoDB"**
4. Status should show **"Running"**

---

## Auto-Start in Future

MongoDB is now set to run automatically when you restart your computer!

Each time you start working:
1. MongoDB starts automatically (no action needed)
2. Start backend: `npm run dev`
3. Frontend already running
4. Everything works! ✅

---

## Uninstall MongoDB (if needed later)

```powershell
# Stop the service
Stop-Service "MongoDB"

# Uninstall
# Settings → Apps → Apps & features → MongoDB → Uninstall
```

---

## Next Steps

Once MongoDB is installed and running:

1. ✅ Restart backend server
2. ✅ Try signup again
3. ✅ Test placing an order
4. ✅ Test restaurants browsing

**You're almost there!** 🚀

