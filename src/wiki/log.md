---
title: log
category: log.md
---

# Wiki Activity Log

> Append-only chronological record of all wiki operations.

## [2026-05-13] ingest | Hermes Google Chat 연동 가이드 (2번째 Hermes 설치 영상)
- Ingested: raw/2026-05-13-hermes-google-chat-setup.md
- Updated: wiki/sources/hermes-codex-setup.md (Google Chat 연동, Docker sandbox, Codex→Docker 위임, 초보자 평가 추가)
- Key insight: 메신저 3파전 — Slack(UX 최고), Telegram(설정 최소), Google Chat(Google Workspace 통합). Docker sandbox가 Hermes 파일 작업의 필수 전제. "에이전트로 에이전트 환경 구축" 패턴 등장: Codex --yolo로 Docker 설치 → Hermes 컨테이너 생성까지 자동화. 초보자 시각에서 메신저 연동이 병목이지만 Hermes 자체 설치는 매우 쉽다는 평가.

## [2026-05-13] ingest | Hermes Agent X Codex 실전 설정 가이드
- Ingested: raw/2026-05-13-hermes-codex-setup.md
- Added: wiki/sources/hermes-codex-setup.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: OpenAI Codex 구독 토큰을 Hermes에서 그대로 사용 가능 (추가 비용 제로). 서드파티 연동이지만 현재 작동. Slack이 Telegram보다 멀티 에이전트 관리에 적합 (쓰레드, 채널, UX). Wave Terminal이 Windows CLI 에이전트 사용자에게 오픈소스 대안. Codex CLI로 원격 VPS의 Hermes 설정을 자동 관리하는 "에이전트로 에이전트 관리" 패턴 등장.

## [2026-05-13] ingest | Hermes Agent v0.13.0 — Computer Use, Kanban, /goal
- Ingested: raw/2026-05-13-hermes-agent-v2.md
- Added: wiki/sources/hermes-agent-v2.md
- Updated: wiki/entities/hermes-agent.md (v0.12.0→v0.13.0, Computer Use/Kanban//goal/Qwen 3.6 Plus, 20번째 플랫폼 Google Chat, 개발 속도 테이블), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: "v2.0"은 유튜브 마케팅 표현이며 실제 버전은 v0.13.0. 백그라운드 Computer Use(KUA)가 Codex 스타일의 오픈소스 구현체로 등장 — 커서/키보드/Space 전환 없이 macOS 데스크탑 제어. 칸반 보드가 "독립 AI 도구"에서 "멀티 에이전트 지속적 작업 공간"으로의 전환을 완성. /goal 명령으로 Claude Code/Codex와 기능 경쟁 본격화.

## [2026-05-13] ingest | Claude Code Agent View — 터미널 멀티 세션 TUI
- Ingested: raw/2026-05-13-claude-agent-view.md
- Added: wiki/sources/claudagent-view.md
- Updated: wiki/entities/claude-code.md (Agent View 섹션, See also), wiki/sources/agent-teams.md (See also), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Agent Teams의 Display Mode(Ingress/Split Panes)가 네이티브 터미널 TUI인 Agent View로 진화. `claude agents` 하나의 명령으로 멀티 세션 오케스트레이션이 가능해졌으며, 각 세션은 독립 git worktree에서 격리. 사용자별 수퍼바이저 프로세스가 세션 생명주기를 관리하는 아키텍처 도입. "터미널에서 데스크탑 앱급 멀티 에이전트 경험"이 실현됨.

## [2026-05-12] ingest | agentmemory — AI 코딩 에이전트 영구 메모리
- Ingested: raw/2026-05-12-agentmemory.md
- Added: wiki/sources/agentmemory.md, wiki/entities/agentmemory.md, wiki/concepts/iii-engine.md, wiki/concepts/memory-consolidation-tiers.md, wiki/comparisons/agent-memory-approaches.md, wiki/important/setup/agentmemory.md
- Updated: wiki/entities/claude-code.md (agentmemory 플러그인 섹션, See also), wiki/concepts/filesystem-based-memory.md (agentmemory 사례, See also), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Karpathy LLM Wiki 패턴의 "실제 구현체"가 등장. 파일 기반 정적 메모리(CLAUDE.md)를 4-Tier 동적 메모리 엔진(Working→Episodic→Semantic→Procedural)으로 진화시키며, iii engine이라는 3원시 런타임(Functions+Triggers+KV State) 위에 전체 스택을 재구축. 92% 토큰 절감, 95.2% 검색 정확도, 16개 에이전트 지원. "지식 재구성 > 지식 검색" 테제의 도구급 실증.

## [2026-05-09] ingest | Claude Code Agent Teams 완벽 정리
- Ingested: raw/2026-05-09-claude-code-agent-teams.md
- Added: wiki/sources/agent-teams.md, wiki/concepts/agent-teams.md, wiki/important/setup/agent-teams.md
- Updated: wiki/entities/claude-code.md (Agent Teams 섹션, See also), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Subagent는 "프리랜서"(결과만 보고), Agent Teams는 "팀"(서로 소통). Mailbox(직접 메시지)와 Task List(공유 작업)가 Subagent의 3가지 한계(소통 불가, 단서 소실, 메인 병목)를 구조적으로 해결. 공식 문서가 명시한 전환 타이밍: 에이전트 간 정보 공유가 필요해지는 순간.

## [2026-05-09] ingest | Claude Code Hookify Plugin
- Ingested: raw/2026-05-09-claude-code-hookify-plugin.md
- Added: wiki/sources/hookify.md, wiki/concepts/claude-code-hooks.md, wiki/important/setup/hookify.md, wiki/important/prompts/hookify-rule-templates.md
- Updated: wiki/entities/claude-code.md (플러그인 생태계 섹션, See also), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Hookify는 복잡한 hooks.json 대신 마크다운 파일로 훅을 생성하는 사용성 추상화. 자연어로 규칙을 만들고 즉시 적용. Claude Code의 훅 시스템(PreToolUse/PostToolUse/Stop) 위에 마크다운 레이어를 얹어 "훅의 민주화" 실현.

## [2026-05-08] note | AnimatedSceneBackground 전역화 및 색상 스키마 시스템
- Added: raw/2026-05-08-autopenna-animated-bg-global.md
- Source project: Autopenna
- Key insight: dangerouslySetInnerHTML CSS 주입은 Android WebView에서 불안정 → 반드시 index.css로 이동. GlobalBackground 단일 컴포넌트로 모든 페이지 커버.

## [2026-05-08] ingest | Pi 터미널 코딩 하네스 리뷰
- Ingested: raw/2026-05-08-pi-terminal-coding-harness.md
- Added: wiki/sources/pi-terminal-coding-harness.md, wiki/entities/pi.md
- Updated: wiki/concepts/llm-harness-model.md (Pi 적용 사례, "Model=CPU" 비유), wiki/entities/openclaw.md (Pi 기반 하네스 명시), wiki/entities/claude-code.md (Pi 경쟁 도구 추가), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: 같은 모델이라도 하네스가 다르면 완전히 다른 에이전트. Pi는 기능 경쟁이 아닌 "소유권 경쟁"으로 Claude Code에 도전 — 사용자가 직접 하네스를 구축하는 생태계.

## [2026-05-06] ingest | Hermes Agent GitHub 업데이트 (v0.9.0~v0.12.0)
- Ingested: raw/2026-05-06-hermes-agent-github-update.md
- Added: wiki/sources/hermes-agent-github-update.md
- Updated: wiki/entities/hermes-agent.md (8 백엔드, 19 메시징, Curator, Transport ABC, 개발 속도 테이블), wiki/concepts/closed-learning-loop.md (5단계 루프, Curator), wiki/concepts/llm-harness-model.md (v0.12.0 추가 구성요소), wiki/important/setup/hermes-agent-setup.md (Termux, backup, dashboard, curator, MCP, profiles), wiki/comparisons/openclaw-vs-hermes-agent.md (개발 속도, CLI), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: 자율 Curator가 클로즈 루프에 "큐레이션" 단계를 추가 — 스킬 무한 축적의 엔트로피 문제에 대한 구조적 해답. v0.12.0에서 213명 기여자, 2주 단위 릴리즈의 커뮤니티 기반 폭발적 성장.

## [2026-05-04] ingest | Hermes Agent 독스 기반 기술 리뷰
- Ingested: raw/2026-05-04-hermes-agent-review-beomsu.md
- Added: wiki/sources/hermes-agent-review-beomsu.md, wiki/concepts/llm-harness-model.md, wiki/concepts/closed-learning-loop.md
- Updated: wiki/entities/hermes-agent.md (아키텍처 섹션 추가), wiki/comparisons/openclaw-vs-hermes-agent.md (Discord/CLI 차이점 추가), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Hermes는 "LLM + Harness" 모델 — 단순 래퍼가 아닌 통제 도구 결합. 클로즈 루프 학습(경험→스킬→개선→회상)이 코어. 메모리와 대화 기록의 분리가 핵심 설계.

## [2026-05-06] work | autopenna 등장인물 배치 시스템 1차 구현
- Added: raw/2026-05-06-autopenna-work-casting-system-implementation.md
- Updated: wiki/log.md
- Source project: autopenna
- Key insight: 캐스팅 시스템은 `CastCharacter`/`CastingPlan`을 별도 계층으로 두고, 게임은 자동 캐스팅 후 자동 진행, 글쓰기/커스텀은 수동 배치를 제공했다. 스토리 전용 캐릭터는 메모리 없이 시작하고 메인 등장인물 승격 후에만 메모리 대상이 된다.

## [2026-05-06] work | autopenna 등장인물 배치 시스템 설계
- Added: raw/2026-05-06-autopenna-work-casting-system-plan.md
- Updated: wiki/log.md
- Source project: autopenna
- Key insight: 기존 `CharacterTemplate`을 직접 확장하기보다 캐스팅용 `CastCharacter`/`CastingPlan` 계층을 두면, 내장 캐릭터와 스토리 전용 적/네임드/조연을 같은 roster로 다루면서 공방 탭과 WorldFrame/연대기 입력을 안정적으로 연결할 수 있다. 게임은 자동 캐스팅 후 2초 뒤 자동 진행, 글쓰기/커스텀은 수동 캐스팅으로 확정.

## [2026-05-06] work | autopenna Ollama 큐와 게임 진행 표시
- Added: raw/2026-05-06-autopenna-work-ollama-queue-game-progress.md
- Updated: wiki/log.md
- Source project: autopenna
- Key insight: 스토리 시작 메모리 피크는 모델 로드와 긴 context에 더해 서버 병렬 요청이 겹치면 악화될 수 있으므로, `chatOllamaStream()` 단일 진입점에서 promise chain 큐로 Ollama 호출을 직렬화하고 게임 생성 UI는 streaming text/progress로 대기 상태를 드러내야 한다.

## [2026-05-06] work | autopenna WritingPage 점검 후 수정
- Added: raw/2026-05-06-autopenna-work-writing-page-review-fixes.md
- Updated: wiki/log.md
- Source project: autopenna
- Key insight: idle suggestion hook은 early return 이전에 항상 호출해야 하며, context 변경 cleanup 이후에도 idle timer를 재등록해야 한다. 페이지 변경은 debounce autosave로 persist 안정성을 보강했다.

## [2026-05-06] work | autopenna WritingPage 시스템 계획 구현 보강
- Added: raw/2026-05-06-autopenna-work-writing-page-system-plan-implementation.md
- Updated: wiki/log.md
- Source project: autopenna
- Key insight: 페이지형 textarea 구현 위에 `useIdleSuggestion`, page splitter, 설정 토글, 페이지 CRUD, 새 페이지/단축키/빈 페이지 정리를 추가해 문서의 시스템 계획에 맞췄다.

## [2026-05-05] work | autopenna WritingPage 페이지형 textarea 구현
- Added: raw/2026-05-05-autopenna-work-paged-textarea-editor-implementation.md
- Updated: wiki/log.md
- Source project: autopenna
- Key insight: 원고 입력은 Tiptap 대신 native textarea를 페이지 단위로 유지하고, hidden mirror pagination과 `Chapter.pages` 저장 동기화로 스크롤 없는 작성 UX를 구현했다.

## [2026-05-05] work | autopenna LLM 미들웨어 + 캐릭터 채팅 메모리 계획
- Added: raw/2026-05-05-autopenna-work-llm-middleware-character-chat-memory-plan.md
- Updated: wiki/entities/autopenna.md, wiki/log.md
- Source project: autopenna
- Key insight: 웹 LLM 호출은 Hono 미들웨어가 로컬 Ollama와 통신하고, 캐릭터 채팅 메모리 합성/저장은 서버 통합 endpoint가 맡는다.

## [2026-04-29] ingest | Warp Terminal — 오픈소스화 + 자동완성 아키텍처
- Ingested: raw/2026-04-29-warp-terminal.md
- Added: wiki/sources/warp-terminal.md, wiki/entities/warp-terminal.md, wiki/concepts/lean-autocomplete-architecture.md
- Updated: wiki/concepts/brevity-accuracy-tradeoff.md (See also), wiki/concepts/essential-accidental-complexity.md (sources), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: "영리한 알고리즘이 아닌 영리한 아키텍처" — Warp 자동완성은 Trie/인덱스 없이 starts_with()+메모리 올인+비동기 I/O로 속도 달성. "간결성=정확성" 테제의 아키텍처급 실증

## [2026-04-29] ingest | Quarkdown — Turing-complete Markdown 조판 시스템
- Ingested: raw/2026-04-29-quarkdown.md
- Added: wiki/sources/quarkdown.md, wiki/entities/quarkdown.md, wiki/concepts/turing-complete-markdown.md, wiki/comparisons/markdown-typesetting-systems.md, wiki/important/setup/quarkdown.md
- Updated: wiki/concepts/knowledge-repository-evolution.md (진화 단계 추가), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Markdown에 함수 호출을 도입한 Turing-complete 조판 시스템. 하나의 소스에서 책/논문/슬라이드/위키 모두 생성 가능. LLM Wiki의 출력 포맷으로 직접 활용 가능. "구조가 곧 프롬프트" 테제의 확장 — 구조화된 Markdown이 곧 실행 가능한 프로그램

## [2026-04-28] ingest | mcp-chrome — Chrome Extension 기반 MCP 서버
- Ingested: raw/2026-04-28-mcp-chrome.md
- Added: wiki/sources/mcp-chrome.md, wiki/entities/mcp-chrome.md, wiki/comparisons/browser-automation-approaches.md, wiki/important/setup/mcp-chrome.md
- Updated: wiki/entities/agent-browser.md (See also), wiki/entities/claude-code.md (MCP 서버, See also), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: 브라우저 자동화에 3가지 접근법이 공존 — Playwright MCP(깨끗한 환경), agent-browser(컨텍스트 효율), mcp-chrome(사용자 환경 보존). 목적에 따라 선택 기준이 다름

## [2026-04-29] ingest | OpenClaw vs Hermes Agent 한달 실전 비교
- Ingested: raw/2026-04-29-zerocho-openclaw-vs-hermes.md
- Added: wiki/sources/zerocho-openclaw-vs-hermes.md, wiki/comparisons/openclaw-vs-hermes-agent.md
- Updated: wiki/entities/openclaw.md, wiki/entities/hermes-agent.md, wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: AI 에이전트 간 "유전자 차이" — 설정으로 극복 불가능한 근본적 설계 차이가 존재. 갈아타기가 아닌 역할 분담이 최적

## [2026-04-29] ingest | Claude Managed Agents Memory — 파일시스템 기반 내장 메모리
- Ingested: raw/2026-04-29-claude-managed-agents-memory.md
- Added: wiki/sources/claude-managed-agents-memory.md, wiki/entities/managed-agents.md, wiki/concepts/filesystem-based-memory.md
- Updated: wiki/entities/claude-code.md, wiki/entities/mcp-protocol.md, wiki/concepts/context-rot-prevention.md, wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: 파일시스템 기반 메모리 = Claude Code CLAUDE.md 패턴의 클라우드 공식 구현. "구조가 곧 프롬프트"가 메모리 계층에서도 실증됨

## [2026-04-28] ingest | agent-browser — Vercel Labs 브라우저 자동화 CLI
- Ingested: raw/2026-04-28-agent-browser.md
- Added: wiki/sources/agent-browser.md, wiki/entities/agent-browser.md, wiki/entities/vercel-labs.md, wiki/concepts/ref-based-selection.md, wiki/concepts/client-daemon-architecture.md, wiki/important/setup/agent-browser.md
- Updated: wiki/entities/claude-code.md (Skills 통합 섹션), wiki/concepts/context-rot-prevention.md (See also), wiki/concepts/brevity-accuracy-tradeoff.md (See also), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: MCP 없이도 브라우저 자동화가 가능함을 실증. ref 기반 선택이 CSS 선택자보다 AI 친화적이며 82% 적은 컨텍스트로 동등 정확도 달성. "간결성=정확성" 트레이드오프의 도구급 실증.

## [2026-04-27] ingest | Anthropic — MCP 프로덕션 에이전트 패턴
- Ingested: raw/2026-04-27-claude-mcp-production-agents.md
- Added: wiki/sources/claude-mcp-production-agents.md, wiki/entities/mcp-protocol.md, wiki/concepts/intent-grouped-tools.md, wiki/concepts/code-orchestration.md, wiki/concepts/mcp-apps.md, wiki/concepts/tool-search.md, wiki/concepts/programmatic-tool-calling.md, wiki/comparisons/api-vs-cli-vs-mcp.md
- Updated: wiki/entities/claude-code.md, wiki/concepts/context-rot-prevention.md, wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: MCP가 에이전트-시스템 연결의 "복리 레이어"로 자리잡음. Intent-grouped tools, code orchestration, tool search, programmatic tool calling이 구조적 최적화 패턴. "구조가 곧 프롬프트" 테제가 프로토콜 설계에서도 실증.

## [2026-04-24] ingest | 헤이제임스 — Superpowers vs GSD vs gstack Claude 코딩 프레임워크 비교
- Ingested: raw/2026-04-24-heyjames-claude-code-frameworks.md
- Added: wiki/sources/heyjames-claude-code-frameworks.md, wiki/entities/heyjames.md, wiki/entities/superpowers.md, wiki/entities/gsd.md, wiki/entities/gstack.md, wiki/concepts/context-rot-prevention.md, wiki/concepts/tdd-enforcement.md, wiki/concepts/role-based-ai-governance.md, wiki/comparisons/claude-code-framework-comparison.md
- Updated: wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Claude Code 프레임워크 3종이 각각 다른 축(실행/컨텍스트/의사결정)을 최적화하며 레이어 조합 가능. gstack(결정) → GSD(환경) → Superpowers(실행). Context rot 임계값(0-30%/50%/70%)은 "구조가 곧 프롬프트" 테제의 실증 — 구조 없이 컨텍스트만 채우면 품질 저하 불가피.

## [2026-04-25] work | ilgisseoyeong GemmaAIEngine 네이티브 플러그인 트러블슈팅
- Added: raw/2026-04-25-ilgisseoyeong-work-native-plugin-troubleshooting.md
- Updated: wiki/sources/mobile-app-guidelines.md (Capacitor 플러그인 복제 체크리스트, Android 11+ 권한), wiki/index.md, wiki/log.md
- Key insight: "그대로 복제"인데 문제 발생한 근본 원인 = Kotlin 소스 유실 + 빌드 캐시 의존. 5개 연쇄 문제: JS정의 누락 → plugins.json 미등록 → AAR DEX 누락 → MANAGE_EXTERNAL_STORAGE → LiteRTLM SDK 누락. 해결: 라이브러리 모듈 래핑 + Maven 의존성 추가.

## [2026-04-24] setup | ilgisseoyeong (일기써영) LLM Wiki 연동
- Added: raw/2026-04-24-project-ilgisseoyeong-setup.md, wiki/entities/ilgisseoyeong.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: autopenna에서 일기써영(영어 일기 앱)으로 마이그레이션. 게임/스토리 코드 삭제, AI 교정 기능 유지. 기술 스택: React 19 + TypeScript 6 + Vite 7 + Capacitor 8 + Zustand 5 + Gemma

## [2026-04-24] setup | figma (영어APP) LLM Wiki 연동
- Added: raw/2026-04-24-project-figma-setup.md, wiki/entities/figma-project.md
- Updated: wiki/index.md (entities), wiki/log.md
- Key insight: 영어APP Figma→HTML 변환 프로젝트에 LLM Wiki 연동. 피그마 파일 10화면 + 디자인시스템 4페이지. 기술 스택: Figma MCP → HTML/CSS/JS.

## [2026-04-24] ingest | 갓대희 — Figma MCP 설치 및 사용방법
- Ingested: raw/2026-04-24-goddaehee-figma-mcp-setup.md
- Added: wiki/sources/figma-mcp-setup-usage.md, wiki/entities/figma.md, wiki/entities/goddaehee.md, wiki/concepts/design-to-code-workflow.md, wiki/important/setup/figma-mcp-setup.md
- Updated: wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Figma MCP는 양방향 도구 — Figma→Code뿐 아니라 Code→Figma 역캡처도 가능. 스크린샷 대신 구조화된 메타데이터 전달이 픽셀 퍼펙트의 핵심. 13개 Tool 체계적 호출 순서 존재. "구조가 곧 프롬프트" 테제와 직결.

## [2026-04-24] work | autopenna 빌드 파이프라인 정리
- Added: raw/2026-04-24-autopenna-work-build-pipeline.md
- Updated: wiki/sources/mobile-app-guidelines.md (npm 11 --include=dev, vite 7, APK 경로 변경), wiki/index.md, wiki/entities/autopenna.md
- Key insight: npm 11 기본 omit=dev로 devDependencies 미설치. `npm install --include=dev` 필수. vite 8.x는 @vitejs/plugin-react와 peer dep 충돌 → 7.x 사용. APK 복사 경로 `/Volumes/Vol3So/`.

## [2026-04-22] setup | multiagent LLM Wiki 연동
- Added: raw/2026-04-22-project-multiagent-setup.md, wiki/entities/multiagent.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: multiagent에 LLM Wiki 자동 기록 지침 주입 완료. 기술 스택: Hono+Vite+React+Tailwind

## [2026-04-24] setup | Z AI MCP 서버 설정 기록
- Added: raw/2026-04-24-setup-zai-mcp-server.md, wiki/important/setup/zai-mcp-server.md
- Updated: wiki/index.md (important/setup, stats), wiki/log.md
- Key insight: Z AI 사용 시 `npx @z_ai/coding-helper` MCP 서버 설정 필수. 이미지 분석, 데이터 시각화, UI 비교, 에러 진단, OCR, 기술 다이어그램, 동영상 분석 기능 제공.

## [2026-04-24] ingest | GPT 이미지 2.0 핵심 활용법 15가지
- Ingested: raw/2026-04-24-gpt-image-2-15-use-cases.md (203줄 자막 전문)
- Added: wiki/sources/gpt-image-2-15-use-cases.md
- Updated: wiki/index.md (sources, entities, stats), wiki/log.md, wiki/overview.md
- Key insight: GPT 이미지 2.0의 수정 능력이 핵심 차별화. "AI 이미지는 생성보다 수정이 문제"인데 ChatGPT는 원하는 부분만 깔끔하게 수정 반영. 띵킹 모드로 자율 조사→추론→이미지 생성 파이프라인. 상세페이지, 랜딩페이지, 브랜드 키트 등 상업용 즉시 활용 가능. 숫자 계산도 정확.

## [2026-04-24] correction | 전역 환경변수 PORT로 인한 포트 충돌 및 다른 서비스 kill 사고
- Added: raw/2026-04-24-stashyoutube-correction-port-env-override.md, wiki/corrections/port-env-override.md
- Severity: high
- Updated: wiki/index.md, wiki/log.md
- Source project: stashYoutube
- Key insight: 프로젝트 포트는 상수로 하드코딩. process.env.PORT 사용 금지. 광역 kill 명령어 절대 금지. run.sh로만 서버 구동.

## [2026-04-24] ingest | 소스놀이터 — GPT 이미지 2.0 코덱스 웹툰 자동화 시연
- Ingested: raw/2026-04-24-gpt-image-2-codex-webtoon.md (144줄 자막 전문)
- Added: wiki/sources/gpt-image-2-codex-webtoon.md, wiki/entities/source-playground.md, wiki/important/setup/codex-image-generation.md
- Updated: wiki/index.md (sources, entities, important/setup, stats), wiki/log.md, wiki/overview.md (Quick Access에 코덱스 설정 추가)
- Key insight: GPT 이미지 2.0의 한국어 렌더링이 나노바나나 프로 압도. 코덱스 CLI에서 무제한 이미지 생성 가능(config 설정만으로). 코덱스 자율 에이전트가 웹 조사→이미지 생성→비교 분석까지 전체 파이프라인 자동화

## [2026-04-23] ingest | Tiptap 리치 텍스트 에디터
- Ingested: raw/2026-04-23-tiptap-rich-text-editor.md
- Added: wiki/sources/tiptap-rich-text-editor.md, wiki/entities/prosemirror.md, wiki/concepts/react-node-view.md, wiki/important/setup/tiptap-react-setup.md
- Updated: wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: textarea는 인라인 UI 요소 배치가 불가능. contenteditable 기반 에디터(Tiptap)의 React Node Views가 해결책. `atom: true` + `inline: true` + `NodeViewWrapper as="span"` 조합으로 텍스트 내부에 버튼/마커 삽입. Autopenna 뷰어의 EffectMarker 구현에 적용.

## [2026-04-23] ingest | TTJ 바이브코딩 재컴파일 — 자막 전문 보존 파이프라인 적용
- Ingested: raw/2026-04-23-ttj-vibe-coding-monetization-interviews-v2.md (4182줄), raw/2026-04-23-ttj-vibe-coding-cheatkey-15-v2.md (384줄), raw/2026-04-23-ttj-vibe-coding-basics-web-dev-v2.md (1005줄), 8개 쇼츠 raw 파일
- Added: wiki/important/workflows/vibe-coding-15-keys.md, wiki/important/prompts/vibe-coding-persona.md, wiki/important/prompts/vibe-coding-ui-ux.md
- Updated: wiki/sources/ttj-vibe-coding-monetization-interviews.md (30줄→120줄, 인터뷰별 상세 내용 추가), wiki/sources/ttj-vibe-coding-cheatkey-15.md (30줄→130줄, 15개 키별 상세 설명), wiki/sources/ttj-vibe-coding-basics-web-dev.md (30줄→130줄, 용어별 구체적 설명), wiki/sources/ttj-vibe-coding-shorts-tips.md (30줄→100줄, 8개 쇼츠 개별 상세), wiki/index.md, wiki/log.md
- Key insight: 개선된 파이프라인(raw=자막 전문 보존)으로 소스 페이지 분량 4~5배 증가. 수익화 인터뷰 raw 63줄→4182줄. important/ 폴더에 즉시 사용 가능한 프롬프트 3종과 워크플로우 1종 자동 생성

## [2026-04-23] ingest | 투더제이 바이브코딩 심층 배치 — 수익화 인터뷰, 치트키 15, 웹 개발 기초, 쇼츠 팁 8개
- Ingested: raw/2026-04-23-ttj-vibe-coding-monetization-interviews.md, raw/2026-04-23-ttj-vibe-coding-cheatkey-15.md, raw/2026-04-23-ttj-vibe-coding-basics-web-dev.md, raw/2026-04-23-ttj-vibe-coding-shorts-tips.md
- Added: wiki/sources/ttj-vibe-coding-monetization-interviews.md, wiki/sources/ttj-vibe-coding-cheatkey-15.md, wiki/sources/ttj-vibe-coding-basics-web-dev.md, wiki/sources/ttj-vibe-coding-shorts-tips.md, wiki/concepts/vibe-coding-cheatkey.md
- Updated: wiki/entities/ttj.md (수익화 인터뷰, 치트키, 부트캠프 정보 추가), wiki/sources/ttj-vibe-coding-ui.md (See also 추가), wiki/synthesis/structure-as-implicit-prompt.md (치트키 15 소스 추가), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: 투더제이의 치트키 15가 "구조가 곧 프롬프트" 테제의 대중화 버전. CLAUDE.md 규칙 파일, PRD, 프롬프트 체이닝 모두 "구조로 AI를 조련하는" 방법. 수익화 사례 4건이 바이브 코딩의 실용적 가치를 증명.

## [2026-04-23] ingest | Shannon — Keygraph 자율 AI 침투테스트
- Ingested: raw/2026-04-23-keygraph-shannon-ai-pentester.md
- Added: wiki/sources/keygraph-shannon-ai-pentester.md, wiki/entities/shannon.md, wiki/entities/keygraph.md
- Updated: wiki/concepts/multi-agent-hierarchy.md (Shannon 보안 테스트 실례 추가), wiki/concepts/agent-coordination.md (Shannon 병렬 조정 추가), wiki/concepts/verification-driven-development.md (보안 테스트 맥락 추가), wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Shannon이 "구조가 곧 프롬프트" 테제의 강력한 실례. 5단계 파이프라인 구조가 AI에게 보안 테스트 방법을 암묵적으로 지시. "No Exploit, No Report" = VDD의 보안 적용. Claude Agent SDK 생태계가 보안 영역으로 확장.

## [2026-04-23] ingest | 컴파일 배치 — Vibe to Spec, 시각화 스킨, stashYoutube
- Ingested: raw/메타프롬프트 Vibe to Spec 앱 개발 기획 변환기2025-06-10T153302+0900.md, raw/클로드 100개 시각화 스킨 무료 배포! (Claude 3.7 Sonnet 시각화)2025-03-17T154622+0900.md, raw/2026-04-22-project-stashyoutube-setup.md
- Added: wiki/sources/vibe-to-spec.md, wiki/concepts/vibe-to-spec.md, wiki/sources/claude-visualization-skins.md, wiki/concepts/visualization-prompt-template.md, wiki/entities/aikorea-community.md
- Updated: wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: 두 소스 모두 "구조화된 프롬프트 템플릿" 패턴의 구체적 실례. Vibe to Spec은 페르소나+단계 구조로 비전문가→전문가 번역, 시각화 스킨은 스타일-콘텐츠 분리로 1프롬프트→100디자인. 둘 다 "구조가 곧 프롬프트" 테제의 새로운 층위.

## [2026-04-23] ingest | 모두의 명작 — 2026 Q1 애니 레전드
- Ingested: raw/2026-04-23-modueu-myeongjak-anime-q1.md
- Added: wiki/sources/modueu-myeongjak-anime-q1.md, wiki/entities/modueu-myeongjak.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: Playwright로 YouTube community post 접근 성공. 2026 Q1 애니 하이라이트 — 주술회전 3기 IMDb 9.9, 스틸 볼 런 공개, 프리렌·최애의 아이 귀환. 위키 범위를 AI/기술 넘어 개인 관심사로 확장.

## [2026-04-23] ingest | 투더제이 바이브코딩 UI + 모두의명작 애니 Q1
- Ingested: raw/2026-04-23-ttj-vibe-coding-ui.md, raw/2026-04-23-modui-myeongjak-anime-q1.md
- Added: wiki/sources/ttj-vibe-coding-ui.md, wiki/sources/modui-myeongjak-anime-q1.md, wiki/entities/ttj.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: 바이브 코딩의 "이해=컨트롤"은 "구조가 곧 프롬프트" 테제와 동일. UI/UX 용어를 아는 것이 곧 프롬프트의 질을 결정. 클론 코딩 = 남의 소스를 분석해 자신의 지식으로 축적 = LLM Wiki 패턴과 동일. 모두의명작 포스트는 애니 콘텐츠로 위키 스코프 밖.

## [2026-04-22] setup | stashYoutube LLM Wiki 연동
- Added: raw/2026-04-22-project-stashyoutube-setup.md, wiki/entities/stashyoutube.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: stashYoutube에 LLM Wiki 자동 기록 지침 주입 완료. 기술 스택: React 19 + Vite 7 + TypeScript 5.9 + Express 4

## [2026-04-22] ingest | claude-context 시맨틱 코드 검색
- Ingested: raw/2026-04-22-claude-context-semantic-search.md
- Added: wiki/sources/claude-context-semantic-search.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: claude-context는 코드를 벡터로 인덱싱, LLM Wiki는 지식을 위키로 컴파일 — 둘 다 "사전 처리"로 "매번 재검색" 문제 해결. 스킬 업데이트: Playwright 폴백, 이미지 텍스트 추출 추가.

## [2026-04-22] ingest | YouTube 포스트 Playwright 재수집
- Ingested: raw/2026-04-22-weekdaycode-ai-news.md, raw/2026-04-22-gymcoding-ai-second-brain.md
- Added: wiki/sources/weekdaycode-ai-news.md, wiki/sources/gymcoding-ai-second-brain.md, wiki/entities/weekdaycode.md, wiki/entities/gymcoding.md
- Updated: wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: Playwright로 YouTube community post 접근 성공. 짐코딩 포스트에서 LLM Wiki 패턴(3폴더 구조)이 이 위키와 동일하게 소개됨. "AI 세컨드 브레인" 용어로 대중화 중, 조회수 1800만 돌파. WeekdayCode에서 Claude Code 토큰 소비 버그 언급.

## [2026-04-22] ingest | Playwright MCP 설정
- Ingested: raw/2026-04-22-playwright-mcp-setup.md
- Added: wiki/sources/playwright-mcp-setup.md
- Updated: wiki/entities/claude-code.md (MCP 서버 섹션 추가), wiki/index.md, wiki/log.md
- Key insight: `claude mcp add playwright --scope user -- npx -y @playwright/mcp@latest`로 글로벌 브라우저 자동화 추가. YouTube community post 등 쿠키 동의 벽 통과 가능.

## [2026-04-22] ingest | 컴파일 배치 — Caveman, GN#352
- Ingested: raw/2026-04-22-caveman-token-reduction.md, raw/2026-04-22-geeknews-weekly-352.md, raw/2026-04-22-youtube-post-access-failed-1.md, raw/2026-04-22-youtube-post-access-failed-2.md
- Archived: raw/2026-04-22-pattern-uilens.md, raw/2026-04-22-project-autopenna-setup.md (기존 컴파일분)
- Added: wiki/sources/caveman-token-reduction.md, wiki/sources/geeknews-weekly-352.md, wiki/concepts/brevity-accuracy-tradeoff.md, wiki/concepts/knowledge-repository-evolution.md, wiki/entities/geeknews.md, wiki/entities/karpathy.md
- Updated: wiki/entities/claude-code.md (소스 유출, 내부 구조, 숨겨진 기능), wiki/concepts/rag.md, wiki/concepts/memex.md, wiki/concepts/compounding-artifact.md, wiki/synthesis/structure-as-implicit-prompt.md, wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: GN#352 에디토리얼이 LLM Wiki 패턴을 공식 큐레이션. "간결성=정확성"은 "구조가 곧 프롬프트" 테제의 새로운 층위. YouTube community post는 yt-dlp/webReader/WebSearch 모두 접근 불가.

## [2026-04-22] ingest | UILens 패턴 — 범용 UI 메타정보 롱프레스 검사 시스템
- Added: raw/2026-04-22-pattern-uilens.md, wiki/concepts/uilens-pattern.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: UILens는 3개 파일(Context + Sheet + useLongPress)만으로 어떤 React 프로젝트에든 이식 가능. 핵심은 UILensInfo 인터페이스 — tags는 모든 요소에 필수, promptTemplate은 AI 버튼에만 선택. 16개 AI 호출 지점과 일반 UI 요소에 적용 검증 완료.

## [2026-04-22] setup | autopenna LLM Wiki 연동
- Added: raw/2026-04-22-project-autopenna-setup.md, wiki/entities/autopenna.md
- Updated: wiki/index.md, wiki/log.md
- Key insight: autopenna에 LLM Wiki 자동 기록 지침 주입 완료. 기술 스택: React 19 + TypeScript + Vite 6 + Capacitor + Tailwind + Zustand + Gemma

## [2026-04-22] ingest | 컴파일 배치
- Ingested: raw/모바일앱 지침.md, raw/이미지 프롬프트.md
- Archived: raw/claude-code-game-studios.md, raw/ecs-code-complexity.md, raw/llm-wiki-pattern.md (기존 컴파일분)
- Added: wiki/sources/mobile-app-guidelines.md, wiki/sources/image-prompt-chroma-key.md, wiki/concepts/safe-area-inset.md
- Updated: wiki/index.md, wiki/log.md, wiki/overview.md
- Key insight: 모바일 안전 영역 처리는 중첩 구조로 오버레이를 격리하는 것이 핵심. 단순하지만 반복적으로 필요한 패턴.

## [2026-04-16] synthesis | Cross-Theme Development
- Added: wiki/synthesis/structure-as-implicit-prompt.md, wiki/comparisons/ecs-vs-multi-agent-coordination.md
- Updated: wiki/concepts/ecs-philosophy.md (cross-references), wiki/concepts/agent-coordination.md (cross-references), wiki/overview.md, wiki/index.md
- Key insight: 두 소스에서 독립적으로 등장한 "깔끔한 구조가 AI 코드 품질을 높인다"는 통찰을 "구조가 곧 프롬프트다"라는 thesis로 발전. ECS의 "시스템 간 호출 금지"와 멀티에이전트의 "도메인 경계"가 구조적 동형성(structural isomorphism)을 가짐을 발견.

## [2026-04-16] ingest | 코드가 복잡해지는 진짜 이유, 범인은 관계다
- Added: wiki/sources/ecs-code-complexity.md, wiki/concepts/ecs-philosophy.md, wiki/concepts/essential-accidental-complexity.md, wiki/concepts/data-oriented-design.md, wiki/entities/arrays-devbook.md
- Updated: wiki/overview.md, wiki/index.md
- Key insight: 코드 복잡도의 진짜 원인은 기능이 아니라 관계. ECS는 시스템 간 호출을 원천 차단하여 관계 복잡도를 제거. 콜백/이벤트도 근본 해결책이 아님(실행 흐름 관점에서 동일). 순수 ECS가 아니어도 철학 적용 가능.

## [2026-04-16] ingest | Claude Code Game Studios
- Added: wiki/sources/claude-code-game-studios.md, wiki/concepts/multi-agent-hierarchy.md, wiki/concepts/agent-coordination.md, wiki/concepts/verification-driven-development.md, wiki/entities/donchitos.md, wiki/entities/claude-code.md
- Updated: wiki/overview.md, wiki/index.md
- Key insight: 49 에이전트 3티어 계층 구조가 멀티에이전트 아키텍처의 구체적 구현 사례. 협업 프로토콜(Ask→Present→Decide→Draft→Approve)은 자율 시스템이 아닌 인간 중심 조정 모델.

## [2026-04-16] ingest | LLM Wiki Pattern
- Added: wiki/sources/llm-wiki-pattern.md, wiki/concepts/rag.md, wiki/concepts/compounding-artifact.md, wiki/concepts/memex.md
- Updated: wiki/overview.md (created), wiki/index.md, wiki/log.md
- Key insight: LLM Wiki 패턴의 핵심은 RAG의 "매번 재발견" 문제를 "compile once, query compiled knowledge"로 전환하는 것. Vannevar Bush의 Memex(1945)와 정신적 연결.

## [2026-04-16] setup | Wiki Initialized
- Created folder structure: raw/, raw/assets/, wiki/ with subdirectories
- Created schema: CLAUDE.md
- Created index.md, log.md, overview.md
- No sources ingested yet
