#!/usr/bin/env node

// Usage:
// node update-restaurant.js --restaurant "Spice Express" --image "https://..." --cover "https://..."

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

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

  if (!args.restaurant) {
    console.error('Please provide --restaurant name');
    process.exit(1);
  }

  const regex = new RegExp(args.restaurant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const restaurant = await Restaurant.findOne({ name: regex });

  if (!restaurant) {
    console.error(`Restaurant "${args.restaurant}" not found`);
    process.exit(1);
  }

  // Default high-quality images for Indian restaurant
  const defaultImages = {
    image: 'https://images.unsplash.com/photo-1596040869164-ceaacb7c75cc?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1596040869164-ceaacb7c75cc?w=800&h=400&fit=crop'
  };

  const updateData = {};
  if (args.image) {
    updateData.image = args.image;
  } else if (!restaurant.image || restaurant.image.includes('placeholder')) {
    updateData.image = defaultImages.image;
  }

  if (args.cover) {
    updateData.coverImage = args.cover;
  } else if (!restaurant.coverImage || restaurant.coverImage.includes('placeholder')) {
    updateData.coverImage = defaultImages.coverImage;
  }

  if (Object.keys(updateData).length === 0) {
    console.log('Restaurant already has images. Use --image or --cover to update.');
    process.exit(0);
  }

  const updated = await Restaurant.findByIdAndUpdate(restaurant._id, updateData, { new: true });

  console.log('✅ Restaurant updated successfully:');
  console.log(`  Name: ${updated.name}`);
  console.log(`  Image: ${updated.image}`);
  console.log(`  Cover: ${updated.coverImage}`);
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
