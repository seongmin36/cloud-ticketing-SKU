# 🎨 Figma Design Mapping

**서경 TechConf 2025** Figma 디자인을 Tailwind CSS로 매핑한 상세 가이드입니다.

## 📐 디자인 분석 결과

### Figma Node Structure

```
Admin Dashboard Layout (1:3)
└── EventLanding (1:4)
    └── Card (1:5)
        ├── CardHeader (1:6)
        │   ├── EventLanding (1:7)
        │   │   ├── Text (1:8) → "CONFERENCE" 배지
        │   │   └── tag (1:51) → 태그 아이콘
        │   ├── CardTitle (1:15) → "서경 TechConf 2025"
        │   └── CardDescription (1:17) → 설명 텍스트
        │
        ├── CardContent (1:19)
        │   ├── EventLanding (1:20) → 날짜 정보
        │   │   ├── Icon (1:21) → 캘린더 아이콘
        │   │   └── Text (1:26) → "2025.12.17 • 09:00 AM"
        │   ├── EventLanding (1:28) → 장소 정보
        │   │   ├── Icon (1:29) → 위치 아이콘
        │   │   └── Text (1:32) → "SKU Bukak Hall, Seoul"
        │   └── EventLanding (1:34) → 폼 섹션
        │       ├── Container (1:35) → 이름 입력
        │       │   ├── Primitive.label (1:36) → "이름"
        │       │   └── Input (1:38) → 입력 필드
        │       └── Container (1:40) → 이메일 입력
        │           ├── Primitive.label (1:41) → "이메일"
        │           └── Input (1:43) → 입력 필드
        │
        └── Button (1:45) → "예약하기" 버튼
```

## 🎨 컬러 시스템

### Figma → Tailwind 매핑

| 용도          | Figma 값  | Tailwind 클래스              | 비고             |
| ------------- | --------- | ---------------------------- | ---------------- |
| 배경          | `#FAFAFA` | `bg-[#FAFAFA]`               | 전체 페이지 배경 |
| 카드 배경     | `#FFFFFF` | `bg-white`                   | 카드 배경        |
| 카드 테두리   | `#E5E5E5` | `border-[#E5E5E5]`           | 1px 테두리       |
| 제목 텍스트   | `#171717` | `text-[#171717]`             | 주요 텍스트      |
| 설명 텍스트   | `#737373` | `text-[#737373]`             | 부가 설명        |
| 본문 텍스트   | `#525252` | `text-[#525252]`             | 날짜/장소        |
| 레이블 텍스트 | `#404040` | `text-[#404040]`             | 폼 레이블        |
| Placeholder   | `#717182` | `placeholder:text-[#717182]` | 입력 힌트        |
| 배지 배경     | `#F5F5F5` | `bg-[#F5F5F5]`               | Conference 배지  |
| 버튼 배경     | `#171717` | `bg-[#171717]`               | 예약 버튼        |
| 버튼 텍스트   | `#FFFFFF` | `text-white`                 | 버튼 내 텍스트   |

### 그림자 효과

**Figma 값:**

```
box-shadow:
  0px 1px 2px -1px rgba(0, 0, 0, 0.1),
  0px 1px 3px 0px rgba(0, 0, 0, 0.1)
```

**Tailwind:**

```css
shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]
```

## 📝 타이포그래피

### 폰트 패밀리

**Figma:** Inter  
**구현:** Google Fonts의 Inter (`next/font/google`)

### 텍스트 스타일 매핑

#### 1. Conference 배지 (Node 1:9)

| 속성           | Figma          | Tailwind            |
| -------------- | -------------- | ------------------- |
| Font Family    | Inter          | `font-sans`         |
| Font Weight    | 600 (Semibold) | `font-semibold`     |
| Font Size      | 12px           | `text-[12px]`       |
| Line Height    | 1.33 (16px)    | `leading-[1.33]`    |
| Letter Spacing | 5%             | `tracking-[0.05em]` |
| Text Case      | UPPER          | `uppercase`         |
| Color          | #737373        | `text-[#737373]`    |

**전체 클래스:**

```html
text-[12px] font-semibold leading-[1.33] tracking-[0.05em] uppercase
text-[#737373]
```

#### 2. 카드 제목 (Node 1:16)

| 속성           | Figma       | Tailwind              |
| -------------- | ----------- | --------------------- |
| Font Weight    | 700 (Bold)  | `font-bold`           |
| Font Size      | 24px        | `text-[24px]`         |
| Line Height    | 1.33 (32px) | `leading-[1.33]`      |
| Letter Spacing | -2.2%       | `tracking-[-0.022em]` |
| Color          | #171717     | `text-[#171717]`      |

**전체 클래스:**

```html
text-[24px] font-bold leading-[1.33] tracking-[-0.022em] text-[#171717]
```

#### 3. 카드 설명 (Node 1:18)

| 속성           | Figma         | Tailwind               |
| -------------- | ------------- | ---------------------- |
| Font Weight    | 400 (Regular) | `font-normal`          |
| Font Size      | 16px          | `text-[16px]`          |
| Line Height    | 1.5 (24px)    | `leading-[1.5]`        |
| Letter Spacing | -1.95%        | `tracking-[-0.0195em]` |
| Color          | #737373       | `text-[#737373]`       |

**전체 클래스:**

```html
text-[16px] font-normal leading-[1.5] tracking-[-0.0195em] text-[#737373]
```

#### 4. 날짜/장소 텍스트 (Node 1:27, 1:33)

| 속성           | Figma         | Tailwind               |
| -------------- | ------------- | ---------------------- |
| Font Weight    | 400 (Regular) | `font-normal`          |
| Font Size      | 14px          | `text-[14px]`          |
| Line Height    | 1.43 (20px)   | `leading-[1.43]`       |
| Letter Spacing | -1.07%        | `tracking-[-0.0107em]` |
| Color          | #525252       | `text-[#525252]`       |

**전체 클래스:**

```html
text-[14px] font-normal leading-[1.43] tracking-[-0.0107em] text-[#525252]
```

#### 5. 폼 레이블 (Node 1:37, 1:42)

| 속성           | Figma        | Tailwind               |
| -------------- | ------------ | ---------------------- |
| Font Weight    | 500 (Medium) | `font-medium`          |
| Font Size      | 14px         | `text-[14px]`          |
| Line Height    | 1 (14px)     | `leading-[1]`          |
| Letter Spacing | -1.07%       | `tracking-[-0.0107em]` |
| Color          | #404040      | `text-[#404040]`       |

**전체 클래스:**

```html
text-[14px] font-medium leading-[1] tracking-[-0.0107em] text-[#404040]
```

#### 6. 입력 필드 (Node 1:39, 1:44)

| 속성           | Figma          | Tailwind                       |
| -------------- | -------------- | ------------------------------ |
| Font Weight    | 400 (Regular)  | `font-normal`                  |
| Font Size      | 16px           | `text-[16px]`                  |
| Line Height    | 1.21 (19.36px) | `leading-[1.21]`               |
| Letter Spacing | -1.95%         | `tracking-[-0.0195em]`         |
| Color          | #717182        | `text-[#717182]` (placeholder) |

**전체 클래스:**

```html
text-[16px] font-normal leading-[1.21] tracking-[-0.0195em]
placeholder:text-[#717182]
```

#### 7. 버튼 텍스트 (Node 1:46)

| 속성           | Figma        | Tailwind               |
| -------------- | ------------ | ---------------------- |
| Font Weight    | 500 (Medium) | `font-medium`          |
| Font Size      | 14px         | `text-[14px]`          |
| Line Height    | 1.43 (20px)  | `leading-[1.43]`       |
| Letter Spacing | -1.07%       | `tracking-[-0.0107em]` |
| Color          | #FFFFFF      | `text-white`           |
| Align          | Center       | `text-center`          |

**전체 클래스:**

```html
text-[14px] font-medium leading-[1.43] tracking-[-0.0107em] text-white
```

## 📏 레이아웃 & 간격

### 카드 (Node 1:5)

| 속성          | Figma             | Tailwind                  |
| ------------- | ----------------- | ------------------------- |
| Width         | 448px             | `w-full max-w-[448px]`    |
| Height        | 478px             | 자동 (콘텐츠 기반)        |
| Border Radius | 14px              | `rounded-[14px]`          |
| Border        | 1px solid #E5E5E5 | `border border-[#E5E5E5]` |
| Background    | #FFFFFF           | `bg-white`                |
| Shadow        | (위 참조)         | `shadow-[...]`            |

### CardHeader (Node 1:6)

| 속성    | Figma               | Tailwind         |
| ------- | ------------------- | ---------------- |
| Padding | 24px 24px 0px       | `px-6 pt-6 pb-0` |
| Width   | 446px (카드 - 패딩) | 자동             |
| Height  | 135.33px            | 자동             |

### Conference 배지 (Node 1:8)

| 속성          | Figma            | Tailwind           |
| ------------- | ---------------- | ------------------ |
| Width         | 104.5px          | 자동 (콘텐츠 기반) |
| Height        | 24px             | 자동               |
| Padding       | 8px (horizontal) | `px-2 py-1`        |
| Border Radius | 6px              | `rounded-md`       |
| Background    | #F5F5F5          | `bg-[#F5F5F5]`     |

### 제목 간격

| 요소        | Figma Y             | Margin        |
| ----------- | ------------------- | ------------- |
| 배지 → 제목 | 24px → 72.67px      | `mb-6` (24px) |
| 제목 → 설명 | 104.67px → 126.67px | `mb-[22px]`   |
| 설명 → 날짜 | 126.67px → 153px    | `mb-6` (24px) |

### CardContent (Node 1:19)

| 속성    | Figma    | Tailwind    |
| ------- | -------- | ----------- |
| Padding | 0px 24px | `px-6`      |
| Gap     | 24px     | `space-y-6` |
| Width   | 446px    | 자동        |
| Height  | 236px    | 자동        |

### 아이콘 + 텍스트 (Node 1:20, 1:28)

| 속성   | Figma  | Tailwind       |
| ------ | ------ | -------------- |
| Layout | Row    | `flex`         |
| Align  | Center | `items-center` |
| Gap    | 8px    | `gap-2`        |

### 아이콘 크기

| 요소          | Figma   | Tailwind  |
| ------------- | ------- | --------- |
| Calendar Icon | 16×16px | `w-4 h-4` |
| Location Icon | 16×16px | `w-4 h-4` |

### 폼 섹션 (Node 1:34)

| 속성        | Figma  | Tailwind        |
| ----------- | ------ | --------------- |
| Layout      | Column | `flex flex-col` |
| Gap         | 16px   | `space-y-4`     |
| Padding Top | 16px   | `pt-4`          |

### 입력 필드 컨테이너 (Node 1:35, 1:40)

| 속성   | Figma   | Tailwind        |
| ------ | ------- | --------------- |
| Layout | Column  | `flex flex-col` |
| Gap    | 8px     | `space-y-2`     |
| Width  | Stretch | `w-full`        |
| Height | 58px    | 자동            |

### 입력 필드 (Node 1:38, 1:43)

| 속성          | Figma             | Tailwind                  |
| ------------- | ----------------- | ------------------------- |
| Width         | Stretch           | `w-full`                  |
| Padding       | 4px 12px          | `px-3 py-2`               |
| Border Radius | 8px               | `rounded-lg`              |
| Border        | 1px solid #E5E5E5 | `border border-[#E5E5E5]` |
| Background    | #FAFAFA           | `bg-[#FAFAFA]`            |

### 버튼 (Node 1:45)

| 속성          | Figma       | Tailwind                           |
| ------------- | ----------- | ---------------------------------- |
| Width         | 398px       | `w-full`                           |
| Height        | 40px        | `h-[40px]`                         |
| Padding       | 0px 24px    | `px-6`                             |
| Gap           | 8px         | `gap-2`                            |
| Border Radius | 8px         | `rounded-lg`                       |
| Background    | #171717     | `bg-[#171717]`                     |
| Layout        | Row, Center | `flex justify-center items-center` |

## 🎭 인터랙션

### 버튼 상태

#### Hover

```css
hover: bg-[#262626];
```

#### Active

```css
active: bg-[#0a0a0a];
```

#### Disabled

```css
disabled:opacity-50 disabled:cursor-not-allowed
```

### 입력 필드 Focus

```css
focus:outline-none
focus:ring-2
focus:ring-[#171717]
focus:border-transparent
```

### 트랜지션

모든 상태 변경에 부드러운 트랜지션 적용:

```css
transition-all
```

## 📱 반응형 디자인

### 데스크톱 (≥ 448px)

- 카드를 화면 중앙에 배치
- 최대 너비 448px 유지
- 상하좌우 여백 16px (`p-4`)

### 모바일 (< 448px)

- 카드를 화면 폭에 맞춤
- 좌우 여백 16px 유지
- 카드 내부 레이아웃 동일

### 구현 코드

```jsx
// 페이지 레이아웃
<main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
  <div className="w-full max-w-[448px]">
    <ReservationCard />
  </div>
</main>
```

## 🔍 검증

### Figma vs 실제 구현 비교

| 요소             | Figma   | 구현           | 일치 여부 |
| ---------------- | ------- | -------------- | --------- |
| 카드 너비        | 448px   | max-w-[448px]  | ✅        |
| 카드 둥근 모서리 | 14px    | rounded-[14px] | ✅        |
| 제목 크기        | 24px    | text-[24px]    | ✅        |
| 버튼 높이        | 40px    | h-[40px]       | ✅        |
| 배지 배경        | #F5F5F5 | bg-[#F5F5F5]   | ✅        |
| 본문 간격        | 24px    | space-y-6      | ✅        |
| 입력 둥근 모서리 | 8px     | rounded-lg     | ✅        |

## 🛠 개발자 팁

### 1. Figma 값을 Tailwind로 변환

**간격 계산:**

- Figma: 24px → Tailwind: `6` (24/4 = 6)
- Figma: 16px → Tailwind: `4` (16/4 = 4)
- Figma: 8px → Tailwind: `2` (8/4 = 2)

**커스텀 값이 필요한 경우:**

```css
text-[14px]  /* Tailwind에 없는 정확한 값 */
text-sm      /* Tailwind 기본값 (14px) */
```

### 2. Letter Spacing 변환

Figma의 퍼센트 값을 `em`으로 변환:

```
-2.2% = -0.022em → tracking-[-0.022em]
-1.95% = -0.0195em → tracking-[-0.0195em]
5% = 0.05em → tracking-[0.05em]
```

### 3. Line Height 변환

Figma의 배수 값을 그대로 사용:

```
1.33 → leading-[1.33]
1.5 → leading-[1.5]
1.43 → leading-[1.43]
```

## 📚 참고 자료

- **Figma 파일**: [클라우드 프로젝트](https://www.figma.com/design/3aKUgWYmujrVNAz4TYrvL3/)
- **Tailwind CSS 문서**: https://tailwindcss.com/docs
- **Inter 폰트**: https://fonts.google.com/specimen/Inter

---

**Last Updated: 2025-12-10**
