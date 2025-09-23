import { motion } from "framer-motion";
import {
  SearchIcon,
  FilterIcon,
  ClipboardListIcon,
  StarIcon,
  BriefcaseIcon,
} from "lucide-react";
import { useOrdersCustomer } from "../../../components/Customer/useOrdersCustomer";

function CustomerOrdersHeader({
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
}) {
  const { orders } = useOrdersCustomer();
  return (
    <div className="space-y-6 mt-2 mb-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative text-center mb-6 overflow-hidden "
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 flex justify-center items-center opacity-5 dark:opacity-10">
          <ClipboardListIcon className="h-72 w-96 text-main-600" />
        </div>

        <div className="relative z-10">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 mt-4 text-3xl font-black bg-gradient-to-r from-gray-800 via-main-600 to-gray-800 bg-clip-text text-transparent dark:from-white dark:via-main-400 dark:to-gray-100 lg:text-5xl xl:text-6xl"
          >
            Track Your Project
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="block bg-gradient-to-r from-main-500 to-blue-500 bg-clip-text text-transparent font-extrabold"
            >
              Orders Hub
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base lg:text-lg leading-relaxed"
          >
            Monitor progress, communicate with workers, and manage all your
            service orders seamlessly.
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 mb-4 flex flex-wrap justify-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {orders.length}+ Orders
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Quality Tracking
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-600/50">
              <BriefcaseIcon className="h-3 w-3 text-main-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                24/7 Support
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 p-4 backdrop-blur-sm shadow-lg dark:from-gray-700/50 dark:to-gray-800/30 dark:border-gray-600/50">
          <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <FilterIcon className="h-5 w-5 text-main-600 dark:text-main-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Search & Filter
              </h3>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders by worker name, service type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 pl-10 pr-4 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-main-500 dark:focus:bg-gray-700"
                />
              </div>

              {/* Status Filter */}
              <div className="relative w-full sm:w-auto">
                <FilterIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-300/50 bg-white/50 py-3 pl-10 pr-8 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:focus:border-main-500 dark:focus:bg-gray-700 sm:min-w-[180px]"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">🟡 Pending</option>
                  <option value="In Progress">🔵 In Progress</option>
                  <option value="Completed">🟢 Completed</option>
                  <option value="Canceled">🔴 Canceled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CustomerOrdersHeader;
