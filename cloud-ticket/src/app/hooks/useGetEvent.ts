import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 단일 이벤트 조회 API
async function getEvent(event_id: number): Promise<Event> {
  const response = await fetch(`/api/events/${event_id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  const result: ApiResponse<Event> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to fetch event");
  }

  return result.data;
}

export const useGetEvent = (event_id: number) => {
  return useQuery({
    queryKey: ["event", event_id],
    queryFn: () => getEvent(event_id),
    enabled: !!event_id,
  });
};
