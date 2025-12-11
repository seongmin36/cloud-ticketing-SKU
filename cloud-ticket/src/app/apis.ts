import { ReservationRequest, Event, Reservation } from "@/types";

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 이벤트 목록 조회
export async function getEvents(): Promise<Event[]> {
  const response = await fetch("/api/events");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const result: ApiResponse<Event[]> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to fetch events");
  }

  return result.data;
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
