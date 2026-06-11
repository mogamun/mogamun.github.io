---
title: 루프 엔지니어링 (Loop Engineering)
created: 2026-06-10
updated: 2026-06-10
tags: [concept, loop-engineering, ai-agent, automation, worktree, skills, mcp, sub-agents, memory, paradigm-shift]
sources: [2026-06-10-loop-engineering.md]
status: stable
category: concepts
---

# 루프 엔지니어링 (Loop Engineering)

## 정의
직접 프롬프트하는 것을 넘어, AI 에이전트가 자율적으로 반복 실행하는 "루프"를 설계하는 패러다임. 5개 프리미티브(Automations, Worktrees, Skills, Connectors, Sub-agents) + 1개 기억(Memory)으로 구성. Claude Code와 Codex 모두 동일 구조 지원.

## 핵심 원칙

### 1. 프롬프트 → 루프 전환
인간이 매턴 제어하던 모델에서, 목적만 정의하면 AI가 완료될 때까지 자가 반복하는 시스템으로. Claude Code 책임자(Boris Cherny): "내 일은 루프를 짜는 것". 핵심은 난이도가 아닌 레버리지 이동.

### 2. 하네스 위의 루프
LLM + Harness 모델의 한 단계 위. 하네스가 단일 에이전트의 실행 환경이라면, 루프는 타이머가 달리고 병렬 헬퍼를 생성하며 스스로 자원을 공급받는 공장 모델.

### 3. 종료 조건의 기계 검증 가능성
"코드 깔끔하게" 같은 주관적 조건은 루프에서 의미 없음. "린트 에러 0, 모든 테스트 통과"처럼 기계가 판정 가능한 조건만이 유효한 종료 조건.

### 4. 생성자와 검증자의 분리
코드를 작성한 모델은 자기 작업물을 관대하게 평가. 다른 지시/다른 모델의 에이전트가 독립 검증해야 신뢰 가능. 무인 루프에서 검증자 신뢰성이 "자리 비움"의 유일한 근거.

### 5. 디스크 기반 상태
대화 컨텍스트가 아닌 파일시스템에 상태 저장. 컨텍스트는 길어질수록 품질 저하, 세션 간 연속성 필요. "에이전트는 잊어도 리포는 잊지 않는다."

## 루프의 역설

루프가 매끄러울수록 세 가지 문제가 가속됨:

1. **Comprehension Debt (이해 부채)**: 루프가 빠를수록 내가 읽지 않은 코드가 빠르게 누적
2. **Cognitive Surrender (인지적 항복)**: 루프가 알아서 한다는 핑계로 판단 중단
3. **Verification Burden (검증 부담)**: 무인 루프 = 무인 실수. 검증은 여전히 인간의 몫

> 같은 루프를 두 사람이 사용해도 정반대 결과가 나올 수 있음. 한 사람은 이해를 깊게 한 작업에 가속을 얻고, 다른 사람은 이해를 회피하는 데 사용. 루프는 차이를 모름. 사람이 안다.

## Codex vs Claude Code — 같은 형태, 다른 이름

| 프리미티브 | Codex | Claude Code |
|-----------|-------|-------------|
| Automations | Automations 탭, cadence | `/loop`, cron, hooks, GitHub Actions |
| Worktrees | 내장 | `--worktree`, `isolation: worktree` |
| Skills | `$name` 호출 | 암시적 매칭 |
| Connectors | MCP + plugins | MCP servers + plugins |
| Sub-agents | `.codex/agents/` TOML | `.claude/agents/`, agent teams |
| State | Markdown / Linear | `AGENTS.md`, Linear MCP |

형태가 같으므로 "어떤 도구냐"가 아닌 "어떤 루프를 설계하느냐"가 핵심.

## 적용 사례

### OpenClaw Claude Whisperer
루프 엔지니어링의 거의 글자 그대로 구현. 매주 전체 PR/이슈 스캔 → 50개 Codex 24시간 병렬 → 리뷰 시 쓰기 권한 0 → 적용 시 재확인. 4,000건 이상 이슈 클로즈.

### 일상적 루프 패턴
매일 아침 자동화가 레포에서 시동 → 트리아지 스킬이 CI 실패/이슈를 메모리에 기록 → 항목마다 워크트리 열기 → 서브 에이전트 A가 초안, B가 검증 → 커넥터가 PR 열고 티켓 갱신. 인간은 한 번 설계만. 어떤 단계도 직접 프롬프트하지 않음.

## 기존 위키 개념과의 관계

- **LLM + Harness 모델**: 루프의 하위 레이어. 루프는 "하네스 + 타이머 + 병렬 + 자가급식"
- **Closed Learning Loop**: 루프 내부의 학습 사이클 (경험→스킬→개선→영속화)
- **Compounding Artifact**: 스킬이 루프를 거듭하며 누적(compound)되는 구조
- **Intent Debt**: 에이전트가 매 세션 차갑게 시작하는 문제 → 스킬로 해결
- **Orchestration Tax**: 워크트리가 기계적 충돌은 해결하지만 리뷰 대역폭이 진짜 한계

## See also

- [루프 엔지니어링 소스](/wiki/sources/loop-engineering/) — 원문 요약, Codex/Claude Code 매핑, 실전 사례
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 루프의 하위 레이어
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/) — 루프 내 학습 메커니즘
- [Claude Code Hooks](/wiki/concepts/claude-code-hooks/) — Automations 프리미티브 구현
- [Agent Teams](/wiki/concepts/agent-teams/) — Sub-agents 프리미티브 구현
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/) — State(Memory) 원칙
- [AI 스킬 신뢰성](/wiki/concepts/ai-skill-trust/) — Skills 프리미티브 주의사항
- [검증 주도 개발](/wiki/concepts/verification-driven-development/) — 기계 검증 가능한 종료 조건
- [Compounding Artifact](/wiki/concepts/compounding-artifact/) — 스킬 누적 구조
- [컨텍스트 로트 방지](/wiki/concepts/context-rot-prevention/) — 디스크 기반 상태의 이유
