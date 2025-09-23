import { motion } from "framer-motion";
import { User } from "lucide-react";

function CustomerProfileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative text-center mb-6 overflow-hidden p-4"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 mt-4 flex justify-center items-center opacity-5 dark:opacity-10">
        <User className="h-72 w-96 text-main-600" />
      </div>

      <div className="relative z-10">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4  text-3xl font-black bg-gradient-to-r from-gray-800 via-main-600 to-main-500 bg-clip-text text-transparent dark:from-white dark:via-main-400 dark:to-main-300 lg:text-5xl xl:text-6xl"
        >
          Customer
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="block bg-gradient-to-r from-main-500 to-main-600 bg-clip-text text-transparent font-extrabold"
          >
            Profile Hub
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base lg:text-lg leading-relaxed"
        >
          Manage your personal information and stay connected with our service
          providers.
        </motion.p>
      </div>
    </motion.div>
  );
}

export default CustomerProfileHeader;
