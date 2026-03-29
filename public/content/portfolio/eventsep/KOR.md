## 프로젝트 개요

EventSep는 졸업논문으로 진행한 프로젝트로, 음악, 대화, 환경 소음 등 여러 이벤트가 섞인 복합 오디오에서 사용자가 자연어로 설명한 특정 소리만 분리하는 오디오 AI 연구입니다.

## 연구 목표

사용자가 원하는 소리를 자연어로 설명하면, 복합 오디오 안에서 해당 소리만 분리해내는 파이프라인을 만드는 것이 핵심 목표였습니다.

## 접근 방식

![EventSep 결과 화면 01](/content/portfolio/eventsep/result01.png "w=1080 h=620")
![EventSep 결과 화면 02](/content/portfolio/eventsep/result02.png "w=1080 h=620")
![EventSep 결과 화면 03](/content/portfolio/eventsep/result03.png "w=1080 h=620")
![EventSep 결과 화면 04](/content/portfolio/eventsep/result04.png "w=1080 h=620")

- 사용자가 설명한 오디오 이벤트가 존재하는 시간대를 먼저 탐지
- 해당 소리의 주파수 대역만 STFT 기반 마스킹으로 분리
- Frame-wise SED probability를 활용해 마스킹 정밀도 향상
- AudioSep, FlowSep 등 사전 학습 모델을 주파수 구간별로 앙상블해 성능 개선

## 핵심 포인트

단일 모델에 의존하지 않고, 여러 사전 학습 오디오 분리 모델의 장점을 결합해 의미적 유사도와 분리 성능을 함께 높이도록 설계했습니다.

## 성과

- VGGSound 데이터셋 기준 CLAPScore 25% 향상
- 0.2838에서 0.3549로 개선

## 데모

- Live demo: https://eventsep-demo.onrender.com
