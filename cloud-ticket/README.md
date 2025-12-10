# SKU Ticketing - Step 1 Event Reservation UI

**서경 TechConf 2025** 티켓 예약 시스템

## 📋 프로젝트 개요

Next.js v16 (App Router) + Tailwind CSS v4 기반의 단일 행사 티켓 예약 UI입니다.
Figma 디자인을 단일 소스 오브 트루스로 사용하여 픽셀 퍼펙트하게 구현했습니다.

### 주요 특징

- ✅ **src 폴더 구조**: 체계적인 프로젝트 구조
- ✅ **최소 의존성**: fetch 기반 API 통신
- ✅ **반응형 디자인**: 모바일/데스크톱 모두 최적화
- ✅ **Figma 기반**: 디자인 토큰을 Tailwind CSS로 정확히 매핑
- ✅ **타입 안전성**: TypeScript 완전 지원
- ✅ **SVG 컴포넌트**: @svgr/webpack으로 SVG를 React 컴포넌트로 사용
- ✅ **Azure 배포 준비**: Node.js 표준 API만 사용

## 🛠 기술 스택

- **Framework**: Next.js 16.0.8 (App Router)
- **React**: 19.2.1 (React Compiler 지원)
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL)
- **Language**: TypeScript 5
- **SVG**: @svgr/webpack

## 📁 프로젝트 구조

```
cloud-ticket/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 컴포넌트
│   ├── lib/             # 유틸리티
│   ├── libs/            # 외부 라이브러리 (Supabase)
│   ├── mocks/           # Mock 데이터
│   └── types/           # TypeScript 타입
├── assets/              # SVG 에셋
└── public/              # 정적 파일
```

자세한 구조는 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) 참고

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 Supabase 연결 정보를 입력합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 확인:

- 홈: [http://localhost:3000](http://localhost:3000)
- 예약: [http://localhost:3000/reserve](http://localhost:3000/reserve)

## 🎨 Figma 디자인 매핑

### 컬러 팔레트

- **배경**: `#FAFAFA` (밝은 회색)
- **카드**: `#FFFFFF` (흰색)
- **텍스트 (주)**: `#171717` (거의 검은색)
- **텍스트 (부)**: `#737373`, `#525252` (회색)
- **테두리**: `#E5E5E5` (연한 회색)
- **버튼**: `#171717` (검은색)

### 타이포그래피 (Inter 폰트)

- **제목**: 24px, Bold, -2.2% letter-spacing
- **설명**: 16px, Regular, -1.95% letter-spacing
- **본문**: 14px, Regular/Medium, -1.07% letter-spacing
- **배지**: 12px, Semibold, 5% letter-spacing, UPPERCASE

### 레이아웃

- **카드 크기**: 448px × 478px
- **Border Radius**: 14px (카드), 8px (입력/버튼), 6px (배지)
- **Padding**: 24px (카드 내부)
- **Gap**: 24px (섹션 간), 16px (폼 필드), 8px (레이블-입력)

## 📝 사용 방법

### Import 경로

```typescript
// ✅ 컴포넌트
import ReservationCard from "@/components/ReservationCard";

// ✅ 유틸리티
import { validateEmail } from "@/lib/utils";

// ✅ 타입
import { Event } from "@/types";

// ✅ Mock 데이터
import { mockEvent } from "@/mocks/event";

// ✅ SVG 에셋 (React 컴포넌트)
import CalendarIcon from "@/assets/calendar.svg";
```

### SVG 아이콘 사용

```tsx
import Icon from "@/components/common/Icon";
import CalendarIcon from "@/assets/calendar.svg";

<Icon icon={CalendarIcon} size={16} color="#525252" />;
```

### 예약 프로세스

1. **이름 입력**: 필수 항목 (최소 1자 이상)
2. **이메일 입력**: 필수 항목 (이메일 형식 검증)
3. **예약하기 버튼 클릭**: API 호출 및 Supabase 저장
4. **성공 메시지**: 예약 완료 시 카드 내부에 메시지 표시

### 폼 검증

- **클라이언트 사이드 검증**: submit 시점에만 에러 표시
- **이름**: 공백 제외 1자 이상
- **이메일**: 정규식 패턴 검증 (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)

### API 엔드포인트

**POST** `/api/reserve`

```json
// Request
{
  "event_id": 1,
  "name": "홍길동",
  "email": "skuniv@example.com"
}

// Response (Success)
{
  "ok": true,
  "order_id": "TK-1234"
}

// Response (Error)
{
  "ok": false,
  "error": "에러 메시지"
}
```

## 🔧 개발 가이드

### 컴포넌트 구조

#### ReservationCard (클라이언트 컴포넌트)

- **목적**: 예약 폼 UI 및 상태 관리
- **사용 기술**: `useState`, `fetch`
- **주요 기능**:
  - 폼 입력 상태 관리
  - 클라이언트 사이드 검증
  - API 호출 및 로딩/에러 처리
  - 성공/실패 피드백 UI

#### Reserve Page (서버 컴포넌트)

- **목적**: 페이지 레이아웃 및 메타데이터
- **사용 기술**: Next.js 16 App Router
- **주요 기능**:
  - SEO 최적화 (Metadata)
  - 반응형 레이아웃 (Flexbox)

### 스타일링 규칙

1. **인라인 스타일 금지**: Tailwind CSS 클래스만 사용
2. **Figma 값 직접 매핑**: 정확한 픽셀 값 사용 (예: `text-[14px]`)
3. **반응형**: 모바일 우선 (`max-w-[448px]`, `p-4`)
4. **상태 스타일**: `hover:`, `active:`, `disabled:`, `focus:` 활용

### Mock 데이터 수정

`src/mocks/event.ts` 파일에서 행사 정보를 수정할 수 있습니다:

```typescript
export const mockEvent: Event = {
  id: 1,
  title: "서경 TechConf 2025",
  description: "Join the most innovative minds in technology.",
  start_at: "2025.12.17",
  location: "Seoul",
  created_at: "2025.12.17",
};
```

## 🏗 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
npm run start
```

### Azure VM 배포

1. Node.js 18+ 설치
2. 프로젝트 클론 및 의존성 설치
3. 환경 변수 설정 (`.env.local`)
4. 빌드 후 실행:

```bash
npm ci --production
npm run build
npm run start
```

## 🐛 문제 해결

### 자주 발생하는 이슈

**Q: API 호출이 실패합니다**

- Supabase 환경 변수가 올바른지 확인하세요
- `reservations` 테이블이 생성되었는지 확인하세요

**Q: 스타일이 제대로 적용되지 않습니다**

- Tailwind CSS v4 설정이 올바른지 확인하세요
- `@import "tailwindcss";`가 `globals.css`에 있는지 확인하세요

**Q: SVG import가 작동하지 않습니다**

- `@svgr/webpack`이 설치되었는지 확인하세요
- `next.config.ts`에 webpack 설정이 있는지 확인하세요
- `src/types/svg.d.ts` 파일이 있는지 확인하세요

**Q: 폰트가 로드되지 않습니다**

- Inter 폰트가 `layout.tsx`에서 올바르게 import 되었는지 확인하세요
- 인터넷 연결 상태를 확인하세요 (Google Fonts CDN)

## 📚 참고 자료

- [Next.js 16 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React 19](https://react.dev/)
- [Supabase 문서](https://supabase.com/docs)
- [SVGR](https://react-svgr.com/)

## 📄 추가 문서

- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - 상세 프로젝트 구조
- [SETUP.md](./SETUP.md) - 설치 및 실행 가이드
- [FIGMA_MAPPING.md](./FIGMA_MAPPING.md) - Figma 디자인 매핑

## 📄 라이선스

이 프로젝트는 SKU 클라우드 프로젝트의 일부입니다.

---

**Made with ❤️ for SKU TechConf 2025**
