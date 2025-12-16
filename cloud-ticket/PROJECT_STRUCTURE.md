# 📁 프로젝트 구조 (src 기반)

## 전체 구조

```
cloud-ticket/
│
├── 📁 src/                           # 소스 코드 루트
│   │
│   ├── 📁 app/                       # Next.js v16 App Router
│   │   ├── 📁 api/                   # API Routes
│   │   │   └── 📁 reserve/
│   │   │       └── route.ts          # POST /api/reserve
│   │   │
│   │   ├── 📁 reserve/               # /reserve 페이지
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 success/               # /success 페이지
│   │   │   └── page.tsx
│   │   │
│   │   ├── favicon.ico               # 파비콘
│   │   ├── globals.css               # 글로벌 스타일
│   │   ├── layout.tsx                # Root Layout
│   │   └── page.tsx                  # 홈 페이지 (/)
│   │
│   ├── 📁 components/                # React 컴포넌트
│   │   ├── 📁 common/
│   │   │   └── Icon.tsx              # 아이콘 컴포넌트
│   │   │
│   │   └── ReservationCard.tsx       # 예약 카드 컴포넌트
│   │
│   ├── 📁 lib/                       # 유틸리티 함수
│   │   └── utils.ts                  # 검증 함수 등
│   │
│   ├── 📁 libs/                      # 외부 라이브러리 통합
│   │   └── 📁 supabase/
│   │       └── server.ts             # Supabase 클라이언트
│   │
│   ├── 📁 mocks/                     # Mock 데이터
│   │   └── event.ts                  # 이벤트 Mock 데이터
│   │
│   └── 📁 types/                     # TypeScript 타입 정의
│       ├── index.ts                  # 전역 타입
│       └── svg.d.ts                  # SVG 타입 선언
│
├── 📁 assets/                        # 프로젝트 에셋
│   ├── calendar.svg                  # 캘린더 아이콘
│   └── pin.svg                       # 위치 아이콘
│
├── 📁 public/                        # 정적 파일 (번들링 안 됨)
│   ├── calendar.svg
│   └── pin.svg
│
├── 📄 next.config.ts                 # Next.js 설정
├── 📄 tsconfig.json                  # TypeScript 설정
├── 📄 tailwind.config.js             # Tailwind CSS 설정
├── 📄 package.json                   # 의존성 관리
│
└── 📚 문서/
    ├── README.md                     # 프로젝트 개요
    ├── SETUP.md                      # 설치 가이드
    ├── FIGMA_MAPPING.md              # 디자인 매핑
    └── PROJECT_STRUCTURE.md          # 이 문서
```

## Import 경로 규칙

### 절대 경로 (Alias)

`tsconfig.json`에 정의된 경로 별칭:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/assets/*": ["./assets/*"]
  }
}
```

### 사용 예시

```typescript
// ✅ 컴포넌트 import
import ReservationCard from "@/components/ReservationCard";
import Icon from "@/components/common/Icon";

// ✅ 유틸리티 import
import { validateEmail } from "@/lib/utils";

// ✅ 타입 import
import { Event } from "@/types";

// ✅ Mock 데이터 import
import { mockEvent } from "@/mocks/event";

// ✅ Supabase import
import { supabaseServer } from "@/libs/supabase/server";

// ✅ SVG 에셋 import (React 컴포넌트)
import CalendarIcon from "@/assets/calendar.svg";
import PinIcon from "@/assets/pin.svg";
```

## 디렉토리별 역할

### 📁 src/app/

**역할**: Next.js 16 App Router 기반 페이지 및 API 라우트

**특징**:

- 파일 시스템 기반 라우팅
- 서버 컴포넌트 기본
- API Routes 포함

**주요 파일**:

- `layout.tsx`: Root Layout (메타데이터, 폰트)
- `page.tsx`: 각 경로의 페이지 컴포넌트
- `route.ts`: API 엔드포인트

### 📁 src/components/

**역할**: 재사용 가능한 React 컴포넌트

**구조**:

- `common/`: 공통 컴포넌트 (Icon, Button 등)
- 최상위: 페이지별 주요 컴포넌트

**원칙**:

- 단일 책임 원칙
- Props 타입 명시
- "use client" 필요 시에만 사용

### 📁 src/lib/

**역할**: 프로젝트 내부 유틸리티 함수

**특징**:

- 순수 함수
- 테스트 가능
- 의존성 최소화

**예시**:

- 폼 검증 함수
- 날짜/시간 포맷팅
- 문자열 처리

### 📁 src/libs/

**역할**: 외부 라이브러리 통합 및 설정

**구조**:

- `supabase/`: Supabase 클라이언트 설정
- 향후: `stripe/`, `auth/` 등 추가 가능

**차이점**:

- `lib/`: 내부 유틸
- `libs/`: 외부 서비스 통합

### 📁 src/mocks/

**역할**: 개발/테스트용 Mock 데이터

**특징**:

- 타입 안전성 보장
- 실제 데이터 구조 모방
- 에러 메시지 상수

**예시**:

```typescript
export const mockEvent: Event = {
  id: 1,
  title: "서경 TechConf 2025",
  // ...
};
```

### 📁 src/types/

**역할**: TypeScript 타입 및 인터페이스 정의

**파일**:

- `index.ts`: 전역 타입 정의
- `svg.d.ts`: SVG import 타입 선언

**원칙**:

- 도메인별 타입 그룹화
- 재사용 가능한 타입 우선

### 📁 assets/

**역할**: SVG, 이미지 등 프로젝트 에셋

**특징**:

- Webpack으로 번들링
- React 컴포넌트로 import 가능
- 타입 안전성 보장

**사용법**:

```typescript
import CalendarIcon from "@/assets/calendar.svg";

<CalendarIcon width={16} height={16} color="#525252" />;
```

### 📁 public/

**역할**: 정적 파일 (번들링 없이 직접 제공)

**특징**:

- 번들링 안 됨
- URL로 직접 접근 가능
- 이미지, 폰트, 파비콘 등

**사용법**:

```html
<img src="/calendar.svg" alt="" />
```

## 설정 파일

### next.config.ts

```typescript
const nextConfig: NextConfig = {
  reactCompiler: true,

  webpack(config) {
    // SVG를 React 컴포넌트로 import
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/assets/*": ["./assets/*"]
    }
  }
}
```

## 네이밍 규칙

### 파일명

- **컴포넌트**: `PascalCase.tsx` (예: `ReservationCard.tsx`)
- **유틸리티**: `camelCase.ts` (예: `utils.ts`)
- **타입**: `camelCase.ts` (예: `index.ts`)
- **API Route**: `route.ts` (Next.js 규칙)
- **페이지**: `page.tsx` (Next.js 규칙)

### 변수/함수

- **함수**: `camelCase` (예: `validateEmail`)
- **컴포넌트**: `PascalCase` (예: `Icon`)
- **상수**: `UPPER_SNAKE_CASE` (예: `ERROR_MESSAGES`)
- **타입**: `PascalCase` (예: `Event`, `IconProps`)

## 모범 사례

### 1. Import 순서

```typescript
// 1. React/Next.js
import { useState } from "react";
import { Metadata } from "next";

// 2. 외부 라이브러리
import { supabaseServer } from "@/libs/supabase/server";

// 3. 내부 컴포넌트
import Icon from "@/components/common/Icon";

// 4. 유틸/타입/Mock
import { validateEmail } from "@/lib/utils";
import { Event } from "@/types";
import { mockEvent } from "@/mocks/event";

// 5. 에셋
import CalendarIcon from "@/assets/calendar.svg";
```

### 2. 컴포넌트 구조

```typescript
// 1. Imports
// 2. Types
// 3. Constants
// 4. Component
// 5. Helper functions (if needed)
```

### 3. 타입 안전성

```typescript
// ✅ Props 타입 명시
interface IconProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
}

// ✅ 반환 타입 명시 (복잡한 함수)
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 4. 서버 vs 클라이언트 컴포넌트

```typescript
// 서버 컴포넌트 (기본)
export default function ReservePage() {
  return <ReservationCard />;
}

// 클라이언트 컴포넌트 (상태/이벤트 필요)
("use client");

export default function ReservationCard() {
  const [formValues, setFormValues] = useState({});
  // ...
}
```

## 확장 가능성

### 향후 추가 가능한 구조

```
src/
├── hooks/              # 커스텀 React Hooks
├── contexts/           # React Context
├── services/           # API 서비스 레이어
├── constants/          # 전역 상수
├── styles/             # 공통 스타일
└── features/           # 기능별 모듈화
    ├── reservation/
    ├── auth/
    └── payment/
```

## 참고 자료

- [Next.js 16 프로젝트 구조](https://nextjs.org/docs/getting-started/project-structure)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [SVGR Webpack](https://react-svgr.com/docs/webpack/)

---

**Last Updated**: 2025-12-10
