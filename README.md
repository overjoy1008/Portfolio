# Kyoungbin Park Portfolio

`Next.js + Tailwind CSS + Motion` 기반 포트폴리오 사이트입니다.

이 문서는 이 프로젝트의 기본 개발 원칙과, GitHub에서 프로젝트를 받은 뒤 로컬에서 실행하는 방법을 정리합니다.

## Tech Stack

- `Next.js`
- `React`
- `Tailwind CSS`
- `Framer Motion` 계열 애니메이션 라이브러리인 `motion`
- `TypeScript`

## Core Principles

이 프로젝트를 수정하거나 확장할 때는 아래 원칙을 기본값으로 삼습니다.

### 1. Framework

- 가능하면 항상 `Next.js` 기반으로 개발합니다.
- 페이지, 라우팅, 렌더링, API 처리는 `Next.js` 방식에 맞춥니다.
- 특별한 이유가 없다면 별도 SPA 프레임워크 구조로 되돌리지 않습니다.

### 2. Styling

- 스타일링은 기본적으로 `Tailwind CSS`를 사용합니다.
- 정렬은 가능하면 `flex`와 `gap` 중심으로 구성합니다.
- 불필요한 absolute 정렬, margin 누적 정렬보다 일관된 레이아웃 규칙을 우선합니다.

### 3. Animation

- 애니메이션은 가능하면 `Framer Motion` 계열 방식으로 구현합니다.
- 현재 프로젝트에서는 `motion` 패키지를 사용합니다.
- 애니메이션은 과하지 않게, UI 의미를 강화하는 방향으로만 사용합니다.

### 4. Component Architecture

- UI는 재사용 가능한 `component + props` 구조를 기본으로 작성합니다.
- 반복되는 UI나 섹션별 표현은 컴포넌트로 분리합니다.
- 하드코딩을 늘리기보다, 의미 있는 props와 데이터 구조로 관리합니다.

### 5. Responsive Design

- 모든 화면은 `데스크탑`과 `모바일`을 함께 고려해서 만듭니다.
- 한쪽 화면에만 맞는 고정 폭 설계는 지양합니다.
- 반응형 레이아웃, 텍스트 크기, 간격, 줄바꿈을 함께 확인합니다.

### 6. Rendering

- 가능하면 `Next.js`의 렌더링 방식을 적극 활용합니다.
- 필요한 경우 `dynamic rendering`도 고려합니다.
- 단, 현재 UX와 성능을 해치지 않는 범위에서 적용합니다.

### 7. Typography

- 텍스트 일관성은 매우 중요합니다.
- 사용자가 별도로 지정하지 않는 한 모든 텍스트는 기본적으로 `Noto Sans KR`를 사용합니다.
- 새로운 폰트를 추가할 때는 명시적인 이유가 있어야 합니다.

### 8. Visual Consistency

- 텍스트 스타일, 색상, 간격, 컴포넌트 톤은 전체적으로 일관되어야 합니다.
- 새 UI를 추가할 때도 기존 사이트의 분위기와 타이포, 색상 규칙을 우선적으로 따릅니다.
- 눈에 띄는 요소보다 전체적인 통일감을 더 중요하게 봅니다.

## Project Structure

주요 구조는 아래와 같습니다.

```txt
src/
  app/            Next.js App Router
  components/     재사용 가능한 UI 컴포넌트
  context/        전역 상태 관리
  data/           포트폴리오 데이터
  sections/       홈 화면 섹션 단위 UI
public/
  cover/          앨범 커버 이미지
  music/          오디오 파일
```

## Getting Started

GitHub에서 이 프로젝트를 받은 뒤 로컬에서 여는 방법입니다.

### 1. Prerequisites

아래가 설치되어 있어야 합니다.

- `Node.js` 20 이상 권장
- `npm`

### 2. Install Dependencies

프로젝트 루트에서 실행합니다.

```bash
npm install
```

### 3. Environment Variables

이 프로젝트는 이메일 전송 기능에 환경 변수를 사용할 수 있습니다.

필요하면 `.env.local` 파일을 만들고 아래 값을 설정합니다.

```env
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
```

이메일 기능이 필요 없다면 이 값이 없어도 사이트 자체는 열 수 있습니다.

### 4. Run the Development Server

```bash
npm run dev
```

브라우저에서 아래 주소를 엽니다.

```txt
http://localhost:3000
```

### 5. Production Build

배포 전 빌드 확인은 아래처럼 합니다.

```bash
npm run build
npm run start
```

### 6. Type Check

```bash
npm run lint
```

## Notes

- 정적 에셋 파일명은 가능하면 영문 소문자와 하이픈을 사용합니다.
- 한글 파일명은 서버 또는 헤더 처리 과정에서 예기치 않은 문제를 만들 수 있으므로 지양합니다.
- UI 수정 시에는 디자인 자체를 바꾸기보다 기존 구조와 톤을 유지하는 방향을 우선합니다.
