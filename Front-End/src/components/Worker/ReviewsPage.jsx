import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import FullPageLoader from "../../ui/FullPageLoader";
import Error from "../../ui/Error";
import { useUser } from "../auth/useUser";
import { useReviews } from "./useReviews";
import WorkerReviewHeader from "../../features/worker/reviews/WorkerReviewHeader";
import WorkerReviewsTable from "../../features/worker/reviews/WorkerReviewsTable";

const ReviewsPage = () => {
  const { user } = useUser();
  const { isPending: isReviewPending, error } = useReviews(user?.id);

  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const ratingFilter = searchParams.get("rating") || "all";

  const ratingOptions = [
    { value: "all", label: "All Ratings" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ];

  if (isReviewPending) {
    return <FullPageLoader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <div>
          <WorkerReviewHeader
            ratingFilter={ratingFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            ratingOptions={ratingOptions}
          />
        </div>
        <div>
          <WorkerReviewsTable
            ratingFilter={ratingFilter}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewsPage;
