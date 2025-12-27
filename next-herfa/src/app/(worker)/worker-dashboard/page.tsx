import HeaderWorkerDashboard from "./_components/HeaderWorkerDashboard";
import WorkerReviewsList from "./_components/WorkerReviewsList";
import WorkerStatDashboard from "./_components/WorkerStatDashboard";
import WorkerTasksDashboard from "./_components/WorkerTasksDashboard";

export default function Page() {
    return (
        <div className="mx-4 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20">
            <HeaderWorkerDashboard />
            <WorkerStatDashboard />

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <WorkerTasksDashboard />
                <WorkerReviewsList />
            </div>
        </div>
    );
}
