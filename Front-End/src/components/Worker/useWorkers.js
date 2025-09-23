import { useQuery } from "@tanstack/react-query";
import { getWorkers } from "../../services/apiWorkers";

export function useWorkers() {
  const { data: workers, isPending } = useQuery({
    queryKey: ["workers"],
    queryFn: getWorkers,
  });

  return { workers, isPending };
}
