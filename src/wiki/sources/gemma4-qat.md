---
title: Gemma 4 QAT — 양자화 인식 학습으로 모바일·에지 최적화
created: 2026-06-08
updated: 2026-06-08
tags: [source, gemma-4, qat, quantization, mobile, on-device, google, llm, edge, litert]
sources: [2026-06-06-gemma4-qat.md]
status: stable
category: sources
---

# Gemma 4 QAT — 양자화 인식 학습으로 모바일·에지 최적화

## 개요

Google이 2026년 6월 5일 발표한 Gemma 4 QAT(Quantization-Aware Training) 체크포인트. 학습 중 양자화를 시뮬레이션하여 압축 후 품질 손실을 최소화하며, E2B 모델을 1GB 미만 메모리로 동작시켜 모바일 온디바이스 LLM 배포를 현실화.

## 핵심 내용

### QAT vs PTQ

| 방식 | 설명 | 품질 |
|------|------|------|
| **PTQ** (Post-Training Quantization) | 학습 후 양자화 적용 | 기본 품질 보존, 간편 |
| **QAT** (Quantization-Aware Training) | 학습 중 양자화 시뮬레이션 | PTQ 대비 전반적 품질 우위 |

QAT는 학습 단계에서 낮은 정밀도 연산을 모의하여, 실제 양자화 시 품질 저하를 최소화. 수치를 4비트 경계에 가깝게 밀어서 양자화 후에도 원본 성능을 거의 유지.

### 모바일 최적화 4대 기법

1. **정적 활성화**: 데이터 스케일 설정을 학습 중 미리 계산 → 모바일 칩 작업량 감소, 응답 속도 향상
2. **채널별 양자화**: 압축 데이터를 모바일 가속기 구조에 맞춰 구성 → 네이티브 계산, 느린 우회 방식 불필요
3. **선택적 2비트 양자화**: 토큰 생성 부분은 2비트 강압축, 핵심 추론 레이어는 고정밀 유지 → 저장 공간 절약
4. **임베딩·KV 캐시 최적화**: 어휘 목록과 단기 메모리에 압축 집중 → 활성 메모리 풋프린트 감소, 장문 대화 가능

### 메모리 절감 효과

| 모델 | BF16 기준 | QAT Q4_0 | 모바일 텍스트 전용 | 감소율 |
|------|----------|----------|-------------------|--------|
| Gemma 4 E2B | ~10GB | ~3GB | **<1GB** | ~90% |
| Gemma 4 E4B | — | — | ~2.2GB | — |
| Gemma 4 12B | — | QAT 적용 | — | ~72% |

텍스트 전용 모델은 오디오·비전 인코더 제거 + Per-Layer Embeddings 생략으로 추가 절감.

### MTP(Multi-Token Prediction) 보존

- 양자화하면서도 MTP의 추론 가속 효과를 유지
- LiteRT-LM에서 MTP 드래프터 지원 → 최대 **2.2배** 추론 속도 향상

### 지원 도구 생태계

| 환경 | 도구 | 용도 |
|------|------|------|
| 데스크톱 로컬 | llama.cpp, Ollama, LM Studio | 개인 로컬 실행 |
| 온디바이스 | LiteRT-LM | Android/Chrome/iOS 배포 |
| 웹 | Transformers.js | 브라우저 내 실행 |
| 서버 | SGLang, vLLM | 대규모 서빙 |
| Apple Silicon | MLX | Mac 최적화 |
| 파인튜닝 | Hugging Face Transformers, Unsloth | 가중치 커스터마이징 |

## 원문 인용

> "QAT는 학습 중 양자화를 시뮬레이션해 모델 압축 시 품질 손실을 최소화하는 방식임"

> "모바일 형식은 Gemma 4 E2B의 메모리 풋프린트를 1GB로 낮춤"

> "선택적 2비트 양자화는 토큰 생성 부분을 2비트로 강하게 압축하고 핵심 추론 레이어는 더 높은 정밀도로 유지"

## See also

- [GeekNews Weekly #352](/wiki/sources/geeknews-weekly-352/) — Gemma 4 최초 발표 (2026-04-22)
- [AI 뉴스 2026-06-05](/wiki/sources/ai-news-2026-06-05/) — Gemma 4 12B (Apache 2.0 로컬 멀티모달)
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 로컬 LLM 하네스 아키텍처
