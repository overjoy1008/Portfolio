# Kyoungbin Park Portfolio

`Next.js + Tailwind CSS + Motion` 기반 포트폴리오 사이트.

## Tech Stack

- `Next.js`
- `React`
- `Tailwind CSS`
- `motion`
- `TypeScript`
- `react-markdown`
- `lucide-react`

## Core Principles

이 프로젝트 수정/확장 시 기본 원칙.

### 1. Framework

- 가능하면 항상 `Next.js` 기반으로 개발.
- 페이지, 라우팅, 렌더링, API 처리는 `Next.js` 방식 유지.
- 특별한 이유가 없으면 별도 SPA 구조로 되돌리지 않음.

### 2. Styling

- 스타일링은 기본적으로 `Tailwind CSS` 사용.
- 정렬은 가능하면 `flex`와 `gap` 중심으로 구성.
- 불필요한 absolute 정렬, margin 누적 정렬보다 레이아웃 규칙 일관성 우선.

### 3. Animation

- 애니메이션은 가능하면 `Framer Motion` 계열 방식으로 구현.
- 현재 프로젝트에서는 `motion` 패키지 사용.
- 애니메이션은 과하지 않게, UI 의미를 강화하는 방향으로만 사용.

### 4. Component Architecture

- UI는 재사용 가능한 `component + props` 구조 기본.
- 반복되는 UI나 섹션별 표현은 컴포넌트로 분리.
- 하드코딩을 늘리기보다 의미 있는 props와 데이터 구조로 관리.

### 5. Responsive Design

- 모든 화면은 `데스크탑`과 `모바일` 함께 고려.
- 한쪽 화면에만 맞는 고정 폭 설계는 지양.
- 반응형 레이아웃, 텍스트 크기, 간격, 줄바꿈 함께 확인.

### 6. Rendering

- 가능하면 `Next.js` 렌더링 방식 적극 활용.
- 필요한 경우 `dynamic rendering`도 고려.
- 현재 UX와 성능을 해치지 않는 범위에서 적용.

### 7. Typography

- 텍스트 일관성 중요.
- 별도 지정이 없으면 기본적으로 `Noto Sans KR` 사용.
- 새 폰트 추가 시 명시적인 이유 필요.

### 8. Visual Consistency

- 텍스트 스타일, 색상, 간격, 컴포넌트 톤은 전체적으로 일관되게 유지.
- 새 UI를 추가할 때도 기존 사이트 분위기와 타이포, 색상 규칙 우선.
- 눈에 띄는 요소보다 전체 통일감 우선.

## Project Structure

```txt
src/
  app/            Next.js App Router
  components/     재사용 가능한 UI 컴포넌트
  context/        전역 상태 관리
  data/           포트폴리오 데이터
  sections/       홈 화면 섹션 단위 UI
public/
  cover/          앨범 커버 이미지
  content/        프로젝트 상세 Markdown
  music/          오디오 파일
```

## Getting Started

### 1. Prerequisites

- `Node.js` 20 이상 권장
- `npm`

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 열기.

### 4. Production Build

```bash
npm run build
npm run start
```

### 5. Type Check

```bash
npm run lint
```

## Notes

- 정적 에셋 파일명은 가능하면 영문 소문자와 하이픈 사용.
- 한글 파일명은 서버 또는 헤더 처리 과정에서 예기치 않은 문제를 만들 수 있으므로 지양.
- UI 수정 시에는 디자인 자체를 바꾸기보다 기존 구조와 톤 유지 우선.
