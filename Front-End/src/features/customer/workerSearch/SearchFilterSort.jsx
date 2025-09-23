import { motion } from "framer-motion";
import {
  SearchIcon,
  MapPinIcon,
  BriefcaseIcon,
  SortAscIcon,
  FilterIcon,
} from "lucide-react";

function SearchFilterSort({
  workerName,
  setWorkerName,
  city,
  setCity,
  category,
  setCategory,
  sortOption,
  setSortOption,
}) {
  return (
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
              Search Filters
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Worker Name Input */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Worker Name"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 pl-10 pr-4 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-main-500 dark:focus:bg-gray-700"
              />
            </div>

            {/* City Input */}
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 pl-10 pr-4 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-main-500 dark:focus:bg-gray-700"
              />
            </div>

            {/* Category Select */}
            <div className="relative">
              <BriefcaseIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-300/50 bg-white/50 py-3 pl-10 pr-8 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:focus:border-main-500 dark:focus:bg-gray-700"
              >
                <option value="all">All Categories</option>
                <option value="mechanical">Mechanical</option>
                <option value="electrical">Electrical</option>
                <option value="carpentry">Carpentry</option>
                <option value="painting">Painting</option>
                <option value="plumber">Plumber</option>
                <option value="worker">Worker</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="relative">
              <SortAscIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-300/50 bg-white/50 py-3 pl-10 pr-8 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:focus:border-main-500 dark:focus:bg-gray-700"
              >
                <option value="none">Sort by</option>
                <option value="rating">Rating</option>
                <option value="experience">Years of Experience</option>
                <option value="both">Rating & Experience</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchFilterSort;
