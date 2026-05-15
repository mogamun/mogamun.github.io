---
title: agentmemory
created: 2026-05-12
updated: 2026-05-12
tags: [source, ai-agent, memory, mcp, claude-code, tool]
sources: [2026-05-12-agentmemory.md]
status: stable
category: sources
---

# agentmemory

## 개요
AI 코딩 에이전트를 위한 영구 메모리 시스템. Karpathy의 LLM Wiki 패턴에 confidence scoring, lifecycle, knowledge graphs, hybrid search를 결합한 구현체. iii engine 위에 구축.

## 핵심 내용

### 성능 지표
- 95.2% 검색 정확도 (R@5, LongMemEval-S, ICLR 2025)
- ~1,900 tokens/session (built-in CLAUDE.md의 22K+ 대비 92% 절감)
- $10/년 (로컬 임베딩 시 $0)
- 51 MCP tools, 12 auto hooks, 107 REST endpoints
- 827 테스트 통과

### 4-Tier Memory Consolidation
뇌의 기억 처리 모델에서 영감:

| Tier | 내용 | 비유 |
|------|------|------|
| Working | 도구 사용의 원시 관찰 | 단기 기억 |
| Episodic | 압축된 세션 요약 | "무슨 일이 있었는지" |
| Semantic | 추출된 사실과 패턴 | "내가 아는 것" |
| Procedural | 워크플로우와 결정 패턴 | "어떻게 하는지" |

Ebbinghaus 곡선 기반 자동 망각, 모순 감지, 자주 접근하는 기억 강화.

### Hybrid Search (BM25 + Vector + Graph)
세 가지 신호를 Reciprocal Rank Fusion (RRF, k=60)으로 결합:
- **BM25**: 어간 추출 키워드 매칭 + 동의어 확장 (항상 활성)
- **Vector**: 임베딩 코사인 유사도 (로컬 all-MiniLM-L6-v2 무료)
- **Graph**: 지식 그래프 엔티티 매칭 + BFS 순회

세션 다양성 보장 (세션당 최대 3개 결과).

### 지원 에이전트 (16개)
Claude Code (hooks+MCP+skills), OpenClaw, Hermes, Cursor, Gemini CLI, Codex CLI, OpenCode, Cline, Goose, Kilo Code, Aider (REST), Claude Desktop, Windsurf, Roo Code, Claude SDK, REST API. MCP 또는 HTTP를 말하는 모든 에이전트.

### Claude Code 통합
- 12 hooks: SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PostToolUseFailure, PreCompact, SubagentStart/Stop, Stop, SessionEnd
- 4 skills: /recall, /remember, /session-history, /forget
- 자동 메모리 캡처 → SHA-256 중복 제거 → 개인정보 필터 → LLM 압축 → 임베딩 → 인덱싱
- MEMORY.md와 양방향 동기화 (Claude bridge)

### iii engine
전통적 웹 스택을 3개 원시로 대체하는 런타임:
- Express.js/Fastify → iii HTTP Triggers
- SQLite/Postgres+pgvector → iii KV State + 인메모리 벡터 인덱스
- SSE/Socket.io → iii Streams (WebSocket)
- pm2/systemd → iii engine worker supervision
- Prometheus/Grafana → iii OTEL + health monitor

`iii worker add`로 pubsub, cron, queue, observability, sandbox, database, MCP 확장.

### Session Replay
- Claude Code JSONL 트랜스크립트 가져오기 (`import-jsonl`)
- Viewer에서 타임라인 스크러빙, play/pause, speed control (0.5x–4x)

## 원문 인용

> "Built-in memory (CLAUDE.md, .cursorrules) caps out at 200 lines and goes stale. agentmemory fixes this. It silently captures what your agent does, compresses it into searchable memory, and injects the right context when the next session starts."

> "118 source files, ~21,800 LOC, 800 tests, 123 functions, 34 KV scopes — all on three primitives. No agentmemory plugin install. The plugin system is iii itself."

## See also
- [agentmemory (엔티티)](/wiki/entities/agentmemory/) — 도구 정체 및 역할
- [iii Engine](/wiki/concepts/iii-engine/) — 기반 런타임 원시
- [Memory Consolidation Tiers](/wiki/concepts/memory-consolidation-tiers/) — 4-Tier 기억 모델
- [에이전트 메모리 접근법 비교](/wiki/comparisons/agent-memory-approaches/) — agentmemory vs mem0 vs Letta vs built-in
- [agentmemory 설정](/wiki/important/setup/agentmemory/) — 설치 가이드
- [Claude Code](/wiki/entities/claude-code/) — 12 hooks + MCP 통합
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/) — 메모리 패턴 진화
- [RAG](/wiki/sources/rag/) — 검색 증강 생성
- [LLM Wiki 패턴](/wiki/sources/0LLMWiki/wiki/sources/llm-wiki-pattern/) — Karpathy 원본 패턴
