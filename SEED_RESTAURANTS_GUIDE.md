# 🎉 Apna Rosoi - Getting Started with Fake Restaurants

## What's Been Done ✅

I've created a **seed script** with **10 fake restaurants** ready to populate your database!

### 10 Restaurants Ready to Add:

1. 🌶️ **Spice Express** - Indian, North Indian, Vegetarian
2. 🍕 **Pizza Haven** - Italian, Pizza, Pasta
3. 🥡 **Dragon Wok** - Chinese, Asian, Noodles
4. 🍔 **Burger King Express** - American, Burgers, Fast Food
5. 🌮 **Tacos Mexico** - Mexican, Tacos, Latin American
6. 🍣 **Sushi Palace** - Japanese, Sushi, Asian
7. 🍢 **The Kebab House** - Middle Eastern, Mediterranean, Kebab
8. ☕ **Café Delight** - Café, Breakfast, Bakery
9. 🥩 **Steak & Grill** - Steakhouse, American, Grill
10. 🥗 **Vegan Paradise** - Vegan, Vegetarian, Organic

Each restaurant includes:
- ⭐ Ratings (4.2 - 4.9 out of 5)
- 📍 Real addresses and coordinates
- 📞 Contact information
- 🚗 Delivery time and charges
- 💰 Minimum order amounts
- 🕐 Operating hours
- 📊 Review counts and order history

---

## Files Created

1. **`backend/seed-restaurants.js`** - Main seed script
2. **`MONGODB_SETUP.md`** - Complete MongoDB setup guide

---

## How to Use

### Quick Start (3 steps):

#### Step 1: Set Up MongoDB
Choose ONE option:

**Option A: Local MongoDB (Windows)**
```powershell
# Download from: https://www.mongodb.com/try/download/community
# Install and run

# Verify it's running (should see connection)
mongosh
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create M0 cluster
4. Get connection string
5. Update backend/.env:
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/apna_rosoi
```

See **MONGODB_SETUP.md** for detailed instructions.

#### Step 2: Run Seed Script
```bash
cd backend
node seed-restaurants.js
```

Expected output:
```
🔄 Attempting to connect to MongoDB...
✅ Connected to MongoDB successfully

✅ Successfully added 10 fake restaurants!

📍 Restaurants Added:
1. 🌶️ Spice Express
   Cuisines: Indian, North Indian, Vegetarian
   Rating: ⭐ 4.5/5 (245 reviews)
   Delivery: 35 mins | $2.99
   ...
```

#### Step 3: Browse Restaurants
```bash
# Make sure both servers are running:
# Backend: http://localhost:5000
# Frontend: http://localhost:3000

# Open browser and visit:
http://localhost:3000
```

---

## Testing the App

After seeding restaurants:

### 1. Register Account
- Click **"Register"**
- Fill in your details
- Select **"Customer"** as role
- Create account

### 2. Login
- Use your registered email and password
- You're now logged in

### 3. Browse Restaurants
- Click **"Browse Restaurants"** on homepage
- See all 10 restaurants with:
  - Restaurant images
  - Ratings and reviews
  - Cuisine types
  - Delivery time & charge
  - Minimum order

### 4. Place Order
- Click on a restaurant
- View menu items
- Add items to cart
- Review cart
- Go to checkout
- Enter delivery address
- Select payment method
- Place order

### 5. Track Order
- Your order appears in real-time
- See status updates (preparing → ready → delivering)
- View driver location (in real system)

---

## Troubleshooting

### MongoDB Connection Issues

**Error: "connect ECONNREFUSED"**
```
Solution:
- Start MongoDB locally: mongod
- OR update .env with MongoDB Atlas connection string
- See MONGODB_SETUP.md for help
```

**Error: "Authentication failed"**
```
Solution:
- Check username/password in .env
- For Atlas: Check IP whitelist
- See MONGODB_SETUP.md for help
```

### App Not Showing Restaurants

```bash
# 1. Verify MongoDB connection
cd backend
node seed-restaurants.js

# 2. Check console output in browser (F12)
# 3. Check backend logs

# 4. Verify restaurants in MongoDB:
mongosh
use apna_rosoi
db.restaurants.count()
```

---

## File Structure

```
apna_Rosoi/
├── backend/
│   ├── seed-restaurants.js        ✨ NEW - Seed script
│   ├── server.js
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── .env                       ← Update with MongoDB URI
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── MONGODB_SETUP.md               ✨ NEW - Setup guide
├── COMPLETION_REPORT.md
├── QUICK_REFERENCE.md
└── docs/
```

---

## What's Running

### Backend Server (Port 5000)
- 40+ API endpoints
- Socket.io for real-time updates
- MongoDB connection
- Status: ✅ Running

### Frontend App (Port 3000)
- React UI with Tailwind CSS
- Restaurant listing page
- Order management
- Status: ✅ Running

### Database (MongoDB)
- 7 collections (Users, Restaurants, MenuItems, Cart, Orders, Payments, Reviews)
- 10 fake restaurants
- Status: ⏳ Needs setup

---

## Next Steps

1. ✅ Install dependencies (DONE)
2. ⏳ **Set up MongoDB** (USE MONGODB_SETUP.md)
3. ⏳ **Run seed script** (node seed-restaurants.js)
4. ✅ Start servers (Already running)
5. ⏳ **Test the app** (http://localhost:3000)

---

## Demo Test Accounts (After Registration)

**Customer Account:**
- Email: customer@test.com
- Password: Test@123

**Restaurant Account:**
- Email: restaurant@test.com
- Password: Test@123

---

## Quick Commands Reference

```bash
# Seed restaurants
cd backend && node seed-restaurants.js

# View restaurants in MongoDB
mongosh
use apna_rosoi
db.restaurants.find().pretty()

# Stop all servers (in terminal)
Ctrl + C

# Check if MongoDB is running
mongosh

# Start fresh
# Delete collection:
db.restaurants.deleteMany({})
# Re-seed:
node seed-restaurants.js
```

---

## Important Notes

⚠️ **Before Seeding:**
- MongoDB must be running
- .env file configured with correct MongoDB URI
- Internet connection for MongoDB Atlas (if using cloud)

✅ **After Seeding:**
- 10 restaurants available in the app
- Each has realistic menu (you can add menu items through admin)
- All restaurants "approved" and "open" by default
- Real images from Unsplash (loading might be slow)

🔧 **Need Help?**
- Check MONGODB_SETUP.md for detailed instructions
- Check QUICK_REFERENCE.md for API reference
- Check console (F12) for errors
- Check backend logs for API errors

---

## Restaurant Details

Each seeded restaurant includes:

```javascript
{
  name: "Restaurant Name",
  description: "Full description",
  cuisine: ["Cuisine1", "Cuisine2"],
  address: {
    street: "Street address",
    city: "City",
    coordinates: { latitude: 0, longitude: 0 }
  },
  phone: "+1 (555) 123-4567",
  rating: 4.5,
  reviewCount: 245,
  deliveryTime: 35,        // minutes
  deliveryCharge: 2.99,    // dollars
  minOrder: 15,            // dollars
  operatingHours: {
    open: "10:00 AM",
    close: "11:00 PM"
  },
  image: "URL",
  coverImage: "URL"
}
```

---

## Success Indicators ✨

You'll know it's working when:

1. ✅ Seed script runs without errors
2. ✅ Restaurants appear on homepage
3. ✅ Each restaurant shows with image, rating, cuisines
4. ✅ Can click restaurant to see menu
5. ✅ Can add items to cart
6. ✅ Can complete order flow

---

## Performance Tips

- First load might be slow (images from Unsplash)
- Images will be cached after first load
- Consider using smaller images for production
- MongoDB Atlas free tier has monthly limits

---

**Ready to go? Start with MONGODB_SETUP.md! 🚀**

