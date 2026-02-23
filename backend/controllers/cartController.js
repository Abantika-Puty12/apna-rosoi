const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { restaurantId, menuItemId, quantity, specialInstructions } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId, restaurant: restaurantId });

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    if (!cart) {
      cart = new Cart({
        user: userId,
        restaurant: restaurantId,
        items: [
          {
            menuItem: menuItemId,
            quantity,
            price: menuItem.price,
            specialInstructions
          }
        ]
      });
    } else {
      const existingItem = cart.items.find(item => item.menuItem.toString() === menuItemId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          menuItem: menuItemId,
          quantity,
          price: menuItem.price,
          specialInstructions
        });
      }
    }

    // Calculate total
    let totalPrice = 0;
    for (let item of cart.items) {
      totalPrice += item.price * item.quantity;
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.menuItem').populate('restaurant');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    let totalPrice = 0;
    for (let item of cart.items) {
      totalPrice += item.price * item.quantity;
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update cart item quantity
exports.updateCartQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(i => i._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    item.quantity = quantity;

    let totalPrice = 0;
    for (let i of cart.items) {
      totalPrice += i.price * i.quantity;
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    res.status(200).json({ message: 'Quantity updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
