import { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import Main from "./Main";
import FullPageLoader from "./FullPageLoader";
import { useUser } from "../components/auth/useUser";

function AppLayout({ menuItems, userType }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );
  const { user, isAuth: actualIsAuth, isLoading } = useUser();

  // Raw token check for initial authentication status
  const hasToken = Boolean(localStorage.getItem("token"));

  // Check authentication using the AuthContext

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check authentication and user type
  // If there's no token at all, redirect to login
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  // If we have a token but user data is still loading, show loader
  if (hasToken && isLoading) {
    return <FullPageLoader />;
  }

  // If we have a token but no user data (authentication failed), redirect to login
  if (hasToken && !isLoading && !actualIsAuth) {
    return <Navigate to="/login" replace />;
  }

  // If user is loaded but role doesn't match, redirect to login
  if (user && user.role !== userType) {
    return <Navigate to="/login" replace />;
  }

  // Component loading state
  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Component */}
      <Sidebar
        menuItems={menuItems}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Header Component */}
        <DashboardHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Main Component with Outlet */}
        <Main />
      </div>
    </div>
  );
}

export default AppLayout;
