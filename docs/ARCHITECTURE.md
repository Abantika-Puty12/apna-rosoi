# Apna Rosoi - System Architecture & Design Document

## 📋 Overview

Apna Rosoi is a full-stack food delivery application inspired by Zomato. It connects customers with restaurants and delivery partners, enabling seamless food ordering and delivery experiences.

## 🏗️ System Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────┐
│     Frontend (React.js)             │
│  - User Interface                   │
│  - Client-side Routing              │
│  - State Management (Redux)         │
│  - Real-time Updates (Socket.io)    │
└────────────────┬────────────────────┘
                 │ HTTP/WebSocket
┌────────────────▼────────────────────┐
│     Backend (Node.js/Express)       │
│  - REST API Endpoints               │
│  - Business Logic                   │
│  - Authentication (JWT)             │
│  - Payment Processing               │
│  - Real-time Events (Socket.io)     │
└────────────────┬────────────────────┘
                 │ MongoDB Protocol
┌────────────────▼────────────────────┐
│     Database (MongoDB)              │
│  - Users                            │
│  - Restaurants                      │
│  - Menu Items                       │
│  - Orders                           │
│  - Payments                         │
│  - Reviews                          │
└─────────────────────────────────────┘
```

## 👥 User Roles & Permissions

### 1. Customer
**Capabilities:**
- User registration and authentication
- Browse and search restaurants
- Filter by cuisine, rating, delivery time
- View detailed menu
- Add items to cart with customizations
- Checkout process
- Multiple payment options
- Real-time order tracking
- Order history
- Rate and review restaurants

**Database Access:**
- Read: Restaurants, MenuItems, Reviews
- Create: User, Cart, Order, Review
- Update: User profile, Cart, Review
- Delete: Cart items

### 2. Restaurant Owner
**Capabilities:**
- Restaurant registration (requires admin approval)
- Menu management (add/edit/delete items)
- Order management (accept/reject/update status)
- Earnings tracking
- Analytics dashboard
- Promotional offers

**Database Access:**
- Read: Own restaurant, orders, menu items
- Create: MenuItem, Offer
- Update: Restaurant profile, MenuItem, Order status
- Delete: MenuItem

### 3. Delivery Partner
**Capabilities:**
- Accept delivery orders
- Navigate to pickup location
- Navigate to delivery location
- Update delivery status
- Earn ratings and reviews

**Database Access:**
- Read: Assigned orders
- Update: Delivery status, Location

### 4. Admin
**Capabilities:**
- User management (block/unblock suspicious accounts)
- Restaurant approval workflow
- Category management
- Order monitoring
- Payment reconciliation
- System analytics
- Content moderation

**Database Access:**
- Full CRUD on all collections
- Special admin functions

## 🔄 Order Flow

```
1. CUSTOMER BROWSING
   └─> Browse restaurants
   └─> View menu items
   └─> Read reviews

2. CART MANAGEMENT
   └─> Add items to cart
   └─> Update quantities
   └─> View cart summary

3. CHECKOUT
   └─> Select delivery address
   └─> Choose payment method
   └─> Review order summary
   └─> Place order

4. PAYMENT PROCESSING
   └─> Validate payment details
   └─> Process payment (Stripe)
   └─> Update payment status

5. RESTAURANT ORDER
   ├─> Order created (placed)
   ├─> Restaurant accepts
   ├─> Preparation starts
   ├─> Order ready
   └─> Out for delivery

6. DELIVERY & COMPLETION
   ├─> Delivery partner assigned
   ├─> Real-time tracking
   ├─> Order delivered
   └─> Customer rates order

7. NOTIFICATIONS
   └─> SMS/Email updates
   └─> Real-time updates (Socket.io)
```

## 🔐 Authentication & Authorization

### JWT Authentication Flow

```
1. User Login
   └─> POST /api/auth/login
   └─> Verify credentials
   └─> Generate JWT token
   └─> Return token + user info

2. Token Storage
   └─> Store in localStorage
   └─> Include in all API requests
   └─> Headers: Authorization: Bearer <token>

3. Token Verification
   └─> Verify on each request
   └─> Check expiration
   └─> Validate signature
   └─> Extract user info

4. Role-Based Access
   └─> Middleware checks user role
   └─> Allow/Deny based on permissions
```

## 💳 Payment Flow

```
1. Payment Intent Creation
   └─> Client initiates checkout
   └─> Backend creates Stripe PaymentIntent
   └─> Receives client secret

2. Payment Processing
   └─> Client uses Stripe.js
   └─> Confirms payment with client secret
   └─> Stripe processes payment

3. Payment Confirmation
   └─> Webhook from Stripe
   └─> Verify payment success
   └─> Update order status
   └─> Update database

4. Post-Payment
   └─> Generate receipt
   └─> Send confirmation email
   └─> Update user wallet (if applicable)
```

## 🔄 Real-Time Order Tracking (Socket.io)

```
1. CUSTOMER SIDE
   ├─> Join order room: socket.emit('joinOrder', orderId)
   ├─> Listen for updates: socket.on('orderStatusChanged')
   └─> Display live status

2. RESTAURANT SIDE
   ├─> Accept order
   ├─> Update status to 'preparing'
   ├─> Emit status change
   └─> Customer receives update in real-time

3. DELIVERY SIDE
   ├─> Get assigned order
   ├─> Start navigation
   ├─> Update location
   ├─> Emit location update
   └─> Customer sees delivery partner location

4. BROADCAST
   └─> All parties in order room get instant updates
   └─> No need to refresh browser
   └─> Seamless experience
```

## 📊 Database Design

### Relationships

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │ (one-to-many)
       │
   ┌───┴─────────────┬──────────┐
   │                 │          │
   ▼                 ▼          ▼
┌────────────┐  ┌────────┐  ┌──────────┐
│Restaurant  │  │  Cart  │  │  Order   │
└──────┬─────┘  └────────┘  └────┬─────┘
       │ (one-to-many)           │ (many-to-many)
       │                         │
       ▼                         ▼
   ┌────────────┐            ┌─────────────┐
   │ MenuItem   │            │ MenuItem    │
   └────────────┘            │ (in order)  │
                             └─────────────┘

┌─────────────┐              ┌──────────────┐
│   Order     │──────────────│   Payment    │
└─────────────┘ (one-to-one) └──────────────┘

┌─────────────┐              ┌──────────────┐
│   Order     │──────────────│    Review    │
└─────────────┘ (one-to-many)└──────────────┘
```

## 🚀 API Response Structure

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "error_code"
}
```

## 🔍 Search & Filter Implementation

### Restaurant Search
- Full-text search on name
- Filter by cuisine type
- Filter by rating
- Filter by delivery time
- Filter by price range

### Menu Search
- Search by item name
- Filter by category
- Filter by vegetarian/non-vegetarian
- Filter by spicy level
- Filter by restaurant

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS utilities
- Grid and flexbox layouts
- Touch-friendly components
- Optimized images

## 🔒 Security Considerations

1. **Password Security**
   - Bcryptjs hashing
   - Salt rounds: 10
   - Never store plain passwords

2. **Token Security**
   - JWT expiration: 7 days
   - Secure signature
   - Refresh token rotation

3. **API Security**
   - CORS configuration
   - Rate limiting
   - Input validation
   - SQL injection prevention (via Mongoose)

4. **Payment Security**
   - PCI compliance via Stripe
   - Never handle card data directly
   - Encrypted transmission
   - Webhook signature verification

5. **Data Protection**
   - HTTPS enforcement
   - Sensitive data encryption
   - Regular backups
   - Access control lists

## 📈 Scalability Considerations

1. **Database**
   - Indexing strategy
   - Query optimization
   - Caching (Redis)
   - Sharding for large datasets

2. **API**
   - Load balancing
   - Horizontal scaling
   - CDN for static assets
   - API rate limiting

3. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Service workers

## 🧪 Testing Strategy

### Unit Tests
- Component testing (React)
- Controller testing (Express)
- Utility function testing

### Integration Tests
- API endpoint testing
- Database integration
- Authentication flow

### E2E Tests
- User workflows
- Order flow
- Payment flow

## 📊 Monitoring & Analytics

- Error tracking
- Performance monitoring
- User analytics
- Order metrics
- Revenue tracking

---

**Document Version:** 1.0.0
**Last Updated:** February 22, 2026
