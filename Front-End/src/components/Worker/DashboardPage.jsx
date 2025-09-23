import { motion } from "framer-motion";

import { useOrders } from "./useOrders";
import { useReviews } from "./useReviews";
import FullPageLoader from "../../ui/FullPageLoader";
import { useUser } from "../auth/useUser";
import HeaderWorkerDashboard from "../../features/worker/dashboard/HeaderWorkerDashboard";
import WorkerTasksDashboard from "../../features/worker/dashboard/WorkerTasksDashboard";
import WorkerStatDashboard from "../../features/worker/dashboard/WorkerStatDashboard";
import WorkerReviewsList from "../../features/worker/dashboard/WorkerReviewsList";

const DashboardPage = () => {
  const { user, isLoading } = useUser();

  const { isPending: isOrderPending } = useOrders();
  const { isPending: isReviewsPending } = useReviews(user?.id);

  if (isLoading || !user || isOrderPending || isReviewsPending) {
    return <FullPageLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20"
    >
      {/* Hero Section */}
      <HeaderWorkerDashboard />

      <WorkerStatDashboard />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WorkerTasksDashboard />
        <WorkerReviewsList />
      </div>
    </motion.div>
  );
};

export default DashboardPage;
