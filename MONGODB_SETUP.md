# MongoDB Setup Guide for Apna Rosoi

To seed restaurants into your database, you need to set up MongoDB. Choose one of the following options:

---

## Option 1: Local MongoDB Installation (Recommended for Development)

### Step 1: Download MongoDB
Visit: https://www.mongodb.com/try/download/community

Choose your operating system (Windows, macOS, or Linux) and download the Community Edition.

### Step 2: Install MongoDB
**Windows:**
- Run the installer (.msi file)
- Follow the installation wizard
- Choose "Install MongoDB as a Windows Service" (recommended)
- MongoDB will start automatically

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
curl https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Step 3: Verify Installation
Open Terminal/PowerShell and run:
```bash
mongosh
```

If you see the MongoDB shell prompt, MongoDB is installed correctly.

### Step 4: Seed the Restaurants
From your backend directory:
```bash
node seed-restaurants.js
```

---

## Option 2: MongoDB Atlas (Cloud) - Free

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up with email or Google account
3. Create a new project

### Step 2: Create a Free Cluster
1. Click "Create" to build a new cluster
2. Choose "M0 Sandbox" (free tier)
3. Select your preferred cloud provider and region
4. Click "Create Cluster"
5. Wait for cluster to deploy (2-3 minutes)

### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Enter username (e.g., `apna_rosoi_user`)
4. Set password (save this somewhere safe)
5. Click "Add User"

### Step 4: Whitelist Your IP
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Add Current IP Address" OR "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "3.12 or later"
4. Copy the connection string

Replace:
- `<username>` with your database user
- `<password>` with your password
- `<dbname>` with `apna_rosoi`

Example:
```
mongodb+srv://apna_rosoi_user:your_password@cluster0.abcd123.mongodb.net/apna_rosoi?retryWrites=true&w=majority
```

### Step 6: Update `.env` File
In `backend/.env`, update:
```
MONGODB_URI=mongodb+srv://apna_rosoi_user:your_password@cluster0.abcd123.mongodb.net/apna_rosoi
```

### Step 7: Seed the Restaurants
```bash
node seed-restaurants.js
```

---

## Option 3: Docker Container (Advanced)

If you have Docker installed:

```bash
# Pull and run MongoDB image
docker run -d -p 27017:27017 --name apna_rosoi_db mongo:latest

# Seed restaurants
node seed-restaurants.js

# Stop container
docker stop apna_rosoi_db

# Remove container
docker rm apna_rosoi_db
```

---

## Troubleshooting

### "connect ECONNREFUSED ::1:27017"
- MongoDB is not running
- Start MongoDB or check your connection string

### "MongooseServerSelectionError"
- Check your MongoDB URI is correct
- Verify MongoDB server is running
- Check firewall settings

### "ENOTFOUND"
- Check your internet connection (for MongoDB Atlas)
- Verify the connection string is correct

### "Authentication failed"
- Wrong username/password
- IP not whitelisted (for Atlas)
- User doesn't exist in database

---

## Verify Restaurants Were Added

After running the seed script:

1. **Using MongoDB Shell:**
   ```bash
   mongosh
   use apna_rosoi
   db.restaurants.count()
   db.restaurants.find().pretty()
   ```

2. **Using MongoDB Atlas UI:**
   - Go to Atlas Dashboard
   - Click "Browse Collections"
   - Navigate to `apna_rosoi` database
   - Select `restaurants` collection
   - See all 10 restaurants

3. **In Your App:**
   - Visit http://localhost:3000
   - Click "Browse Restaurants"
   - See all 10 restaurants displayed

---

## Next Steps

Once restaurants are seeded:

1. Open http://localhost:3000 in your browser
2. Click "Register" to create a test account
3. Sign up as a customer
4. Browse and add items to cart
5. Proceed to checkout
6. Place an order

Enjoy using Apna Rosoi! 🚀

