import { auth } from "@/auth";
import { getOrders } from "@/services/apiOrders";
import WorkerOrderHeader from "./_components/WorkerOrderHeader";
import WorkerOrdersTable from "./_components/WorkerOrdersTable";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE_ORDERS } from "@/utils/constants";

interface Props {
    filter?: string;
    search?: string;
    page?: string;
}

export default async function Page({ searchParams }: { searchParams?: Props }) {
    const session = await auth();
    const token = session!.accessToken;
    const orders = await getOrders(token!);
    const {
        filter = "all",
        search = "",
        page = "1",
    } = (await searchParams) || {};

    const displayOrders = orders.filter((order) => {
        const matchesFilter = filter === "all" ? true : order.status === filter;
        const matchesSearch =
            order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
            order.service.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const currentPage = parseInt(page, 10);
    const startIndex = (currentPage - 1) * PAGE_SIZE_ORDERS;
    const endIndex = startIndex + PAGE_SIZE_ORDERS;
    const paginatedOrders = displayOrders.slice(startIndex, endIndex);

    return (
        <div className="space-y-6">
            <WorkerOrderHeader ordersNum={orders.length} />
            <WorkerOrdersTable orders={paginatedOrders}>
                <Pagination count={displayOrders.length} />
            </WorkerOrdersTable>
        </div>
    );
}
