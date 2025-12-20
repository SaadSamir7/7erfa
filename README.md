# 7erfa - Service Worker Platform

🔧 **7erfa** is a comprehensive full-stack platform that connects customers with skilled service workers for repair and maintenance services. Built with modern technologies, it provides seamless user experiences for both service seekers and service providers.

## 🌟 Project Overview

7erfa bridges the gap between customers needing repair and maintenance services and skilled workers looking for opportunities. The platform offers a robust ecosystem with separate interfaces for customers and workers, complete with order management, review systems, and secure authentication.

### 🎯 Core Concept

- **For Customers**: Easily find and book qualified workers for various services
- **For Workers**: Manage your business, receive orders, and build your reputation
- **For Everyone**: Secure, reliable, and user-friendly platform experience

## 🏗️ Architecture

This is a full-stack application consisting of two main components:

### 🔥 Frontend (React + Vite)

- **Location**: `/Front-End/`
- **Technology**: React 18, Vite, Tailwind CSS
- **Features**: Modern SPA with responsive design and real-time updates

### ⚡ Backend (Node.js + Express)

- **Location**: `/Back-End/`
- **Technology**: Node.js, Express.js, MongoDB
- **Features**: RESTful API with authentication, file uploads, and comprehensive security

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 16.0.0
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 🛠️ Full Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SaadSamir7/7erfa.git
   cd 7erfa
   ```

2. **Backend Setup**

   ```bash
   cd Back-End
   npm install

   # Create config.env file
   cp config.env.example config.env
   # Edit config.env with your database and API keys

   npm start
   ```

3. **Frontend Setup**

   ```bash
   cd ../Front-End
   npm install

   # Create .env file
   cp .env.example .env
   # Edit .env with your API and Firebase configuration

   npm run dev
   ```

4. **Access the Application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3000
   - **API Documentation**: http://localhost:3000/api/v1

## 📋 Features

### 👥 User Management

- **Multi-role Authentication**: Customer, Worker, Admin roles
- **Secure Registration/Login**: JWT-based authentication
- **Profile Management**: Comprehensive user profiles with image uploads
- **Password Recovery**: Email-based password reset system

### 🛍️ Service Marketplace

- **Service Categories**: Multiple service types and categories
- **Worker Discovery**: Advanced search and filtering capabilities
- **Booking System**: Seamless order placement and management
- **Real-time Updates**: Live order status tracking

### ⭐ Review & Rating System

- **Customer Reviews**: Rate and review completed services
- **Worker Reputation**: Build trust through verified reviews
- **Quality Assurance**: Maintain service quality standards

### 💼 Business Management (Workers)

- **Dashboard Analytics**: Earnings, orders, and performance metrics
- **Order Management**: Accept, update, and complete orders
- **Availability Control**: Manage working hours and schedule
- **Professional Profiles**: Showcase skills and experience

### 🔒 Security & Quality

- **Data Protection**: Comprehensive security measures
- **Input Validation**: Server and client-side validation
- **Rate Limiting**: Protection against abuse
- **File Upload Security**: Secure image handling

## 🛠️ Technology Stack

### Frontend Technologies

| Technology          | Purpose            | Version |
| ------------------- | ------------------ | ------- |
| **React**           | Frontend Framework | 18.3.1  |
| **Vite**            | Build Tool         | 6.0.1   |
| **Tailwind CSS**    | Styling            | 3.4.16  |
| **React Router**    | Routing            | 6.28.0  |
| **React Query**     | State Management   | 5.74.4  |
| **Framer Motion**   | Animations         | 11.15.0 |
| **React Hook Form** | Form Management    | 7.62.0  |

### Backend Technologies

| Technology     | Purpose          | Version   |
| -------------- | ---------------- | --------- |
| **Node.js**    | Runtime          | >= 10.0.0 |
| **Express.js** | Web Framework    | 4.19.2    |
| **MongoDB**    | Database         | -         |
| **Mongoose**   | ODM              | 5.13.22   |
| **JWT**        | Authentication   | 9.0.2     |
| **Bcrypt**     | Password Hashing | 2.4.3     |
| **Multer**     | File Upload      | 1.4.5     |
| **Nodemailer** | Email Service    | 6.9.15    |

## 📁 Project Structure

```
7erfa/
├── Front-End/                 # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service functions
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── ui/               # UI component library
│   │   └── utils/            # Utility functions
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── README.md             # Frontend documentation
├── Back-End/                 # Node.js backend API
│   ├── controllers/          # Route controllers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── public/              # Static files & uploads
│   ├── config.env           # Environment variables
│   ├── package.json         # Backend dependencies
│   └── README.md            # Backend documentation
└── README.md                # This file
```

## 🔧 Configuration

### Backend Environment Variables (`Back-End/config.env`)

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

### Frontend Environment Variables (`Front-End/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

## 📡 API Overview

### Authentication Endpoints

```http
POST /api/v1/auth/signup          # User registration
POST /api/v1/auth/login           # User login
POST /api/v1/auth/logout          # User logout
POST /api/v1/auth/forgotPassword  # Password reset request
PATCH /api/v1/auth/resetPassword/:token # Reset password
```

### Core Resources

- **👥 Users**: `/api/v1/customers`, `/api/v1/workers`
- **📋 Orders**: `/api/v1/orders`
- **⭐ Reviews**: `/api/v1/reviews`
- **🔐 Auth**: `/api/v1/auth`

_For detailed API documentation, see the [Backend README](./Back-End/README.md)_

## 🌐 Deployment

### Development

1. **Backend**: `cd Back-End && npm start` (Port 3000)
2. **Frontend**: `cd Front-End && npm run dev` (Port 5173)

### Production

#### Backend Deployment

```bash
cd Back-End
npm run start:prod
```

#### Frontend Deployment

```bash
cd Front-End
npm run build
# Deploy dist/ folder to your hosting service
```

### Recommended Hosting

- **Backend**: Heroku, DigitalOcean, AWS EC2
- **Frontend**: Netlify, Vercel, AWS S3 + CloudFront
- **Database**: MongoDB Atlas

## 🧪 Testing

### Backend Testing

```bash
cd Back-End
npm test                 # Run test suite
npm run test:coverage    # Run with coverage
```

### Frontend Testing

```bash
cd Front-End
npm run test            # Run component tests
npm run test:e2e        # End-to-end tests
```

## 📊 Monitoring & Analytics

### Performance Monitoring

- **Frontend**: Web Vitals, Bundle analysis
- **Backend**: Response times, Error rates
- **Database**: Query performance, Connection monitoring

### Business Metrics

- **User Engagement**: Registration, Active users
- **Order Metrics**: Completion rates, Average order value
- **Worker Performance**: Response times, Customer satisfaction

## 🔐 Security Considerations

### Backend Security

- **Authentication**: JWT with secure secrets
- **Authorization**: Role-based access control
- **Data Protection**: Input sanitization, XSS protection
- **Rate Limiting**: Prevent abuse and DDoS
- **File Upload**: Secure file handling and storage

### Frontend Security

- **Input Validation**: Client-side validation
- **XSS Prevention**: Sanitized user inputs
- **HTTPS**: Secure communication
- **Token Management**: Secure JWT storage

## 🚀 Performance Optimization

### Frontend Optimizations

- **Code Splitting**: Lazy loading of routes
- **Image Optimization**: Responsive images
- **Caching**: Service worker implementation
- **Bundle Size**: Tree shaking and minification

### Backend Optimizations

- **Database Indexing**: Optimized queries
- **Caching**: Redis for frequently accessed data
- **Compression**: Gzip compression
- **Connection Pooling**: Efficient database connections

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Follow Coding Standards**: ESLint, Prettier configurations
4. **Write Tests**: Ensure good test coverage
5. **Update Documentation**: Keep README files current
6. **Submit Pull Request**: Detailed description of changes

### Development Workflow

```bash
# Setup development environment
git clone https://github.com/SaadSamir7/7erfa.git
cd 7erfa

# Install dependencies for both frontend and backend
npm run install:all

# Start development servers
npm run dev:all

# Run tests
npm run test:all

# Build for production
npm run build:all
```

## 📋 Roadmap

### Phase 1: Core Features ✅

- [x] User authentication and registration
- [x] Basic order management
- [x] Worker profiles and discovery
- [x] Review system

### Phase 2: Enhanced Features 🚧

- [ ] Real-time messaging between customers and workers
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Payment gateway integration

### Phase 3: Advanced Features 📋

- [ ] AI-powered worker recommendations
- [ ] Multi-language support
- [ ] Advanced reporting and insights
- [ ] Third-party integrations

## 📝 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

## 👥 Team

### Development Team

- **Youssef Megahed** - Backend Development
- **Frontend Team** - React Development
- **Saad Samir** - Project Lead

### Special Thanks

- **Design Team** - UI/UX Design
- **QA Team** - Testing and Quality Assurance
- **DevOps Team** - Deployment and Infrastructure

## 📞 Support

### Getting Help

- **📖 Documentation**: Check the README files in each directory
- **🐛 Issues**: Report bugs via GitHub Issues
- **💬 Discussions**: Use GitHub Discussions for questions
- **📧 Contact**: Reach out to the development team

### Community

- **GitHub**: [https://github.com/SaadSamir7/7erfa](https://github.com/SaadSamir7/7erfa)
- **Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas

## 🙏 Acknowledgments

- **Open Source Community**: For the amazing tools and libraries
- **Contributors**: Everyone who has contributed to this project
- **Users**: Beta testers and early adopters
- **Mentors**: Technical advisors and reviewers

---

**Built with ❤️ by the 7erfa Team**

_Connecting customers with skilled workers, one service at a time._
