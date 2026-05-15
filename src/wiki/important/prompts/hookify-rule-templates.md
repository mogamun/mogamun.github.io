---
title: Hookify 규칙 템플릿
created: 2026-05-09
updated: 2026-05-09
tags: [important, prompt-template, claude-code, hooks, safety]
sources: [2026-05-09-claude-code-hookify-plugin.md]
status: stable
category: important
---

# Hookify 규칙 템플릿

## 목적

Claude Code Hookify 플러그인에 복붙하여 즉시 사용할 수 있는 훅 규칙 템플릿 모음. `.claude/hookify.{name}.local.md`로 저장.

## 규칙 템플릿

### 파괴적 명령 차단

```
---
name: block-destructive-ops
enabled: true
event: bash
pattern: rm\s+-rf|dd\s+if=|mkfs|format
action: block
---

🛑 **파괴적 명령 감지!**

데이터 손실 위험이 있습니다. 작업이 차단됩니다.
경로를 확인하고 더 안전한 방법을 사용하세요.
```

### 민감 파일 편집 경고

```
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

자격 증명이 하드코딩되지 않았는지, 파일이 .gitignore에 있는지 확인하세요.
```

### 디버그 코드 감지

```
---
name: warn-debug-code
enabled: true
event: file
pattern: console\.log\(|debugger;|print\(
action: warn
---

🐛 **디버그 코드 감지**

커밋 전에 디버깅 구문을 제거하세요.
```

### TypeScript 하드코딩 자격 증명

```
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

하드코딩 대신 환경 변수를 사용하세요.
```

### 테스트 실행 강제

```
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

**세션에서 테스트가 감지되지 않았습니다!**

종료 전에 테스트를 실행하여 변경 사항을 검증하세요.
```

### force push 경고

```
---
name: warn-force-push
enabled: true
event: bash
pattern: git\s+push\s+(-f|--force)
action: warn
---

⚠️ **force push 감지!**

팀 작업 중이면 다른 사람의 커밋을 덮어쓸 수 있습니다.
`--force-with-lease`를 대신 사용하는 것을 고려하세요.
```

### 보호 브랜치 푸시 경고

```
---
name: warn-protected-branches
enabled: true
event: bash
pattern: git\s+push\s+.*(?:main|master|develop|release)
action: warn
---

⚠️ **보호 브랜치에 푸시하려고 합니다!**

main/master/develop/release 브랜치에 직접 푸시하기 전에 확인하세요.
PR을 통한 머지를 권장합니다.
```

### chmod 777 차단

```
---
name: block-chmod-777
enabled: true
event: bash
pattern: chmod\s+777
action: block
---

🛑 **chmod 777 감지!**

모든 사용자에게 읽기/쓰기/실행 권한을 부여하는 것은 보안 위험입니다.
최소 권한 원칙에 따라 필요한 권한만 설정하세요 (예: 755, 644).
```

## 사용법

1. 원하는 템플릿을 복사
2. 프로젝트 루트의 `.claude/` 디렉토리에 `hookify.{name}.local.md`로 저장
3. `enabled: true` 확인
4. 다음 Claude Code 세션에서 즉시 적용

또는 자연어로 생성:
```
/hookify {원하는 규칙 설명}
```

## 출처

- [GitHub: anthropics/claude-code/plugins/hookify](https://github.com/anthropics/claude-code/tree/main/plugins/hookify)

## See also

- [Hookify 설정 가이드](/wiki/important/setup/hookify/) — 설치 및 상세 사용법
- [Claude Code Hooks 개념](/wiki/concepts/claude-code-hooks/) — 훅 시스템 원리
- [Hookify 소스](/wiki/sources/hookify/) — 플러그인 분석
