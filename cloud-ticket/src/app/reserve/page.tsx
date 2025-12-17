import ReservationCard from "@/components/ReservationCard";
import { Metadata } from "next";
import { getEvents } from "@/app/apis";

export const metadata: Metadata = {
  title: "서경 TechConf 2025 - 티켓 예약",
  description: "Join the most innovative minds in technology.",
};

type ReservePageProps = {
  searchParams: {
    event_id?: string;
  };
};

export default async function ReservePage({ searchParams }: ReservePageProps) {
  // SSG 시 서버에서 이벤트 목록을 미리 가져와 캐시(정적) 활용
  const events = await getEvents();

  const defaultEvent = events[0];
  const requestedId = searchParams.event_id
    ? Number(searchParams.event_id)
    : undefined;

  const targetEvent =
    events.find((event) => event.id === requestedId) ?? defaultEvent;

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-[448px]">
        <ReservationCard event={targetEvent} />
      </div>
    </main>
  );
}
