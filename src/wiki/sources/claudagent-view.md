---
title: Claude Code Agent View
created: 2026-05-13
updated: 2026-05-13
tags: [source, claude-code, agent-view, terminal, multi-agent, cli]
sources: [2026-05-13-claude-agent-view.md]
status: stable
category: sources
---

# Claude Code Agent View

## 개요

Claude Code v2.1.139 (2026-05-11)에 추가된 터미널 내 멀티 세션 관리 UI. `claude agents` 명령으로 실행하며, 여러 백그라운드 에이전트 세션을 하나의 터미널 화면에서 모니터링·조작할 수 있다. "Research Preview" 단계.

## 핵심 내용

### Agent View란

Agent Teams의 Display Mode (Ingress/Split Panes)를 대체하는 네이티브 터미널 UI. 기존에는 tmux/iTerm2 분할이나 여러 탭으로 관리하던 멀티 세션을 하나의 TUI로 통합.

**실행**: `claude agents`

### 5가지 세션 상태

| 상태 | 설명 |
|------|------|
| 고정됨 (Pinned) | Ctrl+T로 고정한 세션 |
| 작업 중 (Working) | 에이전트가 활발히 작업 중 |
| 입력 필요 (Needs Input) | Claude가 사용자 응답 대기 |
| 검토 준비 완료 (Ready for Review) | 작업 완료, 사용자 확인 대기 |
| 완료됨 (Completed) | 작업 완료 |

### 키보드/마우스 인터랙션

| 조작 | 기능 |
|------|------|
| Space | 세션 브리핑 피크 패널 |
| Enter | 세션 진입 (전체 대화형 세션) |
| Ctrl+X | 세션 삭제 |
| Ctrl+T | 세션 고정 |
| Shift+↑↓ | 세션 순서 변경 |
| `/bg` | 현재 세션을 백그라운드로 → Agent View에 등록 |

### 병렬 에이전트 디스패치

Agent View 내 입력 필드에서 새 요청을 하면 자동으로 병렬 처리. 각 세션은 **독립 git worktree**에서 격리되어 파일 충돌 없이 동시 작업.

### 필터링

- `a:<agent>` — 특정 에이전트 필터
- `s:<state>` — 상태별 필터
- `#<PR-number>` — PR 번호로 필터
- PR 상태 추적: 커밋 행에 컬러 점으로 PR 상태 표시

### 아키텍처

- 사용자별 **수퍼바이저 프로세스**가 모든 세션 호스팅
- 세션 상태는 `~/.claude/jobs/<id>/`에 디스크 저장
- 인증 시 자동 재시작
- ~1시간 비활성 후 유휴 프로세스 종료

### 제한사항

- **CLI 전용**: 데스크탑 앱, 웹에서는 사용 불가
- **한국어 입력 이슈**: 세션 삭제(Ctrl+X) 시 영어 타이핑 모드여야 동작
- **Research Preview**: 아직 안정화 단계 아님

### 기존 세션 → Agent View 이동

Agent View에서 생성하지 않은 세션도 백그라운드 전환(`/bg`)으로 Agent View에 등록 가능. 이는 Agent View가 단순한 런처가 아닌 **세션 오케스트레이터** 역할을 함을 시사.

## 원문 인용

> "원래는 아이디를 틀거나 플러그인 또는 데스크탑 앱을 사용을 해야지만 접근할 수 있었던 멀티 에이전트 기능을 우리가 이제는 클로드 코드 안에서도 사용을 할 수 있게 됐다."

> "하나의 화면 안에서 여러 개 세션을 터미널을 사용하더라도 다 관리할 수 있게 됐다."

## See also

- [Claude Code](/wiki/entities/claude-code/) — Agent View가 동작하는 환경
- [Agent Teams](/wiki/sources/agent-teams/) — Display Mode → Agent View로 진화
- [Agent Teams 개념](/wiki/concepts/agent-teams/) — 협업 모델 원리
- [Agent Teams 설정](/wiki/important/setup/agent-teams/) — 활성화 가이드
- [멀티 에이전트 계층](/wiki/concepts/multi-agent-hierarchy/) — 에이전트 관리 계층
- [Pi](/wiki/entities/pi/) — 터미널 코딩 하네스, 경쟁 도구
