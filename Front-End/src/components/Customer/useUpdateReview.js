import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyReview } from "../../services/apiReviews";
import toast from "react-hot-toast";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  const {
    mutate: updateReview,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ workerId, reviewData, reviewId }) =>
      updateMyReview(workerId, reviewData, reviewId),
    onSuccess: () => {
      toast.success("Review updated successfully! ✨");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.refetchQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to update review. Please try again."
      );
    },
  });

  return { updateReview, isUpdating, error };
}
