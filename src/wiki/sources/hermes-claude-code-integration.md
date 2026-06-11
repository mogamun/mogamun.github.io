---
title: Hermes Agent × Claude Code MCP 연동 실전 가이드
created: 2026-06-11
updated: 2026-06-11
tags: [source, hermes-agent, claude-code, mcp, integration, nous-research, openclaw, skill-system]
sources: [2026-06-11-hermes-claude-code-integration.md]
status: stable
category: sources
---

# Hermes Agent × Claude Code MCP 연동 실전 가이드

## 개요

Hermes Agent를 MCP 서버로 실행하여 Claude Code와 양방향 연동하는 방법과 실전 활용 사례. Hermes의 자가 진화 스킬 시스템 + Claude Code의 코딩 능력을 결합하여 Slack PRD 자동화, 배포 앱 헬스체크 등 비즈니스 워크플로우를 구축하는 과정을 다룸.

## 핵심 내용

### Hermes가 OpenClaw보다 우수한 두 가지

1. **Persistent Memory (지속 메모리)**: user.md/memory.md에 토큰 리미트 설정 → 한도 도달 시 모델이 불필요한 정보 자동 삭제 → 최신 정보 유지. OpenClaw는 메모리 무한 증가로 컨텍스트 오염 발생.
2. **Self-Improving Skills (자가 개선 스킬)**: 대화에서 재사용 가능한 워크플로우 발견 → 자동으로 스킬 변환 → 사용 중 개선 → Curator가 정리. OpenClaw는 네이티브 자가 진화 없음.

### 추가 차별점
- **샌드박스 기본 제공**: Hermes는 격리 환경에서 실행. OpenClaw는 수동 샌드박스 설정 필요
- **스킬 허브 보안 스캔**: 각 스킬에 자동 보안 검사. OpenClaw 스킬은 위험한 프롬프트/데이터 유출 스크립트 포함 사례 다수
- **기본 90개 스킬**: 조직에서 직접 유지관리하여 보안 보장

### Anthropic 6월 15일 정책 변경

| 날짜 | 이벤트 |
|------|--------|
| 2026-04-04 | 서드파티 에이전트(OpenClaw 등) Claude 구독 사용 금지 |
| 2026-05-13~14 | 부분 철회, 새 결제 모델 발표 |
| 2026-06-15 | Agent SDK + `claude -p`(non-interactive mode) 구독 풀에서 분리. Pro $20 API 크레딧, Max 5x $100 할당 |

→ 6월 15일 이후 Claude 구독으로 Hermes 무료 실행 불가. 별도 API 크레딧 소비. **6월 15일 전까지 window of opportunity**.

### Hermes를 MCP 서버로 실행

핵심 아키텍처: **Hermes = MCP 서버** → Claude Code가 Hermes의 모든 기능에 접근

```
Claude Code ←→ MCP ←→ Hermes Agent ←→ Slack/Discord/앱들
```

- 실행: `hermes mcp serve` (터미널 출력 없지만 서버 실행 중)
- 연결: `.mcp.json`에 Hermes MCP 추가
- 스코프: 프로젝트 스코프(해당 프로젝트만) 또는 글로벌 스코프(전체 프로젝트)
- Claude Code가 Hermes의 메모리, 스킬, 연결된 모든 앱에 접근 가능
- 각 앱을 개별적으로 에이전트에 연결할 필요 없이 Hermes 경유로 통합 접근

### 실전 워크플로우 1: Slack PRD 스킬 자동화

1. 팀 Slack 채널에 프로젝트 전용 채널 생성
2. Hermes에 크론잡 생성 요청 → 특정 채널 모니터링
3. 채널에서 논의되는 요구사항 → PRD 스킬로 자동 컴파일
4. 30분마다 크론잡 실행 → 요구사항 변경 시 PRD 업데이트
5. Claude Code에서 개발 시 관련 PRD 부분이 컨텍스트에 주입됨
6. 변경사항 양방향 동기화 (Hermes ↔ 로컬 프로젝트)

**왜 MCP 직접 연결이 아닌 Hermes 경유인가?**: Slack MCP는 전체 대화 히스토리를 읽을 수 없고 태그된 메시지만 읽음. Hermes는 직접 동기화 가능.

**왜 스킬인가?**: PRD를 파일로 두면 컨텍스트 윈도우에서 노이즈가 됨. 스킬은 필요할 때만 호출되어 "fresh part of the context window"에 위치.

### 실전 워크플로우 2: 배포 앱 헬스체크

1. Claude Code로 빌드한 앱 배포
2. 모니터링/헬스체크용 스킬 생성 (Claude Code가 앱 구조를 가장 잘 알음)
3. 스킬을 Hermes에 임포트
4. 크론잡으로 스케줄 설정 → 앱 + 코드 동시 모니터링
5. 이슈 발견 시 → 로컬 프로젝트에 스킬 동기화 → Claude Code도 컨텍스트 유지
6. 스킬이 실행될 때마다 자가 개선 → "매번 더 나아지는 헬스체크"

### Second Brain 온보딩

개인 에이전트 설정 시 두 가지 옵션:
1. 한 달간 사용하며 자동 학습
2. Second Brain vault 경로 제공 → Hermes가 직접 온보딩 → 사용자 정보 학습

### OpenClaw 마이그레이션 주의사항

- Hermes는 OpenClaw 설정 임포트 지원 (user profile, credentials, skills, soul file)
- **하지만 권장하지 않음**: 로그인 정보가 같은 채널을 가리키고, OpenClaw용으로 작성된 명령어가 호환되지 않음
- 깔끔한 시작 추천

## 원문 인용

> "You can run your own Hermes setup as an MCP server itself and connect it to your other agents, letting them reach Hermes through tools so the communication goes both ways."

> "A skill gets called whenever it's needed and stays in the fresh part of the context window where the model is actually paying attention."

> "Claude code on its own doesn't remember anything about you and its skills don't fix or improve themselves. But through this MCP connection, you can give it access to everything Hermes can do."

> "Once Hermes hits the token limit on the files, the model goes through them and cuts out anything that isn't useful. It holds the newest information in memory, so the agent isn't distracted by old details you don't need anymore. Open Claw doesn't do any of this. It just lets the memory keep growing."

## See also
- [Hermes Agent](/wiki/entities/hermes-agent/)
- [Hermes Agent X Codex 실전 설정](/wiki/sources/hermes-codex-setup/)
- [Hermes Agent 독스 기반 기술 리뷰](/wiki/sources/hermes-agent-review-beomsu/)
- [OpenClaw vs Hermes 한달 실전 비교](/wiki/sources/zerocho-openclaw-vs-hermes/)
- [Hermes Agent + Claude Code 워크플로우](/wiki/important/workflows/hermes-claude-code-workflow/)
- [Hermes Agent 설정 가이드](/wiki/important/setup/hermes-agent-setup/)
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — "하네스 간 통신" 패턴
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/) — 스킬 자가 진화 메커니즘
- [루프 엔지니어링](/wiki/concepts/loop-engineering/) — 크론잡 기반 루프 실전 구현
- [MCP Protocol](/wiki/entities/mcp-protocol/) — MCP의 에이전트 간 통신 브릿지 역할
