# ✅ API 구현 체크리스트

## 🎯 완료된 작업

### 1. API 엔드포인트 (Backend)

#### Events API ✅

- [x] `GET /api/events` - 이벤트 목록 조회
- [x] `GET /api/events/[id]` - 단일 이벤트 조회
- [x] 일관된 응답 형식 적용
- [x] 에러 핸들링

#### Reservations API ✅

- [x] `POST /api/reservations` - 예약 생성
- [x] `GET /api/reservations` - 예약 목록 조회 (event_id 필터 옵션)
- [x] `GET /api/reservations/[id]` - 단일 예약 조회
- [x] `GET /api/reservations/order/[orderId]` - 주문번호로 조회
- [x] 일관된 응답 형식 적용
- [x] 입력 검증 (event_id, name, email)
- [x] 에러 핸들링

#### 삭제된 API ✅

- [x] `/api/reserve` 삭제 (deprecated)

---

### 2. 클라이언트 코드 (Frontend)

#### API 함수 (`src/app/apis.ts`) ✅

- [x] `getEvents()` - 응답 형식 파싱
- [x] `postReservation()` - 새 엔드포인트 사용
- [x] `getReservations()` - 목록 조회 (신규)
- [x] `getReservation()` - 단일 조회 (신규)
- [x] `getReservationByOrderId()` - 주문번호 조회 (신규)
- [x] `ApiResponse<T>` 타입 정의

#### React Query Hooks ✅

- [x] `useGetEventList` - 이벤트 목록
- [x] `useGetEvent` - 단일 이벤트 (응답 형식 파싱)
- [x] `useCreateReservation` - 예약 생성

#### Components ✅

- [x] `ReservationCard.tsx` - 새 API 사용
- [x] `ReservationList.tsx` - useGetEventList 사용
- [x] `WaitingGate.tsx` - event_id 파라미터 전달
- [x] `SuccessPage.tsx` - useGetEvent 사용

#### Constants ✅

- [x] `API_ENDPOINTS` 업데이트 (`/api/reservations`)

---

### 3. 응답 형식 통일 ✅

**모든 API 응답:**

```typescript
// 성공
{
  "success": true,
  "data": { ... } | [ ... ]
}

// 에러
{
  "success": false,
  "error": "에러 메시지"
}
```

---

## 🧪 테스트 시나리오

### 1. 이벤트 목록 조회

```bash
curl http://localhost:3000/api/events
```

**예상 응답:**

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

### 2. 단일 이벤트 조회

```bash
curl http://localhost:3000/api/events/1
```

**예상 응답:**

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

### 3. 예약 생성

```bash
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "event_id": 1,
    "name": "홍길동",
    "email": "hong@example.com"
  }'
```

**예상 응답:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "order_id": "TK-1234",
    "event_id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "created_at": "..."
  }
}
```

### 4. 예약 목록 조회

```bash
# 전체
curl http://localhost:3000/api/reservations

# 특정 이벤트
curl http://localhost:3000/api/reservations?event_id=1
```

### 5. 주문번호로 예약 조회

```bash
curl http://localhost:3000/api/reservations/order/TK-1234
```

---

## 🔄 사용자 플로우 테스트

### 시나리오 1: 정상 예약 플로우

1. **홈페이지** (`/`)

   - [x] 이벤트 목록 표시
   - [x] 로딩 상태 표시
   - [x] 이벤트 클릭 가능

2. **예약 페이지** (`/reserve?event_id=1`)

   - [x] URL에서 event_id 파라미터 읽기
   - [x] 폼 입력 (name, email)
   - [x] 유효성 검증
   - [x] 예약 요청 (POST /api/reservations)
   - [x] 로딩 상태 표시

3. **대기 페이지** (`/waiting`)

   - [x] 15초 대기
   - [x] 로딩 애니메이션
   - [x] event_id 파라미터 전달

4. **성공 페이지** (`/success`)
   - [x] event_id로 이벤트 정보 조회
   - [x] 예약 정보 표시
   - [x] 티켓 정보 표시

### 시나리오 2: 에러 처리

1. **유효하지 않은 event_id**

   - [ ] 400 Bad Request
   - [ ] 에러 메시지 표시

2. **필수 필드 누락**

   - [ ] 클라이언트 검증
   - [ ] 서버 검증 (400 Bad Request)

3. **존재하지 않는 이벤트**
   - [ ] 404 Not Found
   - [ ] 에러 메시지 표시

---

## 📱 브라우저 테스트

### 1. Chrome DevTools Network 확인

- [ ] API 요청 확인
- [ ] 응답 형식 확인
- [ ] 상태 코드 확인

### 2. Console 로그 확인

- [ ] 에러 없음
- [ ] 경고 없음
- [ ] API 응답 로깅

### 3. React Query DevTools (선택)

```bash
npm install @tanstack/react-query-devtools
```

- [ ] 캐시 상태 확인
- [ ] 쿼리 실행 확인
- [ ] Mutation 상태 확인

---

## 🚀 배포 전 체크리스트

### 환경 변수

- [ ] Supabase URL
- [ ] Supabase Anon Key
- [ ] 기타 환경 변수

### 빌드 테스트

```bash
npm run build
npm start
```

- [ ] 빌드 성공
- [ ] 런타임 에러 없음
- [ ] API 엔드포인트 작동

### 성능

- [ ] API 응답 시간 확인
- [ ] 페이지 로딩 시간
- [ ] React Query 캐싱 작동

---

## 📝 다음 단계 (선택사항)

### 1. 입력 검증 강화

```bash
npm install zod
```

- [ ] Zod 스키마 정의
- [ ] API에서 검증 적용

### 2. API 문서화

- [ ] Swagger/OpenAPI 설정
- [ ] 엔드포인트 문서화

### 3. 테스트 코드

```bash
npm install -D vitest @testing-library/react
```

- [ ] API 함수 단위 테스트
- [ ] 컴포넌트 테스트
- [ ] E2E 테스트

### 4. 에러 추적

```bash
npm install @sentry/nextjs
```

- [ ] Sentry 설정
- [ ] 에러 모니터링

---

## ✅ 최종 점검

- [x] 모든 API 엔드포인트 구현
- [x] 일관된 응답 형식
- [x] 클라이언트 코드 업데이트
- [x] 에러 핸들링
- [x] 타입 안전성
- [x] 린터 에러 없음
- [ ] 실제 브라우저 테스트
- [ ] 배포
