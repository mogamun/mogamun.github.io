---
title: 에이전트 메모리 접근법 비교
created: 2026-05-12
updated: 2026-05-12
tags: [comparison, ai-agent, memory, mcp, knowledge-management]
sources: [2026-05-12-agentmemory.md]
status: stable
category: comparisons
---

# 에이전트 메모리 접근법 비교

## 비교 대상
- **agentmemory**: 메모리 엔진 + MCP 서버 (iii engine 기반)
- **mem0** (53K ⭐): 메모리 레이어 API
- **Letta / MemGPT** (22K ⭐): 에이전트 런타임
- **Built-in** (CLAUDE.md, .cursorrules, memory bank): 정적 파일

## 공통점
- 모두 AI 에이전트의 세션 간 기억 상실 문제를 해결하려 함
- LLM의 컨텍스트 창 한계를 인식하고 압축/검색 전략 사용
- 개발자가 매 세션마다 동일한 맥락을 재설명하는 비용 절감 목표

## 차이점

### 아키텍처

| | agentmemory | mem0 | Letta/MemGPT | Built-in |
|---|---|---|---|---|
| **타입** | 메모리 엔진 + MCP | API 레이어 | 에이전트 런타임 | 정적 파일 |
| **기반** | iii engine (Rust) | Python | Python | 텍스트 파일 |
| **외부 의존** | 없음 (SQLite+iii) | Qdrant/pgvector | Postgres+vectorDB | 없음 |
| **프레임워크 종속** | 없음 (모든 MCP) | 없음 | 높음 (Letta 필수) | 에이전트별 |

### 성능

| | agentmemory | mem0 | Letta/MemGPT | Built-in |
|---|---|---|---|---|
| **R@5** | 95.2% | 68.5% | 83.2% | N/A (grep) |
| **토큰/세션** | ~1,900 | 가변 | 코어 메모리 전체 | 22K+ (240 obs) |
| **비용/년** | $10 (로컬 시 $0) | 가변 | 가변 | 무료 (비효율) |

### 메모리 관리

| | agentmemory | mem0 | Letta/MemGPT | Built-in |
|---|---|---|---|---|
| **자동 캡처** | 12 hooks (무입력) | 수동 add() | 에이전트 자가편집 | 수동 편집 |
| **검색** | BM25+Vector+Graph (RRF) | Vector+Graph | Vector (archival) | 전체 로드 |
| **수명 주기** | 4-Tier + decay + auto-forget | 수동 추출 | 에이전트 관리 | 수동 정리 |
| **멀티 에이전트** | MCP+REST+leases+signals | API (조정 없음) | Letta 런타임 내만 | 에이전트별 파일 |

### 개발자 경험

| | agentmemory | mem0 | Letta/MemGPT | Built-in |
|---|---|---|---|---|
| **시작 명령** | `npx @agentmemory/agentmemory` | `pip install mem0ai` | `pip install letta` | 파일 생성 |
| **셀프 호스티드** | 기본 | 선택 | 선택 | 기본 |
| **실시간 뷰어** | 있음 (:3113) | 클라우드 대시보드 | 클라우드 대시보드 | 없음 |
| **세션 리플레이** | JSONL import + 타임라인 | 없음 | 없음 | 없음 |

## 선택 기준

| 상황 | 추천 | 이유 |
|------|------|------|
| Claude Code 중심 개발 | agentmemory | 12 hooks 자동 캡처, 51 MCP tools |
| 다중 에이전트 환경 | agentmemory | MCP+REST+leases로 조정 |
| 이미 Letta 사용 중 | Letta/MemGPT | 런타임 통합 |
| 최소 설치 | Built-in | 파일만 있으면 됨 |
| API 기반 메모리 필요 | mem0 | REST API 레이어 |
| 토큰 비용 민감 | agentmemory + 로컬 임베딩 | $0/년 |

## 핵심 통찰
메모리 시스템의 차이는 **캡처 방식**(수동 vs 자동)과 **검색 방식**(전체 로드 vs 선택적 검색)에서 가장 두드러짐. agentmemory의 hooks 기반 자동 캡처 + 하이브리드 검색 조합이 토큰 효율과 검색 정확도 모두에서 우위.

## See also
- [agentmemory](/wiki/entities/agentmemory/) — 메모리 엔진 상세
- [agentmemory 소스](/wiki/sources/agentmemory/) — 기능 분석
- [Memory Consolidation Tiers](/wiki/concepts/memory-consolidation-tiers/) — 4-Tier 모델
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/) — Built-in 메모리 패턴
- [RAG](/wiki/concepts/rag/) — 검색 증강 생성
- [Claude Code](/wiki/entities/claude-code/) — hooks + MCP 생태계
