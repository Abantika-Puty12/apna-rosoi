const MenuItem = require('../models/MenuItem');

// Add menu item (Restaurant Owner)
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, isVegetarian, isSpicy, preparationTime } = req.body;
    const { restaurantId } = req.params;

    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      image,
      isVegetarian,
      isSpicy,
      preparationTime,
      restaurant: restaurantId
    });

    await menuItem.save();
    res.status(201).json({ message: 'Menu item added', menuItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get menu items by restaurant
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await MenuItem.find({ restaurant: restaurantId });
    res.status(200).json({ menuItems });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant');
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ menuItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: 'Menu item updated', menuItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search menu items
exports.searchMenuItems = async (req, res) => {
  try {
    const { q, restaurantId } = req.query;
    let filter = { $or: [{ name: { $regex: q, $options: 'i' } }, { category: { $regex: q, $options: 'i' } }] };

    if (restaurantId) filter.restaurant = restaurantId;

    const menuItems = await MenuItem.find(filter).populate('restaurant');
    res.status(200).json({ menuItems });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
