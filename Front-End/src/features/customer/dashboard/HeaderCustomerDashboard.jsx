import { motion } from "framer-motion";
import { useUser } from "../../../components/auth/useUser";

function HeaderCustomerDashboard() {
  const { user } = useUser();
  return (
    <div className="relative mt-2 mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-main-600 via-main-500 to-main-700 p-8 shadow-xl">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <motion.h1
          className="text-4xl font-extrabold text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Welcome, {user?.name || "User"}
        </motion.h1>
        <motion.p
          className="text-main-100 text-lg font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Here&apos;s an overview of your recent activities and services.
        </motion.p>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-main-400/20 blur-2xl"></div>
    </div>
  );
}

export default HeaderCustomerDashboard;
