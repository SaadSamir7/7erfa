import { motion } from "framer-motion";
import FullPageLoader from "../../ui/FullPageLoader";
import { useUser } from "../auth/useUser";
import { useOrdersCustomer } from "./useOrdersCustomer";
import { useWorkers } from "../Worker/useWorkers";
import HeaderCustomerDashboard from "../../features/customer/dashboard/HeaderCustomerDashboard";
import DashboardOrderStats from "../../features/customer/dashboard/DashBoardOrderStats";
import CustomerOrdersDashboard from "../../features/customer/dashboard/CustomerOrdersDashboard";
import FeaturedWorkersList from "../../features/customer/dashboard/FeaturedWorkersList";

const DashboardPage = () => {
  const { user, isLoading } = useUser();
  const { orders, isPending: isOrdersPending } = useOrdersCustomer();
  const { isPending: isWorkersPending } = useWorkers();

  if (isLoading || !user || isOrdersPending || isWorkersPending) {
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
      <HeaderCustomerDashboard />

      {/* Stats Section */}
      <DashboardOrderStats orders={orders} />

      {/* Dashboard Content */}
      <div className="mt-8 mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CustomerOrdersDashboard />
        <FeaturedWorkersList />
      </div>
    </motion.div>
  );
};

export default DashboardPage;
