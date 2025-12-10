/**
 * Waiting Page - 대기열 페이지
 * Suspense + 15초 지연 시뮬레이션
 */

import { Suspense } from "react";
import { Metadata } from "next";
import WaitingFallback from "@/components/WaitingFallback";
import WaitingGate from "@/components/WaitingGate";

export const metadata: Metadata = {
  title: "대기 중 - SKU Ticketing",
  description: "예약을 처리하고 있습니다.",
};

export default function WaitingPage() {
  return (
    <Suspense fallback={<WaitingFallback />}>
      <WaitingFallback />
      <WaitingGate />
    </Suspense>
  );
}
