# React Query Hooks

TanStack Query를 사용한 데이터 페칭 훅들입니다.

## 설치된 패키지

```bash
npm install @tanstack/react-query
```

## 설정

`src/providers/QueryProvider.tsx`에서 QueryClient를 설정했습니다.
`src/app/layout.tsx`에서 전역적으로 적용되어 있습니다.

## 훅 사용법

### 1. useGetEventList

이벤트 목록을 가져오는 훅입니다.

```tsx
import { useGetEventList } from "@/app/hooks";

function EventList() {
  const { data: eventList, isLoading, isError } = useGetEventList();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div>
      {eventList?.map((event) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### 2. useGetEvent

단일 이벤트 정보를 가져오는 훅입니다.

```tsx
import { useGetEvent } from "@/app/hooks";

function EventDetail({ eventId }: { eventId: number }) {
  const { data: event, isLoading, isError } = useGetEvent(eventId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div>
      <h1>{event?.title}</h1>
      <p>{event?.description}</p>
    </div>
  );
}
```

### 3. useCreateReservation

예약을 생성하는 mutation 훅입니다.

```tsx
import { useCreateReservation } from "@/app/hooks";

function ReservationForm() {
  const createReservation = useCreateReservation();

  const handleSubmit = () => {
    createReservation.mutate(
      {
        event_id: 1,
        name: "홍길동",
        email: "hong@example.com",
      },
      {
        onSuccess: (data) => {
          console.log("예약 성공:", data.order_id);
        },
        onError: (error) => {
          console.error("예약 실패:", error);
        },
      }
    );
  };

  return (
    <button onClick={handleSubmit} disabled={createReservation.isPending}>
      {createReservation.isPending ? "예약 중..." : "예약하기"}
    </button>
  );
}
```

## 주요 기능

- **자동 캐싱**: 동일한 데이터 요청 시 캐시된 데이터 반환
- **자동 리페칭**: 창 포커스, 네트워크 재연결 시 자동 갱신
- **로딩/에러 상태**: isLoading, isError로 쉽게 상태 관리
- **Optimistic Updates**: 낙관적 업데이트 지원
- **Retry**: 실패 시 자동 재시도 (현재 1회 설정)

## 설정값

`src/providers/QueryProvider.tsx`에서 다음 설정을 사용합니다:

- **staleTime**: 60초 (데이터가 신선한 상태로 유지되는 시간)
- **retry**: 1회 (요청 실패 시 재시도 횟수)
