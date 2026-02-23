# Apna Rosoi - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "customer" // customer, restaurant, admin
}
```

**Response (201):**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

---

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

---

### Verify Token
**GET** `/auth/verify`

**Headers:** Required Authorization header

**Response (200):**
```json
{
  "message": "Token is valid",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

---

## User Endpoints

### Get User Profile
**GET** `/users/profile`

**Headers:** Required Authorization header

**Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001"
    },
    "role": "customer",
    "isActive": true
  }
}
```

---

### Update User Profile
**PUT** `/users/profile`

**Headers:** Required Authorization header

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "address": {
    "street": "456 New St",
    "city": "Bangalore",
    "state": "Karnataka",
    "zipCode": "560001"
  }
}
```

**Response (200):**
```json
{
  "message": "Profile updated",
  "user": { /* updated user object */ }
}
```

---

### Get All Users (Admin)
**GET** `/users`

**Headers:** Required Authorization header (Admin role)

**Response (200):**
```json
{
  "users": [
    { /* user objects */ }
  ]
}
```

---

### Block User (Admin)
**PUT** `/users/:id/block`

**Response (200):**
```json
{
  "message": "User blocked",
  "user": { /* user object */ }
}
```

---

## Restaurant Endpoints

### Register Restaurant
**POST** `/restaurants`

**Headers:** Required Authorization header (Restaurant role)

**Request Body:**
```json
{
  "name": "Pizza Palace",
  "description": "Best pizzas in town",
  "cuisine": ["Italian", "North Indian"],
  "address": {
    "street": "123 Restaurant Ave",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "phone": "9876543210",
  "email": "contact@pizzapalace.com",
  "website": "www.pizzapalace.com",
  "operatingHours": {
    "open": "10:00",
    "close": "23:00"
  }
}
```

**Response (201):**
```json
{
  "message": "Restaurant registered",
  "restaurant": { /* restaurant object */ }
}
```

---

### Get All Restaurants
**GET** `/restaurants`

**Query Parameters (Optional):**
- `city`: Filter by city
- `cuisine`: Filter by cuisine type
- `rating`: Filter by minimum rating

**Response (200):**
```json
{
  "restaurants": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Pizza Palace",
      "cuisine": ["Italian"],
      "rating": 4.5,
      "deliveryTime": 30,
      "deliveryCharge": 50,
      "isOpen": true
    }
  ]
}
```

---

### Get Restaurant by ID
**GET** `/restaurants/:id`

**Response (200):**
```json
{
  "restaurant": { /* full restaurant object */ }
}
```

---

### Update Restaurant
**PUT** `/restaurants/:id`

**Headers:** Required Authorization header

**Request Body:** Any restaurant field to update

**Response (200):**
```json
{
  "message": "Restaurant updated",
  "restaurant": { /* updated restaurant */ }
}
```

---

### Approve Restaurant (Admin)
**PUT** `/restaurants/:id/approve`

**Headers:** Required Authorization header (Admin role)

**Response (200):**
```json
{
  "message": "Restaurant approved",
  "restaurant": { /* updated restaurant */ }
}
```

---

### Search Restaurants
**GET** `/restaurants/search?q=search_query`

**Response (200):**
```json
{
  "restaurants": [ /* matching restaurants */ ]
}
```

---

## Menu Endpoints

### Add Menu Item
**POST** `/menu/:restaurantId`

**Headers:** Required Authorization header (Restaurant role)

**Request Body:**
```json
{
  "name": "Margherita Pizza",
  "description": "Fresh mozzarella and basil",
  "price": 350,
  "category": "main-course",
  "isVegetarian": true,
  "isSpicy": false,
  "preparationTime": 15
}
```

**Response (201):**
```json
{
  "message": "Menu item added",
  "menuItem": { /* menu item object */ }
}
```

---

### Get Menu by Restaurant
**GET** `/menu/restaurant/:restaurantId`

**Response (200):**
```json
{
  "menuItems": [ /* array of menu items */ ]
}
```

---

### Get Menu Item by ID
**GET** `/menu/:id`

**Response (200):**
```json
{
  "menuItem": { /* menu item object */ }
}
```

---

### Update Menu Item
**PUT** `/menu/:id`

**Headers:** Required Authorization header

**Request Body:** Any menu item field to update

**Response (200):**
```json
{
  "message": "Menu item updated",
  "menuItem": { /* updated menu item */ }
}
```

---

### Delete Menu Item
**DELETE** `/menu/:id`

**Response (200):**
```json
{
  "message": "Menu item deleted"
}
```

---

### Search Menu Items
**GET** `/menu/search?q=query&restaurantId=optional`

**Response (200):**
```json
{
  "menuItems": [ /* matching menu items */ ]
}
```

---

## Cart Endpoints

### Add to Cart
**POST** `/cart`

**Headers:** Required Authorization header

**Request Body:**
```json
{
  "restaurantId": "507f1f77bcf86cd799439011",
  "menuItemId": "507f1f77bcf86cd799439012",
  "quantity": 2,
  "specialInstructions": "No onions"
}
```

**Response (200):**
```json
{
  "message": "Item added to cart",
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "items": [ /* array of items */ ],
    "totalPrice": 700
  }
}
```

---

### Get Cart
**GET** `/cart`

**Headers:** Required Authorization header

**Response (200):**
```json
{
  "cart": { /* full cart object with populated items */ }
}
```

---

### Remove from Cart
**DELETE** `/cart/:itemId`

**Headers:** Required Authorization header

**Response (200):**
```json
{
  "message": "Item removed from cart",
  "cart": { /* updated cart */ }
}
```

---

### Update Cart Item Quantity
**PUT** `/cart/:itemId`

**Headers:** Required Authorization header

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "message": "Quantity updated",
  "cart": { /* updated cart */ }
}
```

---

### Clear Cart
**DELETE** `/cart`

**Headers:** Required Authorization header

**Response (200):**
```json
{
  "message": "Cart cleared"
}
```

---

## Order Endpoints

### Create Order
**POST** `/orders`

**Headers:** Required Authorization header

**Request Body:**
```json
{
  "deliveryAddress": {
    "street": "789 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "paymentMethod": "card"
}
```

**Response (201):**
```json
{
  "message": "Order created",
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "orderNumber": "ORD-1645470000000",
    "customer": "507f1f77bcf86cd799439011",
    "restaurant": "507f1f77bcf86cd799439012",
    "totalAmount": 1050,
    "orderStatus": "placed",
    "createdAt": "2024-02-22T10:00:00Z"
  }
}
```

---

### Get Order by ID
**GET** `/orders/:id`

**Headers:** Required Authorization header

**Response (200):**
```json
{
  "order": { /* full order object */ }
}
```

---

### Get User Orders
**GET** `/orders`

**Headers:** Required Authorization header

**Query Parameters:**
- `status`: Filter by order status
- `limit`: Limit number of results
- `skip`: Pagination offset

**Response (200):**
```json
{
  "orders": [ /* array of user's orders */ ]
}
```

---

### Get Restaurant Orders
**GET** `/orders/restaurant/:restaurantId`

**Headers:** Required Authorization header (Restaurant role)

**Response (200):**
```json
{
  "orders": [ /* array of restaurant's orders */ ]
}
```

---

### Update Order Status
**PUT** `/orders/:id/status`

**Headers:** Required Authorization header (Restaurant role)

**Request Body:**
```json
{
  "status": "preparing",
  "notes": "Preparing your order"
}
```

**Status Values:**
- `placed` - Order placed
- `accepted` - Restaurant accepted
- `preparing` - Being prepared
- `ready` - Ready for pickup
- `out-for-delivery` - Out for delivery
- `delivered` - Delivered
- `cancelled` - Cancelled

**Response (200):**
```json
{
  "message": "Order status updated",
  "order": { /* updated order */ }
}
```

---

### Cancel Order
**PUT** `/orders/:id/cancel`

**Headers:** Required Authorization header

**Response (200):**
```json
{
  "message": "Order cancelled",
  "order": { /* cancelled order */ }
}
```

---

### Rate Order
**PUT** `/orders/:id/rate`

**Headers:** Required Authorization header

**Request Body:**
```json
{
  "rating": 4,
  "review": "Great food and fast delivery!"
}
```

**Response (200):**
```json
{
  "message": "Order rated",
  "order": { /* rated order */ }
}
```

---

### Get All Orders (Admin)
**GET** `/orders/admin/all`

**Headers:** Required Authorization header (Admin role)

**Response (200):**
```json
{
  "orders": [ /* array of all orders */ ]
}
```

---

## Payment Endpoints

### Create Payment Intent
**POST** `/payments/intent`

**Headers:** Required Authorization header

**Request Body:**
```json
{
  "orderId": "507f1f77bcf86cd799439014",
  "amount": 1050
}
```

**Response (200):**
```json
{
  "clientSecret": "pi_test_secret_xyz...",
  "paymentIntentId": "pi_test_xyz..."
}
```

---

### Confirm Payment
**POST** `/payments/confirm`

**Headers:** Required Authorization header

**Request Body:**
```json
{
  "paymentIntentId": "pi_test_xyz...",
  "orderId": "507f1f77bcf86cd799439014"
}
```

**Response (200):**
```json
{
  "message": "Payment successful",
  "payment": {
    "_id": "507f1f77bcf86cd799439015",
    "order": "507f1f77bcf86cd799439014",
    "amount": 1050,
    "paymentStatus": "completed",
    "transactionId": "ch_test_xyz..."
  }
}
```

---

### Get Payment Status
**GET** `/payments/:id`

**Headers:** Required Authorization header

**Response (200):**
```json
{
  "payment": { /* payment object */ }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input",
  "error": "validation_error"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided",
  "error": "auth_error"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied",
  "error": "permission_error"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found",
  "error": "not_found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "server_error"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

**API Version:** 1.0.0
**Last Updated:** February 22, 2026
