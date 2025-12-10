/**
 * Success Page - 예약 완료 페이지
 * Figma: ReservationSuccess (1:83)
 */

import { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { mockEvent } from "@/mocks/event";

export const metadata: Metadata = {
  title: "예약 완료 - SKU Ticketing",
  description: "예약이 성공적으로 완료되었습니다.",
};

interface SearchParams {
  name?: string;
  email?: string;
  orderId?: string;
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { name, email, orderId } = params;

  // 필수 파라미터 체크
  if (!name || !email || !orderId) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-lg text-[#737373]">
            예약 정보가 존재하지 않습니다.
          </p>
          <Link
            href={ROUTES.RESERVE}
            className="inline-block px-6 py-3 bg-[#171717] text-white rounded-lg hover:bg-[#262626] transition-all"
          >
            처음 화면으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-[448px] space-y-8">
        {/* 성공 아이콘 */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#DCFCE7] shadow-[0px_0px_0px_8px_rgba(240,253,244,1)] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#00A63E]"
              fill="none"
              viewBox="0 0 32 32"
              stroke="currentColor"
              strokeWidth="2.67"
            >
              <polyline points="5.33,16 13.33,24 26.67,10.67" />
            </svg>
          </div>
        </div>

        {/* 제목 및 이메일 */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-[#171717] tracking-[0.003em]">
            예약이 완료되었습니다!
          </h1>
          <div className="space-y-1">
            <p className="text-base text-[#737373]">
              확인 이메일을 발송했습니다.
            </p>
            <p className="text-base font-medium text-[#171717]">{email}</p>
          </div>
        </div>

        {/* 티켓 카드 */}
        <div className="bg-white border border-[#E5E5E5] rounded-[14px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* 상단 강조 바 */}
          <div className="h-2 bg-[#171717]" />

          {/* CardHeader - Ticket Holder / Order ID */}
          <div className="px-6 py-6 border-b border-[#F5F5F5]">
            <div className="flex items-start justify-between">
              {/* Ticket Holder */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#737373]">
                  Ticket Holder
                </p>
                <p className="text-lg font-semibold text-[#171717] tracking-[-0.024em]">
                  {name}
                </p>
              </div>

              {/* Order ID */}
              <div className="space-y-2 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#737373]">
                  Order ID
                </p>
                <p className="text-sm font-normal text-[#171717]">
                  {orderId}
                </p>
              </div>
            </div>
          </div>

          {/* CardContent - 행사 정보 */}
          <div className="px-6 py-6 space-y-4">
            {/* 행사명 */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#171717] tracking-[-0.024em]">
                {mockEvent.title}
              </h3>
              <p className="text-sm text-[#737373] tracking-[-0.011em]">
                General Admission
              </p>
            </div>

            {/* 구분선 */}
            <div className="h-px bg-[#F5F5F5]" />

            {/* 날짜 및 위치 */}
            <div className="space-y-1">
              {/* 날짜 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#A1A1A1]"
                    fill="none"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                    strokeWidth="1.33"
                  >
                    <rect x="2" y="2.67" width="12" height="12" rx="2" ry="2" />
                    <line x1="5.33" y1="1.33" x2="5.33" y2="4" />
                    <line x1="10.67" y1="1.33" x2="10.67" y2="4" />
                    <line x1="2" y1="6.67" x2="14" y2="6.67" />
                  </svg>
                  <span className="text-xs font-medium uppercase text-[#A1A1A1]">
                    날짜
                  </span>
                </div>
                <span className="text-sm font-medium text-[#171717] tracking-[-0.011em]">
                  {mockEvent.start_at}
                </span>
              </div>

              {/* 위치 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#A1A1A1]"
                    fill="none"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                    strokeWidth="1.33"
                  >
                    <path d="M13.33 6.67c0 3.33-5.33 8-5.33 8s-5.33-4.67-5.33-8a5.33 5.33 0 0 1 10.66 0z" />
                    <circle cx="8" cy="6.67" r="2" />
                  </svg>
                  <span className="text-xs font-medium uppercase text-[#A1A1A1]">
                    위치
                  </span>
                </div>
                <span className="text-sm font-medium text-[#171717] tracking-[-0.011em]">
                  Seoul, SKU Bukak Hall
                </span>
              </div>
            </div>
          </div>

          {/* CardFooter - 다운로드 버튼 */}
          <div className="px-6 py-6 border-t border-[#F5F5F5]">
            <button
              className="w-full h-9 flex items-center justify-center gap-2 bg-white border border-black/10 rounded-lg text-sm font-medium text-[#525252] tracking-[-0.011em] hover:bg-gray-50 active:bg-gray-100 transition-all"
              onClick={() => alert("티켓 다운로드 기능은 추후 구현 예정입니다.")}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 16 16"
                stroke="currentColor"
                strokeWidth="1.33"
              >
                <path d="M14 10v2.67A1.33 1.33 0 0 1 12.67 14H3.33A1.33 1.33 0 0 1 2 12.67V10" />
                <polyline points="4.67,6.67 8,10 11.33,6.67" />
                <line x1="8" y1="10" x2="8" y2="2" />
              </svg>
              티켓 다운로드
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
