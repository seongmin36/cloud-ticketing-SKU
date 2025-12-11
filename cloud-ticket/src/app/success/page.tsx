"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import Icon from "@/components/common/Icon";
import CalendarIcon from "@/assets/calendar.svg";
import PinIcon from "@/assets/pin.svg";
import DownloadIcon from "@/assets/download.svg";
import dayjs from "dayjs";
import { useGetEvent } from "../hooks";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const { name, email, order_id, event_id } = Object.fromEntries(
    searchParams.entries()
  );
  const { data: event } = useGetEvent(event_id as string);

  console.log(event);

  // 필수 파라미터 체크
  if (!name || !email || !order_id) {
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

  console.log(event);
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
                <p className="text-sm font-normal text-[#171717]">{order_id}</p>
              </div>
            </div>
          </div>

          {/* CardContent - 행사 정보 */}
          <div className="px-6 py-6 space-y-4">
            {/* 행사명 */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#171717] tracking-[-0.024em]">
                {event?.title}
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
                  <Icon icon={CalendarIcon} size={16} color="#A1A1A1" />
                  <span className="text-xs font-medium uppercase text-[#A1A1A1]">
                    날짜
                  </span>
                </div>
                <span className="text-sm font-medium text-[#171717] tracking-[-0.011em]">
                  {dayjs(event?.start_at).format("YYYY.MM.DD • HH:mm A")}
                </span>
              </div>

              {/* 위치 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon icon={PinIcon} size={16} color="#A1A1A1" />
                  <span className="text-xs font-medium uppercase text-[#A1A1A1]">
                    위치
                  </span>
                </div>
                <span className="text-sm font-medium text-[#171717] tracking-[-0.011em]">
                  {event?.location}
                </span>
              </div>
            </div>
          </div>

          {/* CardFooter - 다운로드 버튼 */}
          <div className="px-6 py-6 border-t border-[#F5F5F5]">
            <button className="w-full h-9 flex items-center justify-center gap-2 bg-white border border-black/10 rounded-lg text-sm font-medium text-[#525252] tracking-[-0.011em] hover:bg-gray-50 active:bg-gray-100 transition-all">
              <Icon icon={DownloadIcon} size={16} color="#525252" />
              티켓 다운로드
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
