import { useState } from "react";
import { motion } from "framer-motion";

import { useOrders } from "./useOrders";
import FullPageLoader from "../../ui/FullPageLoader";
import WorkerOrdersTable from "../../features/worker/orders/WorkerOrdersTable";
import WorkerOrderHeader from "../../features/worker/orders/WorkerOrderHeader";

const OrdersPage = () => {
  const { isPending } = useOrders();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  if (isPending) return <FullPageLoader />;

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
          <WorkerOrderHeader
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div>
          <WorkerOrdersTable
            filterStatus={filterStatus}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersPage;
