# 오류 수정 요약

## 🔴 **발생한 오류**

```
GET http://localhost:3000/api/events/5 400 (Bad Request)
GET http://localhost:3000/api/events/6 400 (Bad Request)

응답: { "success": false, "error": "유효하지 않은 이벤트 ID입니다." }
```

---

## 🔍 **원인 분석**

### Next.js 16 Breaking Change

**Next.js 16부터 `params`가 Promise로 변경되었습니다!**

#### ❌ 이전 방식 (Next.js 15)

```typescript
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const eventId = Number(params.id); // 바로 접근 가능
}
```

#### ✅ Next.js 16 (현재)

```typescript
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params; // await 필요!
  const eventId = Number(params.id);
}
```

### 왜 400 에러가 발생했나?

```typescript
// params가 Promise 객체였음
const eventId = Number(params.id);
// → params.id = undefined (Promise 객체에는 id 속성이 없음)
// → Number(undefined) = NaN

// 검증 로직
if (isNaN(eventId) || eventId <= 0) {
  return 400; // ← 여기서 에러 발생!
}
```

---

## ✅ **해결 방법**

### 수정한 파일

#### 1. `/api/events/[id]/route.ts`

```typescript
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params; // ✅ await 추가
  const eventId = Number(params.id);
  // ...
}
```

#### 2. `/api/reservations/[id]/route.ts`

```typescript
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params; // ✅ await 추가
  const reservationId = Number(params.id);
  // ...
}
```

---

## 🧪 **테스트 결과**

### ✅ 수정 후 정상 작동

```bash
# 이벤트 ID 5 조회
curl http://localhost:3000/api/events/5

# 응답 ✅
{
  "success": true,
  "data": {
    "id": 5,
    "title": "서경 TechConf 2025",
    "description": "Join the most innovative minds in technology.",
    "start_at": "2025-12-17T00:00:00+00:00",
    "location": "SKU Bukak Hall, Seoul",
    "created_at": "2025-12-11T06:57:58.853538+00:00"
  }
}
```

```bash
# 이벤트 ID 6 조회
curl http://localhost:3000/api/events/6

# 응답 ✅
{
  "success": true,
  "data": {
    "id": 6,
    "title": "UMC TechConf 2025",
    "description": "From Junior to Senior",
    "start_at": "2025-12-17T00:00:00+00:00",
    "location": "Front One, Gongdeok",
    "created_at": "2025-12-11T06:57:58.853538+00:00"
  }
}
```

---

## 📚 **Next.js 16 변경사항**

### Dynamic Route Params (Breaking Change)

**공식 문서:**

> In Next.js 16, `params` in dynamic routes are now a **Promise** that must be awaited.

**영향을 받는 파일:**

- `app/[param]/page.tsx`
- `app/api/[param]/route.ts`
- Layout, Error 등 모든 동적 라우트

**마이그레이션 가이드:**

```typescript
// ❌ Before (Next.js 15)
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
}

// ✅ After (Next.js 16)
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
}
```

---

## 🎯 **수정된 API 엔드포인트**

### ✅ 정상 작동

- `GET /api/events` → 이벤트 목록 ✅
- `GET /api/events/5` → 단일 이벤트 ✅
- `GET /api/events/6` → 단일 이벤트 ✅
- `POST /api/reservations` → 예약 생성 ✅
- `GET /api/reservations` → 예약 목록 ✅
- `GET /api/reservations/:id` → 단일 예약 ✅

---

## 📋 **체크리스트**

- [x] 오류 원인 파악 (Next.js 16 params 변경)
- [x] `/api/events/[id]/route.ts` 수정
- [x] `/api/reservations/[id]/route.ts` 수정
- [x] API 테스트 (curl)
- [x] 정상 작동 확인
- [x] 린터 에러 없음

---

## 🎊 **결론**

**Next.js 16의 Breaking Change로 인한 오류였습니다!**

- ✅ `params`를 `await`로 처리하여 해결
- ✅ 모든 동적 라우트 API가 정상 작동
- ✅ Success 페이지에서 이벤트 정보 정상 조회 가능

이제 브라우저를 새로고침하면 정상적으로 작동합니다! 🚀

---

## 💡 **참고: Next.js 16 주요 변경사항**

### 1. Dynamic Params (Breaking)

```typescript
// params는 이제 Promise
const params = await props.params;
```

### 2. searchParams (Breaking)

```typescript
// searchParams도 Promise
const searchParams = await props.searchParams;
```

### 3. cookies, headers (Breaking)

```typescript
// Server Actions에서
const cookieStore = await cookies();
const headersList = await headers();
```

자세한 내용: https://nextjs.org/docs/app/building-your-application/upgrading/version-16
