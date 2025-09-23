import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/apiCustomer";

export function useCustomers() {
  const { data: customers, isPending: customersLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  return { customers, customersLoading };
}
