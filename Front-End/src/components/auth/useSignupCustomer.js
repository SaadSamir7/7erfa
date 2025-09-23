import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCustomer } from "../../services/apiCustomer";

export function useSignupCustomer() {
  const {
    mutate: signupCustomer,
    error,
    isPending: customerIsPending,
  } = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      toast.success("Signup successful! Please log in.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });
  return { signupCustomer, error, customerIsPending };
}
