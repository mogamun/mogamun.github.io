---
title: Hermes Agent
created: 2026-04-26
updated: 2026-05-13
tags: [entity, framework, ai-agent, self-improving, nous-research]
sources: [2026-04-26-hermes-agent-github.md, 2026-04-26-claude-code-frameworks-deep-research.md, 2026-04-29-zerocho-openclaw-vs-hermes.md, 2026-05-04-hermes-agent-review-beomsu.md, 2026-05-06-hermes-agent-github-update.md, 2026-05-13-hermes-agent-v2.md]
status: stable
category: entities
---

# Hermes Agent

## 정체
Nous Research가 개발한 **독립 실행형 자가 개선 AI 에이전트**. Claude Code 플러그인이 아닌 완전히 별개의 Python 기반 에이전트. 경험에서 학습하고, 스킬을 자동 생성·개선하며, 200+ 모델을 지원.

**멘탈 모델**: "LLM + Harness" — 단순 LLM 래퍼가 아닌, LLM에 통제 도구(Harness)를 결합한 구조. Harness는 LLM이 원하는 방향으로 동작하도록 하는 도구 세트.

**최신 버전**: v0.13.0 "Tenacity" (2026-05-07)

## 역할
- Claude Code 생태계와 독립적인 AI 코딩 에이전트
- **20개 메시징 플랫폼**에서 접근: Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Email, SMS, DingTalk, Feishu/Lark, WeCom, Mattermost, Home Assistant, Webhooks, iMessage, WeChat, QQBot, Tencent 元보, Microsoft Teams, Google Chat (게이트웨이 플러그인)
- 자가 개선 루프: 복잡한 작업 → 스킬 자동 생성 → 사용 중 개선 → **큐레이션**(v0.12.0) → 세션 간 회상
- **8개 터미널 백엔드**: Local, Docker, SSH, Daytona, Singularity, Modal, Vercel Sandbox, API Server
- Skills Hub (6개 소스): 공식, skills-sh, well-known, GitHub, clawhub, lobehub
- 크론 스케줄러로 자연어 예약 작업 정의
- agentskills.io 오픈 표준 호환
- **자율 Curator**: 백그라운드에서 7일 주기로 스킬 라이브러리 등급/정리/가지치기 (v0.12.0)
- **200+ 모델 지원**: OpenRouter, OpenAI, Anthropic, NVIDIA NIM, LM Studio, GMI Cloud, Azure AI Foundry, Tencent Tokenhub, AWS Bedrock, Arcee AI, Step Plan, Vercel ai-gateway 등

## 아키텍처 (독스 기반 분석)

### 파일시스템 구조 `~/.hermes/`
- 설정 파일, 환경 변수, API 키
- 메모리 (MEMORY.md, USER.md)
- 워크플로우, 크론 (반복 작업)
- 세션 (대화 내역)

### Memory vs Conversation 분리
- Conversation: 전체 대화 기록 (모두 보존)
- Memory: 큐레이션된 핵심 지식 ("전매추 대화에서 점심 메뉴만 기억하듯 추출")
- 프롬프트로 주입/삭제 가능

### Prompt Cache 보존
- 스킬 앞에 호출 조건 명시 → 필요할 때만 로드
- 컨텍스트 중간 변경 = 캐시 무효화 = 비용 증가 방지

### 컨텍스트 윈도우 관리
- 100% 채우면 성능 저하. 주기적 압축 필수
- `execute_code`로 다단계 파이프라인을 단일 추론 호출로 압축 → 비용 절감
- 서브 에이전트로 작업 분산

### 핵심 아키텍처 구성요소 (v0.12.0 기준)

**Transport ABC**: HTTP 전송을 플러그형 계층으로 추상화. AnthropicTransport, ChatCompletionsTransport, ResponsesApiTransport, BedrockTransport 지원.

**게이트웨이 플러그인 호스트**: 메시징 어댑터를 코어 외부로 분리. Microsoft Teams가 첫 번째 플러그인 배송 플랫폼.

**Ink 기반 TUI**: React/Ink + Python JSON-RPC 백엔드로 전면 재작성. 스티키 컴포저, OSC-52 클립보드, 서브에이전트 오버레이. 콜드 스타트 57% 감소.

**Credential Pool**: 동일 프로바이더 다중 API 키 자동 로테이션.

**Profiles**: 다중 격리 인스턴스 실행.

**MCP Server Mode**: `hermes mcp serve`로 MCP 클라이언트에 대화 세션 노출.

**Pluggable Memory Provider**: 메모리를 확장 가능한 플러그인 시스템으로.

**ComfyUI v5 + TouchDesigner-MCP**: 이미지 생성/3D/시각화 도구 기본 번들.

**Spotify 네이티브 도구**: play, search, queue, playlists, devices 제어.

**Google Meet 플러그인**: join, transcribe, speak, follow up.

### v0.13.0 신기능 (2026-05-07)

**Computer Use (KUA, Early Preview)**: 백그라운드에서 macOS 데스크탑 제어. 커서 이동/키보드 포커스/Space 전환 없이 에이전트가 클릭, 타이핑, 스크롤 수행. 비전 지원 모델(Claude, GPT, Gemini, VLM) 모두 호환. `hermes computer-use install`로 활성화.

**Multi-Agent Kanban**: 웹 UI에서 멀티 에이전트 칸반 보드. 무제한 보드/프로젝트, To-Do→In Progress→Done 워크플로우. 프로젝트 업데이트를 게이트웨이 메신저로 구독. `hermes kanban init` → `hermes dashboard`로 시작.

**/goal 명령**: 장기 실행 자율 목표 모드. plan→execute→review→retry 루프. 멀티 에이전트 간 메모리/핸드오프를 칸반으로 추적.

**Qwen 3.6 Plus 무료**: Nous Portal(OpenRouter 기반)에서 1M 토큰 컨텍스트 모델 무료 제공.

**Light Panda**: 오픈소스 AI 전용 브라우저 백엔드. Chrome 자동 폴백.

**XTTS 음성 클로닝**: 커스텀 음성 TTS.

## 개발 속도 (v0.9.0~v0.13.0)
| 버전 | 날짜 | 커밋 | PR | 기여자 | 주요 테마 |
|------|------|------|-----|---------|-----------|
| v0.13.0 | 2026-05-07 | — | — | — | Tenacity (Computer Use, Kanban, /goal) |
| v0.12.0 | 2026-04-30 | 1,096 | 550 | 213 | Curator |
| v0.11.0 | 2026-04-23 | 1,556 | 761 | 29 | Interface (TUI 재작성) |
| v0.10.0 | 2026-04-16 | — | — | — | Tool Gateway |
| v0.9.0 | 2026-04-13 | 487 | 269 | 24 | Everywhere (19 플랫폼) |

2주 단위 릴리즈, 커뮤니티 기반 폭발적 성장. v0.12.0은 213명 기여자 참여.

## 관련 프로젝트/맥락
- 개발사: [Nous Research](https://nousresearch.com)
- 라이선스: MIT
- 컨텍스트 파일 우선순위: .hermes.md > AGENTS.md > CLAUDE.md (기존 Claude Code 설정과 부분 호환)
- 세션 저장소: SQLite + FTS5 전문검색
- 사용자 모델링: Honcho dialectic
- OpenClaw 마이그레이션 지원 (`hermes claw migrate`)
- RL 트레이닝 환경: Atropos 통합, 배치 트래젝토리 생성
- 커뮤니티: [Discord](https://discord.gg/NousResearch), [Skills Hub](https://agentskills.io)
- 설치: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`
- 저장소: https://github.com/nousresearch/hermes-agent

## 분류상 차이
Superpowers/GSD/gstack이 "Claude Code에 규칙을 입히는 플러그인"이라면, Hermes는 "Claude Code를 대체하는 독립 에이전트"다. 직접 비교보다 목적에 따른 선택이 올바른 접근.

## See also
- [claude-code](/wiki/entities/claude-code/)
- [superpowers](/wiki/entities/superpowers/)
- [gsd](/wiki/entities/gsd/)
- [gstack](/wiki/entities/gstack/)
- [OpenClaw](/wiki/entities/openclaw/) — 마이그레이션 타겟 플랫폼 (`hermes claw migrate`)
- 독스 기반 기술 심층 분석 소스
- 실전 비교 분석 소스
- [OpenClaw vs Hermes Agent 비교](/wiki/comparisons/openclaw-vs-hermes-agent/) — 실전 비교 분석
- [claude-code-framework-comparison](/wiki/comparisons/claude-code-framework-comparison/)
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — "LLM + 통제 도구" 멘탈 모델
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/) — 클로즈 루프 학습 개념
- [Hermes v0.13.0 업데이트](/wiki/sources/hermes-agent-v2/) — Computer Use, Kanban, /goal, Qwen 3.6 Plus
- [ai-coding-frameworks-setup](/wiki/important/setup/ai-coding-frameworks-setup/)
