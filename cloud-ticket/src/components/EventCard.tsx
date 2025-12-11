import { Event } from "@/types";
import EventBadge from "./EventBadge";
import CalendarIcon from "@/assets/calendar.svg";
import PinIcon from "@/assets/pin.svg";
import { formatEventDate } from "@/lib/day";
import Icon from "./common/Icon";
import ArrowRightIcon from "@/assets/arrow-chart.svg";

interface EventCardProps {
  event: Event;
  onClick: (eventId: number) => void;
  badge?: string;
}

export default function EventCard({ event, onClick, badge }: EventCardProps) {
  return (
    <div className="w-full bg-white rounded-[14px] border border-[#E5E5E5] overflow-hidden">
      {/* Card Header */}
      <div className="p-6">
        {/* Badges & Title */}
        <div className="space-y-1">
          {badge && (
            <div className="flex items-center gap-2 mb-1">
              <EventBadge label={badge} />
            </div>
          )}
          <h3 className="text-xl font-semibold text-[#171717] leading-[1.4] tracking-[-0.022em]">
            {event.title}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-3 text-base text-[#737373] leading-normal tracking-[-0.02em]">
          {event.description}
        </p>

        {/* Date & Location */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Icon
              icon={CalendarIcon}
              width={16}
              height={16}
              className="text-[#737373]"
            />
            <span className="text-sm text-[#737373] leading-[1.43] tracking-[-0.01em]">
              {formatEventDate(event.start_at)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon
              icon={PinIcon}
              width={16}
              height={16}
              className="text-[#737373]"
            />
            <span className="text-sm text-[#737373] leading-[1.43] tracking-[-0.01em]">
              {event.location}
            </span>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-4">
        <button
          onClick={() => onClick(event.id)}
          className={`
            w-full h-9 px-4 rounded-lg flex items-center justify-end gap-2
            text-sm font-medium leading-[1.43] tracking-[-0.01em]
            transition-all
            ${"bg-transparent hover:bg-[#FAFAFA] text-[#171717] cursor-pointer"}
          `}
        >
          <span>예약하기</span>
          <Icon
            icon={ArrowRightIcon}
            width={16}
            height={16}
            strokeWidth={1.3333333}
            color="#171717"
            className="rotate-90"
          />
        </button>
      </div>
    </div>
  );
}
