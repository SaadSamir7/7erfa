import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeOrder } from "../../services/apiOrders";
import toast from "react-hot-toast";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: createOrder,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: ({ orderData, workerId }) => makeOrder(orderData, workerId),
    onSuccess: () => {
      toast.success("Order created successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.refetchQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create order. Please try again.");
    },
  });

  return { createOrder, isCreating, error };
}
