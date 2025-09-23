import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as apiLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      toast.success("Login successful!");

      localStorage.setItem("token", data.token);

      queryClient.setQueryData(["user"], {
        status: "success",
        data: {
          data: data.data.user,
        },
      });

      if (data.data.user.role === "worker") {
        navigate("/worker-dashboard");
      } else if (data.data.user.role === "customer") {
        navigate("/customer-dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    },
  });
  return { login, isLogin };
}
