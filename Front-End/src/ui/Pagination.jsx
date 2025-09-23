import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ count, pageSize = PAGE_SIZE }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    const nextpage = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", nextpage);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? 1 : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <p className="text-sm ml-2 text-gray-700 dark:text-gray-300">
        Showing{" "}
        <span className="font-semibold text-main-600 dark:text-main-400">
          {(currentPage - 1) * pageSize + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-main-600 dark:text-main-400">
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-main-600 dark:text-main-400">
          {count}
        </span>{" "}
        results
      </p>

      <div className="flex gap-3">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-main-50 hover:text-main-700 hover:border-main-300 dark:hover:bg-main-900/20 dark:hover:text-main-300 dark:hover:border-main-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-300 dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-gray-300 dark:disabled:hover:border-gray-600"
        >
          <HiChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-main-50 hover:text-main-700 hover:border-main-300 dark:hover:bg-main-900/20 dark:hover:text-main-300 dark:hover:border-main-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-300 dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-gray-300 dark:disabled:hover:border-gray-600"
        >
          <span>Next</span>
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
