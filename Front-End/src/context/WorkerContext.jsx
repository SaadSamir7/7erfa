/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useWorkers } from "../components/Worker/useWorkers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_Workers } from "../utils/constants";

const WorkerContext = createContext();

function WorkerProvider({ children }) {
  const { workers, isPending: isLoading } = useWorkers();
  const [searchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const [workerName, setWorkerName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const filteredWorkers = workers?.data?.data.filter((worker) => {
    const matchesName = worker.name
      .toLowerCase()
      .includes(workerName.toLowerCase());
    const matchesCity = worker.city.toLowerCase().includes(city.toLowerCase());
    const matchesCategory =
      category === "all" ||
      worker.skill.toLowerCase() === category.toLowerCase();

    return matchesName && matchesCity && matchesCategory;
  });

  const sortWorkers = (workers) => {
    switch (sortOption) {
      case "rating":
        return workers.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
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

  const indexOfLastWorker = currentPage * PAGE_SIZE_Workers;
  const indexOfFirstWorker = indexOfLastWorker - PAGE_SIZE_Workers;
  const currentWorkers = sortedWorkers?.slice(
    indexOfFirstWorker,
    indexOfLastWorker
  );
  return (
    <WorkerContext.Provider
      value={{
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
      }}
    >
      {children}
    </WorkerContext.Provider>
  );
}

function useWorkerContext() {
  const context = useContext(WorkerContext);
  if (context === undefined) {
    throw new Error("useWorkerContext must be used within a WorkerProvider");
  }
  return context;
}

export { WorkerProvider, useWorkerContext };
