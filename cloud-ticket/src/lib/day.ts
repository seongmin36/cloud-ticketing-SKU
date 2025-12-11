import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Seoul");

// 이벤트 날짜 포맷팅 (예: "Dec 17, 2025")
export function formatEventDate(date: string): string {
  return dayjs(date).format("MMM DD, YYYY");
}

export default dayjs;
