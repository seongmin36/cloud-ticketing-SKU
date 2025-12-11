import ReservationList from "@/components/ReservationList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서경 TechConf 2025 - 티켓 예약",
  description: "Join the most innovative minds in technology.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full flex flex-col items-center justify-center">
        <ReservationList />
      </div>
    </main>
  );
}
