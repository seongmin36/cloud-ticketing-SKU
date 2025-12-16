# Figma 디자인 구현 완료 ✨

## 🎨 **디자인 소스**

**Figma URL:**
https://www.figma.com/design/3aKUgWYmujrVNAz4TYrvL3/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=36-3

**디자인 시스템:** Admin Dashboard Layout - EventList

---

## 📦 **구현된 컴포넌트**

### 1. `EventBadge.tsx`

**경로:** `src/components/EventBadge.tsx`

**기능:** 이벤트 카테고리/상태 표시 배지

**Props:**

```typescript
interface EventBadgeProps {
  label: string;
  variant?: "default" | "warning" | "danger";
}
```

**Variants:**

- `default`: 회색 배지 (Conference, Workshop, Networking 등)
  - Background: `#F5F5F5`
  - Text: `#525252`
- `warning`: 주황색 배지 (Selling Fast 등)
  - Background: `#FFEDD4`
  - Border: `#FFD6A7`
  - Text: `#CA3500`
- `danger`: 빨간색 배지 (Sold Out 등)
  - Background: `#D4183D`
  - Text: `#FFFFFF`

**디자인 스펙:**

- Border radius: `6px`
- Padding: `2px 8px`
- Font size: `12px`
- Gap: `4px`

---

### 2. `EventCard.tsx`

**경로:** `src/components/EventCard.tsx`

**기능:** 이벤트 정보를 표시하는 카드 컴포넌트

**Props:**

```typescript
interface EventCardProps {
  event: Event;
  onClick: (eventId: number) => void;
  badge?: string;
  badgeVariant?: "default" | "warning" | "danger";
  secondaryBadge?: string;
  secondaryBadgeVariant?: "default" | "warning" | "danger";
  isDisabled?: boolean;
}
```

**구조:**

1. **Card Header** (상단 패딩: `24px`)

   - Badges (Conference, Workshop 등)
   - Title (이벤트 제목)
   - Description (이벤트 설명)

2. **Event Info** (날짜/장소)

   - 📅 날짜 (Calendar 아이콘 + 텍스트)
   - 📍 장소 (Pin 아이콘 + 텍스트)

3. **Action Button**
   - "Book Ticket" (활성 상태)
   - "Unavailable" (비활성 상태)

**디자인 스펙:**

- Card:
  - Background: `#FFFFFF`
  - Border: `1px solid #E5E5E5`
  - Border radius: `14px`
  - Padding: `24px`
- Title:
  - Font: Inter, 600 weight
  - Size: `20px`
  - Line height: `1.4`
  - Color: `#171717`
- Description:
  - Font: Inter, 400 weight
  - Size: `16px`
  - Line height: `1.5`
  - Color: `#737373`
- Button:
  - Height: `36px`
  - Border radius: `8px`
  - Hover: `bg-[#FAFAFA]`

---

### 3. `ReservationList.tsx` (리팩토링)

**경로:** `src/components/ReservationList.tsx`

**변경사항:**

- Figma 디자인에 맞게 전체 레이아웃 리팩토링
- 헤더 섹션 추가 ("행사 리스트" + 설명)
- `EventCard` 컴포넌트 통합
- 카드 간격: `28px` (space-y-7)

**헤더 디자인:**

- Title:
  - Font: Inter, 700 weight
  - Size: `30px`
  - Line height: `1.2`
  - Color: `#171717`
- Description:
  - "Discover and book tickets for the latest tech gatherings."
  - Font: Inter, 400 weight
  - Size: `16px`
  - Color: `#737373`

---

## 🎯 **디자인 시스템**

### 컬러 팔레트

```css
/* Background */
--bg-page: #fafafa;
--bg-card: #ffffff;

/* Border */
--border-default: #e5e5e5;

/* Text */
--text-primary: #171717;
--text-secondary: #737373;
--text-tertiary: #525252;

/* Badge Colors */
--badge-bg-default: #f5f5f5;
--badge-bg-warning: #ffedd4;
--badge-border-warning: #ffd6a7;
--badge-text-warning: #ca3500;
--badge-bg-danger: #d4183d;
```

### 타이포그래피

```css
/* Heading 1 */
font-family: Inter;
font-weight: 700;
font-size: 30px;
line-height: 1.2;
letter-spacing: -0.012em;

/* Card Title */
font-family: Inter;
font-weight: 600;
font-size: 20px;
line-height: 1.4;
letter-spacing: -0.022em;

/* Body */
font-family: Inter;
font-weight: 400;
font-size: 16px;
line-height: 1.5;
letter-spacing: -0.02em;

/* Small */
font-family: Inter;
font-weight: 400;
font-size: 14px;
line-height: 1.43;
letter-spacing: -0.01em;

/* Badge */
font-family: Inter;
font-weight: 400;
font-size: 12px;
line-height: 1.33;
```

### Border Radius

```css
--radius-card: 14px;
--radius-button: 8px;
--radius-badge: 6px;
```

---

## 🛠️ **유틸리티 함수**

### `formatEventDate()`

**경로:** `src/lib/day.ts`

**기능:** 날짜를 "MMM DD, YYYY" 형식으로 포맷팅

**예시:**

```typescript
formatEventDate("2025-12-17T00:00:00+00:00");
// → "Dec 17, 2025"
```

---

## 🖼️ **아이콘 에셋**

### Calendar Icon

**경로:** `assets/calendar.svg`

- 크기: 16x16px
- 색상: `currentColor` (동적)
- 사용처: 날짜 표시

### Pin Icon

**경로:** `assets/pin.svg`

- 크기: 16x16px
- 색상: `currentColor` (동적)
- 사용처: 장소 표시

### Arrow Icon

**인라인 SVG** (EventCard 버튼 내)

- 크기: 16x16px
- 색상: `currentColor`
- 사용처: "Book Ticket" 버튼

---

## 📱 **반응형 디자인**

### 데스크톱 (기본)

- 최대 너비: `672px`
- 카드 간격: `28px`
- 패딩: `40.5px` (좌우)

### 모바일 (`sm` 이하)

- 패딩: `16px` (좌우)
- 카드 간격: 유지
- 텍스트 크기: 유지

---

## 🎬 **사용 예시**

### 기본 이벤트 카드

```tsx
<EventCard
  event={event}
  onClick={handleClick}
  badge="Conference"
  badgeVariant="default"
/>
```

### 판매 중인 이벤트

```tsx
<EventCard
  event={event}
  onClick={handleClick}
  badge="Workshop"
  badgeVariant="default"
  secondaryBadge="Selling Fast"
  secondaryBadgeVariant="warning"
/>
```

### 매진된 이벤트

```tsx
<EventCard
  event={event}
  onClick={handleClick}
  badge="Networking"
  badgeVariant="default"
  secondaryBadge="Sold Out"
  secondaryBadgeVariant="danger"
  isDisabled={true}
/>
```

---

## ✅ **구현 완료 체크리스트**

- [x] Figma 디자인 분석
- [x] EventBadge 컴포넌트 구현
- [x] EventCard 컴포넌트 구현
- [x] ReservationList 리팩토링
- [x] 날짜 포맷팅 함수 추가
- [x] 아이콘 통합
- [x] 디자인 시스템 적용
- [x] 타이포그래피 적용
- [x] 컬러 팔레트 적용
- [x] Border radius 적용
- [x] 반응형 레이아웃
- [x] 호버 효과
- [x] 비활성 상태 처리
- [x] 린터 에러 없음

---

## 🚀 **다음 단계 (선택사항)**

### API 개선

현재는 하드코딩된 배지를 사용하고 있습니다. API에서 배지 정보를 받아오도록 개선할 수 있습니다:

```typescript
export interface Event {
  id: number;
  title: string;
  description: string;
  start_at: string;
  location: string;
  created_at: string;
  // 추가 필드
  category?: "Conference" | "Workshop" | "Networking";
  status?: "Available" | "SellingFast" | "SoldOut";
  is_available?: boolean;
}
```

### 애니메이션 추가

- 카드 호버 시 부드러운 transition
- 로딩 상태 skeleton UI
- 페이드인 효과

### 접근성 개선

- ARIA 라벨 추가
- 키보드 네비게이션
- 스크린 리더 지원

---

## 📝 **참고 사항**

- 모든 색상과 크기는 Figma 디자인 시스템을 정확히 따릅니다
- Inter 폰트는 Next.js 기본 설정으로 자동 적용됩니다
- Tailwind CSS를 사용하여 스타일링했습니다
- 컴포넌트는 재사용 가능하도록 설계되었습니다

---

🎉 **Figma 디자인 구현이 완료되었습니다!**

브라우저를 새로고침하여 새로운 디자인을 확인하세요.
