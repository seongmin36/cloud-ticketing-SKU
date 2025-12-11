import ReservationList from "@/components/ReservationList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서경 TechConf 2025 - 티켓 예약",
  description: "Join the most innovative minds in technology.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:py-16">
      <ReservationList />
    </main>
  );
}
