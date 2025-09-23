import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";

export function useOrdersCustomer() {
  const {
    data: orders,
    isPending,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return { orders: orders || [], isPending, error };
}
