import { getWorkers } from "@/services/apiWorkers";
import { WorkerUser } from "@/types/user";
import WorkerSearchHeader from "./_components/WorkerSearchHeader";
import SearchFilterSort from "./_components/SearchFilterSort";
import { WORKERS_PAGE_SIZE } from "@/utils/constants";
import ResultHeader from "./_components/ResultHeader";
import WorkersGrid from "./_components/WorkersGrid";
import WorkersPagination from "./_components/WorkersPagination";
import Pagination from "@/components/Pagination";

interface Props {
    name?: string;
    city?: string;
    category?: string;
    sort?: string;
    page?: string;
}

export default async function Page({ searchParams }: { searchParams: Props }) {
    const workers = await getWorkers();

    const {
        name = "",
        city = "",
        category = "all",
        sort = "both",
        page = "1",
    } = await searchParams;

    const currentPage = Number(page);

    console.log("Search Params:", { name, city, category, sort, page });

    const filteredWorkers = workers?.data?.data.filter((worker) => {
        const matchesName = worker.name
            .toLowerCase()
            .includes(name.toLowerCase());
        const matchesCity = worker.city
            .toLowerCase()
            .includes(city.toLowerCase());
        const matchesCategory =
            category === "all" ||
            worker.skill.toLowerCase() === category.toLowerCase();

        return matchesName && matchesCity && matchesCategory;
    });

    const sortWorkers = (workers: WorkerUser[]) => {
        switch (sort) {
            case "rating":
                return workers.sort(
                    (a, b) => b.ratingsAverage - a.ratingsAverage
                );
            case "experience":
                return workers.sort(
                    (a, b) => b.yearsOfExperience - a.yearsOfExperience
                );
            case "both":
                return workers.sort((a, b) => {
                    if (b.ratingsAverage === a.ratingsAverage) {
                        return b.yearsOfExperience - a.yearsOfExperience;
                    }
                    return b.ratingsAverage - a.ratingsAverage;
                });
            default:
                return workers;
        }
    };

    const sortedWorkers = sortWorkers(filteredWorkers);

    // Pagination Logic
    const indexOfLastWorker = currentPage * WORKERS_PAGE_SIZE;
    const indexOfFirstWorker = indexOfLastWorker - WORKERS_PAGE_SIZE;
    const currentWorkers = sortedWorkers?.slice(
        indexOfFirstWorker,
        indexOfLastWorker
    );

    return (
        <>
            <WorkerSearchHeader workersNum={workers?.results} />
            <SearchFilterSort />
            <ResultHeader
                sortedWorkers={sortedWorkers}
                name={name}
                city={city}
                category={category}
                currentPage={currentPage}
            />
            <WorkersGrid
                sortedWorkers={sortedWorkers}
                currentWorkers={currentWorkers}
            />

            <WorkersPagination sortedWorkers={sortedWorkers}>
                <Pagination
                    count={sortedWorkers.length}
                    pageSize={WORKERS_PAGE_SIZE}
                />
            </WorkersPagination>
        </>
    );
}
