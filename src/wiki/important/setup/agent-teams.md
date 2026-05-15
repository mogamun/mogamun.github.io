---
title: Claude Code Agent Teams 설정
created: 2026-05-09
updated: 2026-05-09
tags: [important, setup-guide, claude-code, agent-teams, multi-agent]
sources: [2026-05-09-claude-code-agent-teams.md]
status: stable
category: important
---

# Claude Code Agent Teams 설정

## 개요

Claude Code에서 여러 에이전트가 팀으로 협업하는 Agent Teams 기능 활성화 및 사용법.

## 전제 조건

- Claude Code 설치됨
- `settings.json` 접근 가능
- (분할 창 모드용) tmux 또는 iTerm2

## 활성화

Agent Teams는 실험적 기능으로 기본 비활성화.

### Step 1: 환경 변수 설정

`settings.json`에 환경 변수 추가:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_AGENT_TEAMS": "1"
  }
}
```

### Step 2: 팀 생성 요청

자연어로 요청:

```
세 명의 팀원을 만들어서 각각 보안, 성능, 스타일을 리뷰해 줘
```

```
네 명의 팀원을 만들어서 시장 조사, 경쟁사 분석, 예산안, 일정표를 담당하고 결과를 종합해 줘
```

### Step 3: 팀원 확인

**Ingress 모드 (기본):**
- `Shift` + `↓` 로 팀원 순환
- `Enter`로 팀원 세션 보기
- `hide`로 숨기기

**Split Panes 모드 (tmux/iTerm2):**
- 화면이 자동 분할되어 모든 팀원 동시 표시

### Step 4: 진행 상황 확인

```
지금 상황을 보고해
```

팀 리드가 모든 팀원의 작업 상태를 종합 보고.

### Step 5: 팀원과 직접 소통

```
경쟁사 분석 담당 팀원에게 인사
```

특정 팀원에게 직접 메시지 전송 가능.

## Display Mode 설정

`settings.json`에서 설정:

```json
{
  "teammate_mode": "auto"
}
```

| 값 | 설명 |
|---|------|
| `auto` | tmux/iTerm2면 분할 창, 나머지는 ingress |
| `ingress` | Shift+Down 순환 (모든 터미널) |
| `tmux` | 분할 창 (tmux/iTerm2 필요) |

## Subagent vs Agent Teams 선택 기준

| 상황 | 선택 |
|------|------|
| 독립적 병렬 작업 (2-3개) | Subagent |
| 결과만 필요, 소통 불필요 | Subagent |
| 에이전트 간 정보 공유 필요 | Agent Teams |
| 복잡한 다단계 프로젝트 | Agent Teams |
| 메인 컨텍스트 포화 우려 | Agent Teams |

## 확인

1. 팀 생성 후 Shift+Down으로 팀원이 보이는지 확인
2. 팀원에게 직접 메시지가 전달되는지 확인
3. Task List가 공유되는지 확인
4. 팀원 간 메시지가 표시되는지 확인

## 출처

- [관련 영상](https://youtu.be/qGm8odiBkBg)

## See also

- [Agent Teams 소스](/wiki/sources/agent-teams/) — 영상 분석 상세
- [Agent Teams 개념](/wiki/concepts/agent-teams/) — 협업 모델 원리
- [Claude Code](/wiki/entities/claude-code/) — 실행 환경
- [멀티 에이전트 계층](/wiki/concepts/multi-agent-hierarchy/) — 3티어 계층 패턴
