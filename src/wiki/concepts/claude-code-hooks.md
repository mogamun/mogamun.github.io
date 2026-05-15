---
title: Claude Code Hooks
created: 2026-05-09
updated: 2026-05-09
tags: [concept, claude-code, hooks, automation, safety, harness]
sources: [2026-05-09-claude-code-hookify-plugin.md]
status: stable
category: concepts
---

# Claude Code Hooks

## 정의

Claude Code의 도구 실행 전후에 개입하여 AI 행동을 제어·감시·자동화하는 이벤트 시스템. AI가 도구를 사용할 때마다 훅이 트리거되어 검증, 차단, 알림, 후처리를 수행.

## 핵심 원칙

### 이벤트 모델

Claude Code의 훅 시스템은 도구 생명주기를 기반으로 설계:

| 이벤트 | 발생 시점 | 주요 용도 |
|--------|-----------|-----------|
| **PreToolUse** | 도구 실행 전 | 위험 명령 차단, 입력 검증 |
| **PostToolUse** | 도구 실행 후 | 포매팅, 알림, 로깅 |
| **PostToolUseFailure** | 도구 에러 시 | 에러 복구, 알림 |
| **PermissionRequest** | 권한 요청 시 | 자동 승인/거부 |
| **Stop** | 세션 종료 시 | 완료 검증, 아티팩트 체크 |
| **SubagentStop** | 서브에이전트 종료 시 | 결과 검증 |

### Pre vs Post

- **PreToolUse**: 작업 실행 **전**에 개입. `block` 가능. 위험 명령, 민감 파일 접근 차단.
- **PostToolUse**: 작업 실행 **후**에 반응. `block` 불가 (이미 실행됨). 포매팅, 알림, 검증.

### 설정 방식 2가지

1. **settings.json 직접 설정**: `hooks` 필드에 JSON으로 훅 정의. 유연하지만 복잡.
2. **Hookify 플러그인**: 마크다운 파일로 훅 정의. 사용성 추상화. 자연어로 규칙 생성.

### 훅의 본질 = 하네스 제어

LLM Harness 모델에서 훅은 "하네스가 LLM을 제어하는 메커니즘". 모델 자체는 훅을 인지하지 못함 — 하네스가 모델의 도구 호출을 인터셉트하여 안전장치 적용.

## 적용 사례

### 안전 가드
- `rm -rf`, `mkfs` 등 파괴적 명령 차단 (PreToolUse + block)
- `.env`, `credentials` 파일 편집 경고 (PreToolUse + warn)
- 하드코딩된 API 키 감지 (file 이벤트 + regex)

### 품질 게이트
- 커밋 전 검증: TODO 포맷, JSON 유효성 (PreToolUse on Bash)
- 디버그 코드 감지: `console.log`, `debugger`, `print` (PostToolUse on file)
- 테스트 실행 강제: 세션 종료 전 테스트 미실행 시 block (Stop)

### 워크플로우 자동화
- 세션 시작 시 현재 브랜치/최근 커밋 표시
- 서브에이전트 생성/종료 감사 로그
- 컴팩션 전후 상태 보존/복원

### 구현 체계

Game Studios 템플릿은 12개 훅을 체계적으로 구성한 대표 사례:
- PreToolUse: validate-commit.sh, validate-push.sh, validate-assets.sh
- PostToolUse: validate-skill-change.sh
- Session: session-start.sh, session-stop.sh, detect-gaps.sh
- Compaction: pre-compact.sh, post-compact.sh
- Agent: log-agent.sh, log-agent-stop.sh
- Notification: notify.sh

## See also

- [Hookify Plugin](/wiki/sources/hookify/) — 마크다운으로 훅을 쉽게 생성하는 플러그인
- [Hookify 설정 가이드](/wiki/important/setup/hookify/) — 설치 및 사용법
- [Hookify 규칙 템플릿](/wiki/important/prompts/hookify-rule-templates/) — 복붙 가능한 훅 규칙
- [Claude Code](/wiki/entities/claude-code/) — 훅 시스템이 동작하는 환경
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 훅이 하네스 제어 수단인 이유
- [검증 주도 개발](/wiki/concepts/verification-driven-development/) — 테스트 강제와 block 액션의 공통 철학
- [구조가 암묵적 프롬프트](/wiki/synthesis/structure-as-implicit-prompt/) — 훅/린터가 AI에 즉각 피드백을 주는 원리
