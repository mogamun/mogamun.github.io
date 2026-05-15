---
title: LLM + Harness 모델
created: 2026-05-04
updated: 2026-05-06
tags: [concept, ai-agent, architecture, mental-model]
sources: [2026-05-04-hermes-agent-review-beomsu.md, 2026-05-06-hermes-agent-github-update.md]
status: stable
category: concepts
---

# LLM + Harness 모델

## 정의
AI 에이전트를 "단순 LLM 래퍼"가 아닌 "LLM + 통제 도구(Harness)"의 결합으로 이해하는 멘탈 모델. LLM이 원하는 방향으로 동작하도록 하는 도구 세트가 곧 에이전트의 본질.

## 핵심 원칙
- **LLM ≠ 에이전트**: API 호출만으로는 상태 없는(stateless) 요청-응답에 불과
- **하네스 = 통제 도구**: LLM의 출력을 원하는 방향으로 유도하는 인프라
- **하네스 구성요소**: Persistent sessions, Tool use, Skills, Memory, Messaging gateway, Scheduling, Approval system, Sandbox
- **v0.12.0 추가 구성요소**: Curator(자율 스킬 정리), Transport ABC(프로바이더 추상화), Credential Pool(다중 API 키 로테이션), Profiles(다중 격리 인스턴스), MCP Server Mode(외부 클라이언트 노출), Pluggable Memory Provider(메모리 플러그인)
- **상태(State)가 핵심**: API는 요청 간 기억이 없지만, 하네스가 상태를 유지

## "Model=CPU, Context=RAM, Harness=OS" 비유
Pi 리뷰에서 명확히 정의된 비유: LLM(Claude, GPT, Gemini)은 CPU, 컨텍스트 윈도우는 RAM, 하네스는 운영체제. 하네스는 모델을 관리하고 도구를 결정하며 컨텍스트가 너무 커지면 정리. **같은 모델이라도 하네스가 다르면 완전히 다른 에이전트**가 됨 — Claude Opus를 평범한 하네스에 넣으면 평범한 결과, Kimi K2를 좋은 하네스에 넣으면 비싼 모델을 능가.

## 적용 사례
- **Hermes Agent**: "LLM + Harness" 모델의 명시적 구현. 독스에서 직접 설명
- **Claude Code**: CLAUDE.md, hooks, skills, memory가 하네스 역할
- **OpenClaw**: 텔레그램 토픽 라우팅, 브라우저 컨트롤 등이 하네스
- **Codex**: 샌드박스, 승인 시스템, 병렬 태스크가 하네스
- **Pi**: 미니멀 하네스의 극단적 사례. MCP, 서브에이전트 없이 TypeScript 확장만으로 사용자가 하네스를 구축. "임대가 아닌 소유" 모델

## "Just an LLM wrapper" 비판과의 관계
2026년 기준 에이전트 = LLM + 도구 + 반복 루프. "저스 온 더 LM 래퍼"라는 비판(ChatGPT 후킹)에 대한 구조적 반론. API 콜만 보내는 것이 아닌, 상태 유지·기억·자동화가 결합된 시스템.

## See also
- [Hermes Agent](/wiki/entities/hermes-agent/)
- [Hermes Agent 독스 기반 기술 리뷰](/wiki/sources/hermes-agent-review-beomsu/)
- [Pi](/wiki/entities/pi/) — 미니멀 하네스, "소유 vs 임대" 프레이밍
- [Pi 터미널 코딩 하네스 리뷰](/wiki/sources/pi-terminal-coding-harness/) — 하네스 비유 출처
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/)
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/)
- [컨텍스트 로트 방지](/wiki/concepts/context-rot-prevention/)
