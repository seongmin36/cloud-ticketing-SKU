# 권장 API 구조

## 📋 이벤트 (Events)

### 이벤트 목록 조회

```
GET /api/events
Response: Event[]
```

### 단일 이벤트 조회

```
GET /api/events/:id
Response: Event
```

### 특정 이벤트의 예약 목록 조회

```
GET /api/events/:id/reservations
Response: Reservation[]
```

---

## 🎫 예약 (Reservations)

### 예약 생성

```
POST /api/reservations
Body: { eventId, name, email }
Response: { id, orderId, eventId, ... }
```

### 예약 목록 조회

```
GET /api/reservations
Query: ?eventId=1 (선택)
Response: Reservation[]
```

### 단일 예약 조회

```
GET /api/reservations/:id
Response: Reservation
```

### 주문번호로 예약 조회

```
GET /api/reservations/order/:orderId
Response: Reservation
```

---

## 🏗️ 권장 폴더 구조

```
src/app/api/
├── events/
│   ├── route.ts                    # GET /api/events
│   └── [id]/
│       ├── route.ts                # GET /api/events/:id
│       └── reservations/
│           └── route.ts            # GET /api/events/:id/reservations
│
└── reservations/
    ├── route.ts                    # GET, POST /api/reservations
    ├── [id]/
    │   └── route.ts                # GET /api/reservations/:id
    └── order/
        └── [orderId]/
            └── route.ts            # GET /api/reservations/order/:orderId
```

---

## 📝 일관된 응답 형식

### 성공 응답

```typescript
{
  "success": true,
  "data": { ... } | [ ... ]
}
```

### 에러 응답

```typescript
{
  "success": false,
  "error": {
    "code": "INVALID_EVENT_ID",
    "message": "유효하지 않은 이벤트 ID입니다."
  }
}
```

### 페이지네이션

```typescript
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## 🔒 보안 고려사항

1. **Rate Limiting**: 예약 API에 요청 제한
2. **Input Validation**: Zod 등으로 입력 검증
3. **Authentication**: 예약 조회에 인증 추가
4. **CORS**: 필요시 CORS 설정
5. **API Key**: 공개 API의 경우 API 키 사용

---

## ⚡ 성능 최적화

1. **Caching**: GET 요청에 캐싱 적용
2. **Pagination**: 대용량 데이터 페이지네이션
3. **Field Selection**: 필요한 필드만 선택
4. **Index**: 데이터베이스 인덱스 최적화

---

## 📊 현재 vs 권장

| 현재               | 권장                | 이유                 |
| ------------------ | ------------------- | -------------------- |
| `/api/reserve`     | `/api/reservations` | REST 컨벤션 (복수형) |
| 응답 형식 불일치   | 일관된 형식         | 클라이언트 처리 용이 |
| 예약 조회 API 없음 | 완전한 CRUD         | 완전한 기능 제공     |
| 평문 응답          | 래핑된 응답         | 메타데이터 포함 가능 |
