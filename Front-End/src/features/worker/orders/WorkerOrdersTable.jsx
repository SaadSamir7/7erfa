import { useOrders } from "../../../components/Worker/useOrders";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  Package,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderDetailsModal from "./WorkerOrderDetailsModal";
import Pagination from "../../../ui/Pagination";
import { PAGE_SIZE_Orders } from "../../../utils/constants";

function OrdersTable({ filterStatus, searchTerm }) {
  const { orders } = useOrders();
  const [searchParams] = useSearchParams();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200 ring-green-100";
      case "in Progress":
        return "bg-main-50 text-main-700 border-main-200 ring-main-100";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-100";
      case "canceled":
        return "bg-red-50 text-red-700 border-red-200 ring-red-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 ring-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    const iconProps = { size: 14, className: "mr-1.5" };
    switch (status) {
      case "completed":
        return <CheckCircle {...iconProps} className="mr-1.5 text-green-600" />;
      case "in Progress":
        return <Clock {...iconProps} className="mr-1.5 text-main-600" />;
      case "pending":
        return (
          <AlertCircle {...iconProps} className="mr-1.5 text-yellow-600" />
        );
      case "canceled":
        return <XCircle {...iconProps} className="mr-1.5 text-red-600" />;
      default:
        return <AlertCircle {...iconProps} className="mr-1.5 text-gray-600" />;
    }
  };

  const handleOrderClick = (order, orderNumber) => {
    console.log("Order clicked:", order);
    setSelectedOrder(order);
    setSelectedOrderNumber(orderNumber);
    setIsModalOpen(true);
    console.log("Modal should open now");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setSelectedOrderNumber(null);
  };

  const filteredOrders =
    orders?.filter((order) => {
      const matchesStatus =
        filterStatus === "all" || order.status === filterStatus.toLowerCase();
      const matchesSearch =
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    }) || [];

  // Pagination logic
  const startIndex = (currentPage - 1) * PAGE_SIZE_Orders;
  const endIndex = startIndex + PAGE_SIZE_Orders;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="my-10 rounded-xl bg-white shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 via-gray-50 to-main-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-main-500 rounded-full"></div>
                  <span>Order ID</span>
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
                  <Package size={12} className="text-main-500" />
                  <span>Service</span>
                </div>
              </th>
              <th className="hidden px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200 lg:table-cell">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Details</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Status</span>
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
            {paginatedOrders.map((order, i) => {
              const displayIndex = startIndex + i + 1;
              return (
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order, displayIndex)}
                  className="group hover:bg-gradient-to-r hover:from-main-25 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 ease-in-out cursor-pointer"
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
                          Order
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-sm">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-semibold capitalize text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {order.customer.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Customer
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-sm">
                    <div className="flex items-center space-x-2">
                      <Package size={16} className="text-main-500" />
                      <div>
                        <span className="font-semibold capitalize text-gray-900 dark:text-white group-hover:text-main-600 transition-colors">
                          {order.service}
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Service Type
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-6 py-5 text-sm text-gray-600 dark:text-gray-300 lg:table-cell">
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 dark:text-white truncate group-hover:text-gray-700 transition-colors">
                        {order.details}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Description
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-2 rounded-xl border-2 ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="font-semibold text-sm capitalize">
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-main-500" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white group-hover:text-main-600 transition-colors">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-EG",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleTimeString(
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
            })}
          </tbody>
          {filteredOrders && filteredOrders.length > PAGE_SIZE_Orders && (
            <tfoot className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <td colSpan="7" className="px-6 py-4">
                  <Pagination
                    count={filteredOrders.length}
                    pageSize={PAGE_SIZE_Orders}
                  />
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        orderNumber={selectedOrderNumber}
      />
    </div>
  );
}

export default OrdersTable;
