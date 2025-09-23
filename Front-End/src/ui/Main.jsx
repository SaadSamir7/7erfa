import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Main() {
  const location = useLocation();

  return (
    <main className="flex-1 min-h-0 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20">
      <div className="h-full w-full">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full "
        >
          <div className="h-full w-full max-w-7xl mx-auto ">
            <div className="h-full w-full">
              <Outlet />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Main;
