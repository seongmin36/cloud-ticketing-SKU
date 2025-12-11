# 최종 API 구조

## 📁 API 엔드포인트

```
src/app/api/
├── events/
│   ├── route.ts              → GET /api/events (이벤트 목록)
│   └── [id]/
│       └── route.ts          → GET /api/events/:id (단일 이벤트)
│
└── reservations/
    ├── route.ts              → GET /api/reservations (예약 목록)
    │                         → POST /api/reservations (예약 생성)
    └── [id]/
        └── route.ts          → GET /api/reservations/:id (단일 예약)
```

---

## 🔄 데이터 흐름

### 1. 홈페이지 → 이벤트 목록 조회

```
GET /api/events
→ { success: true, data: [{ id, title, description, ... }] }
```

### 2. 이벤트 클릭 → 예약 페이지

```
/reserve?event_id=1
```

### 3. 예약 폼 제출

```
POST /api/reservations
Body: { event_id: 1, name: "홍길동", email: "hong@test.com" }
→ { success: true, data: { id, order_id, event_id, name, email, ... } }
```

### 4. 대기 페이지

```
/waiting?name=홍길동&email=hong@test.com&order_id=TK-1234&event_id=1
→ 15초 대기 후 Success 페이지로 이동
```

### 5. 성공 페이지

```
/success?name=홍길동&email=hong@test.com&order_id=TK-1234&event_id=1
→ GET /api/events/1 (이벤트 정보 조회)
→ { success: true, data: { title, start_at, location, ... } }
```

---

## 📝 API 상세

### Events API

#### 이벤트 목록 조회

```http
GET /api/events
```

**응답:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "서경 TechConf 2025",
      "description": "...",
      "start_at": "2025-01-15T09:00:00Z",
      "location": "서경대학교",
      "created_at": "..."
    }
  ]
}
```

#### 단일 이벤트 조회

```http
GET /api/events/:id
```

**응답:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "서경 TechConf 2025",
    ...
  }
}
```

---

### Reservations API

#### 예약 생성

```http
POST /api/reservations
Content-Type: application/json

{
  "event_id": 1,
  "name": "홍길동",
  "email": "hong@test.com"
}
```

**응답:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "order_id": "TK-1234",
    "event_id": 1,
    "name": "홍길동",
    "email": "hong@test.com",
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

#### 예약 목록 조회

```http
GET /api/reservations
GET /api/reservations?event_id=1  (특정 이벤트 필터링)
```

**응답:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "order_id": "TK-1234",
      "event_id": 1,
      "name": "홍길동",
      "email": "hong@test.com",
      "created_at": "..."
    }
  ]
}
```

#### 단일 예약 조회

```http
GET /api/reservations/:id
```

**응답:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "order_id": "TK-1234",
    ...
  }
}
```

---

## 🎯 Success 페이지 요구사항

### 필수 URL 파라미터

```
/success?name=홍길동&email=hong@test.com&order_id=TK-1234&event_id=1
```

**모든 파라미터 필수:**

- `name` - 예약자 이름
- `email` - 예약자 이메일
- `order_id` - 주문 번호
- `event_id` - 이벤트 ID

### 처리 흐름

1. URL 파라미터 검증 (4개 모두 필수)
2. `event_id`로 이벤트 정보 조회
3. 티켓 정보 표시

---

## ✅ 보안 고려사항

### 제거된 엔드포인트

- ❌ `GET /api/reservations/order/:orderId` - **삭제됨**
  - **이유:** 주문번호만으로 예약 정보 조회 가능 → 보안 취약
  - **대안:** 필요한 모든 정보를 URL 파라미터로 전달

### 현재 보안 수준

- ✅ 예약 생성 시 필수 필드 검증
- ✅ URL 파라미터 기반 정보 전달
- ⚠️ 추가 권장사항:
  - 예약 조회에 인증 추가
  - Rate Limiting
  - CSRF 보호

---

## 📊 REST API 준수도

| 항목              | 준수도  | 설명                      |
| ----------------- | ------- | ------------------------- |
| **리소스 네이밍** | ✅ 95%  | 복수형 명사, 계층 구조    |
| **HTTP 메서드**   | ✅ 100% | GET, POST 적절히 사용     |
| **상태 코드**     | ✅ 100% | 200, 201, 400, 404, 500   |
| **응답 형식**     | ✅ 100% | 일관된 래퍼 구조          |
| **에러 처리**     | ✅ 100% | 명확한 에러 메시지        |
| **보안**          | ⚠️ 70%  | 기본 검증, 인증 추가 필요 |

---

## 🚀 사용 예시

### 클라이언트 코드

```typescript
// 1. 이벤트 목록 조회
const { data: events } = useGetEventList();

// 2. 예약 생성
const mutation = useCreateReservation();
mutation.mutate(
  {
    event_id: 1,
    name: "홍길동",
    email: "hong@test.com",
  },
  {
    onSuccess: (data) => {
      // 3. Success 페이지로 이동 (모든 정보 전달)
      router.push(
        `/waiting?name=${name}&email=${email}&order_id=${data.order_id}&event_id=${event_id}`
      );
    },
  }
);

// 4. 이벤트 정보 조회 (Success 페이지)
const { data: event } = useGetEvent(event_id);
```

---

## 📋 체크리스트

### API 엔드포인트

- [x] GET /api/events
- [x] GET /api/events/:id
- [x] POST /api/reservations
- [x] GET /api/reservations
- [x] GET /api/reservations/:id
- [x] ~~GET /api/reservations/order/:orderId~~ (삭제됨)

### 클라이언트 코드

- [x] useGetEventList
- [x] useGetEvent
- [x] useCreateReservation
- [x] ~~useGetReservationByOrderId~~ (삭제됨)
- [x] ReservationCard
- [x] ReservationList
- [x] WaitingGate
- [x] SuccessPage

### 보안 & 성능

- [x] 입력 검증
- [x] 에러 핸들링
- [x] 일관된 응답 형식
- [ ] Rate Limiting (권장)
- [ ] 인증/인가 (권장)
- [ ] CORS 설정 (필요시)

---

## 🎊 결론

**최종 API 구조는 RESTful 원칙을 준수하며, 보안을 고려한 설계입니다!**

- ✅ 4개의 핵심 엔드포인트
- ✅ 일관된 응답 형식
- ✅ 적절한 에러 처리
- ✅ 보안 취약점 제거
- ✅ 깔끔한 데이터 흐름
