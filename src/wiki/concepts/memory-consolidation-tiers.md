---
title: Memory Consolidation Tiers
created: 2026-05-12
updated: 2026-05-12
tags: [concept, ai-agent, memory, architecture, knowledge-management]
sources: [2026-05-12-agentmemory.md]
status: stable
category: concepts
---

# Memory Consolidation Tiers (4-Tier 기억 모델)

## 정의
인간 뇌의 기억 처리 과정에서 영감받은 AI 에이전트 메모리 계층화 모델. 원시 관찰을 점진적으로 압축·추상화하여 4개 티어로 구성.

## 핵심 원칙
- **점진적 추상화**: 원시 → 요약 → 사실 → 패턴으로 올라갈수록 추상화 수준 증가
- **시간 기반 감쇠**: Ebbinghaus 망각 곡선 적용. 자주 접근하는 기억은 강화, 유효 기간 만료 시 자동 제거
- **모순 해결**: 새 관찰이 기존 기억과 충돌하면 자동 감지·해결
- **토큰 예산**: 각 티어에서 가져오는 컨텍스트에 예산(기본 2000 tokens) 할당

## 4개 티어

| Tier | 내용 | 비유 | 저장 시점 |
|------|------|------|-----------|
| **Working** | 도구 사용의 원시 관찰 (tool name, input, output) | 단기 기억 | PostToolUse hook |
| **Episodic** | 압축된 세션 요약 ("무슨 일이 있었는지") | 에피소드 기억 | Stop/SessionEnd hook |
| **Semantic** | 추출된 사실과 패턴 ("내가 아는 것") | 의미 기억 | LLM 압축 후 |
| **Procedural** | 워크플로우와 결정 패턴 ("어떻게 하는지") | 절차 기억 | 패턴 감지 후 |

## 파이프라인

```
PostToolUse → SHA-256 중복 제거 → 개인정보 필터
  → Working Memory (원시 관찰 저장)
  → LLM 압축 → Semantic Memory (사실/패턴 추출)
  → 임베딩 → BM25 + Vector 인덱스

Stop/SessionEnd → 세션 요약
  → Episodic Memory (요약 저장)
  → 지식 그래프 추출 (선택)
  → Slot reflection (선택)

SessionStart → 프로젝트 프로필 로드
  → Hybrid search (BM25 + Vector + Graph)
  → 토큰 예산 내 컨텍스트 주입
```

## 인간 기억과의 대응

| 인간 기억 | AI 에이전트 | 처리 |
|-----------|------------|------|
| 감각 기억 (밀리초) | Hook 이벤트 (실시간) | SHA-256 dedup |
| 단기 기억 (초-분) | Working Memory | 5분 윈도우 |
| 장기 기억 — 에피소드 | Episodic Memory | 세션 종료 시 압축 |
| 장기 기억 — 의미 | Semantic Memory | LLM 추출 |
| 장기 기억 — 절차 | Procedural Memory | 패턴 감지 |
| 수면 중 통합 | Stop/SessionEnd 훅 | 세션 간 압축 |

## 효과
- **토큰 절감**: 240개 관찰 시 built-in은 22K+ 토큰, 4-Tier는 ~1,900 토큰 (92% 절감)
- **검색 정확도**: LongMemEval-S R@5 95.2%
- **자동 망각**: 중요도 기반 제거 + TTL 만료로 컨텍스트 오염 방지

## See also
- [agentmemory](/wiki/entities/agentmemory/) — 이 모델의 구현체
- [agentmemory 소스](/wiki/sources/agentmemory/) — 파이프라인 상세
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/) — 파일 기반 메모리 패턴
- [RAG](/wiki/concepts/rag/) — 검색 증강 생성
- [컨텍스트 로트 방지](/wiki/concepts/context-rot-prevention/) — 토큰 관리
- [지식 저장소 진화](/wiki/concepts/knowledge-repository-evolution/) — 지식 관리 역사
