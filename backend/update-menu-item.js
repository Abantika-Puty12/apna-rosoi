#!/usr/bin/env node

// Usage:
// node update-menu-item.js --item "Chowmin" --image "https://..."

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MenuItem = require('./models/MenuItem');

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

  if (!args.item) {
    console.error('Please provide --item name');
    process.exit(1);
  }

  if (!args.image) {
    console.error('Please provide --image URL');
    process.exit(1);
  }

  const regex = new RegExp(args.item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const menuItem = await MenuItem.findOne({ name: regex });

  if (!menuItem) {
    console.error(`Menu item "${args.item}" not found`);
    process.exit(1);
  }

  menuItem.image = args.image;
  await menuItem.save();

  console.log('✅ Menu item updated successfully:');
  console.log(`  Name: ${menuItem.name}`);
  console.log(`  Price: $${menuItem.price}`);
  console.log(`  Image: ${menuItem.image}`);
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
