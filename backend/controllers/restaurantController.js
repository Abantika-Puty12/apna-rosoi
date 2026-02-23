const Restaurant = require('../models/Restaurant');

// Register restaurant
exports.registerRestaurant = async (req, res) => {
  try {
    const { name, description, cuisine, address, phone, email, website, image, operatingHours } = req.body;

    const restaurant = new Restaurant({
      name,
      description,
      cuisine,
      address,
      phone,
      email,
      website,
      image,
      operatingHours,
      owner: req.user.id
    });

    await restaurant.save();
    res.status(201).json({ message: 'Restaurant registered', restaurant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const { city, cuisine, rating } = req.query;
    let filter = { isApproved: true };

    if (city) filter.city = city;
    if (cuisine) filter.cuisine = { $in: [cuisine] };
    if (rating) filter.rating = { $gte: rating };

    const restaurants = await Restaurant.find(filter).populate('owner', 'name email');
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('owner', 'name email phone');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ restaurant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update restaurant (Owner)
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Restaurant updated', restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve restaurant (Admin)
exports.approveRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.status(200).json({ message: 'Restaurant approved', restaurant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get restaurant by owner
exports.getByOwner = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const restaurant = await Restaurant.findOne({ owner: ownerId });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'No restaurant found for this owner' });
    }
    
    res.status(200).json({ restaurant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search restaurants
exports.searchRestaurants = async (req, res) => {
  try {
    const { q } = req.query;
    const restaurants = await Restaurant.find({
      isApproved: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { cuisine: { $in: [new RegExp(q, 'i')] } }
      ]
    });
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
