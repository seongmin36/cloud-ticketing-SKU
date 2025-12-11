// 이벤트 정보
export interface Event {
  id: number;
  title: string;
  description: string;
  start_at: string;
  location: string;
  created_at: string;
}

// 예약 폼 값
export interface ReservationFormValues {
  name: string;
  email: string;
}

// 예약 요청
export interface ReservationRequest extends ReservationFormValues {
  event_id: number;
}

export interface Reservation {
  id: number;
  event_id: number;
  name: string;
  email: string;
  order_id: string;
  created_at: string;
}

// 예약 응답
export interface ReservationResponse {
  ok: boolean;
  order_id?: string;
  error?: string;
  data?: Reservation;
}

// 폼 에러
export interface FormErrors {
  name?: string;
  email?: string;
  submit?: string;
}
