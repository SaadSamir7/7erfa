import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { useOrdersCustomer } from "../../../components/Customer/useOrdersCustomer";
import { useNavigate } from "react-router-dom";

function CustomerOrdersDashboard() {
  const { orders } = useOrdersCustomer();
  const navigate = useNavigate();
  const displayOrders = orders?.slice(0, 3) || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "in progress":
        return "bg-main-100 text-main-700 dark:bg-main-900/30 dark:text-main-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "canceled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="group rounded-2xl bg-white/70 backdrop-blur-sm p-8 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:bg-gray-800/70 dark:border-gray-700/50 dark:hover:bg-gray-800/80"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-xl bg-gradient-to-r from-main-500 to-main-600 p-2">
            <Clock size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Recent Orders
          </h2>
        </div>
        <button
          className="group flex items-center space-x-2 rounded-lg bg-main-50 px-4 py-2 text-sm font-semibold text-main-600 transition-all duration-200 hover:bg-main-100 hover:shadow-md dark:bg-main-900/30 dark:text-main-400 dark:hover:bg-main-900/50"
          onClick={() => navigate("/customer-dashboard/orders")}
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
        {displayOrders.length > 0 ? (
          displayOrders?.map((order, index) => (
            <motion.div
              key={order?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="group/item cursor-pointer rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 p-6 transition-all duration-200 hover:from-main-50 hover:to-main-100/50 hover:shadow-md dark:from-gray-800/50 dark:to-gray-700/30 dark:hover:from-main-900/20 dark:hover:to-main-800/30"
              onClick={() => navigate(`/customer-dashboard/orders`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover/item:text-main-700 dark:group-hover/item:text-main-300">
                      {order?.service || "Order"}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                        order?.status
                      )}`}
                    >
                      {order?.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>
                        {order?.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "Date not available"}
                      </span>
                    </div>
                    {order?.worker && (
                      <div className="text-sm">
                        <span className="font-medium">Worker: </span>
                        <span className="text-main-600 dark:text-main-400">
                          {order.worker.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-6 dark:bg-gray-800">
              <Clock size={32} className="text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              No orders yet
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Start by creating your first order
            </p>
            <button
              onClick={() => navigate("/customer-dashboard/search")}
              className="rounded-lg bg-gradient-to-r from-main-500 to-main-600 px-6 py-2 text-white transition-all duration-200 hover:from-main-600 hover:to-main-700 hover:shadow-lg"
            >
              Browse Workers
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default CustomerOrdersDashboard;
