import { ReservationRequest, Event, Reservation } from "@/types";

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 이벤트 목록 조회 (서버/클라이언트 겸용)
export async function getEvents(): Promise<Event[]> {
  // 서버 환경인지 확인 (window가 없으면 서버)
  const isServer = typeof window === "undefined";

  // 서버에서는 절대 URL, 클라이언트에서는 상대 URL
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    : "";

  try {
    const response = await fetch(`${baseUrl}/api/events`, {
      // 서버(SSG)에서는 force-cache, 클라이언트에서는 기본값
      cache: isServer ? "force-cache" : "default",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const result: ApiResponse<Event[]> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch events");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    // 서버에서 에러 시 빈 배열 반환 (빌드 실패 방지)
    if (isServer) {
      return [];
    }
    throw error;
  }
}

// 예약 생성
export async function postReservation(
  data: ReservationRequest
): Promise<Reservation> {
  const response = await fetch("/api/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_id: data.event_id,
      name: data.name,
      email: data.email,
    }),
  });

  if (!response.ok) {
    throw new Error("Reservation failed");
  }

  const result: ApiResponse<Reservation> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Reservation failed");
  }

  return result.data;
}

// 예약 목록 조회 (event_id로 필터링)
export async function getReservations(
  event_id?: number
): Promise<Reservation[]> {
  const url = event_id
    ? `/api/reservations?event_id=${event_id}`
    : "/api/reservations";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch reservations");
  }

  const result: ApiResponse<Reservation[]> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to fetch reservations");
  }

  return result.data;
}

// 단일 예약 조회
export async function getReservation(id: number): Promise<Reservation> {
  const response = await fetch(`/api/reservations/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch reservation");
  }

  const result: ApiResponse<Reservation> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to fetch reservation");
  }

  return result.data;
}
