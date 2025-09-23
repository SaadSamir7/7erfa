import { LogOut, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../components/auth/useLogout";
import { useUser } from "../components/auth/useUser";

const VITE_API_URL = import.meta.env.VITE_API_URL;

function DashboardHeader({ darkMode, toggleDarkMode }) {
  const { user } = useUser();
  const { logout } = useLogout();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
  }

  function handleProfileClick() {
    navigate("profile");
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex h-16 items-center justify-end px-6 max-w-7xl ml-auto">
        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 hover:text-main-600 dark:text-gray-400 dark:hover:text-main-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProfileClick}
            className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            {/* User Info */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>

            {/* Profile Image */}
            <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-600">
              {user?.image && user.image !== "default.png" ? (
                <img
                  src={`${VITE_API_URL}/uploads/${user.image}`}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src="/default.png"
                  alt={user?.name || "User"}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2 rounded-lg text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            title="Logout"
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
