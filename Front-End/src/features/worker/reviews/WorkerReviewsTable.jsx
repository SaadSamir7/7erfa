import { motion } from "framer-motion";
import { Star, User, Calendar, MessageSquare, MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../../components/auth/useUser";
import { useReviews } from "../../../components/Worker/useReviews";
import Pagination from "../../../ui/Pagination";
import { PAGE_SIZE_Orders } from "../../../utils/constants";

function WorkerReviewsTable({ ratingFilter, searchTerm }) {
  const { user } = useUser();
  const { reviews } = useReviews(user?.id);
  const [searchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const getRatingColor = (rating) => {
    switch (rating) {
      case 5:
        return "bg-green-50 text-green-700 border-green-200 ring-green-100";
      case 4:
        return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-100";
      case 3:
        return "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-100";
      case 2:
        return "bg-orange-50 text-orange-700 border-orange-200 ring-orange-100";
      case 1:
        return "bg-red-50 text-red-700 border-red-200 ring-red-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 ring-gray-100";
    }
  };

  const renderStars = (rating) => {
    const fullStars = Array(rating)
      .fill(null)
      .map((_, index) => (
        <Star
          key={`full-${index}`}
          className="fill-yellow-500 text-yellow-500"
          size={16}
        />
      ));
    const emptyStars = Array(5 - rating)
      .fill(null)
      .map((_, index) => (
        <Star
          key={`empty-${index}`}
          className="fill-gray-300 text-gray-300"
          size={16}
        />
      ));
    return [...fullStars, ...emptyStars];
  };

  const filteredReviews = (reviews || []).filter((review) => {
    const matchesSearch =
      review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      ratingFilter === "all" || review.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * PAGE_SIZE_Orders;
  const endIndex = startIndex + PAGE_SIZE_Orders;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-10 rounded-xl bg-white shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 via-gray-50 to-main-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-main-500 rounded-full"></div>
                  <span>Review ID</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <User size={12} className="text-main-500" />
                  <span>Customer</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <MapPin size={12} className="text-main-500" />
                  <span>City</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Rating</span>
                </div>
              </th>
              <th className="hidden px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200 lg:table-cell">
                <div className="flex items-center space-x-2">
                  <MessageSquare size={12} className="text-main-500" />
                  <span>Review</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <Calendar size={12} className="text-main-500" />
                  <span>Date</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-600 dark:bg-gray-800">
            {paginatedReviews.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                    <div className="text-lg font-medium">
                      {(reviews || []).length === 0
                        ? "No reviews found."
                        : "No reviews match your search criteria."}
                    </div>
                    <div className="text-sm text-gray-400">
                      {(reviews || []).length === 0
                        ? "Customer reviews will appear here once you receive them."
                        : "Try adjusting your search or filter criteria."}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedReviews.map((review, i) => {
                const displayIndex = startIndex + i + 1;
                return (
                  <tr
                    key={review._id}
                    className="group hover:bg-gradient-to-r hover:from-main-25 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 ease-in-out"
                  >
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-main-500 to-main-600 text-white font-bold text-sm shadow-lg">
                          {displayIndex}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-main-600 transition-colors">
                            #{String(displayIndex).padStart(3, "0")}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Review
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-5 text-sm">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold capitalize text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {review.customer.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Customer
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-5 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-main-500" />
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white group-hover:text-main-600 transition-colors">
                            {review.customer.city}
                          </span>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Location
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-5">
                      <div className="space-y-2">
                        <div
                          className={`inline-flex items-center space-x-2 px-3 py-2 rounded-xl border-2 ${getRatingColor(review.rating)}`}
                        >
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-semibold text-sm">
                            {review.rating}/5
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-5 text-sm text-gray-600 dark:text-gray-300 lg:table-cell">
                      <div className="max-w-xs">
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-gray-700 transition-colors">
                          &ldquo;{review.review}&rdquo;
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Customer Feedback
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-5 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-main-500" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-main-600 transition-colors">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-EG",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(review.createdAt).toLocaleTimeString(
                              "en-EG",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredReviews && filteredReviews.length > PAGE_SIZE_Orders && (
        <div className="my-6 px-6">
          <Pagination
            count={filteredReviews.length}
            pageSize={PAGE_SIZE_Orders}
          />
        </div>
      )}
    </motion.div>
  );
}

export default WorkerReviewsTable;
