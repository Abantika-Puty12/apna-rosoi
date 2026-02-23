#!/usr/bin/env node

/**
 * IMPORTANT: To use this seed script, you need:
 * 1. MongoDB running locally (mongod) OR
 * 2. MongoDB Atlas connection string in .env file
 * 
 * Option A: Use Local MongoDB
 * ============================
 * Download MongoDB from: https://www.mongodb.com/try/download/community
 * Start MongoDB: mongod
 * Then run: node seed-restaurants.js
 * 
 * Option B: Use MongoDB Atlas (Cloud)
 * =====================================
 * 1. Create account at https://www.mongodb.com/cloud/atlas
 * 2. Create a cluster
 * 3. Get connection string: mongodb+srv://username:password@cluster.mongodb.net/dbname
 * 4. Update .env: MONGODB_URI=mongodb+srv://...
 * 5. Run: node seed-restaurants.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const restaurantSchema = new mongoose.Schema({
  name: String,
  owner: mongoose.Schema.Types.ObjectId,
  description: String,
  cuisine: [String],
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  phone: String,
  email: String,
  website: String,
  image: String,
  coverImage: String,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  deliveryTime: { type: Number, default: 30 },
  deliveryCharge: { type: Number, default: 0 },
  minOrder: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: true },
  isOpen: { type: Boolean, default: true },
  operatingHours: { open: String, close: String },
  totalOrders: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const fakeRestaurants = [
  {
    name: "🌶️ Spice Express",
    description: "Authentic Indian cuisine with traditional recipes and flavors",
    cuisine: ["Indian", "North Indian", "Vegetarian"],
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      coordinates: { latitude: 40.7128, longitude: -74.0060 }
    },
    phone: "+1 (555) 123-4567",
    email: "spice@example.com",
    website: "www.spiceexpress.com",
    image: "https://images.unsplash.com/photo-1542867831-30f694814ea2?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1542867831-30f694814ea2?w=800&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 245,
    deliveryTime: 35,
    deliveryCharge: 2.99,
    minOrder: 15,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "10:00 AM", close: "11:00 PM" },
    totalOrders: 1203
  },
  {
    name: "🍕 Pizza Haven",
    description: "Delicious Italian pizzas, pasta, and authentic recipes",
    cuisine: ["Italian", "Pizza", "Pasta"],
    address: {
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
      coordinates: { latitude: 34.0522, longitude: -118.2437 }
    },
    phone: "+1 (555) 234-5678",
    email: "pizza@example.com",
    website: "www.pizzahaven.com",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 567,
    deliveryTime: 25,
    deliveryCharge: 1.99,
    minOrder: 12,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "11:00 AM", close: "12:00 AM" },
    totalOrders: 3421
  },
  {
    name: "🥡 Dragon Wok",
    description: "Authentic Chinese and Asian fusion cuisine with fresh ingredients",
    cuisine: ["Chinese", "Asian", "Noodles"],
    address: {
      street: "789 Pine Road",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
      coordinates: { latitude: 41.8781, longitude: -87.6298 }
    },
    phone: "+1 (555) 345-6789",
    email: "dragon@example.com",
    website: "www.dragonwok.com",
    image: "https://images.unsplash.com/photo-1585521537230-9ea7f4b91b6c?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1585521537230-9ea7f4b91b6c?w=800&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 398,
    deliveryTime: 30,
    deliveryCharge: 2.50,
    minOrder: 10,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "12:00 PM", close: "10:30 PM" },
    totalOrders: 2156
  },
  {
    name: "🍔 Burger King Express",
    description: "Fast food burgers, crispy fries, and delicious milkshakes",
    cuisine: ["American", "Burgers", "Fast Food"],
    address: {
      street: "321 Elm Street",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      country: "USA",
      coordinates: { latitude: 29.7604, longitude: -95.3698 }
    },
    phone: "+1 (555) 456-7890",
    email: "burgers@example.com",
    website: "www.burgerking.com",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop",
    rating: 4.2,
    reviewCount: 612,
    deliveryTime: 20,
    deliveryCharge: 1.50,
    minOrder: 8,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "9:00 AM", close: "11:00 PM" },
    totalOrders: 4567
  },
  {
    name: "🌮 Tacos Mexico",
    description: "Authentic Mexican street tacos, burritos, and enchiladas",
    cuisine: ["Mexican", "Tacos", "Latin American"],
    address: {
      street: "654 Maple Drive",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85001",
      country: "USA",
      coordinates: { latitude: 33.4484, longitude: -112.0742 }
    },
    phone: "+1 (555) 567-8901",
    email: "tacos@example.com",
    website: "www.tacosmexco.com",
    image: "https://images.unsplash.com/photo-1565229179341-cbd3b3157d7f?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1565229179341-cbd3b3157d7f?w=800&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 445,
    deliveryTime: 28,
    deliveryCharge: 2.00,
    minOrder: 11,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "10:30 AM", close: "11:30 PM" },
    totalOrders: 1876
  },
  {
    name: "🍣 Sushi Palace",
    description: "Premium Japanese sushi, sashimi, and authentic ramen",
    cuisine: ["Japanese", "Sushi", "Asian"],
    address: {
      street: "987 Cedar Lane",
      city: "Philadelphia",
      state: "PA",
      zipCode: "19101",
      country: "USA",
      coordinates: { latitude: 39.9526, longitude: -75.1652 }
    },
    phone: "+1 (555) 678-9012",
    email: "sushi@example.com",
    website: "www.sushipalace.com",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 523,
    deliveryTime: 40,
    deliveryCharge: 3.99,
    minOrder: 25,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "11:30 AM", close: "10:30 PM" },
    totalOrders: 1234
  },
  {
    name: "🍢 The Kebab House",
    description: "Middle Eastern kebabs, shawarma, hummus, and fresh salads",
    cuisine: ["Middle Eastern", "Mediterranean", "Kebab"],
    address: {
      street: "246 Birch Street",
      city: "San Antonio",
      state: "TX",
      zipCode: "78201",
      country: "USA",
      coordinates: { latitude: 29.4241, longitude: -98.4936 }
    },
    phone: "+1 (555) 789-0123",
    email: "kebab@example.com",
    website: "www.kebabhouse.com",
    image: "https://images.unsplash.com/photo-1599504346566-f049cd1f04b7?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1599504346566-f049cd1f04b7?w=800&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 334,
    deliveryTime: 32,
    deliveryCharge: 2.25,
    minOrder: 13,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "11:00 AM", close: "11:00 PM" },
    totalOrders: 987
  },
  {
    name: "☕ Café Delight",
    description: "Breakfast, brunch specialties, and premium coffee",
    cuisine: ["Café", "Breakfast", "Bakery"],
    address: {
      street: "135 Spruce Avenue",
      city: "San Diego",
      state: "CA",
      zipCode: "92101",
      country: "USA",
      coordinates: { latitude: 32.7157, longitude: -117.1611 }
    },
    phone: "+1 (555) 890-1234",
    email: "cafe@example.com",
    website: "www.cafedelight.com",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 278,
    deliveryTime: 20,
    deliveryCharge: 1.99,
    minOrder: 7,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "7:00 AM", close: "8:00 PM" },
    totalOrders: 2341
  },
  {
    name: "🥩 Steak & Grill",
    description: "Premium steaks, grilled meats, and wine pairings",
    cuisine: ["Steakhouse", "American", "Grill"],
    address: {
      street: "579 Willow Street",
      city: "Dallas",
      state: "TX",
      zipCode: "75201",
      country: "USA",
      coordinates: { latitude: 32.7767, longitude: -96.7970 }
    },
    phone: "+1 (555) 901-2345",
    email: "steak@example.com",
    website: "www.steakandgrill.com",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 456,
    deliveryTime: 35,
    deliveryCharge: 4.99,
    minOrder: 35,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "5:00 PM", close: "11:00 PM" },
    totalOrders: 876
  },
  {
    name: "🥗 Vegan Paradise",
    description: "Plant-based organic vegan cuisine with fresh vegetables",
    cuisine: ["Vegan", "Vegetarian", "Organic"],
    address: {
      street: "802 Ash Road",
      city: "San Jose",
      state: "CA",
      zipCode: "95101",
      country: "USA",
      coordinates: { latitude: 37.3382, longitude: -121.8863 }
    },
    phone: "+1 (555) 012-3456",
    email: "vegan@example.com",
    website: "www.veganparadise.com",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 389,
    deliveryTime: 30,
    deliveryCharge: 2.50,
    minOrder: 14,
    isApproved: true,
    isOpen: true,
    operatingHours: { open: "10:00 AM", close: "10:00 PM" },
    totalOrders: 1543
  }
];

async function seedRestaurants() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/apna_rosoi';
    
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log(`   URI: ${mongoUri.substring(0, 50)}...`);
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ Connected to MongoDB successfully\n');

    // Clear existing restaurants
    const deletedCount = await Restaurant.deleteMany({});
    console.log(`🗑️  Cleared ${deletedCount.deletedCount} existing restaurants\n`);

    // Insert fake restaurants
    const result = await Restaurant.insertMany(fakeRestaurants);
    console.log(`✅ Successfully added ${result.length} fake restaurants!\n`);

    // Display summary
    console.log('📍 Restaurants Added:');
    console.log('─'.repeat(70));
    result.forEach((restaurant, index) => {
      console.log(`${index + 1}. ${restaurant.name}`);
      console.log(`   Cuisines: ${restaurant.cuisine.join(', ')}`);
      console.log(`   Rating: ⭐ ${restaurant.rating}/5 (${restaurant.reviewCount} reviews)`);
      console.log(`   Delivery: ${restaurant.deliveryTime} mins | $${restaurant.deliveryCharge}`);
      console.log('');
    });
    
    console.log('─'.repeat(70));
    console.log('🎉 Seeding complete!');
    console.log('\n💡 You can now:');
    console.log('   1. Visit http://localhost:3000 in your browser');
    console.log('   2. Browse the newly added restaurants');
    console.log('   3. Create a test account to place orders');

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding restaurants:');
    console.error(`   ${error.message}`);
    
    if (error.message.includes('connect ECONNREFUSED')) {
      console.error('\n📝 MongoDB Connection Error - You need to set up MongoDB:');
      console.error('\nOption 1: Use Local MongoDB');
      console.error('  1. Download from: https://www.mongodb.com/try/download/community');
      console.error('  2. Install and start MongoDB (mongod)');
      console.error('  3. Run this script again: node seed-restaurants.js');
      console.error('\nOption 2: Use MongoDB Atlas (Cloud)');
      console.error('  1. Create account at: https://www.mongodb.com/cloud/atlas');
      console.error('  2. Create a free cluster');
      console.error('  3. Get your connection string');
      console.error('  4. Update .env file: MONGODB_URI=mongodb+srv://...');
      console.error('  5. Run this script again: node seed-restaurants.js');
    }
    
    process.exit(1);
  }
}

seedRestaurants();
