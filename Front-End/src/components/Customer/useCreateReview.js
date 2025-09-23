import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../services/apiReviews";
import toast from "react-hot-toast";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const {
    mutate: createNewReview,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: ({ workerId, reviewData }) =>
      createReview(workerId, reviewData),
    onSuccess: () => {
      toast.success("Review submitted successfully! ⭐");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.refetchQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to submit review. Please try again."
      );
    },
  });

  return { createNewReview, isCreating, error };
}
