# EightTails 블로그 리디자인 계획서

> 작성일: 2026-05-07  
> 목표: 글래스모피즘(Glassmorphism) + 다양한 애니메이션 효과를 통한 세련된 레이아웃 전면 리디자인

---

## 1. 현재 문제점 분석

### 1-1. Hero Section
- **NavBtn (◀ ▶)이 실제 캐러셀과 연결되지 않음** — 클릭해도 아무 동작 없는 죽은 버튼
- `.line1` / `.line2` 클래스가 정의되어 있지만 실제 스태거 애니메이션이 없음
- 배경이 단순 `#000` 단색 — 파티클/그라디언트/메쉬 등 시각적 흥미 요소 없음
- `HeroSubtitle`에 `color: #aaa !important` 하드코딩 — 테마 색상 무시

### 1-2. Apps Section
- `AppCardGrid`가 4-열 그리드인데 앱이 1개뿐 → 우측 3개 컬럼이 완전히 비어 보임
- AppCard 아이콘 배경이 `linear-gradient(135deg, #0f3460, #16213e)` 하드코딩 — 라이트 모드에서 어색
- 섹션 상단 여백(100px)이 콘텐츠 양 대비 과도하게 넓음

### 1-3. PostCard / HighlightCard
- 카드 배경이 `backgroundSecondary`이고, 테두리도 같은 색 → 카드 경계가 안 보임 (플랫함)
- `CardExcerpt` 배경색 (`#1a1a2e`, `#0f3460`)이 하드코딩 — 라이트 모드에서 어두운 블록이 그냥 나타남
- 호버 시 `box-shadow`만 변화 — 글로우/글래스 효과 없음
- 글래스모피즘 `backdrop-filter` 전혀 없음

### 1-4. 테마 (theme.js)
- **라이트 모드 배경** `#DCDCDC` — 탁한 회색, 세련되지 않음. 흰색 카드와 명도 대비 부족
- **다크 모드** `primary`가 `#7c3aed`(보라색)인데 라이트 모드 `primary`는 `#00c73c`(초록) — 테마 간 색감 단절
- `backgroundSecondary`와 `background` 명도 차이가 너무 작아 카드가 배경에 묻힘

### 1-5. Layout / 전반
- Header만 `backdrop-filter: blur(10px)` 적용 — 나머지 컴포넌트에 글래스 없음
- Footer가 `"My Dev Blog"` 하드코딩 — 실제 브랜드 (EightTails) 미반영
- `Section` 상하 패딩 100px — 콘텐츠가 적을 때 빈 공간이 지나치게 많아 보임
- 스크롤 시 배경 파티클/메쉬/그라디언트 이동 효과 없음
- 커서 커스텀 효과 없음
- 마우스 오버 시 카드 3D tilt 효과 없음

---

## 2. 리디자인 방향

### 키워드
`Glassmorphism` · `Frosted Glass` · `Ambient Glow` · `Scroll-triggered Animations` · `3D Tilt` · `Floating Particles` · `Stagger Fade`

### 색상 전략 (새 팔레트)

```
라이트 모드:
  배경:        #f0f4ff  (밝은 라벤더-화이트)
  카드:        rgba(255,255,255,0.65) + backdrop-filter: blur(20px)
  Primary:     #6366f1  (인디고)
  Accent:      #ec4899  (핑크)
  Glow:        rgba(99,102,241,0.25)

다크 모드:
  배경:        #0d0d1a  (딥 네이비)
  카드:        rgba(255,255,255,0.05) + backdrop-filter: blur(20px)
  Primary:     #818cf8  (밝은 인디고)
  Accent:      #f472b6  (밝은 핑크)
  Glow:        rgba(129,140,248,0.2)
```

---

## 3. 파일별 작업 계획

### Phase 1 — 기반 (테마 & 글로벌 스타일)

#### `src/styles/theme.js`
- 라이트/다크 모드 색상 전면 교체 (위 팔레트 적용)
- `glass`, `glow`, `border` 토큰 추가

```js
// 추가 토큰 예시
glass: 'rgba(255,255,255,0.65)',
glassDark: 'rgba(255,255,255,0.05)',
glowPrimary: 'rgba(99,102,241,0.25)',
borderGlass: 'rgba(255,255,255,0.2)',
```

#### `src/styles/GlobalStyle.js`
- 배경에 **메쉬 그라디언트** 추가 (`background: radial-gradient(...)`)
- `::selection` 스타일 추가
- `scrollbar-width: thin` + 커스텀 스크롤바 색상
- `@keyframes` 추가:
  - `float` (위아래 떠다니는 효과)
  - `glowPulse` (빛이 박동하는 효과)
  - `shimmer` (빛이 스치는 shimmer)
  - `gradientShift` (배경 그라디언트 이동)

---

### Phase 2 — 공통 컴포넌트

#### `src/components/Header.js`
- 현재: `backdrop-filter: blur(10px)`
- 변경: blur 강화 + 하단 border-bottom에 `rgba(255,255,255,0.1)` 글래스 라인
- 스크롤 감지: 스크롤 내려가면 배경 opacity 증가 (투명 → 반투명 전환)
- NavLink에 호버 시 인디고 glow underline 애니메이션

#### `src/components/Footer.js`
- 브랜드명 "My Dev Blog" → "EightTails" 교체
- 글래스 카드 스타일 footer로 변경 (배경 반투명 + 상단 border)
- 소셜 링크 아이콘 추가 (GitHub 등)
- 반짝이는 구분선 (`shimmer` 애니메이션)

#### `src/hooks/useScrollReveal.js` → `src/hooks/useTilt.js` 추가
- 마우스 위치 기반 **3D Tilt 효과** 훅 신규 작성
- `perspective`, `rotateX`, `rotateY` 계산 로직

---

### Phase 3 — 메인 페이지 (`src/pages/index.js`)

#### Hero Section 전면 재작성
```
[현재]                        [변경]
─────────────────             ──────────────────────────────
검정 배경 + 흰 텍스트          메쉬 그라디언트 배경 (인디고+핑크)
                             + 부유하는 반투명 Blob 오브젝트 3개
                             + 텍스트 스태거 슬라이드업 애니메이션
                             + CTA 버튼 (글로우 효과)
죽은 NavBtn (◀▶)             제거 → Scroll Down 인디케이터 (위아래 bounce)
HeroSubtitle 하드코딩 색상     테마 색상 사용
```

- **Blob 오브젝트**: `position: absolute` 원형 요소 3개, `float` + `@keyframes gradientShift`
- **타이핑 효과**: 타이틀 텍스트를 타이핑하듯 글자가 하나씩 나타나는 효과 (CSS `@keyframes`)
- **Scroll indicator**: 하단 중앙에 아래 화살표 bounce 애니메이션

#### Apps Section
- 앱이 1개일 때: 4-열 → **auto-fill, minmax(240px, 1fr)** 그리드로 변경
- AppCard → **글래스 카드** 스타일:
  - `background: rgba(255,255,255,0.08)`, `backdrop-filter: blur(20px)`
  - 테두리: `border: 1px solid rgba(255,255,255,0.15)`
  - 호버: 카드 위쪽 inset glow (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 0 24px rgba(99,102,241,0.3)`)
  - `useTilt` 훅으로 3D tilt 적용

#### Featured Stories (Horizontal Scroll)
- HighlightCard → 글래스 카드 변환
- 스크롤 영역 양끝에 페이드 마스크 (`mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent)`)
- 카드 호버 시 scale + glow 이중 효과

#### Latest Updates (Grid)
- PostCard 별도 리디자인 (Phase 3-PostCard 참고)
- GridItem stagger 딜레이 유지, 이징 강화

---

### Phase 4 — PostCard 리디자인

```
[현재]                               [변경]
─────────────────────────────        ──────────────────────────────────
border: 1px solid backgroundSecondary  border: 1px solid rgba(255,255,255,0.12)
background: backgroundSecondary       background: glass 토큰 + backdrop-filter
호버: translateY(-4px)               호버: tilt 3D + glow + scale
ExcerptPreview: 배경색 하드코딩      theme token 사용 + shimmer overlay
Category: #00c73c 하드코딩          primary color token 사용
```

**새 PostCard 구조:**
```
┌─────────────────────────────┐
│  [이미지 or 텍스트 프리뷰]    │  ← shimmer hover 효과
│  (상단 inset glow)          │
├─────────────────────────────┤  ← rgba border
│  CATEGORY  (primary color)  │
│  Title                      │  ← 굵은 폰트, 1.2rem
│  Summary                    │
│  Date          Read more →  │  ← flex row
└─────────────────────────────┘
   ↑ backdrop-filter: blur(20px)
   ↑ glass background
   ↑ 호버 시 상단 borderTop glow
```

---

### Phase 5 — 파티클 배경 (선택 강화 항목)

#### `src/components/ParticleBackground.js` (신규)
- Canvas API 또는 CSS-only 방식으로 배경 파티클 구현
- 작은 원형 점들이 부유 → Hero 섹션 배경에 사용
- **라이브러리 없이 구현** (번들 크기 절약):
  ```
  - 40~60개 점 생성
  - requestAnimationFrame 루프
  - 마우스 가까워지면 반발/흡인 효과
  ```

---

## 4. 작업 순서 (실행 시퀀스)

```
Step 1: theme.js 색상 토큰 교체
Step 2: GlobalStyle.js — keyframes + 메쉬 그라디언트 배경 + 스크롤바
Step 3: Header.js — 스크롤 연동 opacity + NavLink glow
Step 4: Footer.js — 브랜드 교체 + 글래스 스타일
Step 5: useTilt.js 훅 신규 작성
Step 6: PostCard.js — 글래스 + 3D tilt + shimmer
Step 7: index.js Hero 재작성 (Blob + 타이핑 + scroll indicator)
Step 8: index.js Apps/Featured/Grid 섹션 글래스 카드 적용
Step 9: ParticleBackground 컴포넌트 추가 (Hero 배경)
Step 10: 전체 확인 — 라이트/다크 모드 토글 테스트
```

---

## 5. 애니메이션 상세 목록

| 컴포넌트 | 효과 | 구현 방법 |
|---|---|---|
| Hero 배경 | 메쉬 그라디언트 이동 | `@keyframes gradientShift` + `background-size: 400%` |
| Hero Blob | 부유 + 색상 변화 | `@keyframes float` (translateY 왕복) |
| Hero 텍스트 | 스태거 슬라이드업 | `animation-delay` 순차 적용 |
| Scroll Indicator | 바운스 | `@keyframes bounce` |
| Header | 스크롤 blur 증가 | `useEffect` + `window.scrollY` |
| AppCard / PostCard | 3D Tilt | `useTilt` 훅 + `transform: perspective(1000px) rotateX() rotateY()` |
| PostCard 호버 | Shimmer | `::after` 슈도 + `@keyframes shimmer` translateX |
| 카드 glow | 인디고 빛 | `box-shadow: 0 0 30px rgba(99,102,241,0.4)` |
| SectionTitle | 언더라인 그로우 | `::after` + `scaleX` transform |
| GridItem | 스크롤 fade-in | 기존 `useScrollReveal` 유지 + 이징 강화 |
| ParticleCanvas | 부유 점들 | Canvas API + `requestAnimationFrame` |

---

## 6. 파일 변경 범위 요약

| 파일 | 작업 유형 | 우선순위 |
|---|---|---|
| `src/styles/theme.js` | 전면 수정 | ★★★ |
| `src/styles/GlobalStyle.js` | 수정 | ★★★ |
| `src/components/Header.js` | 수정 | ★★★ |
| `src/components/PostCard.js` | 전면 수정 | ★★★ |
| `src/pages/index.js` | 전면 수정 | ★★★ |
| `src/components/Footer.js` | 수정 | ★★ |
| `src/hooks/useTilt.js` | 신규 생성 | ★★ |
| `src/components/ParticleBackground.js` | 신규 생성 | ★ |

---

## 7. 주의사항

- **Gatsby SSR 호환**: `window`, `document`, `canvas` 접근 시 `typeof window !== 'undefined'` 가드 필수
- **backdrop-filter 지원**: Safari를 위해 `-webkit-backdrop-filter` 항상 병기
- **성능**: 파티클 Canvas는 Hero에만 한정, 다른 섹션에서는 CSS-only 효과
- **접근성**: 애니메이션 시 `prefers-reduced-motion` 미디어 쿼리 적용 (모션 축소 모드 지원)
- **모바일**: tilt 효과는 터치 디바이스에서 비활성화, 대신 탭 시 glow만 표시
