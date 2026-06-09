---
title: LiteRT-LM
created: 2026-06-08
updated: 2026-06-08
tags: [entity, tool, google, on-device, llm, runtime, mobile, edge]
sources: [2026-06-06-gemma4-qat.md]
status: stable
category: entities
---

# LiteRT-LM

## 정체
- **Type**: 온디바이스 LLM 추론 프레임워크
- **Developer**: Google AI Edge
- **Base**: LiteRT (구 TensorFlow Lite)
- **License**: 오픈소스
- **Repo**: https://github.com/google-ai-edge/LiteRT-LM

## 역할

Google의 프로덕션급 경량 LLM 런타임. Gemma 4 모델을 Android, Chrome, iOS 등 에지 기기에서 고성능으로 실행하기 위해 설계. 모바일 양자화 스키마에 최적화된 Gemma 4 E2B/E4B 모델을 직접 배포 가능.

## 핵심 기능

| 기능 | 설명 |
|------|------|
| **MTP 드래프터** | Multi-Token Prediction 지원 → 최대 2.2배 추론 가속 |
| **크로스플랫폼** | Android, Chrome, iOS 지원 |
| **Go 바인딩** | litertlm-go — Go 앱에서 로컬 추론 + 툴 콜링 |
| **Gemma 4 최적화** | E2B/E4B 모바일 포맷 네이티브 지원 |

## 관련 프로젝트/맥락

- **Gemma 4 QAT**: LiteRT-LM이 타겟 런타임. E2B 텍스트 전용 <1GB로 동작
- **Transformers.js**: 브라우저 내 실행 대안

## See also

- [Gemma 4 QAT](/wiki/sources/gemma4-qat/) — QAT 체크포인트 + LiteRT-LM 배포
- [QAT 개념](/wiki/concepts/quantization-aware-training/) — 양자화 인식 학습 원리
