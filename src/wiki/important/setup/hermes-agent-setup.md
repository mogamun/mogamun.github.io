---
title: Hermes Agent 설정 가이드
created: 2026-04-27
updated: 2026-06-11
tags: [important, setup-guide, ai-agent, hermes, nous-research, self-improving, mcp-server]
sources: [2026-04-27-hermes-agent-setup.md, 2026-05-06-hermes-agent-github-update.md, 2026-06-11-hermes-claude-code-integration.md]
status: stable
category: important
---

# Hermes Agent 설정 가이드

## 개요
Nous Research의 독립 자가 개선 AI 에이전트. Claude Code와 별개로 작동하며, 19개 메시징 플랫폼에서 접근 가능. 200+ 모델 지원, 스킬 자동 생성, 크론 자동화.

**주의**: Claude Code 플러그인이 아님. 완전히 독립적인 Python 에이전트.

## 전제 조건
- macOS / Linux / WSL2 / **Termux (Android)**
- 인터넷 연결
- LLM API 키 (OpenRouter, OpenAI, Anthropic 중 하나)

## 설치 단계

### 1. 자동 설치 (권장)

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

이 스크립트가 자동으로:
- uv (Python 패키지 매니저) 설치
- Python 3.11+ venv 생성
- Hermes Agent와 의존성 설치
- `~/.local/bin/hermes` 심볼릭 링크 생성

### 2. 셸 리로드

```bash
source ~/.zshrc    # macOS zsh
# 또는
source ~/.bashrc   # Linux bash
```

### 3. 초기 설정

```bash
hermes setup
```

대화형 마법사가:
- LLM 프로바이더 선택 (OpenRouter 권장 — 200+ 모델)
- API 키 입력
- 도구 활성화/비활성화
- 메시징 게이트웨이 설정 (선택)

### 4. 모델 선택

```bash
hermes model
```

지원 프로바이더:
| 프로바이더 | 모델 수 | 특징 |
|-----------|---------|------|
| OpenRouter | 200+ | 다양한 모델, lock-in 없음 |
| Nous Portal | 자체 | Nous Research 모델, Tool Gateway |
| OpenAI | GPT-5.5 등 | OpenAI API, Codex OAuth |
| Anthropic | Claude 계열 | Anthropic API |
| AWS Bedrock | Converse API | AWS 네이티브 |
| NVIDIA NIM | Nemotron | NVIDIA 모델 |
| LM Studio | 로컬 | 일급 지원 (v0.12.0) |
| GMI Cloud | — | v0.12.0 추가 |
| Azure AI Foundry | — | v0.12.0 추가 |
| Tencent Tokenhub | — | v0.12.0 추가 |
| Arcee AI | — | v0.11.0 추가 |
| 로컬 | Ollama 등 | 온디바이스 |

### 5. 첫 대화

```bash
hermes
```

TUI (터미널 UI) 시작:
- Ink 기반 React/Ink TUI (v0.11.0 전면 재작성)
- 멀티라인 편집, 스티키 컴포저
- 슬래시 명령어 자동완성
- 대화 기록, 스트리밍 도구 출력
- OSC-52 클립보드, 서브에이전트 오버레이

## 메시징 게이트웨이 설정 (선택)

19개 플랫폼에서 접근:

```bash
hermes gateway setup    # 플랫폼별 설정
hermes gateway start    # 게이트웨이 시작
```

지원 플랫폼: Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Email, SMS, DingTalk, Feishu/Lark, WeCom, Mattermost, Home Assistant, Webhooks, iMessage, WeChat, QQBot, Tencent 元보, **Microsoft Teams** (게이트웨이 플러그인)

## Termux / Android (v0.9.0)

Android에서 네이티브 실행 지원:
```bash
pkg install python
# 이후 일반 설치 과정 동일
```

## 로컬 웹 대시보드 (v0.9.0)

브라우저에서 설정/세션/스킬 관리:
```bash
hermes dashboard
```

## 백업 & 복원 (v0.9.0)

```bash
hermes backup             # 전체 백업
hermes import <file>      # 백업 복원
```

## 자율 Curator (v0.12.0)

백그라운드에서 스킬 라이브러리 자동 관리:
```bash
hermes curator status     # 사용량 순위 확인
```

7일 주기로 스킬 등급 매기기, 정리, 가지치기 수행.

## MCP Server Mode (v0.12.0)

MCP 클라이언트에 대화 세션 노출:
```bash
hermes mcp serve
```

터미널 출력 없지만 백그라운드에서 MCP 서버 실행 중.

### Claude Code와 연동

1. Hermes MCP 서버 시작:
```bash
hermes mcp serve
```

2. `.mcp.json`에 Hermes MCP 추가:

**프로젝트 스코프** (해당 프로젝트만): 프로젝트 루트 `.mcp.json`
**글로벌 스코프** (전체 프로젝트): `~/.claude/.mcp.json`

3. Claude Code에서 Hermes 도구 접근 확인

→ Claude Code가 Hermes의 메모리, 스킬, 연결된 모든 앱에 접근 가능. 각 앱을 개별 에이전트에 연결할 필요 없이 Hermes 경유로 통합 접근.

### Anthropic 6월 15일 정책 변경 주의
- Agent SDK + `claude -p`(non-interactive mode) 사용량이 구독 풀에서 분리
- Pro: $20/월 API 크레딧, Max 5x: $100/월
- 서드파티 에이전트(Hermes 등) 무료 사용 종료

## Profiles (v0.12.0)

다중 격리 인스턴스 실행. 각 Profile은 독립 설정/메모리/스킬 유지.

## Credential Pool (v0.12.0)

동일 프로바이더에 다중 API 키 등록 시 자동 로테이션.

## OpenClaw에서 마이그레이션

```bash
hermes claw migrate              # 전체 마이그레이션
hermes claw migrate --dry-run    # 미리보기
hermes claw migrate --preset user-data  # 비밀 제외
```

가져오는 항목: SOUL.md, 메모리, 스킬, 명령 승인 목록, 메시징 설정, API 키

## 주요 명령어

| 명령 | 기능 |
|------|------|
| `hermes` | 대화형 TUI 시작 |
| `hermes model` | 모델 변경 |
| `hermes tools` | 도구 설정 |
| `hermes config set` | 개별 설정 |
| `hermes gateway` | 메시징 게이트웨이 |
| `hermes dashboard` | 로컬 웹 대시보드 |
| `hermes backup` | 전체 백업 |
| `hermes import` | 백업 복원 |
| `hermes curator status` | 스킬 사용량 순위 |
| `hermes mcp serve` | MCP 서버 모드 |
| `hermes update` | 업데이트 |
| `hermes doctor` | 문제 진단 |

### 대화 중 명령어

| 명령 | 기능 |
|------|------|
| `/new` | 새 대화 |
| `/model` | 모델 변경 |
| `/skills` | 스킬 목록 |
| `/compress` | 컨텍스트 압축 |
| `/retry` | 마지막 응답 재시도 |
| `/undo` | 마지막 턴 되돌리기 |
| `/steer` | 실행 중 방향 수정 (프롬프트 캐시 유지) |
| `/fast` | Fast Mode (OpenAI Priority + Anthropic fast tier) |

## 컨텍스트 파일

Hermes는 프로젝트 루트에서 자동 읽기:
```
.hermes.md > AGENTS.md > CLAUDE.md  (우선순위)
```

기존 CLAUDE.md가 있으면 Hermes도 활용.

## 확인
- `hermes doctor` — 설치 상태, 설정, 연결 진단
- `hermes` 실행 후 TUI 정상 표시되면 완료

## 문제 해결

| 문제 | 해결 |
|------|------|
| `hermes: command not found` | `source ~/.zshrc` 후 재시도 |
| 모델 응답 없음 | `hermes model`에서 프로바이더/API 키 확인 |
| 권한 오류 | `chmod +x ~/.local/bin/hermes` |
| Python 오류 | `hermes doctor`로 진단 |
| 비밀 형태 문자열 훼손 | v0.12.0에서 비밀 리데이션 기본 off로 변경 |

## 출처
- [Hermes Agent GitHub](https://github.com/nousresearch/hermes-agent)
- [공식 문서](https://hermes-agent.nousresearch.com/docs)
- [릴리즈 노트](https://github.com/NousResearch/hermes-agent/releases)

## See also
- [Hermes Agent 엔티티](/wiki/entities/hermes-agent/)
- [AI 코딩 프레임워크 비교](/wiki/comparisons/claude-code-framework-comparison/)
- [AI 코딩 프레임워크 4종 따라하기](/wiki/important/setup/ai-coding-frameworks-setup/)
- [OpenClaw](/wiki/entities/openclaw/) — 마이그레이션 소스
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/) — 자가 개선 루프 개념
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 아키텍처 멘탈 모델
- [Hermes + Claude Code 워크플로우](/wiki/important/workflows/hermes-claude-code-workflow/) — MCP 연동 실전 가이드
- [Hermes × Claude Code 연동 소스](/wiki/sources/hermes-claude-code-integration/)
