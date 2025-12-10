"use client";

import { useState, useEffect } from "react";
import { LOADING_DURATION_SEC } from "@/lib/constants";
import Icon from "@/components/common/Icon";
import LoadingSandIcon from "@/assets/loading-sand.svg";
import ClockIcon from "@/assets/clock.svg";

export default function WaitingFallback() {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LOADING_DURATION_SEC);

  useEffect(() => {
    // 프로그레스 바 애니메이션 (0 → 100% in 15초)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / LOADING_DURATION_SEC) * 0.1;
        return next >= 100 ? 100 : next;
      });
    }, 100);

    // 타이머 카운트다운 (15 → 0초)
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        return next <= 0 ? 0 : next;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center p-4">
      <div className="w-full max-w-[448px] space-y-8">
        {/* 아이콘 */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-[#262626] flex items-center justify-center">
            <Icon icon={LoadingSandIcon} size={32} color="#A1A1A1" />
          </div>
        </div>

        {/* 제목 */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white tracking-[-0.022em] mb-4">
            현재 대기열에 있습니다.
          </h2>
          <p className="text-base text-[#A1A1A1]">
            페이지를 새로고침하지 마세요.
          </p>
        </div>

        {/* 대기 상태 카드 */}
        <div className="bg-[#262626] border border-[#404040] rounded-[14px] p-6 shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)] space-y-4">
          {/* 상단: 남은 시간 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon={ClockIcon} size={20} color="#D4D4D4" />
              <span className="text-sm font-medium text-[#D4D4D4]">
                남은 시간
              </span>
            </div>
            <div className="text-[30px] font-bold text-white leading-[1.2]">
              {timeDisplay}
            </div>
          </div>

          {/* 프로그레스 바 */}
          <div className="relative w-full h-2 bg-[#404040] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 하단: 상태 텍스트 */}
          <p className="text-xs text-[#737373] text-right">
            요청이 처리중입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
