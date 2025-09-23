import { motion } from "framer-motion";

import Pagination from "../../../ui/Pagination";
import { PAGE_SIZE_Workers } from "../../../utils/constants";

function WorkersPagination({ sortedWorkers }) {
  return (
    <div className="w-full flex justify-center">
      {sortedWorkers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="mt-8 mb-8 bg-gradient-to-r from-white/80 via-main-50/20 to-white/80 dark:from-gray-800/80 dark:via-main-900/20 dark:to-gray-800/80 backdrop-blur-sm border border-main-200/30 dark:border-main-700/30 p-6 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-main-500/5 via-transparent to-main-500/5 rounded-2xl"></div>

            {/* Pagination component */}
            <div className="relative z-10">
              <Pagination
                count={sortedWorkers.length}
                pageSize={PAGE_SIZE_Workers}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default WorkersPagination;
