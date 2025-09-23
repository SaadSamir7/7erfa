import { motion } from "framer-motion";
import CustomerProfileHeader from "../../features/customer/profile/CustomerProfileHeader";
import CustomerCardDetails from "../../features/customer/profile/CustomerCardDetails";

const ProfilePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 mb-8"
    >
      <CustomerProfileHeader />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 backdrop-blur-sm shadow-xl dark:from-gray-700/50 dark:to-gray-800/30 dark:border-gray-600/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div className="relative z-10 p-8">
          <CustomerCardDetails />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
