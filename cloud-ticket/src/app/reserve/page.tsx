/**
 * Reserve Page - 서버 컴포넌트
 * 티켓 예약 메인 페이지
 */

import ReservationCard from "@/components/ReservationCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서경 TechConf 2025 - 티켓 예약",
  description: "Join the most innovative minds in technology.",
};

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-[448px]">
        <ReservationCard />
      </div>
    </main>
  );
}
