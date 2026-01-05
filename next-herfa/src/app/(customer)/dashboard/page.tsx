import { auth } from "@/auth";
import { CustomerUser } from "@/types/user";
import HeaderCustomerDashboard from "./_components/HeaderCustomerDashboard";
import DashboardOrderStats from "./_components/DashBoardOrderStats";
import CustomerOrdersDashboard from "./_components/CustomerOrdersDashboard";
import FeaturedWorkersList from "./_components/FeaturedWorkersList";
import { getOrders } from "@/services/apiOrders";
import { getWorkers } from "@/services/apiWorkers";

export default async function DashboardPage() {
    const session = await auth();
    const user = session?.user as CustomerUser;
    const token = session?.accessToken;
    const orders = await getOrders(token!);
    const workers = (await getWorkers()).data.data;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20">
            {/* Hero Section */}
            <HeaderCustomerDashboard user={user} />

            {/* Stats Section */}
            <DashboardOrderStats orders={orders} />

            {/* Dashboard Content */}
            <div className="mb-8 mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <CustomerOrdersDashboard orders={orders} />
                <FeaturedWorkersList workers={workers} />
            </div>
        </div>
    );
}
