# TERENE

## 프로젝트 개요

TERENE는 숙박 예약 플랫폼 웹사이트 외주 프로젝트로, 웹 UI 디자이너와 협업하며 제가 풀스택 개발을 1인으로 담당했습니다. 수동으로 처리되던 예약 과정을 실제 운영 가능한 서비스로 전환하는 것이 핵심 목표였습니다.

![TERENE 랜딩 페이지 목업](https://picsum.photos/seed/terene-gallery-1/1280/820 "w=1080 h=620")
![TERENE 예약 플로우 목업](https://picsum.photos/seed/terene-gallery-2/1280/820 "w=1080 h=620")
![TERENE 객실 상세 목업](https://picsum.photos/seed/terene-gallery-3/1280/820 "w=1080 h=620")
![TERENE 회원 대시보드 목업](https://picsum.photos/seed/terene-gallery-4/1280/820 "w=1080 h=620")
![TERENE 관리자 콘솔 목업](https://picsum.photos/seed/terene-gallery-5/1280/820 "w=1080 h=620")

## 구현한 기능

- 회원/비회원 예약 시스템
- Toss Payments API 기반 결제 기능
- SOLAPI 기반 카카오톡 예약 자동 알림톡
- 예약 현황, 회원 정보, 쿠폰, 마일리지 확인이 가능한 회원 페이지와 관리자 페이지
- Express와 PostgreSQL 기반 자체 서버 API

## 프론트엔드

- Framer
- React
- TypeScript 코드 컴포넌트

## 백엔드

- Express
- PostgreSQL
- Render

## 핵심 구현 포인트

![TERENE admin dashboard mockup](https://picsum.photos/seed/terene-admin/1200/700 "w=980")

기존 예약 프로세스는 수동 처리 방식이라 최대 24시간이 소요됐습니다. 이를 해결하기 위해 서버에서 Queue 기반 예약 처리 로직을 직접 설계해 결제, 예약 상태 변경, 알림 전송, 관련 데이터 반영이 순차적으로 안정적으로 처리되도록 구성했습니다.

또한 예약, 취소, 환불 시나리오를 기준으로 API와 데이터 흐름을 재설계해 고객, 예약, 결제, 환불, 캘린더, 쿠폰, 마일리지 테이블 간 데이터 무결성을 유지할 수 있도록 구현했습니다.

## 성과

- 예약 처리 시간을 24시간에서 5초 이내로 단축
- 누적 70건의 숙박 예약 완료
- 15명의 멤버십 회원 확보
- 실제 서비스 운영: https://terene.kr/
