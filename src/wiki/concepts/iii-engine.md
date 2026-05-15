---
title: iii Engine
created: 2026-05-12
updated: 2026-05-12
tags: [concept, runtime, architecture, tool]
sources: [2026-05-12-agentmemory.md]
status: stable
category: concepts
---

# iii Engine

## 정의
웹 애플리케이션의 전통적 스택(HTTP 서버, 데이터베이스, 실시간 통신, 프로세스 관리, 모니터링)을 3개 원시(Functions, Triggers, KV State)로 통합하는 런타임. Rust 바이너리로 배포.

## 핵심 원칙
- **3개 원시로 전체 스택 대체**: Functions(로직) + Triggers(이벤트) + KV State(상태) + Streams(실시간)
- **Workers로 확장**: `iii worker add <name>` 한 명령어로 새 기능 추가
- **플러그인 시스템이 곧 런타임**: 별도 플러그인 인프라 없이, worker 추가가 곧 확장
- **내장 관측 가능성**: OpenTelemetry traces, metrics, logs가 기본 활성화

## 전통적 스택 매핑

| 전통 | iii 원시 |
|------|----------|
| Express.js / Fastify | HTTP Triggers |
| SQLite / Postgres + pgvector | KV State + 인메모리 벡터 인덱스 |
| SSE / Socket.io | Streams (WebSocket) |
| pm2 / systemd | Engine worker supervision |
| Prometheus / Grafana | OTEL + health monitor |
| Custom plugin systems | `iii worker add` |

## Workers (확장 생태계)

| Worker | 기능 |
|--------|------|
| iii-pubsub | 멀티 인스턴스 메모리 팬아웃 |
| iii-cron | 예약 작업 (야간 통합, 주간 스냅샷) |
| iii-queue | 내구성 큐 + dead-letter 관리 |
| iii-observability | OTEL traces/metrics/logs (기본 활성화) |
| iii-sandbox | 격리된 microVM에서 코드 실행 |
| iii-database | SQL 백엔드 상태 어댑터 |
| mcp | 범용 MCP 호스트 |

## iii Console
엔진의 모든 원시를 시각화하는 관리 콘솔:
- Workers: 연결된 워커 + 라이브 메트릭
- Functions: JSON 페이로드로 직접 호출
- Triggers: HTTP/cron/event/state 트리거 재생
- States: KV 브라우저 (CRUD)
- Streams: WebSocket 실시간 모니터
- Queues: 큐 토픽 + dead-letter 관리
- Traces: OTEL waterfall/flame/service-breakdown
- Flow: (실험적) 아키텍처 그래프

## 적용 사례
- **agentmemory**: 118 소스 파일, ~21,800 LOC, 123 함수, 34 KV scopes가 iii 원시 3개 위에 구축. Express/SQLite/pm2/Prometheus 없이 완전한 메모리 엔진 구현

## 본질
iii engine의 핵심 통찰은 "플러그인 시스템이 곧 런타임"이라는 것. 별도의 플러그인 API나 후크가 아니라, 런타임 자체가 확장 가능. `iii worker add`는 새 바이너리 설치가 아니라 같은 엔진에 새 함수와 트리거를 등록하는 것.

## See also
- [agentmemory](/wiki/entities/agentmemory/) — iii engine 위에 구축된 메모리 엔진
- [agentmemory 소스](/wiki/sources/agentmemory/) — iii engine 활용 상세
- [MCP 프로토콜](/wiki/entities/mcp-protocol/) — MCP 서버로서의 iii
- [에이전트 메모리 접근법 비교](/wiki/comparisons/agent-memory-approaches/) — 메모리 시스템 비교
