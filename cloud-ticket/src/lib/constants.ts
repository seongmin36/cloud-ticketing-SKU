/**
 * 전역 상수
 */

// 대기 시간 (밀리초)
export const LOADING_DURATION_MS = 15000; // 15초

// 대기 시간 (초)
export const LOADING_DURATION_SEC = LOADING_DURATION_MS / 1000;

// API 엔드포인트
export const API_ENDPOINTS = {
  RESERVE: "/api/reserve",
} as const;

// 라우트 경로
export const ROUTES = {
  HOME: "/",
  RESERVE: "/reserve",
  WAITING: "/waiting",
  SUCCESS: "/success",
} as const;
