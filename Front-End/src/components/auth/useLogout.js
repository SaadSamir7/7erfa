import { useMutation } from "@tanstack/react-query";
import { logout as logoutapi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: logoutapi,
    onSuccess: () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
    onError: () => {
      toast.error("Failed to logout. Please try again.");
    },
  });
  return { logout, isLogoutPending };
}
