"use client";

import { useGetEventList } from "@/app/hooks/useGetEventList";
import { useRouter } from "next/navigation";
import EventCard from "./EventCard";

export default function ReservationList() {
  const router = useRouter();
  const { data: eventList, isLoading, isError } = useGetEventList();

  const handleClick = (eventId: number) => {
    router.push(`/reserve?event_id=${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-[#737373]">이벤트를 불러오는 중...</div>
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
    <div className="w-full max-w-[672px] mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-[30px] font-bold text-[#171717] leading-[1.2] tracking-[-0.012em]">
          행사 리스트
        </h1>
        <p className="text-base text-[#737373] leading-normal tracking-[-0.02em]">
          Discover and book tickets for the latest tech gatherings.
        </p>
      </div>

      {/* Event Cards */}
      <div className="space-y-7">
        {eventList.map((event, index) => {
          // 각 이벤트에 다른 배지 적용 (예시)
          let badge = "Conference";

          // 이벤트별 배지 커스터마이징 (실제로는 API에서 받아와야 함)
          if (index === 1) {
            badge = "Workshop";
          } else if (index === 2) {
            badge = "Networking";
          }

          return (
            <EventCard
              key={event.id}
              event={event}
              onClick={handleClick}
              badge={badge}
            />
          );
        })}
      </div>
    </div>
  );
}
