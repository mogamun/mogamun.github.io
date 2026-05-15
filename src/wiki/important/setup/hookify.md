---
title: Hookify 설정 가이드
created: 2026-05-09
updated: 2026-05-09
tags: [important, setup-guide, claude-code, hooks, plugin]
sources: [2026-05-09-claude-code-hookify-plugin.md]
status: stable
category: important
---

# Hookify 설정 가이드

## 개요

Claude Code의 훅(Hook)을 마크다운 파일로 쉽게 생성·관리하는 플러그인. `hooks.json` 직접 편집 없이 자연어나 마크다운 프론트매터로 훅 규칙 정의.

## 전제 조건

- Claude Code 설치됨
- Claude Code Marketplace 활성화 (또는 수동 설치)
- Python 3.7+

## 설치

### Marketplace (권장)

Claude Code Marketplace가 설치된 환경에서는 자동 감지됨.

### 수동 테스트

```bash
cc --plugin-dir /path/to/hookify
```

## 사용법

### 방법 1: 자연어로 규칙 생성

```
/hookify Warn me when I use rm -rf commands
```

→ `.claude/hookify.warn-rm.local.md` 자동 생성

인수 없이 `/hookify`만 입력하면 최근 대화에서 교정 패턴 자동 감지.

### 방법 2: 마크다운 파일 직접 작성

`.claude/hookify.{규칙명}.local.md` 형식:

```markdown
---
name: 규칙-이름
enabled: true
event: bash | file | stop | prompt | all
pattern: 정규식-패턴
action: warn | block
---

⚠️ **경고 메시지**

상세 설명...
```

### 관리 명령

| 명령 | 기능 |
|------|------|
| `/hookify` | 자연어로 규칙 생성 또는 대화 분석 |
| `/hookify:list` | 모든 규칙 목록 |
| `/hookify:config` | 인터랙티브 설정 (활성/비활성) |
| `/hookify:help` | 도움말 |

## 이벤트 타입별 규칙

### bash — 명령어 제어

```markdown
---
name: block-dangerous-ops
enabled: true
event: bash
pattern: rm\s+-rf|dd\s+if=|mkfs|format
action: block
---

🛑 **파괴적 명령 감지!**

데이터 손실 위험이 있습니다. 더 안전한 방법을 사용하세요.
```

### file — 파일 편집 제어

```markdown
---
name: warn-sensitive-files
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.env$|credentials|secrets
  - field: new_text
    operator: contains
    pattern: KEY
---

🔐 **민감 파일 편집 감지!**

자격 증명이 하드코딩되지 않았는지 확인하세요.
```

### stop — 세션 종료 제어

```markdown
---
name: require-tests-run
enabled: false
event: stop
action: block
conditions:
  - field: transcript
    operator: not_contains
    pattern: npm test|pytest|cargo test
---

**세션 내에서 테스트가 감지되지 않았습니다!**

종료 전 변경 사항을 검증하기 위해 테스트를 실행하세요.
```

### prompt — 사용자 입력 제어

```markdown
---
name: warn-force-push
enabled: true
event: prompt
pattern: force\s+push|push\s+--force
action: warn
---

⚠️ **force push 요청 감지**

팀 작업 중이면 다른 사람의 커밋을 덮어쓸 수 있습니다.
```

## 다중 조건 규칙

여러 필드를 AND로 결합:

```markdown
---
name: api-key-in-typescript
enabled: true
event: file
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.tsx?$
  - field: new_text
    operator: regex_match
    pattern: (API_KEY|SECRET|TOKEN)\s*=\s*["']
---

🔐 **TypeScript에 하드코딩된 자격 증명!**

환경 변수를 사용하세요.
```

### 연산자

| 연산자 | 의미 |
|--------|------|
| `regex_match` | 정규식 매칭 (가장 많이 사용) |
| `contains` | 문자열 포함 |
| `equals` | 정확한 일치 |
| `not_contains` | 문자열 미포함 |
| `starts_with` | 시작 문자열 |
| `ends_with` | 종료 문자열 |

### 필드

| 이벤트 | 필드 | 설명 |
|--------|------|------|
| bash | `command` | 실행할 명령어 |
| file | `file_path` | 편집 대상 파일 경로 |
| file | `new_text` | 새로 추가되는 텍스트 |
| file | `old_text` | 교체되는 기존 텍스트 (Edit만) |
| file | `content` | 파일 전체 내용 (Write만) |
| prompt | `user_prompt` | 사용자 입력 텍스트 |
| stop | `transcript` | 세션 트랜스크립트 |

## 확인

1. `/hookify:list`로 규칙이 로드되었는지 확인
2. 규칙을 트리거할 작업 실행 (예: `rm -rf /tmp/test` 명령 요청)
3. 경고/차단 메시지가 표시되는지 확인
4. `enabled: false`로 비활성화 후 메시지가 나타나지 않는지 확인

## 출처

- [GitHub: anthropics/claude-code/plugins/hookify](https://github.com/anthropics/claude-code/tree/main/plugins/hookify)
- [Claude Code Hooks 공식 문서](https://code.claude.com/docs/en/hooks)

## See also

- [Hookify 규칙 템플릿](/wiki/important/prompts/hookify-rule-templates/) — 복붙 가능한 규칙 모음
- [Claude Code Hooks 개념](/wiki/concepts/claude-code-hooks/) — 훅 시스템 원리
- [Hookify 소스](/wiki/sources/hookify/) — 상세 분석
- [Claude Code](/wiki/entities/claude-code/) — 실행 환경
