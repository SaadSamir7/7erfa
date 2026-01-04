import { auth } from "@/auth";
import { WorkerUser } from "@/types/user";
import HeaderWorkerDashboard from "./_components/HeaderWorkerDashboard";
import WorkerReviewsList from "./_components/WorkerReviewsList";
import WorkerStatDashboard from "./_components/WorkerStatDashboard";
import WorkerTasksDashboard from "./_components/WorkerTasksDashboard";
import { getOrders } from "@/services/apiOrders";
import { getReviews } from "@/services/apiReviews";

export default async function Page() {
    const session = await auth();
    const user = session?.user as WorkerUser;
    const token = session?.accessToken;
    const orders = await getOrders(token!);
    const reviews = await getReviews(user!.id, token!);

    return (
        <div className="mx-4 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20">
            <HeaderWorkerDashboard user={user} />
            <WorkerStatDashboard user={user} orders={orders} />

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <WorkerTasksDashboard orders={orders} />
                <WorkerReviewsList reviews={reviews} />
            </div>
        </div>
    );
}
