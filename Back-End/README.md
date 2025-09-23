# 7erfa Backend API

A robust Node.js REST API built with Express.js and MongoDB for connecting customers with service workers. This backend handles user authentication, order management, reviews, and file uploads.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Separate customer and worker registration and profiles
- **Order System**: Complete order lifecycle management
- **Review System**: Rating and feedback system for workers
- **File Upload**: Image upload with Multer
- **Security**: Comprehensive security measures including helmet, rate limiting, and data sanitization
- **Email Integration**: Password reset functionality with Nodemailer
- **Data Validation**: MongoDB schema validation with Mongoose

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Email**: Nodemailer & Resend
- **Security**: Helmet, express-rate-limit, xss-clean, hpp
- **Template Engine**: Pug
- **Development**: Nodemon, Morgan (logging)

## 📁 Project Structure

```
Back-End/
├── controllers/          # Route controllers
│   ├── authController.js       # Authentication logic
│   ├── customerController.js   # Customer operations
│   ├── workerController.js     # Worker operations
│   ├── orderController.js      # Order management
│   ├── reviewController.js     # Review system
│   └── errorController.js      # Global error handling
├── models/              # MongoDB schemas
│   ├── customerModel.js        # Customer schema
│   ├── workerModel.js          # Worker schema
│   ├── orderModel.js           # Order schema
│   └── reviewModel.js          # Review schema
├── routes/              # API routes
│   ├── authRoutes.js           # Auth endpoints
│   ├── customerRoutes.js       # Customer endpoints
│   ├── workerRoutes.js         # Worker endpoints
│   ├── orderRoutes.js          # Order endpoints
│   └── reviewRoutes.js         # Review endpoints
├── utils/               # Utility functions
│   ├── apiFeatures.js          # API filtering, sorting, pagination
│   ├── appError.js             # Custom error class
│   ├── catchAsync.js           # Async error handler
│   ├── email.js                # Email service
│   └── upload.js               # File upload configuration
├── public/              # Static files
│   ├── css/                    # Stylesheets
│   └── uploads/                # User uploaded images
├── views/               # Pug templates
├── app.js               # Express app configuration
├── server.js            # Server startup
├── config.env           # Environment variables
└── package.json         # Dependencies and scripts
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (>= 10.0.0)
- MongoDB database
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 7erfa/Back-End
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `config.env` file in the root directory:

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=mongodb://localhost:27017/7erfa
   DATABASE_PASSWORD=your_db_password

   JWT_SECRET=your_super_secure_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90

   EMAIL_FROM=noreply@7erfa.com
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Start the server**

   ```bash
   # Development mode with auto-restart
   npm start

   # Production mode
   npm run start:prod

   # Debug mode
   npm run debug
   ```

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication Endpoints

```http
POST /auth/signup          # User registration
POST /auth/login           # User login
POST /auth/logout          # User logout
POST /auth/forgotPassword  # Request password reset
PATCH /auth/resetPassword/:token # Reset password
PATCH /auth/updatePassword # Update current password
```

### Customer Endpoints

```http
GET    /customers          # Get all customers (admin)
GET    /customers/me       # Get current customer profile
PATCH  /customers/updateMe # Update customer profile
DELETE /customers/deleteMe # Deactivate customer account
POST   /customers/uploadPhoto # Upload customer profile picture
```

### Worker Endpoints

```http
GET    /workers            # Get all workers with filtering
GET    /workers/:id        # Get specific worker
GET    /workers/me         # Get current worker profile
PATCH  /workers/updateMe   # Update worker profile
DELETE /workers/deleteMe   # Deactivate worker account
POST   /workers/uploadPhoto # Upload worker profile picture
```

### Order Endpoints

```http
GET    /orders             # Get user's orders
POST   /orders             # Create new order
GET    /orders/:id         # Get specific order
PATCH  /orders/:id         # Update order (worker only)
DELETE /orders/:id         # Cancel order
```

### Review Endpoints

```http
GET    /reviews            # Get all reviews
POST   /reviews            # Create new review
GET    /reviews/:id        # Get specific review
PATCH  /reviews/:id        # Update review (author only)
DELETE /reviews/:id        # Delete review (author only)
GET    /workers/:workerId/reviews # Get worker's reviews
```

## 🔐 Authentication & Authorization

### JWT Authentication

- Users receive JWT tokens upon successful login
- Tokens must be included in the Authorization header: `Bearer <token>`
- Tokens expire in 90 days (configurable)

### Role-based Access Control

- **Customer**: Can create orders, leave reviews, manage own profile
- **Worker**: Can accept orders, view reviews, manage own profile
- **Admin**: Full access to all resources

### Protected Routes

Most endpoints require authentication. Public endpoints include:

- User registration/login
- Password reset request
- Basic worker listing (for customer browsing)

## 🛡️ Security Features

- **Helmet**: Sets various HTTP headers for security
- **Rate Limiting**: Prevents brute force attacks
- **Data Sanitization**: Prevents NoSQL injection attacks
- **XSS Protection**: Cleans user input from malicious HTML
- **Parameter Pollution**: Prevents HTTP parameter pollution
- **CORS**: Configured for cross-origin requests
- **Password Encryption**: bcryptjs for secure password hashing

## 📊 Data Models

### Customer Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  role: String (default: 'customer'),
  image: String (default: 'default.png'),
  phoneNumber: String (required),
  password: String (required),
  passwordConfirm: String (required),
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: Boolean (default: true),
  location: Object {
    governorate: String,
    city: String,
    street: String
  }
}
```

### Worker Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  role: String (default: 'worker'),
  image: String (default: 'default.png'),
  phoneNumber: String (required),
  password: String (required),
  category: String (required),
  pricePerHour: Number (required),
  description: String,
  experience: String,
  availability: Boolean (default: true),
  // ... other fields similar to Customer
}
```

## 🔄 Error Handling

The API uses a comprehensive error handling system:

- **Development**: Detailed error messages with stack traces
- **Production**: User-friendly error messages
- **Validation Errors**: Mongoose validation errors are properly formatted
- **Duplicate Key Errors**: MongoDB duplicate key errors are handled
- **JWT Errors**: Token-related errors are properly managed

## 📈 Features in Detail

### File Upload

- Images are uploaded to `/public/uploads/`
- Multer configuration limits file size and type
- Automatic filename generation with timestamps

### Email Service

- Password reset emails using Resend API
- Pug templates for email formatting
- Fallback email configuration available

### API Features

- **Filtering**: Query parameters for filtering results
- **Sorting**: Sort results by any field
- **Pagination**: Limit and page parameters
- **Field Selection**: Select specific fields to return

## 🚀 Deployment

### Production Environment

1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2
3. Set up reverse proxy with Nginx
4. Configure MongoDB Atlas for database
5. Set up proper logging and monitoring

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE=mongodb+srv://username:password@cluster.mongodb.net/7erfa
JWT_SECRET=your_super_secure_production_secret
RESEND_API_KEY=your_production_resend_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Youssef Megahed** - Backend Development

## 🐛 Known Issues

- Rate limiting may need adjustment based on usage patterns
- File upload size limits may need configuration for production
- Email service requires proper SMTP configuration

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
