---
title: Hookify Plugin
created: 2026-05-09
updated: 2026-05-09
tags: [source, claude-code, hooks, plugin, marketplace, automation]
sources: [2026-05-09-claude-code-hookify-plugin.md]
status: stable
category: sources
---

# Hookify Plugin

## 개요

Claude Code 공식 플러그인. 복잡한 `hooks.json` 대신 마크다운 파일로 훅을 생성·관리. 자연어 지시나 대화 패턴 분석으로 자동 규칙 작성.

## 핵심 내용

### 마크다운 기반 훅 설정

기존 Claude Code 훅은 `settings.json`의 `hooks` 필드에 JSON으로 설정해야 했음. Hookify는 `.claude/hookify.{name}.local.md` 파일로 대체:

- **YAML frontmatter**에 이벤트 타입, 패턴, 액션 정의
- **본문**에 매칭 시 표시할 메시지 작성 (마크다운 지원)
- 코딩 없이 규칙 생성, 재시작 없이 즉시 적용

### 자연어 → 훅 변환

`/hookify Warn me when I use rm -rf commands` 입력 시:
1. Claude가 요청 분석
2. `.claude/hookify.warn-rm.local.md` 파일 자동 생성
3. 다음 도구 사용 시 즉시 효력 발생

인수 없이 `/hookify`만 입력하면 최근 대화에서 교정했던 패턴을 자동 감지.

### 이벤트 타입

| 이벤트 | 트리거 | 기반 훅 |
|--------|--------|---------|
| `bash` | Bash 도구 명령어 | PreToolUse |
| `file` | Edit, Write, MultiEdit | PreToolUse |
| `stop` | Claude 세션 종료 시 | Stop |
| `prompt` | 사용자 프롬프트 제출 | Prompt |
| `all` | 모든 이벤트 | - |

### 액션

- **`warn`**: 경고 표시 후 작업 허용 (기본값)
- **`block`**: 작업 실행 차단 (PreToolUse) 또는 세션 중단 (Stop)

### 다중 조건 시스템

단일 패턴뿐 아니라 복합 조건 구성 가능:

- **연산자**: `regex_match`, `contains`, `equals`, `not_contains`, `starts_with`, `ends_with`
- **필드**: `command`(bash), `file_path`/`new_text`/`old_text`(file), `user_prompt`(prompt), `transcript`(stop)
- 모든 조건이 AND로 결합 (전부 매칭 시 트리거)

### 플러그인 생태계 내 위치

- Claude Code Marketplace의 공식 플러그인 (28개 중 하나)
- Python 3.7+ stdlib만 사용 (외부 의존성 없음)
- `cc --plugin-dir /path/to/hookify`로 수동 테스트 가능

## 원문 인용

> "Easily create custom hooks to prevent unwanted behaviors by analyzing conversation patterns or from explicit instructions."

> "No restart needed! Rules take effect on the very next tool use."

## See also

- [Claude Code Hooks 개념](/wiki/concepts/claude-code-hooks/) — 훅 시스템의 원리와 이벤트 모델
- [Hookify 설정 가이드](/wiki/important/setup/hookify/) — 설치 및 실전 규칙 템플릿
- [Hookify 규칙 템플릿](/wiki/important/prompts/hookify-rule-templates/) — 복붙 가능한 훅 규칙 모음
- [Claude Code](/wiki/entities/claude-code/) — 플러그인이 동작하는 환경
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 훅이 하네스 제어 수단인 이유
