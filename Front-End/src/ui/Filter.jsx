import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="border border-gray-200 bg-white shadow-sm rounded-md p-1 flex gap-1">
      {options.map((option) => {
        const isActive = currentFilter === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            disabled={isActive}
            className={`rounded-md font-medium text-sm px-2 py-1 transition 
              ${
                isActive
                  ? "bg-main-600 text-blue-50"
                  : "bg-white hover:bg-main-600 hover:text-blue-50 text-gray-800"
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default Filter;
