---
title: agentmemory
created: 2026-05-12
updated: 2026-05-12
tags: [entity, tool, ai-agent, memory, mcp, npm, open-source]
sources: [2026-05-12-agentmemory.md]
status: stable
category: entities
---

# agentmemory

## 정체
- **Type**: AI 코딩 에이전트용 영구 메모리 엔진 + MCP 서버
- **Developer**: rohitg00 (오픈소스)
- **Install**: `npx @agentmemory/agentmemory`
- **License**: Apache-2.0
- **Built on**: iii engine (v0.11.2)

## 역할
에이전트의 세션 간 기억 상실 문제를 해결. PostToolUse hooks로 도구 사용을 자동 캡처, LLM으로 압축, BM25+Vector+Graph 하이브리드 검색으로 다음 세션에 관련 컨텍스트 주입. 16개 에이전트(Claude Code, Cursor, Gemini CLI, pi, Hermes 등)에서 동일 메모리 공유.

## 핵심 기능
- **12 auto hooks**: SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PostToolUseFailure, PreCompact, SubagentStart/Stop, Stop, SessionEnd — 제로 마찰 캡처
- **51 MCP tools**: memory_smart_search, memory_save, memory_sessions, memory_governance_delete 등. core(8) 또는 all(51) 선택
- **4 skills**: /recall, /remember, /session-history, /forget
- **107 REST endpoints**: 포트 3111, 127.0.0.1 바인딩
- **Session Replay**: Claude Code JSONL 트랜스크립트 import + 타임라인 재생
- **Real-time Viewer**: 포트 3113, 라이브 관찰 스트림 + 지식 그래프 시각화
- **Claude bridge**: MEMORY.md와 양방향 동기화

## 성능
- LongMemEval-S (ICLR 2025): R@5 95.2%, R@10 98.6%, MRR 88.2%
- 토큰 효율: ~1,900 tokens/session ($10/yr, 로컬 임베딩 시 $0)
- built-in CLAUDE.md 대비 92% 토큰 절감

## iii engine 기반
전통적 스택(Express, SQLite, SSE, pm2, Prometheus)을 3개 원시로 대체:
- **Functions**: 비즈니스 로직 (123개)
- **Triggers**: HTTP, cron, event, state (34 KV scopes)
- **KV State + Streams**: 상태 관리 + WebSocket

`iii worker add`로 pubsub, cron, queue, observability, sandbox, database 확장.

## 경쟁 도구

| | agentmemory | mem0 (53K⭐) | Letta/MemGPT (22K⭐) | Built-in |
|---|---|---|---|---|
| R@5 | 95.2% | 68.5% | 83.2% | N/A |
| 자동 캡처 | 12 hooks | 수동 add() | 에이전트 자가편집 | 수동 |
| 외부 의존 | 없음 | Qdrant/pgvector | Postgres+vectorDB | 없음 |

## 관련 프로젝트/맥락
- **Claude Code**: 12 hooks + MCP + skills 통합. `/plugin install agentmemory`
- **Pi**: integrations/pi 확장 지원
- **Hermes Agent**: MCP + plugin 통합
- **이 LLM Wiki**: Karpathy LLM Wiki 패턴의 실제 구현체로, 이 위키와 같은 기반 철학 공유

## Relevance
이 위키의 기반 철학(LLM Wiki 패턴)의 실제 구현체. 파일 기반 지식 → 구조화된 메모리 → 하이브리드 검색이라는 진화 방향을 실증.

## See also
- [agentmemory 소스](/wiki/sources/agentmemory/) — 상세 기능 분석
- [iii Engine](/wiki/concepts/iii-engine/) — 기반 런타임
- [Memory Consolidation Tiers](/wiki/concepts/memory-consolidation-tiers/) — 4-Tier 기억 모델
- [에이전트 메모리 접근법 비교](/wiki/comparisons/agent-memory-approaches/) — 경쟁사 비교
- [agentmemory 설정](/wiki/important/setup/agentmemory/) — 설치 가이드
- [Claude Code](/wiki/entities/claude-code/) — hooks + MCP 통합
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/) — 메모리 패턴
- [MCP 프로토콜](/wiki/entities/mcp-protocol/) — MCP 서버로서의 역할
- [Pi](/wiki/entities/pi/) — 지원 에이전트
- [Hermes Agent](/wiki/entities/hermes-agent/) — 지원 에이전트
