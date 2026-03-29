# Resume Summary

## Basic Info

- Name: 박경빈 | Kyoungbin Park
- Phone: 010-2370-5710
- Email: overjoy1008@gmail.com
- LinkedIn: https://www.linkedin.com/in/overjoy1008
- GitHub: https://github.com/overjoy1008

## Summary

AI Engineer이자 Full-Stack Web Developer로서 웹 서비스를 기획, 개발, 배포, 운영한 경험이 있다.  
AI·LLM 기반 웹 서비스와 기업 협업 프로젝트를 통해 실제 사용자가 존재하는 다양한 use case를 구축했다.

## Skills & Tools

- Frontend: React, TypeScript, Next.js, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL, REST API, FastAPI, Firebase, AWS
- AI / LLM: Python, PyTorch, RAG, LLM Fine-tuning, ML Pipeline Design

## Experience & Projects

### TERENE | 2025.04 - 2026.01

- 숙박 예약 웹사이트 제작 외주 프로젝트
- 웹 UI 디자이너와 협업하며 Full-Stack 개발을 1인 담당
- 회원/비회원 예약 시스템, Toss Payments API 결제, SOLAPI 기반 예약 알림톡, 회원 페이지와 관리자 페이지 설계 및 개발
- Framer와 React(TypeScript 코드 컴포넌트)로 프론트엔드 구현
- Express, PostgreSQL, Render 기반 백엔드와 자체 API 개발
- Queue 기반 예약 처리 로직을 설계해 기존 24시간 수동 프로세스를 5초 이내 자동화로 개선
- 누적 70건의 숙박 예약 완료, 15명 멤버십 회원 확보
- Website: https://terene.kr/

### EventSep (졸업논문) | 2025.09 - 2025.11

- 자연어로 설명한 특정 오디오만 복합 오디오에서 분리하는 AI 모델 연구
- 사용자가 언급한 오디오가 존재하는 시간대를 감지한 뒤 해당 주파수만 STFT로 마스킹하는 파이프라인 설계
- Frame-wise SED probability와 사전 학습 모델(AudioSep, FlowSep) 앙상블을 활용해 성능 향상
- VGGSound 기준 CLAPScore 25% 향상(0.2838 -> 0.3549)
- Demo: https://eventsep-demo.onrender.com

### 컴투스 인턴 | 2024.12 - 2025.02

- 사내 담당자 탐색 시간을 줄이기 위한 직원 검색용 네이버웍스 챗봇 서비스 1인 개발
- Qwen2.5-32B-Instruct-GPTQ-Int4 기반 주간 업무 보고서 요약, JSON 정규화, 벡터화 자동화 파이프라인 설계
- 질문 시 cosine similarity가 가장 높은 직원 정보를 반환하는 RAG 기반 검색 시스템 구현
- multilingual-e5-large 임베딩 모델을 주간 보고서 데이터로 파인튜닝
- recall@10: 0.04 -> 0.18, ndcg@10: 0.02 -> 0.11, cosine similarity: 0.708 -> 0.869 개선
- 실제 컴투스 내부 개발자들이 사용하는 사내 AI 서비스로 운영

### SKT AI Fellowship | 2024.06 - 2024.10

- VR 기반 AI 학습 어시스턴트 개발 프로젝트
- 3인 개발팀에서 VR 디바이스 연동과 AI 기능 구현 담당
- Unity와 Meta XR All-In-One SDK로 VR 학습용 씬 개발
- 업로드 이미지에 대해 FastAPI 서버에서 U2-Net 기반 배경 제거 및 아티팩트 전처리 수행
- Meshy.ai API로 생성된 3D 모델을 Unity 씬으로 불러오는 파이프라인 구축
- Wit.ai 기반 STT 및 질문 의도 분류를 통해 LLM 질의, 3D 모델 생성, Out of Scope를 분기 처리
- 약 97% confidence, 1~2초 latency 달성
- ChatGPT-4o와 위키 크롤링 기반 응답 또는 3D 모델 생성 결과를 VR 기기로 전달
- Demo: https://drive.google.com/file/d/1WGmMBFYE4gbls7s0fGj0YVqr5cjdAzlU/view?usp=drive_link

### 뚫어보카 | 2024.03 - 2024.04

- 대학 수업 PPT 업로드 시 주요 키워드 기반 시험용 빈칸 문제를 생성하는 LLM 기반 웹서비스
- 4인 팀에서 Frontend Developer와 Prompt Engineer 역할 담당
- Frontend: React, Tailwind CSS, Next.js
- Backend: Firebase
- 출시 후 1주일간 2,500+ 조회수, 750+ 방문자, 1,200+ 문제 생성 기록

## Education

- 고려대학교 전기전자공학부(제1전공) / 컴퓨터학과(이중전공)
- GPA: 4.15 / 4.5
- 2026.02 수료(졸업유예)
