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
  Edit3,
} from "lucide-react";
import Modal from "../../../ui/Modal";
import { useUpdateOrderStatus } from "../../../components/Worker/useUpdateOrderStatus";
import { getAvailableStatuses } from "../../../utils/helper";

function OrderDetailsModal({ isOpen, onClose, order, orderNumber }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "");
  const { mutate: updateOrderStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

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

  const handleStatusUpdate = () => {
    if (selectedStatus !== order.status) {
      updateOrderStatus(
        { orderId: order.id, status: selectedStatus },
        {
          onSuccess: () => {
            setIsEditing(false);
            onClose();
          },
        }
      );
    } else {
      setIsEditing(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const orderDate = formatDate(order.createdAt);

  return (
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
            {!isEditing ? (
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 ${statusConfig.bgColor} ${statusConfig.borderColor}`}
                >
                  <StatusIcon size={18} className={statusConfig.color} />
                  <span className={`font-semibold ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>
                {order.status !== "completed" &&
                  order.status !== "canceled" && (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setSelectedStatus(order.status);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-main-600 hover:text-main-700 hover:bg-main-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit3 size={14} />
                      <span>Edit</span>
                    </button>
                  )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border-2 border-main-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-main-100 focus:border-main-500"
                  disabled={isUpdating}
                >
                  {getAvailableStatuses(order.status).map((status) => {
                    const config = getStatusConfig(status);
                    return (
                      <option key={status} value={status}>
                        {config.label}
                      </option>
                    );
                  })}
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-main-500 text-white rounded-lg hover:bg-main-600 focus:outline-none focus:ring-4 focus:ring-main-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedStatus(order.status);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
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
          {/* Customer Information */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <User size={20} className="text-main-500" />
              <span>Customer Information</span>
            </h5>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">
                  {order.customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {order.customer.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customer
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
      </div>
    </Modal>
  );
}

export default OrderDetailsModal;
