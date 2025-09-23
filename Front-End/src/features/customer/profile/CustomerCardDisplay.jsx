import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useUser } from "../../../components/auth/useUser";
import CustomerSummaryCard from "./CustomerSummaryCard";

function CustomerCardDisplay() {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-6"
    >
      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 backdrop-blur-sm shadow-lg dark:from-gray-700/50 dark:to-gray-800/30 dark:border-gray-600/50 p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-main-500/10 p-2">
                <Mail className="h-5 w-5 text-main-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Contact Information
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50">
                <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {user?.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50">
                <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    City
                  </p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {user?.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Summary Card */}
        <CustomerSummaryCard />
      </div>
    </motion.div>
  );
}

export default CustomerCardDisplay;
