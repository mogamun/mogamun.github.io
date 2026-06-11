---
title: Closed Learning Loop (클로즈 루프 학습)
created: 2026-05-04
updated: 2026-05-06
tags: [concept, ai-agent, self-improving, learning-loop, hermes-agent]
sources: [2026-05-04-hermes-agent-review-beomsu.md, 2026-05-06-hermes-agent-github-update.md]
status: stable
category: concepts
---

# Closed Learning Loop (클로즈 루프 학습)

## 정의
AI 에이전트가 작업 경험에서 자동으로 학습하고, 학습 결과를 다음 작업에 활용하는 자가 강화 순환 구조. 모델 가중치 업데이트 없이 메모리·스킬·회상을 통해 에이전트가 지속 개선되는 메커니즘.

## 핵심 원칙

### 5단계 루프 (v0.12.0 Curator 업데이트)
1. **경험**: 에이전트가 복잡한 작업을 수행
2. **스킬 생성**: 작업 완료 후 자동으로 재사용 가능 스킬 생성
3. **스킬 개선**: 스킬 사용 중 피드백 기반 자동 개선 (루브릭 기반 분류, 활성 업데이트 편향)
4. **큐레이션**: 자율 Curator가 7일 주기로 스킬 라이브러리 등급/정리/가지치기 (v0.12.0 추가)
5. **지식 영속화**: FTS5로 세션 간 회상, 메모리에 핵심 지식 저장

> v0.12.0의 Curator는 "엔트로피 문제"에 대한 구조적 해답. 스킬이 무한정 쌓이는 것을 방지하고, 사용 빈도와 품질 기반으로 자동 정리. `hermes curator status`로 사용량 순위 확인 가능.

### 모델 가중치 vs 지식 축적
- 모델 가중치 업데이트는 불가능 (API 기반)
- 대신 메모리(MEMORY.md, USER.md)와 스킬로 지식 축적
- "모든 정보는 엔트로피가 높아지는 방향" → 오래된 지식의 유용성 저하 문제
- 정기적 요약·압축으로 엔트로피 관리 필요

### 다른 에이전트와의 비교
- Claude Code: 코딩에 국소적, 명시적 스킬 업데이트 필요
- OpenClaw: 수동 설정 기반, 자동 스킬 생성 없음
- Hermes: 러닝 루프가 기본 내장, 자동 스킬 생성·개선

## 적용 사례
- **Hermes Agent**: 클로즈 루프가 코어 기능. 경험→스킬→개선→회상 순환
- **Claude Code memory/CLAUDE.md**: 동일 패턴이지만 수동+반자동
- **Compounding Artifact**: 클로즈 루프가 compounding의 구체적 메커니즘

## 엔트로피 문제
> "세상 모든 것은 엔트로피가 높아지는 방향으로 무질서해진다. 옛날 정보가 쓸모가 없어질 수 있는데 이걸 계속 기억해야 되나?"

해결 방법: 컨텍스트 압축, 메모리 큐레이션, 스킬 버전 관리. DeepSeek V4의 sparse attention 등 모델 차원의 해결도 언급됨.

## See also
- [Hermes Agent](/wiki/entities/hermes-agent/)
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/)
- [Compounding Artifact](/wiki/concepts/compounding-artifact/)
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/)
- [컨텍스트 로트 방지](/wiki/concepts/context-rot-prevention/)
- [Hermes Agent 독스 기반 기술 리뷰](/wiki/sources/hermes-agent-review-beomsu/)
- [루프 엔지니어링](/wiki/concepts/loop-engineering/) — 학습 루프를 포함하는 상위 패러다임
