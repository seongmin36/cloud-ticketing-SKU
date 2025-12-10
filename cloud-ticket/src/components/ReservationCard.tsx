"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { mockEvent, ERROR_MESSAGES } from "@/mocks/event";
import { validateEmail, validateName } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import Icon from "@/components/common/Icon";
import CalendarIcon from "@/assets/calendar.svg";
import PinIcon from "@/assets/pin.svg";

interface ReservationFormValues {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  submit?: string;
}

// 예약 카드 컴포넌트
export default function ReservationCard() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<ReservationFormValues>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateName(formValues.name)) {
      newErrors.name = ERROR_MESSAGES.nameRequired;
    }

    if (!formValues.email) {
      newErrors.email = ERROR_MESSAGES.emailRequired;
    } else if (!validateEmail(formValues.email)) {
      newErrors.email = ERROR_MESSAGES.emailInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 예약 요청 핸들러
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // 예약 요청
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: mockEvent.id,
          name: formValues.name,
          email: formValues.email,
        }),
      });

      // 예약 실패
      if (!response.ok) {
        throw new Error("Reservation failed");
      }

      // 예약 성공
      const data = await response.json();
      console.log("예약 성공:", data);

      // 대기 화면으로 이동
      const params = new URLSearchParams({
        name: formValues.name,
        email: formValues.email,
        orderId: data.orderId,
      });
      
      router.push(`${ROUTES.WAITING}?${params.toString()}`);
    } catch (error) {
      console.error("예약 에러:", error);
      setErrors({ submit: ERROR_MESSAGES.submitError });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange =
    (field: keyof ReservationFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // 입력 시 해당 필드 에러 초기화
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  return (
    <div className="w-full max-w-[448px] bg-white rounded-[14px] border border-[#E5E5E5] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center justify-center px-2 py-1 bg-[#F5F5F5] rounded-md">
            <span className="text-[12px] font-semibold leading-[1.33] tracking-[0.05em] uppercase text-[#737373]">
              CONFERENCE
            </span>
          </div>
        </div>

        <div className="mb-[22px]">
          <h1 className="text-[24px] font-bold leading-[1.33] tracking-[-0.022em] text-[#171717]">
            {mockEvent.title}
          </h1>
        </div>

        <div className="mb-1">
          <p className="text-[16px] font-normal leading-normal tracking-[-0.0195em] text-[#737373]">
            {mockEvent.description}
          </p>
        </div>
      </div>

      {/* CardContent - 날짜/장소/폼 전체 영역 */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon icon={CalendarIcon} size={16} color="#525252" />
          <span className="text-[14px] font-normal leading-[1.43] tracking-[-0.0107em] text-[#525252]">
            {mockEvent.start_at} • 09:00 AM
          </span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Icon icon={PinIcon} size={16} color="#525252" />
          <span className="text-[14px] font-normal leading-[1.43] tracking-[-0.0107em] text-[#525252]">
            {mockEvent.location}
          </span>
        </div>

        {/* 폼 - 16px 상단 패딩 */}
        <form onSubmit={handleSubmit} className="pt-4 space-y-4">
          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}

          {/* 예약 실패 메시지 */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          {/* 이름 입력 필드 */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-[14px] font-medium leading-none tracking-[-0.0107em] text-[#404040]"
            >
              이름
            </label>
            <input
              id="name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange("name")}
              placeholder="홍길동"
              className="w-full px-3 py-2 text-[16px] font-normal leading-[1.21] tracking-[-0.0195em] bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-all"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* 이메일 입력 필드 */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-[14px] font-medium leading-none tracking-[-0.0107em] text-[#404040]"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange("email")}
              placeholder="skuniv@example.com"
              className="w-full px-3 py-2 text-[16px] font-normal leading-[1.21] tracking-[-0.0195em] bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-all"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* 예약 버튼 */}
          <div className="pt-6">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const form = e.currentTarget.closest("form");
                if (form) {
                  form.requestSubmit();
                }
              }}
              disabled={isSubmitting}
              className="w-full h-[40px] flex items-center justify-center gap-2 px-6 bg-[#171717] text-white text-[14px] font-medium leading-[1.43] tracking-[-0.0107em] rounded-lg hover:bg-[#262626] active:bg-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>처리 중...</span>
                </>
              ) : (
                "예약하기"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
