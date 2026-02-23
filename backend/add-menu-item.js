#!/usr/bin/env node

// Usage examples:
// node add-menu-item.js --restaurant "Pizza Haven" --name "Margherita Pizza" --price 9.99 --category main-course --description "Classic margherita" --veg true
// If no restaurant name provided, script will use the first restaurant found.

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MenuItem = require('./models/MenuItem');
const Restaurant = require('./models/Restaurant');

function parseArgs() {
  const args = {};
  const raw = process.argv.slice(2);
  for (let i = 0; i < raw.length; i++) {
    if (raw[i].startsWith('--')) {
      const key = raw[i].slice(2);
      const val = raw[i + 1] && !raw[i + 1].startsWith('--') ? raw[i + 1] : true;
      args[key] = val;
      if (val !== true) i++;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs();
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apna_rosoi';

  console.log('Connecting to MongoDB:', mongoUri);
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });

  let restaurant;
  if (args.restaurant) {
    // Try to find by partial name (case-insensitive)
    const regex = new RegExp(args.restaurant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    restaurant = await Restaurant.findOne({ name: regex });
  }

  if (!restaurant) {
    restaurant = await Restaurant.findOne();
  }

  if (!restaurant) {
    console.error('No restaurant found in DB. Seed restaurants first or provide --restaurant');
    process.exit(1);
  }

  const itemName = args.name || 'Sample Item';
  const price = parseFloat(args.price || '99.99');
  const category = args.category || 'main-course';
  const description = args.description || '';
  const isVegetarian = args.veg === 'true' || args.veg === true || args.veg === '1';
  const isSpicy = args.spicy === 'true' || args.spicy === true || args.spicy === '1';

  const menuItem = new MenuItem({
    name: itemName,
    restaurant: restaurant._id,
    description,
    price,
    category,
    image: args.image || '',
    isVegetarian,
    isSpicy,
    preparationTime: parseInt(args.prep || '15', 10),
    isAvailable: args.available === 'false' ? false : true
  });

  try {
    await menuItem.save();
    console.log('Menu item added successfully:');
    console.log(`  Restaurant: ${restaurant.name} (${restaurant._id})`);
    console.log(`  Item: ${menuItem.name} - $${menuItem.price} (${menuItem.category})`);
    process.exit(0);
  } catch (err) {
    console.error('Error adding menu item:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
