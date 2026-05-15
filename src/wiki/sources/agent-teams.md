---
title: Claude Code Agent Teams
created: 2026-05-09
updated: 2026-05-09
tags: [source, claude-code, agent-teams, multi-agent, subagent, collaboration]
sources: [2026-05-09-claude-code-agent-teams.md]
status: stable
category: sources
---

# Claude Code Agent Teams 완벽 정리

## 개요

Claude Code의 Agent Teams 기능 분석. 기존 Subagent와의 핵심 차이점, 5가지 구성 요소, 실전 시연, 언제 무엇을 써야 하는지 정리.

## 핵심 내용

### Subagent vs Agent Teams

회사 조직에 비유하면:
- **Subagent** = 프리랜서: 시키면 혼자 다 하고 결과만 보고. 팀원끼리 대화 불가
- **Agent Teams** = 하나의 팀: 서로 소통하면서 같이 일함. Mailbox로 직접 메시지 가능

### Subagent의 한계 3가지

1. **직접 소통 불가**: 프론트엔드 A가 백엔드 B에게 직접 말 못 함. 반드시 메인 경유
2. **중간 단서 소실**: 파일 50개 분석 중 스쳐 지나간 정보는 결과 요약에 포함 안 됨. 나중에 질문 불가
3. **메인 병목**: 메인이 모든 서브 에이전트 조율. 늘어날수록 컨텍스트 빠르게 포화

### 전환 타이밍 (공식 문서)

서브 에이전트 여러 개 운영 중 다음 상황이 발생하면 Agent Teams로 전환:
- 컨텍스트가 조율 작업으로 빠르게 포화
- 에이전트 간 정보 공유 필요
- 서브 에이전트 간 의존성 발생

### Agent Teams 구성 요소

| 구성 | 설명 |
|------|------|
| **Team Lead** | 팀을 생성한 Claude Code 세션 = 팀장. 변경 불가 |
| **Teammate** | 리드가 생성한 추가 세션. 독립 컨텍스트 보유 |
| **Spawn** | 새 팀원 세션 생성 |
| **Task List** | 공유 작업 목록. 대기/진행/완료 상태 |
| **Mailbox** | 팀원 간 메시지 (리드↔팀원, 팀원↔팀원) |

### Task List 할당

- **리드 지정**: "시장 조사는 A, 경쟁사 분석은 B" — 한 팀원에 여러 작업 배정 가능
- **자율 할당**: 작업 끝난 팀원이 배정 안 된 작업을 알아서 가져감

### 비용

팀원 N명이면 대략 N배 이상 토큰 사용. 소통 필요 없는 독립 작업은 Subagent가 효율적.

### Display Mode

| 모드 | 설명 | 요구사항 |
|------|------|----------|
| Ingress (기본) | Shift+Down으로 팀원 순환 | 모든 터미널 |
| Split Panes | 화면 분할로 동시 표시 | tmux 또는 iTerm2 |

## 원문 인용

> "서브 에이전트는 시키면 혼자 다 하고 결과만 보고하는 프리랜서라면 에이전트 팀은 서로 대화하면서 같이 일하는 하나의 팀입니다."

> "공식 문서에서도 이러한 시점을 콕 집어서 말합니다. 이때가 에이전트 팀으로 넘어갈 타이밍이라고요."

## See also

- [Agent Teams 개념](/wiki/concepts/agent-teams/) — 협업 모델의 원리와 위키 내 연결
- [Agent Teams 설정 가이드](/wiki/important/setup/agent-teams/) — 활성화 및 사용법
- [Claude Code](/wiki/entities/claude-code/) — Agent Teams가 동작하는 환경
- [멀티 에이전트 계층](/wiki/concepts/multi-agent-hierarchy/) — 3티어 계층 패턴
- [에이전트 조정](/wiki/concepts/agent-coordination/) — 5가지 협업 패턴
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — Agent Teams는 Harness의 협업 레이어
- [Agent View](/wiki/sources/claudagent-view/) — Display Mode를 대체하는 터미널 멀티 세션 TUI (Research Preview)
