import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/app/apis";

export const useGetEventList = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};
