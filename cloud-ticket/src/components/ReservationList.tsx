"use client";

import { useRouter } from "next/navigation";
import EventCard from "./EventCard";
import { Event } from "@/types";

interface ReservationListProps {
  initialEvents: Event[];
}

// 행사 리스트 컴포넌트
export default function ReservationList({
  initialEvents,
}: ReservationListProps) {
  const router = useRouter();

  const handleClick = (eventId: number) => {
    router.push(`/reserve?event_id=${eventId}`);
  };

  // SSG로 받은 데이터가 없을 때
  if (!initialEvents || initialEvents.length === 0) {
    return (
      <div className="w-full max-w-[672px] mx-auto px-4 sm:px-0">
        <div className="mb-8 space-y-2">
          <h1 className="text-[30px] font-bold text-[#171717] leading-[1.2] tracking-[-0.012em]">
            행사 리스트
          </h1>
          <p className="text-base text-[#737373] leading-normal tracking-[-0.02em]">
            Discover and book tickets for the latest tech gatherings.
          </p>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="text-[#737373]">등록된 이벤트가 없습니다.</div>
        </div>
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
        {initialEvents.map((event, index) => {
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
