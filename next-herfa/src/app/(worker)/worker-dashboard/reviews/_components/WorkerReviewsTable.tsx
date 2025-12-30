import { Calendar, MapPin, MessageSquare, Star, User } from "lucide-react";
import { IReview } from "@/types/reviews";

function WorkerReviewsTable({
    reviews,
    children,
}: {
    reviews: IReview[];
    children: React.ReactNode;
}) {
    const getRatingColor = (rating: number) => {
        switch (rating) {
            case 5:
                return "bg-green-50 text-green-700 border-green-200 ring-green-100";
            case 4:
                return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-100";
            case 3:
                return "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-100";
            case 2:
                return "bg-orange-50 text-orange-700 border-orange-200 ring-orange-100";
            case 1:
                return "bg-red-50 text-red-700 border-red-200 ring-red-100";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200 ring-gray-100";
        }
    };

    const renderStars = (rating: number) => {
        const fullStars = Array(rating)
            .fill(null)
            .map((_, index) => (
                <Star
                    key={`full-${index}`}
                    className="fill-yellow-500 text-yellow-500"
                    size={16}
                />
            ));
        const emptyStars = Array(5 - rating)
            .fill(null)
            .map((_, index) => (
                <Star
                    key={`empty-${index}`}
                    className="fill-gray-300 text-gray-300"
                    size={16}
                />
            ));
        return [...fullStars, ...emptyStars];
    };

    return (
        <div className="my-10 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 via-gray-50 to-main-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-600">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <User size={12} className="text-main-500" />
                                    <span>Customer</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <MapPin
                                        size={12}
                                        className="text-main-500"
                                    />
                                    <span>City</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                    <span>Rating</span>
                                </div>
                            </th>
                            <th className="hidden px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200 lg:table-cell">
                                <div className="flex items-center space-x-2">
                                    <MessageSquare
                                        size={12}
                                        className="text-main-500"
                                    />
                                    <span>Review</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <Calendar
                                        size={12}
                                        className="text-main-500"
                                    />
                                    <span>Date</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-600 dark:bg-gray-800">
                        {reviews.map((review) => (
                            <tr
                                key={review._id}
                                className="hover:from-main-25 group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800"
                            >
                                <td className="whitespace-nowrap px-6 py-5 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <User
                                            size={16}
                                            className="text-main-500"
                                        />
                                        <div>
                                            <div className="font-semibold capitalize text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
                                                {review.customer.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Customer
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-5 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <MapPin
                                            size={16}
                                            className="text-main-500"
                                        />
                                        <div>
                                            <span className="font-semibold text-gray-900 transition-colors group-hover:text-main-600 dark:text-white">
                                                {review.customer.city}
                                            </span>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Location
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-5">
                                    <div className="space-y-2">
                                        <div
                                            className={`inline-flex items-center space-x-2 rounded-xl border-2 px-3 py-2 ${getRatingColor(review.rating)}`}
                                        >
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="text-sm font-semibold">
                                                {review.rating}/5
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden px-6 py-5 text-sm text-gray-600 dark:text-gray-300 lg:table-cell">
                                    <div className="max-w-xs">
                                        <p className="line-clamp-2 font-medium text-gray-900 transition-colors group-hover:text-gray-700 dark:text-white">
                                            &ldquo;{review.review}&rdquo;
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            Customer Feedback
                                        </p>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-5 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Calendar
                                            size={16}
                                            className="text-main-500"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900 transition-colors group-hover:text-main-600 dark:text-white">
                                                {new Date(
                                                    review.createdAt
                                                ).toLocaleDateString("en-EG", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(
                                                    review.createdAt
                                                ).toLocaleTimeString("en-EG", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <td colSpan={7} className="px-6 py-4">
                                {children}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default WorkerReviewsTable;
