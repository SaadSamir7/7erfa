import { IReview } from "@/types/reviews";
import { StarIcon, MessageSquareIcon, BriefcaseIcon } from "lucide-react";
import RatingFilter from "./RatingFilter";

function WorkerReviewHeader({ reviews }: { reviews: IReview[] }) {
    const averageRating = reviews?.length
        ? (
              reviews.reduce(
                  (acc: number, review: IReview) => acc + review.rating,
                  0
              ) / reviews.length
          ).toFixed(1)
        : "0.0";

    return (
        <div className="space-y-6">
            <div className="relative mb-6 overflow-hidden p-4 text-center">
                {/* Background decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
                    <MessageSquareIcon className="h-72 w-96 text-main-600" />
                </div>

                <div className="relative z-10">
                    {/* Main Heading */}
                    <h1 className="mb-4 bg-gradient-to-r from-gray-800 via-main-600 to-gray-800 bg-clip-text text-3xl font-black text-transparent dark:from-white dark:via-main-400 dark:to-gray-100 lg:text-5xl xl:text-6xl">
                        Customer Feedback
                        <span className="block bg-gradient-to-r from-main-500 to-yellow-500 bg-clip-text font-extrabold text-transparent">
                            Reviews Hub
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 lg:text-lg">
                        Monitor customer satisfaction, analyze feedback
                        patterns, and continuously improve your service quality
                        with valuable client insights.
                    </p>

                    {/* Stats Bar */}
                    <div className="mb-4 mt-6 flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {reviews?.length || 0}+ Customer Reviews
                            </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                            <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {averageRating} Average Rating
                            </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                            <BriefcaseIcon className="h-3 w-3 text-main-500" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Quality Assurance
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <RatingFilter />
        </div>
    );
}
export default WorkerReviewHeader;
