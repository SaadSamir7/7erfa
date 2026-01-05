import { auth } from "@/auth";
import { getReviews } from "@/services/apiReviews";
import { PAGE_SIZE_ORDERS } from "@/utils/constants";
import WorkerReviewHeader from "./_components/WorkerReviewHeader";
import WorkerReviewsTable from "./_components/WorkerReviewsTable";
import Pagination from "@/components/Pagination";

interface Props {
    rating?: string;
    page?: string;
    search?: string;
}

export default async function Page({ searchParams }: { searchParams?: Props }) {
    const session = await auth();
    const token = session!.accessToken;
    const reviews = await getReviews(session!.user!.id, token!);
    const {
        rating = "all",
        page = "1",
        search = "",
    } = (await searchParams) || {};

    const filteredReviews = (reviews || []).filter((review) => {
        const matchesSearch =
            review.customer.name.toLowerCase().includes(search.toLowerCase()) ||
            review.review.toLowerCase().includes(search.toLowerCase());

        const matchesRating =
            rating === "all" || review.rating === Number(rating);
        return matchesSearch && matchesRating;
    });

    // Pagination logic
    const startIndex = (Number(page) - 1) * PAGE_SIZE_ORDERS;
    const endIndex = startIndex + PAGE_SIZE_ORDERS;
    const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

    return (
        <div className="space-y-6">
            <WorkerReviewHeader reviews={reviews} />
            <WorkerReviewsTable reviews={paginatedReviews}>
                <Pagination
                    count={filteredReviews.length}
                    pageSize={PAGE_SIZE_ORDERS}
                />
            </WorkerReviewsTable>
        </div>
    );
}
