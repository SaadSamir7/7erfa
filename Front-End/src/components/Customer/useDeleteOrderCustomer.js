import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelOrder } from "../../services/apiOrders";

export function useDeleteOrderCustomer() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (orderId) => cancelOrder(orderId),
    onSuccess: () => {
      toast.success("Order canceled successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.refetchQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to cancel order");
    },
  });

  return { mutate, isPending, error };
}
