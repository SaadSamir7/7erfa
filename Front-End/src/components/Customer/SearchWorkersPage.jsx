import WorkerSearchHeader from "../../features/customer/workerSearch/WorkerSearchHeader";
import { useWorkerContext, WorkerProvider } from "../../context/WorkerContext";
import FullPageLoader from "../../ui/FullPageLoader";
import SearchFilterSort from "../../features/customer/workerSearch/SearchFilterSort";
import ResultHeader from "../../features/customer/workerSearch/ResultHeader";
import WorkersGrid from "../../features/customer/workerSearch/WorkersGrid";
import WorkersPagination from "../../features/customer/workerSearch/WorkersPagination";

const SearchWorkersContent = () => {
  const {
    currentWorkers,
    sortedWorkers,
    workerName,
    isLoading,
    setWorkerName,
    city,
    setCity,
    category,
    setCategory,
    sortOption,
    setSortOption,
  } = useWorkerContext();

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <WorkerSearchHeader />

      <SearchFilterSort
        workerName={workerName}
        setWorkerName={setWorkerName}
        city={city}
        setCity={setCity}
        category={category}
        setCategory={setCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <ResultHeader
        workerName={workerName}
        city={city}
        category={category}
        sortedWorkers={sortedWorkers}
      />

      <WorkersGrid
        sortedWorkers={sortedWorkers}
        currentWorkers={currentWorkers}
      />

      <WorkersPagination sortedWorkers={sortedWorkers} />
    </>
  );
};

const SearchWorkersPage = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20 rounded-lg">
      <div className="h-full w-full ">
        <WorkerProvider>
          <SearchWorkersContent />
        </WorkerProvider>
      </div>
    </div>
  );
};

export default SearchWorkersPage;
