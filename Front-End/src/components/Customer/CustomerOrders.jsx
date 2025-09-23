import { useState } from "react";
import { motion } from "framer-motion";

import { useOrdersCustomer } from "./useOrdersCustomer";
import FullPageLoader from "../../ui/FullPageLoader";
import CustomerOrdersTable from "../../features/customer/orders/CustomerOrdersTable";
import CustomerOrdersHeader from "../../features/customer/orders/CustomerOrdersHeader";

const CustomerOrders = () => {
  const { isPending } = useOrdersCustomer();
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
        <CustomerOrdersHeader
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <CustomerOrdersTable
          filterStatus={filterStatus}
          searchTerm={searchTerm}
        />
      </div>
    </motion.div>
  );
};

export default CustomerOrders;
