import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../../services/apiUpdateReset";
import toast from "react-hot-toast";

function useUpdateCustomerData() {
  const queryClient = useQueryClient();
  const { mutate: updateCustomer, isPending: isUpdating } = useMutation({
    mutationFn: updateMe,
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], data);
    },
  });
  return { updateCustomer, isUpdating };
}

export default useUpdateCustomerData;
