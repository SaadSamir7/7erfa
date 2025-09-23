import { motion } from "framer-motion";
import { StarIcon, SearchIcon, BriefcaseIcon } from "lucide-react";
import { useWorkers } from "../../../components/Worker/useWorkers";
function WorkerSearchHeader() {
  const { workers } = useWorkers();
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative text-center mb-6 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 flex justify-center items-center opacity-5 dark:opacity-10">
        <SearchIcon className="h-72 w-96 text-main-600" />
      </div>

      <div>
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 mt-4 text-3xl font-black bg-gradient-to-r from-gray-800 via-main-600 to-gray-800 bg-clip-text text-transparent dark:from-white dark:via-main-400 dark:to-gray-100 lg:text-5xl xl:text-6xl"
        >
          Find Your Perfect
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="block bg-gradient-to-r from-main-500 to-blue-500 bg-clip-text text-transparent font-extrabold"
          >
            Skilled Worker
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base lg:text-lg leading-relaxed"
        >
          Connect with verified professionals across various skills. Browse
          ratings, experience levels, and find the perfect match for your
          project needs.
        </motion.p>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 mb-4 flex flex-wrap justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-600/50">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {workers?.data?.data?.length || 0}+ Active Workers
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-600/50">
            <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Verified Professionals
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-600/50">
            <BriefcaseIcon className="h-3 w-3 text-main-500" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              6+ Categories
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default WorkerSearchHeader;
