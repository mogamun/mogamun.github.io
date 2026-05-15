---
title: OpenClaw
created: 2026-04-27
updated: 2026-04-29
tags: [entity, platform, ai-agent, multi-agent, open-source, local-execution]
sources: [2026-04-27-conanssam-claude-cli-openclaw.md, 2026-04-27-conanssam-gpt-image-2-openclaw.md, 2026-04-29-zerocho-openclaw-vs-hermes.md]
status: stable
category: entities
---

# OpenClaw

## 정체

개인 AI 어시스턴트 플랫폼. 로컬에서 실행되며 MIT 라이선스 기반 오픈소스. Gemini CLI, Codex, Claude Code, Open Code 등 다양한 AI CLI 도구를 하나의 환경에서 통합 운영할 수 있는 "AI OS" 역할. **Pi 터미널 코딩 하네스를 기반으로 구동**됨 — Pi의 확장 시스템, 모델 스위칭, 세션 트리 기능을 그대로 활용.

## 역할

- 다양한 AI 에이전트(GPT, Claude, Codex, Gemini 등)를 단일 플랫폼에서 관리
- ACP(Agent Client Protocol)를 통해 여러 AI CLI를 하나의 앱처럼 통합
- 독립 에이전트(별도 워크스페이스)와 서브 에이전트(가상 알바생, 세션 종료 시 소멸) 구분
- 퍼시스턴트 모드(정직원 바인딩)와 세션 스포닝(외주 호출 후 해제) 제공
- Telegram, 카카오톡 등 메시징 플랫폼 연동
- 스킬, 메모리, 히스토리 관리
- MCP 루프백으로 Claude Code 스킬 공유

## 핵심 기능

### 에이전트 관리
- **독립 에이전트**: 별도 워크스페이스, 전문적 장기 작업
- **서브 에이전트**: 가상 알바생, 세션 종료 시 소멸, 긴 작업에 활용
- 서브 에이전트 하위에 독립 에이전트 배치 가능 (작업 반장 구조)

### ACP (Agent Client Protocol)
- OpenClaw 환경을 OS로 보고, 내부 AI CLI 도구들을 앱처럼 사용
- 퍼시스턴트 바인딩: 에이전트를 완전히 묶어서 사용 (openclaw.json에 선언)
- 세션 스폰: 호출 후 해제, 비동기 처리(send)와 결과 수신(spawn) 지원

### 메모리 관리
- 세션 찌꺼기 문제: 세션 누적 시 메모리 누수 발생 (최대 10GB)
- TTL(max time), max count 설정으로 자동 정리
- cleanup 프롬프트로 수동 정리
- ACP 런타임 설정: `acp_runtime_ttl`, `acp_runtime_max`

## 관련 프로젝트/맥락

- GitHub: https://github.com/openclaw/openclaw
- 라이선스: MIT
- 오마이클로(ohmyclaw): OpenClaw의 라우팅/오케스트레이션 도구
- openclaw-codex-image-gen: 이미지 자동화 플러그인 (jkf87/)
- 14개 에이전트 운영 사례 보고됨 (책 출간)
- Hermes Agent와 연동 가능 (`hermes claw migrate`)

## See also

- [Pi](/wiki/entities/pi/) — OpenClaw의 기반 하네스 (확장, 세션 트리, 모델 스위칭)
- [ACP (Agent Client Protocol)](/wiki/concepts/agent-client-protocol/) — 핵심 프로토콜 개념
- [오마이클로(ohmyclaw)](# ) — 라우팅/오케스트레이션 도구
- [Hermes Agent](/wiki/entities/hermes-agent/) — OpenClaw 마이그레이션 지원
- [OpenClaw vs Hermes Agent 비교](/wiki/comparisons/openclaw-vs-hermes-agent/) — 실전 비교 분석
- [OpenClaw Codex 이미지 자동화 설정](/wiki/important/setup/openclaw-codex-image-gen/) — 이미지 자동화 플러그인
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 하네스 멘탈 모델
