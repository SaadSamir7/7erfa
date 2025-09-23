import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/apiUpdateReset";
import toast from "react-hot-toast";

export function useForgetPassword() {
  const {
    mutate: forgetPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Password reset link sent to your email!");
    },
    onError: (error) => {
      toast.error(
        error?.message || "Failed to send reset link. Please try again."
      );
    },
  });
  return { forgetPassword, isPending, error };
}
