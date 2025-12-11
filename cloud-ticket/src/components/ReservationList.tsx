"use client";

import { useGetEventList } from "@/app/hooks/useGetEventList";
import { useRouter } from "next/navigation";

export default function ReservationList() {
  const router = useRouter();
  const { data: eventList, isLoading, isError } = useGetEventList();

  const handleClick = (eventId: number) => {
    router.push(`/reserve?event_id=${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">이벤트를 불러오는 중...</div>
      </div>
    );
  }

  if (isError || !eventList) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">이벤트를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      {eventList.map((event) => {
        return (
          <button
            key={event.id}
            onClick={() => handleClick(event.id)}
            className="w-full p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {event.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{event.description}</p>
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
              <span>📅 {event.start_at}</span>
              <span>📍 {event.location}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
