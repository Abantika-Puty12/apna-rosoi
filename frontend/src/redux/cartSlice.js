import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurant: null,
  totalPrice: 0,
  totalQuantity: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { menuItem, quantity, restaurant } = action.payload;
      state.restaurant = restaurant;

      const existingItem = state.items.find(item => item._id === menuItem._id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...menuItem,
          quantity
        });
      }

      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item._id === itemId);
      if (item) {
        item.quantity = quantity;
      }
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      state.totalPrice = 0;
      state.totalQuantity = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
