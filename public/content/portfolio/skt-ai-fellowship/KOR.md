# VR 기반 AI 학습 어시스턴트

## 프로젝트 개요

이 프로젝트는 SKT AI Fellowship에서 진행한 VR 기반 AI 학습 어시스턴트 개발 프로젝트입니다. 3인 개발팀으로 진행되었고, 저는 VR 디바이스 연동과 AI 기능 구현을 담당했습니다.

## 프로젝트 목표

사용자가 VR 환경 안에서 학습 콘텐츠와 상호작용하고, 음성으로 질문했을 때 질문 의도에 따라 AI 설명 또는 3D 모델 생성 결과를 제공하는 학습 경험을 만드는 것이 목표였습니다.

## 사용 기술

- Unity
- C#
- Meta Quest 3
- Meta XR All-In-One SDK
- FastAPI
- U2-Net
- Wit.ai
- ChatGPT-4o
- Meshy.ai API

## 구현 내용

![SKT 결과 화면 01](/content/portfolio/skt-ai-fellowship/result01.png "w=1080 h=620")
![SKT 결과 화면 02](/content/portfolio/skt-ai-fellowship/result02.png "w=1080 h=620")
![SKT 결과 화면 03](/content/portfolio/skt-ai-fellowship/result03.png "w=1080 h=620")

- Unity 기반 VR 학습용 씬 개발
- 업로드한 학습 이미지를 FastAPI 서버 파이프라인에 연결
- U2-Net으로 배경 제거 및 아티팩트 전처리 수행
- Meshy.ai API로 생성된 3D 모델을 Unity 씬으로 불러오는 파이프라인 구축
- VR 기기에서의 음성 질문 처리 기능 구현
- 질문 의도를 LLM 질의, 3D 모델 생성, Out of Scope로 분류하는 로직 설계

## 성능

질문 데이터셋을 직접 구축하고 파인튜닝하여 약 97% confidence와 1~2초 latency를 달성했습니다.

## 결과

사용자 질문 유형에 따라 서버는 다음 두 가지 결과 중 하나를 반환하도록 구성했습니다.

- 교과서 및 위키 기반으로 생성한 LLM 응답
- Unity 씬에서 활용할 수 있는 3D 모델 생성 결과

이 프로젝트를 통해 디바이스, 서버, AI 모델을 하나의 사용자 경험으로 연결하는 VR-AI 파이프라인을 설계하고 구현했습니다.
