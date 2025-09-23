import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../services/apiReviews";

export function useReviews(userId) {
  const {
    data: reviews,
    isPending,
    error,
  } = useQuery({
    queryKey: ["reviews", userId],
    queryFn: () => getReviews(userId),
  });

  return {
    reviews: reviews?.data?.data || [],
    isPending,
    error,
  };
}
