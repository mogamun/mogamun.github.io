---
title: Hermes Agent v0.13.0 업데이트 (Computer Use, Kanban, /goal)
created: 2026-05-13
updated: 2026-05-13
tags: [source, hermes-agent, computer-use, webui, kanban, multi-agent, open-source]
sources: [2026-05-13-hermes-agent-v2.md]
status: stable
category: sources
---

# Hermes Agent v0.13.0 업데이트 (Computer Use, Kanban, /goal)

## 개요

Hermes Agent v0.13.0 "Tenacity" (2026-05-07) 분석. 백그라운드 Computer Use, 멀티 에이전트 칸반 웹 UI, `/goal` 자율 목표 모드, Qwen 3.6 Plus 무료 제공. 유튜브 영상에서 "v2.0"으로 표현되었으나 실제 버전 번호는 v0.13.0.

## 핵심 내용

### Computer Use (KUA, Early Preview)

백그라운드에서 macOS 데스크탑 제어 — 커서 이동 없음, 키보드 포커스 변경 없음, macOS Space 전환 없음.

- **지원 모델**: 비전 기능이 있는 모든 모델 (Claude, GPT-4/GPT-5, Gemini, 로컬 VLM)
- **활성화**: `hermes computer-use install` 또는 `hermes tools`에서 대화형 선택
- **플랫폼**: macOS만 (Windows/Linux 예정)
- **의의**: Codex 스타일 백그라운드 컴퓨터 사용의 오픈소스 구현

### WebUI / Kanban Board

멀티 에이전트 오케스트레이션 웹 대시보드.

- **무제한 보드/프로젝트**: 에이전트별 작업 관리
- **칸반 열**: To-Do → In Progress → Done
- **구독**: 프로젝트 업데이트를 홈 채널(게이트웨이 메신저)로 수신
- **설정**: `hermes kanban init` → `hermes dashboard` → WebUI에서 플러그인 패널
- **의의**: 독립 AI 도구 → 멀티 에이전트 지속적 작업 공간으로 전환

### /goal 명령

장기 실행 자율 목표 모드 (Claude Code, Codex와 동일 개념).

- **루프**: plan → execute → review → retry (목표 달성까지)
- **멀티 에이전트**: 메모리/핸드오프를 칸반 보드로 추적
- **단일 프롬프트가 아닌 지속적 목표 추적**

### Qwen 3.6 Plus 무료

- Nous Portal (OpenRouter 기반)에서 무료 제공 (한정 기간)
- 1M 토큰 컨텍스트 윈도우
- 웹 개발, 장기 태스크, 멀티모달 강점
- OpenRouter 라우팅 + Hermes 워크플로우 최적화 할인

### Light Panda 통합

- 오픈소스 AI 전용 브라우저 백엔드
- Chrome 자동 폴백
- CLI, Kanban, 데스크탑 앱에서 자동 브라우징(auto-browse) 지원

### 기타

- **XTTS 음성 클로닝**: 커스텀 음성으로 TTS
- **Google Chat**: 20번째 메시징 플랫폼
- **다국어 TTS**

### 버전 타임라인 (v0.9.0~v0.13.0)

| 버전 | 날짜 | 주요 기능 |
|------|------|-----------|
| v0.13.0 | 2026-05-07 | Multi-agent Kanban, /goal, Computer Use, Google Chat |
| v0.12.0 | 2026-04-30 | 자율 Curator, ComfyUI/TouchDesigner |
| v0.11.0 | 2026-04-23 | React/Ink TUI 재작성, GPT-5.5 |
| v0.10.0 | 2026-04-16 | Tool Gateway, 웹 검색, 이미지 생성, 브라우저 자동화 |
| v0.9.0 | 2026-04-13 | 로컬 웹 대시보드, iMessage, WeChat, Android |

### 경쟁 환경

- 리더보드에서 OpenClaw, Pod Code, Kilo Code 추월
- Claude Code의 /goal, Agent View와 기능 경쟁
- Codex 스타일 백그라운드 컴퓨터 사용의 오픈소스 대안

## 원문 인용

> "This essentially is the open-source equivalent of Codex style background computer use."

> "This essentially turns Hermes into even more of a persistent autonomous workspace with multi-agent operating environments rather than just a standalone AI tool."

## See also

- [Hermes Agent (엔티티)](/wiki/entities/hermes-agent/) — v0.12.0→v0.13.0 업데이트
- [Hermes Agent GitHub Update](/wiki/sources/hermes-agent-github-update/) — v0.9.0~v0.12.0 추적
- [Hermes Agent Review](/wiki/sources/hermes-agent-review-beomsu/) — LLM+Harness 모델 심층 분석
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/) — 자가 개선 루프
- [Claude Code](/wiki/entities/claude-code/) — /goal, Agent View 경쟁
- [Agent View](/wiki/sources/claudagent-view/) — Claude Code 멀티 세션 vs Hermes 칸반
- [멀티 에이전트 계층](/wiki/concepts/multi-agent-hierarchy/) — 에이전트 관리 계층
