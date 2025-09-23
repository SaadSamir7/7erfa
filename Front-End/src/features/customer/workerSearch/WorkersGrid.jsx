import { motion } from "framer-motion";
import { StarIcon, SearchIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { encrypt } from "../../../utils/cryptoUtils";

const VITE_API_URL = import.meta.env.VITE_API_URL;

function WorkersGrid({ sortedWorkers, currentWorkers }) {
  return (
    <div>
      {sortedWorkers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <SearchIcon className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            No workers found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm">
            Try adjusting your search criteria or removing some filters to see
            more results.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {currentWorkers.map((worker, index) => (
            <motion.div
              key={worker._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index % 6) }}
            >
              <Link
                to={`/customer-dashboard/worker/${encodeURIComponent(encrypt(worker._id))}`}
                className="group relative block"
              >
                <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-main-300/50 hover:-translate-y-1 dark:from-gray-700/50 dark:to-gray-800/30 dark:border-gray-600/50 dark:hover:border-main-500/50">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  <div className="relative z-10">
                    {/* Worker Image */}
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <img
                          className="h-16 w-16 rounded-2xl border-2 border-gray-200 object-cover shadow-md lg:h-20 lg:w-20 group-hover:border-main-300 transition-colors duration-300"
                          src={
                            worker.image && worker.image !== "default.png"
                              ? `${VITE_API_URL}/uploads/${worker.image}`
                              : "/default.png"
                          }
                          alt={worker.name}
                        />
                        {/* Online indicator */}
                        <div className="absolute -bottom-1 -right-1 rounded-full bg-gradient-to-r from-green-400 to-green-500 p-1">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-bold capitalize text-gray-800 dark:text-gray-100 truncate group-hover:text-main-600 dark:group-hover:text-main-400 transition-colors duration-300">
                            {worker.name}
                          </h3>
                          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                            <StarIcon
                              size={14}
                              className="fill-yellow-500 text-yellow-500"
                            />
                            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                              {worker.ratingsAverage}
                            </span>
                          </div>
                        </div>

                        <div className="mt-1 flex items-center gap-1 text-sm font-medium text-main-600 dark:text-main-400">
                          <BriefcaseIcon size={14} />
                          <span className="capitalize">{worker.skill}</span>
                        </div>
                      </div>
                    </div>

                    {/* Worker Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPinIcon size={14} className="text-gray-400" />
                        <span>{worker.city}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">
                            {worker.yearsOfExperience}
                          </span>{" "}
                          years experience
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {worker.phoneNumber}
                        </div>
                      </div>

                      {/* Action indicator */}
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Click to view profile
                          </span>
                          <motion.div
                            className="h-6 w-6 rounded-full bg-main-100 dark:bg-main-900/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <span className="text-main-600 dark:text-main-400 text-xs">
                              →
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default WorkersGrid;
