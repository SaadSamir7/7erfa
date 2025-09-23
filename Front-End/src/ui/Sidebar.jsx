import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Sidebar = ({ menuItems, currentPage, onNavigate }) => {
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;
      setMinimized(isMobileOrTablet);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed left-0 top-0 z-20 h-screen w-fit border-r border-gray-200/30 bg-gradient-to-b from-white via-gray-50/50 to-gray-100/30 shadow-xl backdrop-blur-sm dark:border-gray-600/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-700/30 lg:w-64"
    >
      {/* Header Section */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200/50 bg-white/80 p-4 backdrop-blur-md dark:border-gray-600/50 dark:bg-gray-800/80">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-2.5">
            <button
              className="group flex items-center gap-2.5 font-brand text-2xl no-underline transition-all duration-300 hover:text-main-600 dark:text-white dark:hover:text-main-500 lg:text-3xl"
              onClick={() => {
                // Navigate to the appropriate dashboard home page
                if (currentPage.includes("/worker-dashboard")) {
                  onNavigate("/worker-dashboard");
                } else {
                  onNavigate("/customer-dashboard");
                }
              }}
            >
              <div className="relative">
                <img
                  src="/logos/logo.gif"
                  alt="Logo"
                  className="h-10 w-10 rounded-full object-cover object-center ring-2 ring-main-200 transition-all duration-300 group-hover:ring-main-400 dark:ring-gray-600 dark:group-hover:ring-main-500 lg:h-12 lg:w-12"
                />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-main-400 to-main-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-20"></div>
              </div>
              {minimized || (
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-200">
                  7erfa
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Section */}
      <nav className="space-y-1 p-3 lg:p-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.page}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl p-3 transition-all duration-300 lg:justify-normal lg:gap-3 ${
              currentPage === item.page
                ? "bg-gradient-to-r from-main-500 to-main-600 text-white shadow-lg shadow-main-500/25 dark:shadow-main-600/20"
                : "text-gray-600 hover:bg-white/70 hover:text-gray-800 hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white"
            }`}
            onClick={() => {
              if (currentPage !== item.page) onNavigate(item.page);
            }}
          >
            {/* Background gradient for active state */}
            {currentPage === item.page && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-main-500 to-main-600"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-main-50 to-main-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-gray-700/30 dark:to-gray-600/30"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center gap-3 lg:justify-normal">
              <div
                className={`transition-colors duration-300 ${
                  currentPage === item.page
                    ? "text-white"
                    : "text-gray-500 group-hover:text-main-600 dark:text-gray-400 dark:group-hover:text-main-400"
                }`}
              >
                {item.icon}
              </div>
              {minimized || (
                <span
                  className={`font-medium transition-colors duration-300 ${
                    currentPage === item.page
                      ? "text-white"
                      : "text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white"
                  }`}
                >
                  {item.title}
                </span>
              )}
            </div>

            {/* Active indicator */}
            {currentPage === item.page && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-2 h-2 w-2 rounded-full bg-white/80"
              />
            )}
          </motion.div>
        ))}
      </nav>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-main-400 via-main-500 to-main-600 opacity-60"></div>
    </motion.div>
  );
};

export default Sidebar;
