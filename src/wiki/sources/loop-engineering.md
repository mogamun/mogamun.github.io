---
title: "루프 엔지니어링 (Loop Engineering)"
created: 2026-06-10
updated: 2026-06-10
tags: [source, loop-engineering, ai-agent, automation, worktree, skills, mcp, sub-agents, memory, claude-code, codex]
sources: [2026-06-10-loop-engineering.md]
status: stable
category: sources
---

# 루프 엔지니어링 (Loop Engineering)

## 개요
Google 엔지니어 Addy Osmani가 2026-06-07에 발표한 "Loop Engineering" 개념 정리. 직접 프롬프트하는 시대에서 루프를 설계하는 시대로의 패러다임 전환. Claude Code와 Codex 모두가 지원하는 5개 프리미티브 + 1개 메모리 모델.

## 핵심 내용

### 패러다임 전환
- **기존**: 프롬프트 → 응답 → 프롬프트 (인간이 매턴 제어)
- **루프**: 목적 정의 → AI가 자가 반복 → 완료 시 종료 (인간은 설계만)
- Peter Steinberger: "코딩 에이전트에게 프롬프트하지 마라. 에이전트에게 프롬프트하는 루프를 설계하라"
- Boris Cherny (Claude Code 책임자): "나는 더 이상 Claude에게 프롬프트하지 않는다. 루프가 Claude에게 프롬프트한다. 내 일은 루프를 짜는 것"

### 5+1 모델

| 프리미티브 | 역할 | Codex | Claude Code |
|-----------|------|-------|-------------|
| **Automations** | 발견+트리아지 | Automations 탭, cadence 설정 | `/loop`, cron, hooks, GitHub Actions |
| **Worktrees** | 병렬 격리 | 내장 worktree | `git worktree`, `--worktree`, `isolation: worktree` |
| **Skills** | 프로젝트 지식 외부화 | `SKILL.md`, `$name` 호출 | `SKILL.md`, 암시적 매칭 |
| **Connectors** | 실제 도구 연결 | MCP + plugins | MCP servers + plugins |
| **Sub-agents** | 생성/검증 분리 | `.codex/agents/` TOML | `.claude/agents/`, agent teams |
| **State(Memory)** | 진행 상태 추적 | Markdown / Linear | `AGENTS.md`, progress files, Linear MCP |

### Automations — 루프의 심장박동
- 이게 빠지면 "한 번 실행"일 뿐 루프가 아님
- 크론, 훅, 스케줄, GitHub Actions가 스스로 시동
- 찾으면 인박스로, 못 찾으면 자동 아카이브 → 노이즈 차단

### /loop vs /goal — 멈추는 방식
- **/loop**: 시간 기반. 멈춤 없이 주기마다 재실행
- **/goal**: 검증 기반. 조건이 참이 될 때까지 반복. 매턴 별도 작은 모델이 종료 판정
- 종료 조건은 반드시 기계 검증 가능해야 함: "코드 깔끔하게" ✗ → "린트 에러 0, 테스트 전부 통과" ○

### Worktrees — 병렬의 전제
- 에이전트 2개 이상 시 파일 충돌 = 동일 줄 커밋 사고
- Git worktree: 히스토리 공유 + 디렉토리/브랜치 분리
- 직렬이면 불필요, 병렬이면 필수
- **진짜 한계는 도구가 아닌 사람**: 리뷰 대역폭이 실제 한계

### Skills — 맥락의 외부화
- 에이전트는 매번 차갑게 시작 → 빈틈을 추측으로 메움
- 스킬 = 의도를 바깥에 적어둔 것 (관례, 빌드 단계, "이렇게 안 한 이유")
- 스킬이 루프를 거듭하며 compound(누적)됨
- 스킬 = 작성 포맷, 플러그인 = 배포 방식

### Connectors — 루프를 실제 환경에 연결
- 파일시스템만 보는 루프 = 작은 루프
- MCP 기반: 이슈 트래커, DB, 스테이징 API, Slack
- "여기 고치면 됩니다" vs PR 열고 티켓 연결하고 CI 초록 시 핑 → 완전히 다름

### Sub-agents — 만드는 쪽과 검증하는 쪽 분리
- 코드 작성 모델은 자기 숙제를 관대하게 채점
- 다른 지시/다른 모델의 두 번째 에이전트가 검증
- 흔한 구성: 탐색(빠른 모델) → 구현 → 검증(강한 모델)
- 토큰 소모 크므로 "두 번째 의견이 가치 있는 곳"에만 사용

### Memory — 디스크 기반 상태
- 상태 = 대화가 아닌 디스크
- 컨텍스트는 터지고, 길어질수록 품질 저하
- 세션 간 연속성의 유일한 통로
- "에이전트는 잊어도 리포는 잊지 않는다"

### 실전 사례: OpenClaw Claude Whisperer
- 루프 엔지니어링을 거의 글자 그대로 구현
- 매주 전체 PR/이슈 스캔, 50개 Codex 24시간 병렬
- 리뷰 시 쓰기 권한 0, 적용 시에만 재확인
- 누적 3,000건 추적, ~4,000건 클로즈

### 루프의 역설 — 매끄러울수록 더 어려워짐
1. **검증은 여전히 인간 몫**: 무인 루프 = 무인 실수
2. **Comprehension Debt**: 루프가 빠를수록 안 읽은 코드가 빠르게 쌓임
3. **Cognitive Surrender**: 루프가 알아서 한다는 핑계로 판단 중단
4. **토큰 비용**: 무제한 토큰이 아닌 사용자에게 실제 비용 문제

## 원문 인용

> "프롬프트 하지 마세요. 프롬프트 하는 루프를 설계하세요."

> "에이전트는 매번 차갑게 시작합니다. 빈틈을 자신만의 추측으로 메우죠. 스킬은 그 의도를 바깥에 한번 적어 둔 겁니다."

> "천장은 도구가 아니라 나 자신입니다. 에이전트 10개는 기술적으로 가능하지만 10개 PR을 읽고 믿을지 판단하는 건 사람입니다."

> "같은 루프 두 사람 정반대 결과. 그 차이는 사람이 만듭니다."

> "루프를 만드세요. 그리고 엔지니어로 남으세요."

## See also

- [루프 엔지니어링 개념](/wiki/concepts/loop-engineering/) — 5+1 모델의 개념적 분석
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 루프 엔지니어링의 하위 레이어. 하네스가 단일 에이전트 환경, 루프는 타이머+병렬+자가급식
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/) — 루프 내 학습 사이클의 구체적 메커니즘
- [Claude Code Hooks](/wiki/concepts/claude-code-hooks/) — Automations 프리미티브의 Claude Code 구현
- [Agent Teams](/wiki/concepts/agent-teams/) — Sub-agents 프리미티브의 Claude Code 구현
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/) — State(Memory) 프리미티브의 원칙
- [AI 스킬 신뢰성](/wiki/concepts/ai-skill-trust/) — Skills 프리미티브와 연결
- [검증 주도 개발](/wiki/concepts/verification-driven-development/) — 종료 조건의 기계 검증 원칙
- [컨텍스트 로트 방지](/wiki/concepts/context-rot-prevention/) — 메모리를 디스크에 두는 이유
- [간결성-정확성 트레이드오프](/wiki/concepts/brevity-accuracy-tradeoff/) — 토큰 비용 관리
