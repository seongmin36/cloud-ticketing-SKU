import ReservationList from "@/components/ReservationList";
import { Metadata } from "next";
import { getEvents } from "./apis";

export const metadata: Metadata = {
  title: "서경 TechConf 2025 - 티켓 예약",
  description: "Join the most innovative minds in technology.",
};

// SSG: 서버 컴포넌트에서 빌드 타임에 데이터 페칭
export default async function Home() {
  // getEvents()가 서버 환경임을 감지하고 자동으로 SSG 처리
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:py-16">
      <ReservationList initialEvents={events} />
    </main>
  );
}
