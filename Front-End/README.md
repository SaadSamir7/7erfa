# 7erfa Frontend

A modern React application built with Vite that connects customers with skilled service workers. The frontend provides intuitive interfaces for both customers seeking services and workers managing their business.

## 🚀 Features

### Customer Features

- **User Authentication**: Secure login/register with JWT authentication
- **Worker Discovery**: Browse and search for workers by category and location
- **Service Booking**: Place orders for various repair and maintenance services
- **Order Management**: Track order status and history
- **Review System**: Rate and review completed services
- **Profile Management**: Update personal information and preferences

### Worker Features

- **Professional Dashboard**: Comprehensive overview of orders and earnings
- **Order Management**: Accept, update, and complete customer orders
- **Profile Showcase**: Display skills, experience, and pricing
- **Review Management**: View customer feedback and ratings
- **Availability Control**: Manage work schedule and availability

### General Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live order status updates
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Dark/Light Theme**: Theme switching capability
- **Image Upload**: Profile picture and service image uploads
- **Advanced Filtering**: Filter workers by category, price, location, and ratings

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Notifications**: React Hot Toast
- **Carousel**: React Slick
- **Authentication**: Firebase Integration
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
Front-End/
├── public/                    # Static assets
│   ├── default.png           # Default profile image
│   ├── hero.jpg              # Landing page hero image
│   ├── categories/           # Service category images
│   ├── logos/                # Brand logos and icons
│   ├── services-icons/       # Service type icons
│   └── team/                 # Team member photos
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   ├── Customer/        # Customer-specific components
│   │   ├── Worker/          # Worker-specific components
│   │   └── LandingPage/     # Landing page components
│   ├── context/             # React Context providers
│   │   ├── ThemeContext.jsx # Theme management
│   │   └── WorkerContext.jsx # Worker data context
│   ├── features/            # Feature-based components
│   │   ├── customer/        # Customer feature components
│   │   ├── profile/         # Profile management
│   │   └── worker/          # Worker feature components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx  # Home/landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── ForgetPassword.jsx # Password reset
│   │   └── ResetPassword.jsx  # Password reset confirmation
│   ├── services/            # API service functions
│   │   ├── apiAuth.js       # Authentication API calls
│   │   ├── apiCustomer.js   # Customer API calls
│   │   ├── apiWorkers.js    # Worker API calls
│   │   ├── apiOrders.js     # Order management API calls
│   │   ├── apiReviews.js    # Review system API calls
│   │   └── apiUpdateReset.js # Profile update API calls
│   ├── ui/                  # Reusable UI components
│   │   ├── AppLayout.jsx    # Main app layout wrapper
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Sidebar.jsx      # Dashboard sidebar
│   │   ├── Modal.jsx        # Modal component
│   │   ├── Button.jsx       # Custom button component
│   │   ├── Filter.jsx       # Filter component
│   │   ├── Pagination.jsx   # Pagination component
│   │   └── ...              # Other UI components
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── firebase-config.js       # Firebase configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite build configuration
├── eslint.config.js         # ESLint configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (>= 16.0.0)
- npm or yarn
- Backend API running (see Backend README)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 7erfa/Front-End
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality check

## 🎨 Features in Detail

### Authentication System

- JWT-based authentication with automatic token refresh
- Secure registration and login forms with validation
- Password reset functionality via email
- Role-based access control (Customer/Worker/Admin)

### Customer Dashboard

- **Service Discovery**: Browse workers by category with advanced filtering
- **Booking System**: Easy service booking with order details
- **Order Tracking**: Real-time order status updates
- **Review Management**: Rate and review completed services
- **Profile Management**: Update personal information and preferences

### Worker Dashboard

- **Earnings Overview**: Track income and completed orders
- **Order Queue**: Manage incoming and active orders
- **Profile Showcase**: Professional profile with portfolio
- **Schedule Management**: Control availability and working hours
- **Customer Communication**: Direct messaging with customers

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Optimized layouts for all screen sizes
- Touch-friendly interface for mobile users
- Progressive Web App (PWA) ready

### Performance Optimizations

- **Code Splitting**: Lazy loading of routes and components
- **Image Optimization**: Responsive images with proper formats
- **Caching**: React Query for efficient data caching
- **Bundle Optimization**: Vite's optimized build process

## 🔗 API Integration

The frontend communicates with the backend API through various service modules:

- **Authentication Services**: Login, register, logout, password reset
- **User Management**: Profile updates, image uploads
- **Order Services**: Create, read, update orders
- **Worker Services**: Browse workers, filter, search
- **Review Services**: CRUD operations for reviews

### API Response Handling

- Centralized error handling with user-friendly messages
- Loading states for all async operations
- Optimistic updates for better user experience
- Retry logic for failed requests

## 🎯 Routing Structure

```
/                          # Landing page
/login                     # User login
/register                  # User registration
/forgot-password           # Password reset request
/reset-password/:token     # Password reset form

# Customer Routes
/customer/dashboard        # Customer dashboard
/customer/orders           # Order history
/customer/profile          # Profile management
/customer/search-workers   # Worker discovery
/customer/worker/:id       # Worker details

# Worker Routes
/worker/dashboard          # Worker dashboard
/worker/orders             # Order management
/worker/profile            # Profile management
/worker/reviews            # Review management
```

## 🎨 Styling & Theming

### Tailwind CSS

- Utility-first CSS framework
- Custom color palette for brand consistency
- Responsive design utilities
- Dark mode support

### Theme System

- Dynamic theme switching (Light/Dark)
- Consistent color variables
- Accessible color contrasts
- Custom component styling

## 📱 Mobile Experience

- **Touch Optimized**: Large touch targets and swipe gestures
- **Performance**: Optimized for mobile networks
- **Navigation**: Mobile-friendly navigation patterns
- **Forms**: Mobile keyboard optimization

## 🔒 Security Features

- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS Only**: Secure communication with backend
- **Token Management**: Secure JWT token storage
- **Route Protection**: Protected routes based on authentication

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_FIREBASE_API_KEY=your_production_firebase_key
# ... other Firebase config
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Customer order flow
- [ ] Worker order management
- [ ] Profile updates
- [ ] Image uploads
- [ ] Responsive design on different devices
- [ ] Theme switching
- [ ] Error handling

## 🔧 Development Guidelines

### Code Style

- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices

### Component Structure

```jsx
// Component structure example
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function ComponentName({ prop1, prop2 }) {
  // Hooks
  const [state, setState] = useState();
  const { data, isLoading, error } = useQuery();

  // Effects
  useEffect(() => {
    // Side effects
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handle events
  };

  // Render
  return <div className="component-styles">{/* JSX */}</div>;
}

export default ComponentName;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Follow the coding standards and guidelines
4. Test your changes thoroughly
5. Commit with descriptive messages: `git commit -am 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Frontend Team** - React Development
- **UI/UX Team** - Design and User Experience

## 🐛 Known Issues

- Image upload may be slow on poor network connections
- Some animations may lag on older mobile devices
- Safari-specific CSS issues in certain components

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation and API guides

## 🔮 Future Enhancements

- [ ] Real-time chat system between customers and workers
- [ ] Push notifications for order updates
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Progressive Web App features
- [ ] Offline functionality
- [ ] Integration with payment gateways
- [ ] Google Maps integration for location services

- User authentication (Login & Signup & Forget Password & Reset Password)
- Dashboard for workers to manage their customers' orders and see the reviews
- Dashboard for customers to Search functionality to find suitable workers and make review after finish the order
- Responsive design for a seamless user experience

## 🛠️ Technologies Used

- **React.js** - Front-end framework
- **Vite** - Fast build tool for React
- **Tailwind CSS** - For stylings
- **Fetch API** - For API requests
- **React Router** - For navigation

## 📂 Project Structure

```
7erfa/
├── public/
│   ├── categories/
│   ├── logos/
│   ├── services-icons/
│   └── team/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Customer/
│   │   ├── LandingPage/
│   │   └── Worker/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── ui/
```

## 🏗️ Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/SalahMSwefy/7erfa.git
   ```
2. Navigate to the project directory:
   ```sh
   cd 7erfa
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file from `.env.example` and set up the required environment variables.
5. Start the development server:
   ```sh
   npm run dev
   ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `VITE_SECRET_KEY`
- `VITE_API_URL`

## 🔗 API Integration

7erfa Frontend interacts with the backend via RESTful APIs. Ensure the backend is running and update API base URLs in the `.env` file.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📜 License

This project is licensed under the **MIT License**.

---

## Authors

- [@Salah Swefy](https://github.com/SalahMSwefy)
- [@Youssef Megahed](https://github.com/Bor3y9)
- [@Mohamed Khalil](https://github.com/Bigkhil)
- [@Saad Samir](https://github.com/SaadSamir7)
