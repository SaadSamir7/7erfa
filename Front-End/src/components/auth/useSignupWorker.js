import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createWorker } from "../../services/apiWorkers";

export function useSignupWorker() {
  const {
    mutate: signupWorker,
    error,
    isPending: workerIsPending,
  } = useMutation({
    mutationFn: createWorker,
    onSuccess: () => {
      toast.success("Signup successful! Please log in.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });
  return { signupWorker, error, workerIsPending };
}
