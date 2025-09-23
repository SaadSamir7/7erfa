import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_Workers } from "../../../utils/constants";

function ResultHeader({ workerName, city, category, sortedWorkers }) {
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const indexOfLastWorker = currentPage * PAGE_SIZE_Workers;
  const indexOfFirstWorker = indexOfLastWorker - PAGE_SIZE_Workers;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Available Workers
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {sortedWorkers.length} worker
          {sortedWorkers.length !== 1 ? "s" : ""} found
          {(workerName || city || category !== "all") && " for your search"}
        </p>
      </div>

      {sortedWorkers.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>
            Showing {indexOfFirstWorker + 1}-
            {Math.min(indexOfLastWorker, sortedWorkers.length)} of{" "}
            {sortedWorkers.length}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default ResultHeader;
