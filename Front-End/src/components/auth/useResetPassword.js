import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiUpdateReset";
import toast from "react-hot-toast";

export function useResetPassword() {
  const {
    mutate: resetPassword,
    error,
    isPending,
  } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success(
        "Password reset successful! Please log in with your new password."
      );
    },
    onError: () => {
      toast.error("Password reset failed. Please try again.");
    },
  });
  return { resetPassword, error, isPending };
}
