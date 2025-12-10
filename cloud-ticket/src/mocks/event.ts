import { Event } from "@/types";

export const mockEvent: Event = {
  id: 1,
  title: "서경 TechConf 2025",
  description: "Join the most innovative minds in technology.",
  start_at: "2025.12.17",
  location: "Seoul",
  created_at: "2025.12.17",
};

export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^.{1,}$/,
} as const;

export const ERROR_MESSAGES = {
  nameRequired: "이름을 입력해주세요.",
  emailRequired: "이메일을 입력해주세요.",
  emailInvalid: "올바른 이메일 형식을 입력해주세요.",
  submitError: "예약 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
} as const;
