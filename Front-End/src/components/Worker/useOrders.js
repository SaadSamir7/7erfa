import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";

export function useOrders() {
  const {
    data: orders,
    isPending,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return {
    orders,
    isPending,
    error,
  };
}
