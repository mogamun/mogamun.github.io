---
title: Pi
created: 2026-05-08
updated: 2026-05-08
tags: [entity, tool, terminal, coding-harness, open-source, extensions, typescript]
sources: [2026-05-08-pi-terminal-coding-harness.md]
status: stable
category: entities
---

# Pi

## 정체
미니멀 터미널 코딩 하네스. 오픈소스이며, 작은 시스템 프롬프트와 TypeScript 확장 시스템을 특징으로 함. OpenClaw의 기반이 되는 동일 하네스. "워크플로우를 바꾸지 말고 하네스를 바꿔라"는 철학.

## 역할
- AI 코딩 에이전트를 실행하는 최소한의 터미널 환경
- 수백 개 모델 지원 (모든 주요 프로바이더)
- 대화 중 모델 전환 가능 (저렴한 모델 ↔ 고성능 모델)
- 세션 트리 구조: 분기, 포크, 공개 URL 공유
- 컴팩션 커스터마이제이션: 시점, 메시지 수, 압축 모델 선택

## 핵심 기능

### 확장 시스템 (Extensions)
Pi의 핵심 차별화 요소. 작은 TypeScript 파일로 Pi의 동작 변경:
- 새 도구 추가, 기존 도구 수정
- 에이전트 루프 후킹, 커스텀 UI 구축
- npm으로 설치: `pi install npm:@scope/package`
- Pi 스스로 확장 작성 + hot reload
- 커뮤니티 확장: 권한 게이트, git 체크포인트, MCP 지원, 서브에이전트, 가드레일

### 대표 확장
| 확장 | 기능 |
|------|------|
| pi-web-access | YouTube 자막, 비디오 프레임, GitHub 클론, PDF 다운로드 |
| term-draw | 터미널 스케치 → 모델 입력 |
| oh-my-pi | LSP, Python, 브라우저, 서브에이전트 통합 팩 |
| bo-pi | 도구 실행 전 승인 (안전한 YOLO 모드) |

### 컴팩션 제어
Claude Code와 달리 압축을 완전히 커스터마이즈:
- 압축 시점 선택
- 압축할 메시지 수 지정
- 압축에 사용할 모델 선택
- 확장으로 압축 방식 자체 교체 가능

### 세션 트리
- 대화가 트리 구조로 저장 (선형 아님)
- 이전 메시지에서 분기 생성 → 다른 접근 시도
- 포크/클론/공유 → 공개 URL 획득
- 툴 비용, 토큰 수, 비용 추적

## Claude Code와의 비교

| 측면 | Claude Code | Pi |
|------|-------------|-----|
| 철학 | 풀 피처드 (spaceship) | 미니멀 (Lego bricks) |
| 시스템 프롬프트 | 크고 불투명 | 작고 공개 |
| 확장성 | hooks, skills | TypeScript extensions |
| 컴팩션 | 자동, 제어 불가 | 시점/수/모델 선택 |
| 모델 | Claude만 | 수백 개 프로바이더 |
| 세션 | 선형 | 트리 (분기/포크/공유) |
| 소유권 | 임대 | 소유 |

## 관련 프로젝트/맥락
- 공식 사이트: pi.dev
- GitHub: pi-mono 저장소 (26,300+ stars)
- OpenClaw: Pi 하네스 기반 AI 어시스턴트 플랫폼
- "소유 vs 임대" 프레이밍: Claude Code/Codex는 하네스를 빌리는 것, Pi는 소유하는 것

## See also
- [Pi 터미널 코딩 하네스 리뷰](/wiki/sources/pi-terminal-coding-harness/) — 상세 소스
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — 하네스 멘탈 모델
- [OpenClaw](/wiki/entities/openclaw/) — Pi 기반 플랫폼
- [Claude Code](/wiki/entities/claude-code/) — 주요 경쟁 도구
- [컨텍스트 로트 방지](/wiki/concepts/context-rot-prevention/) — 컴팩션과 연관
