import Icon from "@/components/common/Icon";
import CalendarIcon from "@/assets/calendar.svg";
import PinIcon from "@/assets/pin.svg";
import { ReservationFormValues, FormErrors, Event } from "@/types";
import { getEvents } from "@/app/apis";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TicketIcon from "@/assets/ticket.svg";

interface ReserveationProps {
  eventId: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  successMessage: string;
  errors: FormErrors;
  formValues: ReservationFormValues;
  isSubmitting: boolean;
  handleInputChange: (
    field: keyof ReservationFormValues
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ReservationItem({
  eventId,
  handleSubmit,
  successMessage,
  errors,
  formValues,
  isSubmitting,
  handleInputChange,
}: ReserveationProps) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        setEvents(events);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch events");
      }
    };
    fetchEvents();
  }, []);

  const event = events.find((event) => event.id === eventId);
  const startAt = dayjs(event?.start_at).format("YYYY.MM.DD • HH:mm A");

  return (
    <div className="px-6 pt-6 pb-0">
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center justify-center px-2 py-1 bg-[#F5F5F5] rounded-md">
          <span className="text-[12px] font-semibold leading-[1.33] tracking-[0.05em] uppercase text-[#737373]">
            CONFERENCE
          </span>
        </div>
        <Icon icon={TicketIcon} size={16} color="#525252" strokeWidth={2} />
      </div>

      <div className="mb-[22px]">
        <h1 className="text-[24px] font-bold leading-[1.33] tracking-[-0.022em] text-[#171717]">
          {event?.title}
        </h1>
      </div>

      <div className="mb-1">
        <p className="text-[16px] font-normal leading-normal tracking-[-0.0195em] text-[#737373]">
          {event?.description}
        </p>
      </div>
      {/* CardContent - 날짜/장소/폼 전체 영역 */}
      <div className="pb-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon icon={CalendarIcon} size={16} color="#525252" />
          <span className="text-[14px] font-normal leading-[1.43] tracking-[-0.0107em] text-[#525252]">
            {startAt}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Icon icon={PinIcon} size={16} color="#525252" />
          <span className="text-[14px] font-normal leading-[1.43] tracking-[-0.0107em] text-[#525252]">
            {event?.location}
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
