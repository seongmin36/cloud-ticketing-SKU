# 🎫 SKU Ticketing - User Flow Documentation

## 전체 플로우 (3단계)

```
┌─────────────┐
│   Step 1    │
│   /reserve  │  예약 폼
│   or /      │  - 이름/이메일 입력
└─────┬───────┘  - "예약하기" 클릭
      │
      │ API 호출: POST /api/reserve
      │ Response: { ok: true, order_id: "TK-1234" }
      ↓
┌─────────────┐
│   Step 2    │
│  /waiting   │  대기열 화면
│             │  - 15초 로딩 시뮬레이션
└─────┬───────┘  - 프로그레스 바 애니메이션
      │           - 카운트다운 (15초 → 0초)
      │
      │ 자동 리다이렉트 (15초 후)
      ↓
┌─────────────┐
│   Step 3    │
│  /success   │  예약 완료 화면
│             │  - 티켓 정보 표시
└─────────────┘  - 다운로드 버튼
```

## 📄 페이지별 상세

### Step 1: 예약 폼 (`/reserve` 또는 `/`)

**파일**: `src/app/reserve/page.tsx`, `src/components/ReservationCard.tsx`

**UI 요소**:

- 행사 정보 (제목, 설명, 날짜, 장소)
- 입력 필드 (이름, 이메일)
- 예약하기 버튼

**로직**:

1. 폼 검증 (이름 필수, 이메일 형식)
2. API 호출: `POST /api/reserve`
3. 성공 시: `/waiting?name=...&email=...&order_id=...` 로 이동

**데이터 전달**:

```typescript
const params = new URLSearchParams({
  name: formValues.name,
  email: formValues.email,
  order_id: data.order_id, // API 응답에서 받음
});
router.push(`/waiting?${params.toString()}`);
```

### Step 2: 대기열 (`/waiting`)

**파일**:

- `src/app/waiting/page.tsx` (Suspense 래퍼)
- `src/components/WaitingFallback.tsx` (대기 UI)
- `src/components/WaitingGate.tsx` (리다이렉트 로직)

**UI 요소**:

- 회전하는 로딩 아이콘
- "현재 대기열에 있습니다." 제목
- "페이지를 새로고침하지 마세요." 경고
- 대기 카드:
  - 좌측: "남은 시간" 레이블
  - 우측: 카운트다운 타이머 (00:15 → 00:00)
  - 프로그레스 바 (0% → 100% in 15초)
  - 하단: "요청이 처리중입니다."

**로직**:

1. `WaitingFallback` 렌더링 (Suspense fallback)
2. `WaitingGate`가 15초 `simulateDelay` 실행
3. 지연 완료 후 자동으로 `/success?...` 이동

**애니메이션**:

```typescript
// 프로그레스: 100ms마다 업데이트
setProgress((prev) => prev + 100 / 150);

// 타이머: 1초마다 업데이트
setTimeLeft((prev) => prev - 1);
```

### Step 3: 예약 완료 (`/success`)

**파일**: `src/app/success/page.tsx`

**UI 요소**:

- 초록색 체크 아이콘 (성공)
- "예약이 완료되었습니다!" 제목
- "확인 이메일을 발송했습니다."
- 이메일 주소 표시
- 티켓 카드:
  - **Header**: Ticket Holder (이름) / Order ID
  - **Content**:
    - 행사명 (서경 TechConf 2025)
    - 티켓 타입 (General Admission)
    - 구분선
    - 날짜 정보
    - 위치 정보
  - **Footer**: 티켓 다운로드 버튼

**데이터 소스**:

```typescript
// URL searchParams에서 추출
const { name, email, order_id } = await searchParams;

// 필수 파라미터 체크
if (!name || !email || !order_id) {
  // Fallback UI
}
```

## 🔄 데이터 흐름

### URL 파라미터 전달

```
/reserve
  ↓ (예약 API 성공)
/waiting?name=홍길동&email=test@example.com&order_id=TK-1234
  ↓ (15초 후 자동)
/success?name=홍길동&email=test@example.com&order_id=TK-1234
```

### API 응답 구조

**POST /api/reserve**

```json
// Request
{
  "event_id": 1,
  "name": "홍길동",
  "email": "test@example.com"
}

// Response (성공)
{
  "ok": true,
  "order_id": "TK-1234"
}
```

## ⏱ 타이밍

| 단계     | 시간        | 설명            |
| -------- | ----------- | --------------- |
| Step 1   | 사용자 입력 | 폼 작성         |
| API 호출 | ~1초        | Supabase INSERT |
| Step 2   | 15초        | 대기 시뮬레이션 |
| Step 3   | 영구        | 예약 완료 화면  |

**총 소요 시간**: ~16초 (API 1초 + 대기 15초)

## 🎨 Figma 매핑

### Waiting 화면

| 요소            | Figma 값           | Tailwind 클래스                     |
| --------------- | ------------------ | ----------------------------------- |
| 배경            | #171717            | `bg-[#171717]`                      |
| 아이콘 배경     | #262626            | `bg-[#262626]`                      |
| 제목 텍스트     | #FFFFFF, 24px, 600 | `text-2xl font-semibold text-white` |
| 서브텍스트      | #A1A1A1, 16px      | `text-base text-[#A1A1A1]`          |
| 카드 배경       | #262626            | `bg-[#262626]`                      |
| 카드 테두리     | #404040            | `border-[#404040]`                  |
| 타이머 텍스트   | #FFFFFF, 30px, 700 | `text-[30px] font-bold text-white`  |
| 프로그레스 배경 | #404040            | `bg-[#404040]`                      |
| 프로그레스 바   | #FFFFFF            | `bg-white`                          |

### Success 화면

| 요소        | Figma 값           | Tailwind 클래스                     |
| ----------- | ------------------ | ----------------------------------- |
| 배경        | #FAFAFA            | `bg-[#FAFAFA]`                      |
| 아이콘 배경 | #DCFCE7            | `bg-[#DCFCE7]`                      |
| 아이콘 색상 | #00A63E            | `text-[#00A63E]`                    |
| 제목        | #171717, 24px, 700 | `text-2xl font-bold text-[#171717]` |
| 카드 배경   | #FFFFFF            | `bg-white`                          |
| 강조 바     | #171717, 8px       | `h-2 bg-[#171717]`                  |
| Order ID    | 14px, 400          | `text-sm font-normal`               |

## 🐛 에러 처리

### /waiting 페이지

**필수 파라미터 누락 시**:

- Fallback UI 없음 (자동으로 타이머가 00:00에 도달)
- 일단 정상 동작

### /success 페이지

**필수 파라미터 누락 시**:

```tsx
if (!name || !email || !order_id) {
  return (
    <div>
      <p>예약 정보가 존재하지 않습니다.</p>
      <Link href="/reserve">처음 화면으로 돌아가기</Link>
    </div>
  );
}
```

## 🧪 테스트 시나리오

### 정상 플로우

1. `/reserve` 접속
2. 이름: "홍길동", 이메일: "test@example.com" 입력
3. "예약하기" 클릭
4. `/waiting` 페이지로 이동
   - 타이머: 00:15 → 00:00
   - 프로그레스: 0% → 100%
5. 15초 후 자동으로 `/success` 이동
6. 티켓 정보 확인
7. "티켓 다운로드" 버튼 클릭 (Alert)

### 에러 시나리오

**Case 1: API 실패**

- Step 1에서 에러 메시지 표시
- `/waiting`으로 이동하지 않음

**Case 2: URL 파라미터 누락**

- `/success` 접속 시 Fallback 메시지
- "처음 화면으로 돌아가기" 버튼 제공

**Case 3: 새로고침**

- `/waiting`에서 새로고침 시 타이머 리셋
- 다시 15초 대기 (경고 문구 표시됨)

## 📱 반응형

### 데스크톱 (≥448px)

- 카드 최대 너비 448px 유지
- 화면 중앙 정렬

### 모바일 (<448px)

- 카드가 화면 폭에 맞춤
- 좌우 여백 16px (p-4)

## 🚀 향후 개선 가능 사항

### 1. 실제 대기열 시스템

- Redis Queue 연동
- Server-Sent Events (SSE)
- WebSocket 실시간 업데이트

### 2. 티켓 다운로드

- PDF 생성 (jsPDF)
- QR 코드 (qrcode.react)
- 이메일 첨부

### 3. 대기열 위치

- 실제 대기 순번 표시
- 예상 대기 시간 동적 계산

### 4. 오프라인 대응

- Service Worker
- 로컬 스토리지 백업
- 연결 끊김 감지

---

**Last Updated**: 2025-12-10
