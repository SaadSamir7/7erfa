import { motion } from "framer-motion";
import { Star, MapPin, Wrench } from "lucide-react";
import { useWorkers } from "../../../components/Worker/useWorkers";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../../utils/cryptoUtils";

const VITE_API_URL = import.meta.env.VITE_API_URL;

function FeaturedWorkersList() {
  const { workers } = useWorkers();
  console.log("Workers data:", workers);
  const navigate = useNavigate();

  // Sort all workers by ratingsAverage in descending order and take top 3
  const topWorkers = workers?.data?.data
    ? workers.data.data
        .sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0))
        .slice(0, 3)
    : [];

  const displayWorkers = topWorkers.map((worker) => ({
    skill: worker.skill,
    worker: worker,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="group rounded-2xl bg-white/70 backdrop-blur-sm p-8 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:bg-gray-800/70 dark:border-gray-700/50 dark:hover:bg-gray-800/80"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-xl bg-gradient-to-r from-main-500 to-main-600 p-2">
            <Wrench size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Top Workers
          </h2>
        </div>
        <button
          className="group flex items-center space-x-2 rounded-lg bg-main-50 px-4 py-2 text-sm font-semibold text-main-600 transition-all duration-200 hover:bg-main-100 hover:shadow-md dark:bg-main-900/30 dark:text-main-400 dark:hover:bg-main-900/50"
          onClick={() => navigate("/customer-dashboard/search")}
        >
          <span>View All</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        {displayWorkers.length > 0 ? (
          displayWorkers.map(({ skill, worker }, index) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="group/item cursor-pointer rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 p-6 transition-all duration-200 hover:from-main-50 hover:to-main-100/50 hover:shadow-md dark:from-gray-800/50 dark:to-gray-700/30 dark:hover:from-main-900/20 dark:hover:to-main-800/30"
              onClick={() =>
                navigate(
                  `/customer-dashboard/worker/${encodeURIComponent(encrypt(worker.id))}`
                )
              }
            >
              <div className="flex items-center space-x-4">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={
                    worker?.image && worker?.image !== "default.png"
                      ? `${VITE_API_URL}/uploads/${worker?.image}`
                      : "/default.png"
                  }
                  alt={worker.name}
                  className="h-12 w-12 rounded-full border border-gray-300 object-cover dark:border-gray-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover/item:text-main-700 dark:group-hover/item:text-main-300">
                      {worker.name}
                    </h3>
                    <div className="flex items-center space-x-1 rounded-full bg-yellow-100 px-2 py-1 dark:bg-yellow-900/30">
                      <Star
                        size={12}
                        className="fill-yellow-500 text-yellow-500"
                      />
                      <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                        {worker.ratingsAverage || 0}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-main-600 dark:text-main-400">
                        {skill}
                      </span>
                      <span className="text-xs">
                        {worker.yearsOfExperience} years exp.
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={12} />
                      <span className="text-xs">{worker.city || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-6 dark:bg-gray-800">
              <Wrench size={32} className="text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              No workers available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for available workers
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default FeaturedWorkersList;
