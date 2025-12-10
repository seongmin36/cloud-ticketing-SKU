# 🚀 SKU Ticketing - Setup Guide

## 프로젝트 구조

```
cloud-ticket/
│
├── 📁 app/                           # Next.js v16 App Router
│   ├── 📁 api/
│   │   └── 📁 reserve/
│   │       └── route.ts              # POST /api/reserve - 예약 API
│   │
│   ├── 📁 reserve/
│   │   └── page.tsx                  # 예약 페이지 (서버 컴포넌트)
│   │
│   ├── globals.css                   # 글로벌 스타일 (Tailwind + Inter 폰트)
│   └── layout.tsx                    # Root Layout (메타데이터, 폰트)
│
├── 📁 components/
│   └── ReservationCard.tsx           # 예약 카드 (클라이언트 컴포넌트)
│                                     # - 폼 상태 관리 (useState)
│                                     # - 검증 로직
│                                     # - API 호출 (fetch)
│
├── 📁 lib/
│   └── utils.ts                      # 유틸리티 함수
│                                     # - validateEmail()
│                                     # - validateName()
│
├── 📁 mocks/
│   └── event.ts                      # Mock 데이터
│                                     # - mockEvent (행사 정보)
│                                     # - VALIDATION_PATTERNS
│                                     # - ERROR_MESSAGES
│
├── 📁 types/
│   └── index.ts                      # TypeScript 타입 정의
│                                     # - Event
│                                     # - ReservationFormValues
│                                     # - ReservationRequest
│                                     # - ReservationResponse
│
└── 📁 libs/
    └── 📁 supabase/
        └── server.ts                 # Supabase 클라이언트
```

## 🎯 Step 1 - 구현 범위

### ✅ 완료된 기능

1. **Figma 디자인 분석 및 매핑**

   - 컬러, 타이포그래피, 레이아웃 완벽 재현
   - 448px × 478px 카드 디자인
   - Inter 폰트 적용

2. **예약 폼 UI**

   - 이름 입력 (필수)
   - 이메일 입력 (필수 + 형식 검증)
   - 예약하기 버튼 (로딩/비활성 상태)

3. **폼 검증**

   - 클라이언트 사이드 검증
   - Submit 시점 에러 표시
   - 실시간 에러 초기화

4. **API 통신**

   - POST /api/reserve 엔드포인트
   - fetch 기반 통신 (axios 미사용)
   - Supabase 연동

5. **반응형 디자인**
   - 모바일: 화면 폭 꽉 차게
   - 데스크톱: 중앙 정렬 (max-width: 448px)

### ⏳ Step 2+ (향후 구현)

- 대기열 화면
- 예약 완료 화면
- 라우팅 로직

## 🔧 개발 서버 실행

### Option 1: 기본 포트 (3000)

```bash
npm run dev
```

### Option 2: 다른 포트 사용

포트 3000이 이미 사용중인 경우:

```bash
# 포트 3001로 실행
PORT=3001 npm run dev

# 또는
npx next dev -p 3001
```

### Option 3: 기존 프로세스 종료

```bash
# 포트 3000을 사용중인 프로세스 확인
lsof -ti:3000

# 프로세스 종료
kill -9 $(lsof -ti:3000)

# 다시 실행
npm run dev
```

## 🌐 페이지 접속

서버 실행 후 브라우저에서 접속:

```
http://localhost:3000/reserve
```

## 📋 체크리스트

### 필수 환경 설정

- [ ] Node.js 18+ 설치
- [ ] npm 의존성 설치 (`npm install`)
- [ ] Supabase 환경 변수 설정 (`.env.local`)
- [ ] `reservations` 테이블 생성

### Supabase 테이블 스키마

```sql
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  event_id INTEGER NOT NULL,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 환경 변수 (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🧪 테스트 시나리오

### 1. 정상 예약 플로우

1. `/reserve` 페이지 접속
2. 이름 입력: "홍길동"
3. 이메일 입력: "test@example.com"
4. "예약하기" 버튼 클릭
5. 성공 메시지 확인: "예약 요청이 전송되었습니다!"
6. 콘솔에서 `order_id` 확인

### 2. 검증 에러 테스트

**Case 1: 빈 이름**

- 이름을 비워두고 제출
- 에러 메시지: "이름을 입력해주세요."

**Case 2: 빈 이메일**

- 이메일을 비워두고 제출
- 에러 메시지: "이메일을 입력해주세요."

**Case 3: 잘못된 이메일 형식**

- 이메일: "invalid-email"
- 에러 메시지: "올바른 이메일 형식을 입력해주세요."

### 3. 로딩 상태 테스트

1. 예약하기 버튼 클릭
2. 버튼 텍스트: "처리 중..." + 스피너
3. 버튼 비활성화 확인
4. 네트워크 탭에서 API 호출 확인

### 4. 반응형 테스트

**데스크톱 (1920px)**

- 카드가 화면 중앙에 정렬
- 최대 너비 448px 유지

**태블릿 (768px)**

- 카드 너비 조정 (좌우 여백 유지)

**모바일 (375px)**

- 카드가 화면 폭에 맞춰 꽉 차게 (16px 여백)

## 🐛 자주 발생하는 문제

### 1. 포트 충돌 (EPERM 에러)

```
Error: listen EPERM: operation not permitted 0.0.0.0:3000
```

**해결 방법:**

- 다른 포트 사용: `PORT=3001 npm run dev`
- 기존 프로세스 종료: `kill -9 $(lsof -ti:3000)`

### 2. Supabase 연결 실패

```
Error: Invalid Supabase URL
```

**해결 방법:**

- `.env.local` 파일 생성 확인
- 환경 변수 값 확인
- 서버 재시작 (환경 변수 변경 후)

### 3. 스타일 미적용

**해결 방법:**

- `globals.css`에 `@import "tailwindcss";` 확인
- Tailwind CSS v4 설정 확인
- 브라우저 캐시 삭제 (Cmd+Shift+R)

### 4. 타입 에러

```
Cannot find module '@/...'
```

**해결 방법:**

- `tsconfig.json`의 `paths` 설정 확인
- TypeScript 서버 재시작 (VSCode: Cmd+Shift+P → "Restart TS Server")

## 📊 성능 최적화 팁

### 1. 서버 컴포넌트 활용

- `app/reserve/page.tsx`는 서버 컴포넌트로 유지
- 필요한 부분만 클라이언트 컴포넌트로 분리

### 2. 폰트 최적화

- Next.js 자동 폰트 최적화 활용
- `next/font/google`로 Inter 폰트 로드

### 3. 이미지 최적화

- SVG 아이콘은 inline으로 삽입
- 추가 아이콘 라이브러리 불필요

### 4. 번들 크기 최소화

- axios, lodash 등 불필요한 라이브러리 제외
- 네이티브 fetch 사용

## 🚢 배포 준비

### Azure VM 배포 단계

1. **빌드 생성**

   ```bash
   npm run build
   ```

2. **환경 변수 설정**

   - Azure VM에서 `.env.local` 생성
   - Supabase 연결 정보 입력

3. **프로덕션 서버 실행**

   ```bash
   npm run start
   ```

4. **포트 설정**
   - 기본: 3000
   - 커스텀: `PORT=8080 npm run start`

### 프로덕션 체크리스트

- [ ] `npm run build` 성공
- [ ] 환경 변수 설정
- [ ] Supabase 테이블 생성
- [ ] HTTPS 설정 (optional)
- [ ] 도메인 연결 (optional)

## 📞 지원

문제가 발생하면:

1. **콘솔 로그 확인**: 브라우저 개발자 도구
2. **터미널 로그 확인**: Next.js 서버 출력
3. **Supabase 로그 확인**: Supabase Dashboard

---

**Happy Coding! 🎉**
