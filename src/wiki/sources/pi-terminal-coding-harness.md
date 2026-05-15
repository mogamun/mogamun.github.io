---
title: Pi 터미널 코딩 하네스 리뷰
created: 2026-05-08
updated: 2026-05-08
tags: [source, video, pi, terminal, coding-harness, claude-code, extensions]
sources: [2026-05-08-pi-terminal-coding-harness.md]
status: stable
category: sources
---

# Pi 터미널 코딩 하네스 리뷰

## 개요
1년 넘게 Claude Code를 매일 사용하던 개발자가 Pi라는 미니멀 터미널 코딩 하네스로 전환한 경험을 공유하는 영상. Pi는 OpenClaw의 기반이 되는 동일 하네스이며, "Model=CPU, Context=RAM, Harness=OS" 비유를 통해 하네스의 본질을 설명. MCP, 서브에이전트, 플랜 모드, 권한 시스템이 없는 대신 TypeScript 확장 시스템으로 사용자가 직접 기능을 구축하는 철학.

## 핵심 내용

### 하네스 비유: Model = CPU, Context = RAM, Harness = OS
코딩 에이전트를 컴퓨터에 비유. LLM(Claude, GPT, Gemini)은 CPU, 컨텍스트 윈도우는 RAM, 하네스는 운영체제. 하네스는 모델을 관리하고, 도구를 결정하고, 컨텍스트가 너무 커지면 정리. Claude Code, Cursor, Open Code 모두 하네스이며 같은 모델을 다르게 감싸고 있음. **같은 모델이라도 하네스가 다르면 완전히 다른 에이전트**가 됨 — Claude Opus를 평범한 하네스에 넣으면 평범한 결과, Kimi K2를 좋은 하네스에 넣으면 비싼 모델을 능가.

### Pi의 미니멀리즘 철학
Claude Code가 "배워야 할 기능으로 가득 찬 우주선"이라면, Pi는 "레고 블록 더미". Pi가 중시하는 세 가지: 미니멀리즘, 커스터마이제이션, 확장성. Pi의 핵심 철학: "워크플로우를 바꾸지 말고 하네스를 바꿔라." Claude Code는 릴리즈마다 시스템 프롬프트, 도구, 동작이 변하지만 Pi는 오픈소스이고 시스템 프롬프트가 매우 작음.

### 컴팩션 커스터마이제이션
LLM의 컨텍스트 윈도우는 제한적이므로 대화가 길어지면 하네스가 오래된 부분을 요약(compaction). Claude Code는 압축이 일어난 것은 볼 수 있지만 제어 불가. Pi에서는 압축 시점, 압축할 메시지 수, 압축에 사용할 모델을 선택 가능. 확장으로 압축 방식 자체를 완전히 교체할 수도 있음.

### TypeScript 확장 시스템
Pi 전환의 가장 큰 이유. 확장은 Pi의 동작을 바꾸는 작은 TypeScript 파일로, 새 도구 추가, 기존 도구 수정, 에이전트 루프 후킹, UI 구축이 가능. 커뮤니티가 만든 확장: 권한 게이트, git 체크포인트, 에이전트 생각 중 게임. 누락된 Claude Code 기능은 Pi 확장으로 대체 가능하며 일부는 개선됨. npm으로 확장 설치하거나 Pi 스스로 확장을 작성(hot reload) 가능.

예시 확장:
- **pi-web-access**: YouTube 자막 추출, 비디오 프레임, GitHub 리포 클론, PDF 다운로드
- **term-draw**: 터미널에서 스케치 후 모델에 입력
- **rm -rf 차단**: 약 10줄 TypeScript로 위험 명령어 확인 대화상자 구현

### 세션 트리 & 모델 스위칭
- 세션이 트리 구조로 저장, 이전 메시지로 돌아가 분기 생성 가능
- 툴 비용, 토큰 수, 비용 확인 가능
- 포크/클론/공유로 공개 URL 획득
- 대화 중 모델 전환: 저렴한 Kimi K2 → 어려운 작업에 Opus → 복귀

### "소유 vs 임대" 프레이밍
Claude Code나 Codex에서는 하네스를 "빌리는 것", Pi에서는 "소유하는 것". Pi의 진정한 위협은 더 나은 기능이 아닌 사용자가 직접 기능을 만드는 생태계. "Anthropic은 개발자가 원하는 것을 결정해야 하지만, Pi는 상자를 만들면 되고 개발자가 나머지를 채움."

## 원문 인용

> "The same model in different harnesses can behave like two completely different agents."

> "If Claude Code is a spaceship full of features you have to learn and that maybe you don't actually use, Pi is a pile of Lego bricks, a handful of pieces, and you build the rest yourself."

> "In those tools you are basically renting the harness. In Pi you own it."

> "Anthropic has to decide what developers want. Pi just had to build a box. The developer will build the rest."

## See also
- [Pi](/wiki/entities/pi/) — 엔티티 페이지
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 하네스 멘탈 모델
- [OpenClaw](/wiki/entities/openclaw/) — Pi 기반 플랫폼
- [Claude Code](/wiki/entities/claude-code/) — 주요 비교 대상
- [컨텍스트 로트 방지](/wiki/concepts/context-rot-prevention/) — 컴팩션과 연관
