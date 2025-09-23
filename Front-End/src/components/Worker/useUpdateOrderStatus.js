import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../services/apiOrders";
import toast from "react-hot-toast";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.refetchQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update order status");
    },
  });

  return { mutate, isPending, error };
}
