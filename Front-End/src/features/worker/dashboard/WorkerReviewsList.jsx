import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReviews } from "../../../components/Worker/useReviews";
import { useUser } from "../../../components/auth/useUser";
import TestimonialCard from "../../../ui/TestimonialCard";

function WorkerReviewsList() {
  const { user } = useUser();
  const { reviews } = useReviews(user?.id);

  const displayReviews = reviews.slice(0, 3);
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="group rounded-2xl bg-white/70 backdrop-blur-sm p-8 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:bg-gray-800/70 dark:border-gray-700/50 dark:hover:bg-gray-800/80"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-xl bg-gradient-to-r from-main-500 to-main-600 p-2">
            <Star size={20} className="text-white fill-current" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-50">
            Latest Reviews
          </h2>
        </div>
        <button
          className="group flex items-center space-x-2 rounded-lg bg-main-50 px-4 py-2 text-sm font-semibold text-main-600 transition-all duration-200 hover:bg-main-100 hover:shadow-md dark:bg-main-900/30 dark:text-main-400 dark:hover:bg-main-900/50"
          onClick={() => navigate("/worker-dashboard/reviews")}
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
      <div className="space-y-6">
        {displayReviews.length > 0 ? (
          displayReviews?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <Star size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">No Reviews Yet</p>
            <p className="text-sm">Customer reviews will appear here</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default WorkerReviewsList;
