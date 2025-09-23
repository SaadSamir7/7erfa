import { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  Package,
  FileText,
  Star,
  SquareX,
} from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "../../../ui/Modal";
import { encrypt } from "../../../utils/cryptoUtils";
import { useDeleteOrderCustomer } from "../../../components/Customer/useDeleteOrderCustomer";
import { formatDate } from "../../../utils/helper";

function CustomerOrderDetailsModal({ isOpen, onClose, order, orderNumber }) {
  const [orderToCancel, setOrderToCancel] = useState(null);
  const { mutate: cancelOrder, isPending: isCanceling } =
    useDeleteOrderCustomer();

  if (!order) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Order Details">
        <div className="text-center py-8">
          <p className="text-gray-500">No order selected</p>
        </div>
      </Modal>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Completed",
          description: "Order has been successfully completed",
        };
      case "in progress":
        return {
          icon: Clock,
          color: "text-main-600",
          bgColor: "bg-main-50",
          borderColor: "border-main-200",
          label: "In Progress",
          description: "Order is currently being worked on",
        };
      case "pending":
        return {
          icon: AlertCircle,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          label: "Pending",
          description: "Order is waiting to be started",
        };
      case "canceled":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Canceled",
          description: "Order has been canceled",
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Unknown",
          description: "Status unknown",
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  const handleCancelOrder = (id) => {
    cancelOrder(id, {
      onSuccess: () => {
        setOrderToCancel(null);
        onClose();
      },
    });
  };

  const openCancelModal = (orderId) => {
    setOrderToCancel(orderId);
  };

  const closeCancelModal = () => {
    setOrderToCancel(null);
  };

  const orderDate = formatDate(order.createdAt);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Order Details" size="lg">
        <div className="space-y-6">
          {/* Order Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-main-500 to-main-600 text-white font-bold text-lg shadow-lg">
                {orderNumber}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Order #{orderNumber}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created on {orderDate.date}
                </p>
              </div>
            </div>

            {/* Status Section */}
            <div className="text-right">
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 ${statusConfig.bgColor} ${statusConfig.borderColor}`}
                >
                  <StatusIcon size={18} className={statusConfig.color} />
                  <span className={`font-semibold ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Description */}
          <div
            className={`p-4 rounded-xl border ${statusConfig.bgColor} ${statusConfig.borderColor}`}
          >
            <p className={`text-sm ${statusConfig.color} font-medium`}>
              {statusConfig.description}
            </p>
          </div>

          {/* Order Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Worker Information */}
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <User size={20} className="text-main-500" />
                <span>Worker Information</span>
              </h5>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">
                    {order.worker?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {order.worker?.name || "Unknown Worker"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Worker
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Package size={20} className="text-main-500" />
                <span>Service Information</span>
              </h5>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Package size={16} className="text-main-500" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {order.service}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Service Type
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <FileText size={20} className="text-main-500" />
              <span>Order Details</span>
            </h5>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {order.details ||
                  "No additional details provided for this order."}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Calendar size={20} className="text-main-500" />
              <span>Timeline</span>
            </h5>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-main-500" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {orderDate.date}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created at {orderDate.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            {order.status === "pending" && (
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-red-600 dark:text-red-500 border border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                onClick={() => openCancelModal(order.id)}
                disabled={isCanceling}
              >
                <SquareX size={16} />
                <span className="font-semibold">
                  {isCanceling ? "Canceling..." : "Cancel Order"}
                </span>
              </button>
            )}
            {order.status === "completed" && order.worker?._id && (
              <Link
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-blue-600 dark:text-blue-500 border border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                to={`/customer-dashboard/worker/${encodeURIComponent(encrypt(order.worker._id))}`}
                state={{ openReview: true }}
                onClick={onClose}
              >
                <Star size={16} />
                <span className="font-semibold">Write Review</span>
              </Link>
            )}
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-50">
              Confirm Cancellation
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-200">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
                onClick={closeCancelModal}
                disabled={isCanceling}
              >
                No
              </button>
              <button
                className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
                onClick={() => handleCancelOrder(orderToCancel)}
                disabled={isCanceling}
              >
                {isCanceling ? "Canceling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerOrderDetailsModal;
