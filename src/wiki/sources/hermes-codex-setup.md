---
title: Hermes Agent X Codex 실전 설정 가이드
created: 2026-05-13
updated: 2026-05-13
tags: [source, hermes-agent, codex, openai, setup, slack, tutorial]
sources: [2026-05-13-hermes-codex-setup.md, 2026-05-13-hermes-google-chat-setup.md]
status: stable
category: sources
---

# Hermes Agent X Codex 실전 설정 가이드

## 개요

Hermes Agent를 OpenAI Codex 구독과 연동하여 추가 비용 없이 설치하고 Slack으로 원격 제어하는 전 과정. Wave Terminal 추천, VPS 원클릭 설치, OpenClaw 마이그레이션 맥락 포함.

## 핵심 내용

### Codex 구독 = 추가 비용 제로

- OpenAI Codex 구독 플랜의 토큰을 Hermes에서 그대로 사용 가능
- Codex CLI의 인증(credential)을 Hermes 설치 시 복사해와서 재사용
- 프로바이더 선택에서 "OpenAI Codex" 선택 → 기존 Codex 인증 복사(Y)
- GPT-5.5 권장 (Plus 이상). 무료 사용자는 5.4-mini
- **주의**: 서드파티 연동이므로 OpenAI가 언제까지 지원할지 불확실

### Slack이 Telegram보다 우수한 이유

| 측면 | Slack | Telegram |
|------|-------|----------|
| 대화 관리 | 쓰레드로 주제별 분리 | 대화가 쭉 이어짐 |
| 채널 | 채널별 에이전트 분리 가능 | 단일 채팅 |
| UX | 웹/데스크탑/모바일 모두 우수 | 모바일 중심 |
| 멀티 에이전트 | 앱 단위로 구분 용이 | 구분 어려움 |

### Slack 설정 절차

1. slack.com/apps → "Create New App" → "From a manifest"
2. 워크스페이스 선택 → App Manifest(JSON) 붙여넣기 (Hermes가 제공)
3. Socket Mode 활성화 → App-Level Token (xapp-) 발급
4. Bot Token Scopes 설정 (Manifest로 일괄 처리)
5. 워크스페이스에 앱 설치 → Bot Token (xoxb-) 발급
6. Hermes 설정: Bot Token → App Token → 허용 사용자 ID (U...) → 홈 채널 ID

### Wave Terminal (Windows 추천)

- 오픈소스 터미널 — Windows/macOS/Linux 지원
- 내장 브라우저, 파일 탐색기, 마크다운 편집기
- CPU/메모리 모니터링, 프로세스 관리
- CLI 에이전트/바이브 코딩 사용자에게 적합

### Full Setup vs Quick Setup

- **Full Setup**: 프로바이더, 모델, TTS(ElevenLabs/HTTS/OpenAI), 인액티비티 타임아웃(기본 1440분=24시간), 리셋 시간, 메신저 채널 선택
- **Quick Setup**: 디폴트값으로 빠른 시작

### VPS 원클릭 설치 (Hostinger)

- 호스팅어 VPS에서 Hermes를 원클릭으로 설치
- Codex CLI로 원격 VPS에 SSH 접속 후 Hermes 설정 관리 위임 가능
- "이 과정들은 코덱스에다 오로지 맡겼습니다" — Codex가 Hermes 설정을 자동 수행

### OpenClaw → Hermes 전환

- v0.12.0 (2026-04-30) 대규모 반전 업데이트로 전환 장벽 사실상 제거
- `hermes claw migrate`로 마이그레이션 또는 새로 구축 선택 가능
- 초보자라면 Hermes 선택이 더 나을 수 있다는 평가

### Google Chat 연동 (Google Workspace)

- Slack/Telegram 외에 Google Chat도 메신저 옵션 (v0.13.0 기준 20번째 플랫폼)
- Google Workspace 환경에서 에이전트 운영에 적합
- 설정이 세 메신저 중 가장 복잡 (Google Cloud 프로젝트, Service Account 등 필요)
- Docker sandbox ("놀이방") 필요 — 파일 생성/수정을 격리된 컨테이너에서 수행

### Codex로 Docker/Hermes 환경 구축

- `codex --yolo`로 Docker 설치 위임 가능 — "에이전트로 에이전트 환경 구축" 패턴
- Docker = Hermes의 놀이방(Playground). Docker 없이는 파일 작업 불가
- Codex가 원격 서버의 Docker 설치 → Hermes 컨테이너 생성 → 설정까지 자동 수행

### 초보자 관점의 평가

- Hermes 자체 설치는 매우 쉬움
- 메신저 연동이 복잡한 병목 — 추후 Hermes가 어떻게 간소화할지 관전 필요
- 자가 개선 하네스: 사용자와의 상호작용으로 스킬/메모리 자동 세팅. Claude Code/Codex보다 저장/기억 용량이 크다는 평가

## 원문 인용

> "4월 30일 대규모 반전 업데이트가 있었어요. 오픈 클로에서 헤르메스로 전환 비용이 거의 없거나 어떤 면에서선 더 좋을 수도 있습니다."

> "슬랙을 메신저 채널로 쓰게 되면 슬랙에 있는 쓰레드 기능, 채널 방 관리가 훨씬 더 좋아요."

## See also

- [Hermes Agent (엔티티)](/wiki/entities/hermes-agent/) — v0.13.0
- [Hermes Agent 설정 가이드](/wiki/important/setup/hermes-agent-setup/) — 기존 설치 가이드
- [Hermes Agent v0.13.0](/wiki/sources/hermes-agent-v2/) — Computer Use, Kanban, /goal
- [OpenClaw vs Hermes](/wiki/comparisons/openclaw-vs-hermes-agent/) — 실전 비교
- [Warp Terminal](/wiki/sources/warp-terminal/) — 터미널 비교
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/) — 자가 개선 루프
