# 🔴 Signup Server Error - Debugging Guide

## Step 1: Check Backend Terminal Error

Look in **Terminal 2 (Backend)** for error messages like:

```
❌ Error: [error message]
❌ ValidationError: [field name]
❌ MongoError: [database error]
❌ TypeError: [code error]
```

**Tell me what you see!**

---

## Step 2: Check Browser Console (F12)

1. Press **F12** in browser
2. Go to **Console** tab
3. Look for red error messages
4. Screenshot and share with me

---

## Step 3: Check Network Response

1. Press **F12** in browser
2. Go to **Network** tab
3. Try signup again
4. Find the **POST request** to `/api/auth/register`
5. Click on it
6. Go to **Response** tab
7. See the error message from backend

Example error responses:
```json
{"message": "Email already exists"}
{"message": "Validation failed: email is required"}
{"message": "MongoDB connection error"}
```

---

## Common Signup Errors & Solutions

### Error 1: "MongoDB connection error"
```
❌ Problem: Backend can't connect to database
✅ Solution:
   1. Check MongoDB is running: mongosh
   2. Restart backend: npm run dev
```

### Error 2: "Email already exists"
```
❌ Problem: You already signed up with this email
✅ Solution:
   1. Use different email
   2. OR clear users collection: db.users.deleteMany({})
```

### Error 3: "Validation failed: password is required"
```
❌ Problem: Password field is empty or too short
✅ Solution:
   1. Check password is at least 6 characters
   2. Password shouldn't have special characters initially
```

### Error 4: "Cannot read property 'name' of undefined"
```
❌ Problem: Form data not being sent correctly
✅ Solution:
   1. Fill in ALL fields completely
   2. No empty spaces
```

### Error 5: "TypeError: Cannot set property"
```
❌ Problem: Backend code error (my bug!)
✅ Solution:
   1. Tell me the exact error
   2. I'll fix it
```

---

## Step-by-Step Troubleshooting

### 1. Verify Backend is Running

```powershell
# In Terminal 2, you should see:
Server running on port 5000

# If you don't see this, backend crashed
# Check for red errors above it
```

### 2. Verify MongoDB Connected

The backend SHOULD show (check Terminal 2):
```
MongoDB connected ✅
```

**If you see:**
```
MongoDB connection error: connect ECONNREFUSED
```

Then MongoDB is not running:
```powershell
# Fix it:
Start-Service "MongoDB"
# Restart backend
npm run dev
```

### 3. Verify Form Data

Before clicking Sign Up, make sure:
- ✅ Name: Not empty
- ✅ Email: Valid email format (has @)
- ✅ Phone: 10 digits
- ✅ Password: At least 6 characters
- ✅ Confirm Password: Matches password
- ✅ Role: Selected (Customer or Restaurant)

### 4. Test with Simple Data

```
Name:               John
Email:              john@test.com
Phone:              9876543210
Password:           123456
Confirm Password:   123456
Role:               Customer
```

If this works, the issue is with your data format.

---

## Debug Backend Directly

If you want to test the API directly (advanced):

```powershell
# Open PowerShell and run:
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

# Check Response
```

---

## Quick Checklist

- [ ] MongoDB running? (`mongosh` works)
- [ ] Backend started? (shows "Server running on port 5000")
- [ ] Frontend running? (http://localhost:3000 works)
- [ ] All form fields filled?
- [ ] Email format correct? (has @)
- [ ] Password matches confirmation?
- [ ] Role selected?

---

## What to Tell Me to Fix

Please share:

1. **What error you see in browser** (F12 Console)
2. **What error in backend terminal** (Terminal 2)
3. **What data you entered**
4. **Screenshot of F12 Network Response**

Then I can fix it! ✅

---

## Fast Fixes to Try Now

```powershell
# 1. Clear old signup attempts
mongosh
use apna_rosoi
db.users.deleteMany({})
exit

# 2. Restart backend
cd backend
npm run dev

# 3. Try signup again with NEW email
```

If signup still fails, tell me the exact error message! 🔍
