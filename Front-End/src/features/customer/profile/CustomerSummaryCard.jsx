import { motion } from "framer-motion";
import { User } from "lucide-react";
function CustomerSummaryCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 backdrop-blur-sm shadow-lg dark:from-gray-700/50 dark:to-gray-800/30 dark:border-gray-600/50 p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-main-500/10 p-2">
            <User className="h-5 w-5 text-main-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Profile Summary
          </h3>
        </div>
        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-700/50">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to your customer profile! Here you can manage your personal
            information and stay connected with our service providers.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Account Type:{" "}
              <span className="font-semibold text-main-600 dark:text-main-400">
                Customer
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomerSummaryCard;
