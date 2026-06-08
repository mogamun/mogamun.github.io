---
title: Quantization-Aware Training (QAT)
created: 2026-06-08
updated: 2026-06-08
tags: [concept, quantization, optimization, llm, edge, mobile]
sources: [2026-06-06-gemma4-qat.md]
status: stable
category: concepts
---

# Quantization-Aware Training (QAT)

## 정의

학습 단계에서 양자화(Quantization)를 시뮬레이션하여, 모델 압축 시 품질 손실을 최소화하는 기법. 학습 후 양자화(PTQ)보다 압축 후 품질이 우수.

## 핵심 원칙

1. **학습 중 시뮬레이션**: 낮은 정밀도 연산을 학습 과정에 통합. 모델이 양자화 환경에 적응하며 가중치 학습
2. **수치 경계 최적화**: 학습이 수치를 목표 비트 폭(예: 4비트)의 경계에 가깝게 밀어서, 실제 양자화 시 정보 손실 최소화
3. **PTQ 대비 품질 우위**: 학습 후 양자화(PTQ)도 품질 보존에 효과적이지만, QAT 결과가 전반적으로 더 높은 품질 달성
4. **유연한 타겟**: Q4_0(4비트) 외에도 8비트 등 다양한 비트 폭에 적용 가능

## 적용 사례

### Gemma 4 QAT (Google, 2026-06)
- E2B 모델: BF16 ~10GB → QAT 모바일 텍스트 전용 **<1GB** (약 90% 감소)
- 4단계 모바일 최적화: 정적 활성화, 채널별 양자화, 선택적 2비트, 임베딩/KV캐시 최적화
- MTP(Multi-Token Prediction) 속도 향상을 양자화 후에도 보존

### 모바일 최적화 기법
- **정적 활성화**: 데이터 스케일을 학습 중 미리 계산 → 런타임 작업량 감소
- **채널별 양자화**: 모바일 가속기 구조에 맞춰 네이티브 계산 가능
- **선택적 2비트**: 덜 중요한 층은 2비트, 핵심 추론 층은 고정밀 유지
- **임베딩/KV캐시 최적화**: 메모리 집약 부분에 압축 집중

## See also

- [Gemma 4 QAT](/wiki/sources/gemma4-qat/) — Google 공식 QAT 체크포인트 발표
- [LiteRT-LM](/wiki/entities/litert-lm/) — Google 온디바이스 LLM 추론 런타임
- [autopenna](/wiki/entities/autopenna/) — 로컬 Gemma4 기반 모바일 앱
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 로컬 LLM 하네스 아키텍처
