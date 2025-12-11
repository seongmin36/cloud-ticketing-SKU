# API 마이그레이션 가이드

## 🎯 요약

REST API 모범 사례에 따라 API 구조를 개선했습니다.

---

## 📊 변경 전/후 비교

### ❌ 이전 구조 (개선 전)

```
GET  /api/events          → 이벤트 목록 (데이터만 반환)
GET  /api/events/[id]     → 단일 이벤트 (데이터만 반환)
POST /api/reserve         → 예약 생성 (ok/error 형식)
```

### ✅ 현재 구조 (개선 후)

```
GET  /api/events                      → 이벤트 목록
GET  /api/events/[id]                 → 단일 이벤트
POST /api/reservations                → 예약 생성
GET  /api/reservations                → 예약 목록 (전체 또는 event_id 필터)
GET  /api/reservations/[id]           → 단일 예약 조회
GET  /api/reservations/order/[orderId] → 주문번호로 예약 조회
```

---

## 🔄 Breaking Changes

### 1. 엔드포인트 변경

```diff
- POST /api/reserve
+ POST /api/reservations
```

### 2. 응답 형식 통일

**이전:**

```typescript
// Events - 데이터만 반환
{ id: 1, title: "..." }

// Reserve - 래퍼 객체
{ ok: true, order_id: "TK-1234" }
```

**현재 (통일):**

```typescript
// 성공 응답
{
  "success": true,
  "data": { ... }
}

// 에러 응답
{
  "success": false,
  "error": "에러 메시지"
}
```

### 3. 반환 데이터 변경

**이전:**

```typescript
// POST /api/reserve
{ ok: true, order_id: "TK-1234" }
```

**현재:**

```typescript
// POST /api/reservations
{
  "success": true,
  "data": {
    "id": 1,
    "order_id": "TK-1234",
    "event_id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## 📝 클라이언트 코드 변경사항

### APIs (`src/app/apis.ts`)

**이전:**

```typescript
const data = await fetch("/api/reserve").then((r) => r.json());
// { ok: true, order_id: "..." }
```

**현재:**

```typescript
const data = await postReservation({ ... });
// { id: 1, order_id: "TK-1234", ... }
```

### 새로운 API 함수들

```typescript
// 예약 목록 조회 (전체 또는 event_id 필터)
await getReservations(); // 전체
await getReservations(1); // event_id=1

// 단일 예약 조회
await getReservation(1); // id로 조회

// 주문번호로 조회
await getReservationByOrderId("TK-1234");
```

---

## ✅ REST API 모범 사례 준수

### 1. **리소스 네이밍** ✅

- 복수형 명사 사용: `/events`, `/reservations`
- 계층 구조: `/reservations/order/[orderId]`

### 2. **HTTP 메서드** ✅

```
GET    - 조회
POST   - 생성
PUT    - 전체 수정 (미구현)
PATCH  - 부분 수정 (미구현)
DELETE - 삭제 (미구현)
```

### 3. **HTTP 상태 코드** ✅

```
200 - OK (조회 성공)
201 - Created (생성 성공)
400 - Bad Request (잘못된 요청)
404 - Not Found (리소스 없음)
500 - Internal Server Error (서버 에러)
```

### 4. **일관된 응답 형식** ✅

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 5. **명확한 에러 처리** ✅

- 적절한 상태 코드
- 명확한 에러 메시지
- try-catch 에러 핸들링

---

## 🚀 추가 개선 가능 사항

### 1. **입력 검증 강화**

```bash
npm install zod
```

```typescript
import { z } from "zod";

const reservationSchema = z.object({
  event_id: z.number().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
});
```

### 2. **Rate Limiting**

```bash
npm install @upstash/ratelimit
```

### 3. **API 문서화**

```bash
npm install swagger-ui-react
```

### 4. **CORS 설정**

```typescript
// next.config.js
async headers() {
  return [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
      ],
    },
  ];
}
```

### 5. **페이지네이션**

```typescript
GET /api/reservations?page=1&limit=20
```

---

## 📚 참고 자료

- [REST API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
