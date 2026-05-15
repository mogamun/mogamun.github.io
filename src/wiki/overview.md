---
title: Wiki Overview
created: 2026-04-16
updated: 2026-05-13
tags: [overview, meta]
sources: [2026-04-22-geeknews-weekly-352.md, 2026-04-22-caveman-token-reduction.md, 2026-04-27-imagesorcery-mcp.md, 2026-04-29-claude-managed-agents-memory.md, 2026-04-29-quarkdown.md, 2026-04-29-warp-terminal.md, 2026-05-04-hermes-agent-review-beomsu.md, 2026-05-06-hermes-agent-github-update.md, 2026-05-08-pi-terminal-coding-harness.md, 2026-05-09-claude-code-hookify-plugin.md, 2026-05-12-agentmemory.md, 2026-05-13-claude-agent-view.md, 2026-05-13-hermes-agent-v2.md, 2026-05-13-hermes-codex-setup.md]
status: stable
category: overview.md
---

# Wiki Overview

## Quick Access — Important
- [바이브코딩 치트키 15 워크플로우](/wiki/important/workflows/vibe-coding-15-keys/) — 5그룹 15단계 AI 조련 워크플로우
- [바이브코딩 페르소나 프롬프트](/wiki/important/prompts/vibe-coding-persona/) — AI 역할 부여 프롬프트 4종 (복붙 가능)
- [바이브코딩 UI/UX 프롬프트](/wiki/important/prompts/vibe-coding-ui-ux/) — UI 품질 향상 프롬프트 5종
- [Hookify 규칙 템플릿](/wiki/important/prompts/hookify-rule-templates/) — Claude Code 훅 규칙 8종 (파괴적 명령 차단, 디버그 감지, 테스트 강제)
- [Hookify 설정 가이드](/wiki/important/setup/hookify/) — 마크다운으로 훅 생성, 자연어→규칙 자동 변환
- [Agent Teams 설정](/wiki/important/setup/agent-teams/) — Claude Code 팀 협업 활성화 (Mailbox, Task List, Spawn)
- [agentmemory 설정](/wiki/important/setup/agentmemory/) — AI 코딩 에이전트 영구 메모리 (16 에이전트, 51 MCP tools, 4-Tier 기억)
- [agent-browser 설정](/wiki/important/setup/agent-browser/) — AI 에이전트용 브라우저 자동화 CLI (Rust, 82% 적은 컨텍스트)
- [mcp-chrome 설정](/wiki/important/setup/mcp-chrome/) — Chrome Extension 기반 MCP 서버 (사용자 실제 브라우저, 20+ 툴)
- [코덱스 이미지 무제한 생성 설정](/wiki/important/setup/codex-image-generation/) — Codex CLI에서 GPT 이미지 2.0 무제한 사용 설정
- [Figma MCP 서버 설정](/wiki/important/setup/figma-mcp-setup/) — Figma MCP 원격 서버 설정 (Claude Code, OAuth)
- [AI 코딩 프레임워크 4종 따라하기](/wiki/important/setup/ai-coding-frameworks-setup/) — Superpowers/GSD/gstack/Hermes 설치~첫사용 가이드
- [OpenClaw + Codex 이미지 자동화 설정](/wiki/important/setup/openclaw-codex-image-gen/) — OpenClaw 플러그인으로 GPT 이미지 2.0 대량 자동 생성
- [ImageSorcery MCP 설정](/wiki/important/setup/imagesorcery-mcp-setup/) — 로컬 이미지 처리 17개 도구 MCP 서버
- [Quarkdown 설정](/wiki/important/setup/quarkdown/) — Turing-complete Markdown 조판 (책/논문/슬라이드/위키 다중 출력)

## Scope
이 위키는 개인 지식 관리, LLM 에이전트, 멀티에이전트 시스템, 소프트웨어 아키텍처에 관한 지식을 체계적으로 축적하는 공간입니다.

## Current State
8개의 소스에서 **하나의 핵심 테제**가 부상했습니다: **구조가 곧 프롬프트다.** GeekNews Weekly #352가 이 위키가 실천하는 LLM Wiki 패턴을 공식 큐레이션하며 패러다임 전환을 확인.

## Core Thesis

> **구조가 곧 프롬프트다 (Structure as Implicit Prompt)**
> 코드의 구조 자체가 AI에게 주어지는 암묵적 프롬프트다. 깔끔한 구조는 좋은 프롬프트이며, 꼬인 구조는 나쁜 프롬프트다.
> — [structure-as-implicit-prompt](/wiki/structure-as-implicit-prompt/)

이 테제는 세 독립적 소스에서 수렴적으로 도출되었습니다:
- [Array's DevBook](/wiki/arrays-devbook/) (ECS 영상): "한눈에 보이는 구조를 AI에게 제공하면 결과 품질이 다르다"
- [Claude Code Game Studios](/wiki/0LLMWiki/wiki/sources/claude-code-game-studios/): hooks, rules, templates = AI의 하네스
- [Caveman](/wiki/sources/caveman-token-reduction/): 간결 강제라는 구조적 제약이 정확도를 높임 — "간결성=정확성"

## Key Themes

### 1. 지식 관리 패턴
- [RAG](/wiki/rag/)의 한계에서 [LLM Wiki Pattern](/wiki/0LLMWiki/wiki/sources/llm-wiki-pattern/)이 출발
- [Memex](/wiki/memex/) (1945) → 현대적 해결책이 [Compounding Artifact](/wiki/compounding-artifact/)로 발현
- [지식 저장소 진화](/wiki/knowledge-repository-evolution/): 종이→Zettelkasten→LLM Wiki 패러다임 전환사
- [GeekNews #352](/wiki/sources/geeknews-weekly-352/)가 LLM Wiki 패턴 공식 큐레이션
- [짐코딩](/wiki/entities/gymcoding/)이 Karpathy LLM Wiki를 한국어 대중화 (조회수 1800만)
- **이 위키 자체가 compounding artifact의 실례**
- [agentmemory](/wiki/entities/agentmemory/): Karpathy LLM Wiki 패턴의 실제 구현체 — confidence scoring, lifecycle, knowledge graphs, hybrid search로 정적 파일 메모리를 동적 메모리 엔진으로 진화
- [Memory Consolidation Tiers](/wiki/concepts/memory-consolidation-tiers/): 인간 뇌의 4-Tier 기억 모델(Working→Episodic→Semantic→Procedural)을 AI 에이전트에 적용
- [Turing-complete Markdown](/wiki/concepts/turing-complete-markdown/): 지식 저장소의 출력이 "정적 문서"에서 "실행 가능한 프로그램"으로 진화
- [Quarkdown](/wiki/entities/quarkdown/): `.doctype {docs}` 타겟은 이 LLM Wiki의 출력 포맷으로 활용 가능

### 2. 멀티에이전트 아키텍처
- [Agent Teams](/wiki/concepts/agent-teams/): Claude Code 네이티브 팀 협업 — Mailbox(직접 메시지), Task List(공유 작업), Spawn(팀원 생성). Subagent(프리랜서) vs Agent Teams(팀)
- [Agent View](/wiki/sources/claudagent-view/): 터미널 멀티 세션 TUI (Research Preview) — Display Mode의 진화, `claude agents` 명령, 5상태 관리, 독립 worktree
- [Claude Code Game Studios](/wiki/0LLMWiki/wiki/sources/claude-code-game-studios/): 49 에이전트, 3티어 계층 구조
- [Shannon](/wiki/entities/shannon/): 5단계 보안 테스트 파이프라인, 5개 OWASP 카테고리 병렬 에이전트
- [agentmemory](/wiki/entities/agentmemory/): 16개 에이전트 공유 영구 메모리 — leases, signals, actions로 멀티에이전트 조정
- [Multi-Agent Hierarchy](/wiki/multi-agent-hierarchy/): Directors → Leads → Specialists
- [Agent Coordination](/wiki/agent-coordination/): 수직 위임, 수평 상담, 갈등 해결, 도메인 경계
- [Verification-Driven Development](/wiki/verification-driven-development/): 테스트 우선 개발 철학

### 3. 소프트웨어 아키텍처
- [ECS Philosophy](/wiki/ecs-philosophy/): 관계 복잡도 원천 차단 아키텍처
- [Essential vs Accidental Complexity](/wiki/essential-accidental-complexity/): 복잡도 분석 프레임워크
- [Data-Oriented Design](/wiki/data-oriented-design/): 데이터 중심 설계 접근법

### 4. 실무 지침 & 도구
- [Claude Code Hooks](/wiki/concepts/claude-code-hooks/): PreToolUse/PostToolUse/Stop 이벤트로 AI 행동 제어·감시·자동화
- [Hookify Plugin](/wiki/sources/hookify/): 마크다운 파일로 훅 생성 — hooks.json 직접 편집 없이 자연어로 규칙 작성
- [agent-browser](/wiki/entities/agent-browser/): AI 에이전트용 브라우저 자동화 CLI, Rust 기반, 82% 적은 컨텍스트
- [mcp-chrome](/wiki/entities/mcp-chrome/): Chrome Extension 기반 MCP, 사용자 실제 브라우저 제어, 20+ 툴
- [Ref 기반 선택](/wiki/concepts/ref-based-selection/): CSS 선택자 대비 AI 친화적 요소 식별 패턴
- [모바일앱 개발 지침](/wiki/sources/mobile-app-guidelines/): 안전 영역 처리, APK 빌드 파이프라인
- [Figma MCP 설치 및 사용방법](/wiki/sources/figma-mcp-setup-usage/): Figma 디자인↔코드 양방향 워크플로우, 13개 Tool
- [Safe Area Inset](/wiki/safe-area-inset/): CSS env() 중첩 구조 패턴
- [크로마키 프롬프트](/wiki/sources/image-prompt-chroma-key/): 이미지 생성 배경 분리용 프롬프트
- [Caveman 토큰 절약](/wiki/sources/caveman-token-reduction/): 원시인 말투로 65~75% 출력 토큰 절감
- [ImageSorcery MCP](/wiki/sources/imagesorcery-mcp/): 17개 로컬 이미지 처리 도구 (YOLO, EasyOCR, CLIP)
- [agentmemory](/wiki/entities/agentmemory/): AI 코딩 에이전트 영구 메모리 — 12 hooks 자동 캡처, BM25+Vector+Graph 하이브리드 검색, 92% 토큰 절감
- [iii Engine](/wiki/concepts/iii-engine/): 3원시(Functions+Triggers+KV State)로 전통적 웹 스택을 대체하는 런타임

### 5. 프롬프트 엔지니어링 패턴
- [Vibe to Spec](/wiki/concepts/vibe-to-spec/): 비개발자 Vibe→개발자 기획서 변환 메타프롬프트 (5페르소나, 6단계)
- [시각화 프롬프트 템플릿](/wiki/concepts/visualization-prompt-template/): 스타일-콘텐츠 분리, 1프롬프트→100디자인
- [클로드 시각화 스킨](/wiki/sources/claude-visualization-skins/): Accenture급 컨설팅 슬라이드 생성 프롬프트
- [바이브코딩 치트키 15](/wiki/concepts/vibe-coding-cheatkey/): AI 조련 방법론 — PRD, 페르소나, 컨텍스트, 프롬프트 체이닝

### 6. MCP & 프로덕션 에이전트
- [MCP 프로토콜](/wiki/entities/mcp-protocol/): 에이전트-외부 시스템 연결 공통 레이어 (SDK 3억 다운로드/월)
- [Managed Agents](/wiki/entities/managed-agents/): 클라우드 호스티드 에이전트 플랫폼, 파일시스템 메모리, MCP/Vaults
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/): 에이전트 메모리를 파일로 저장, 기존 도구 재사용
- [에이전트 메모리 접근법 비교](/wiki/comparisons/agent-memory-approaches/): agentmemory vs mem0 vs Letta vs Built-in 4종 비교
- [API vs CLI vs MCP](/wiki/comparisons/api-vs-cli-vs-mcp/): 세 경로 비교, 성숙한 통합은 3계층 모두 제공
- [Intent-Grouped Tools](/wiki/concepts/intent-grouped-tools/): API 미러링이 아닌 의도 단위 도구 설계
- [Code Orchestration](/wiki/concepts/code-orchestration/): Cloudflare 사례 — 2개 도구로 2,500 엔드포인트
- [MCP Apps](/wiki/concepts/mcp-apps/): 최초 공식 확장, 인터랙티브 UI 인라인 렌더링
- [Tool Search](/wiki/concepts/tool-search/): 온디맨드 로드로 토큰 85%+ 절감
- [Programmatic Tool Calling](/wiki/concepts/programmatic-tool-calling/): 샌드박스 후처리로 토큰 37% 절감

### 7. LLM 최적화 & AI 생태계
- [간결성-정확성 트레이드오프](/wiki/brevity-accuracy-tradeoff/): 장황 ≠ 정확, 간결 강제가 정확도 향상
- [Claude Code](/wiki/entities/claude-code/): 소스 유출로 드러난 내부 구조, anti-distillation, KAIROS
- AI 도구 경쟁: Claude Code(터미널) vs Cursor 3(IDE) vs Codex(OpenAI) vs Pi(미니멀 하네스)
- [Pi](/wiki/entities/pi/): 미니멀 터미널 코딩 하네스 — "임대가 아닌 소유", TypeScript 확장으로 사용자가 직접 하네스 구축. OpenClaw의 기반. 같은 모델이라도 하네스가 다르면 완전히 다른 에이전트
- GPT 이미지 2.0: 한국어 렌더링 돌파, 수정 능력, 띵킹 모드 자율 조사 — [소스놀이터](/wiki/entities/source-playground/)
- OpenClaw: 개인 AI 어시스턴트 플랫폼, ACP로 멀티에이전트 통합 — [OpenClaw](/wiki/entities/openclaw/), [ACP](/wiki/concepts/agent-client-protocol/)
- [OpenClaw vs Hermes Agent](/wiki/comparisons/openclaw-vs-hermes-agent/): 개인 비서 vs AI 직원, "유전자가 다르다" — 실전 비교 분석

### 8. Cross-Theme Connections
- [ECS vs 멀티에이전트 조정](/wiki/ecs-vs-multi-agent-coordination/): "시스템 간 호출 금지" ≡ "도메인 경계" — 구조적 동형성

### 9. AI 코딩 프레임워크
- [Superpowers](/wiki/entities/superpowers/): TDD 강제 7단계 워크플로우 — "어떻게 일할 것인가" (실행 품질)
- [GSD](/wiki/entities/gsd/): Plan/Execute/Review 컨텍스트 격리 — "어디서 일할 것인가" (환경 품질)
- [gstack](/wiki/entities/gstack/): 23역할 리뷰 게이트 — "무엇을 할 것인가" (의사결정 품질)
- [Hermes Agent](/wiki/entities/hermes-agent/): 독립 자가 개선 에이전트 — "누가 일할 것인가" (에이전트 자체, v0.12.0 Curator)
- [프레임워크 비교](/wiki/comparisons/claude-code-framework-comparison/): 4종 비교 + 레이어 조합 — gstack → GSD → Superpowers (Hermes는 별도 카테고리)
- [Context Rot](/wiki/concepts/context-rot-prevention/): 0-30% 최적, 50%+ 저하, 70%+ 환각 — 구조 없는 컨텍스트 확장의 위험
- [TDD 강제](/wiki/concepts/tdd-enforcement/): AI가 테스트 없이 구현하지 못하게 차단하는 구조적 제약
- [역할 기반 거버넌스](/wiki/concepts/role-based-ai-governance/): 다중 관점 리뷰로 의사결정 품질 보장
- [ECS vs 멀티에이전트 조정](/wiki/ecs-vs-multi-agent-coordination/): "시스템 간 호출 금지" ≡ "도메인 경계" — 구조적 동형성

## Major Connections

```
                        ┌─── Structure as Implicit Prompt (CORE THESIS) ───┐
                        │                                                  │
    ┌───────────────────┼──────────────────────────────────────────┐       │
    │                   │                                          │       │
    ▼                   ▼                                          ▼       ▼
지식 관리 패턴     소프트웨어 아키텍처                        멀티에이전트
    │                   │                                          │
    ├── RAG (한계)      ├── Essential vs Accidental                ├── Hierarchy (3-tier)
    ├── Compounding     ├── ECS Philosophy                        ├── Coordination (5 patterns)
    └── Memex (1945)    └── Data-Oriented Design                  └── VDD
                            │                                          │
                            └──── Structural Isomorphism ─────────────┘
                                 "시스템 간 호출 금지" ≡ "도메인 경계"

                ┌─── AI Coding Frameworks (3축 레이어) ───┐
                │                                           │
            ┌───┤                                       ┌───┤
            │   │                                       │   │
            ▼   ▼                                       ▼   ▼
      Superpowers  GSD                              gstack
      (실행 품질) (컨텍스트 품질)                   (의사결정 품질)
            │   │                                       │   │
            └───┴──── 레이어 조합 ──────────────────────┘
            gstack → GSD → Superpowers
            = 구조로 강제하는 3축 하네스
```

## Emerging Insights

1. **MCP = 복리 레이어**: 에이전트-시스템 연결의 공통 프로토콜. 새 클라이언트/확장이 생길수록 기존 서버도 더 강력해짐. 구축 한 번, 혜택 누적
2. **구조적 강제 > 프롬프트 엔지니어링**: 프롬프트로 지시하는 것보다 구조로 강제하는 것이 더 강력
2. **하네스 엔지니어링의 부상**: AI가 달릴 궤도를 설계하는 것이 새로운 엔지니어링 분야
3. **ECS 철학의 범용성**: 게임 개발뿐 아니라 AI 에이전트 설계에도 적용 가능한 원칙
4. **간결성=정확성**: Caveman 스킬이 증명. 장황한 응답이 항상 더 정확한 것은 아님
5. **지식 재구성 > 지식 검색**: RAG(검색)에서 LLM Wiki(재구성)로의 패러다임 전환이 공식 확인됨
6. **온디바이스 AI 실용화**: 1-bit LLM(1.15GB), Gemma E2B, Apple 온디바이스 모델 — 로컬 사용 가능 수준
7. **스타일-콘텐츠 분리 프롬프팅**: 시각화 프롬프트 템플릿이 증명. 프롬프트에서 스타일(컬러 스킨)과 콘텐츠를 분리하면, 1개 프롬프트로 100가지 변형 생성 가능
8. **AI 이미지 = 수정 능력이 핵심**: GPT 이미지 2.0이 "생성보다 수정이 문제"를 해결. 상세페이지, 광고, 브랜드 키트 등 상업용 즉시 활용 가능. 띵킹 모드로 자율 조사→추론→이미지 생성
9. **Design-to-Code 양방향 선순환**: Figma MCP가 구조화된 메타데이터로 AI 코드 생성 품질을 극적으로 향상. 스크린샷(비구조) 대신 메타데이터(구조) 전달이 "구조가 곧 프롬프트" 테제의 실증. Code→Figma 역캡처까지 가능한 양방향 루프
10. **AI 코딩 프레임워크 3축 레이어**: Superpowers(실행), GSD(컨텍스트), gstack(의사결정)이 각각 다른 축을 최적화하며 조합 가능. "구조가 곧 프롬프트" 테제의 프레임워크급 실증 — CLAUDE.md 규칙 자체가 일종의 경량 프레임워크
11. **Context Rot = 구조 부재의 결과**: 컨텍스트 70%+에서 환각이 발생한다는 것은, 구조 없이 정보만 축적하면 AI 품질이 저하됨을 의미. LLM Wiki의 체계적 구조가 곧 context rot 방지책
12. **AI 에이전트 카테고리 분화**: Claude Code 플러그인(Superpowers/GSD/gstack)과 독립 에이전트(Hermes)가 서로 다른 카테고리로 분화. "플러그인 vs 독립 에이전트"가 AI 코딩 도구 선택의 새로운 축
13. **자가 개선 에이전트의 등장**: Hermes의 closed learning loop(경험→스킬→개선)은 정적 규칙 기반 프레임워크와 근본적으로 다른 패러다임
14. **MCP 설계 패턴이 "구조가 곧 프롬프트"를 프로토콜에서 실증**: Intent-grouped tools, tool search, programmatic tool calling 모두 "에이전트에게 어떤 구조로 정보를 주는가"가 품질을 결정한다는 테제의 프로토콜급 실증
15. **CLI가 MCP보다 효율적일 수 있음**: agent-browser가 MCP 프로토콜 없이 CLI 기반으로 브라우저 자동화를 수행하며 Playwright MCP 대비 82% 적은 컨텍스트 사용. "에이전트-도구 연결"에서 프로토콜 오버헤드가 반드시 필요하지 않음을 실증
16. **파일시스템 메모리 = LLM Wiki 패턴의 공식화**: Anthropic이 Managed Agents에 파일 기반 메모리를 공식 지원. Claude Code의 CLAUDE.md/memory → Managed Agents Memory → 이 LLM Wiki가 모두 같은 패턴. "파일로 저장된 구조화된 지식"이 세 가지 환경에서 독립적으로 수렴
17. **AI 에이전트 "유전자" 차이**: 실전 비교가 증명 — OpenClaw와 Hermes Agent는 설정으로 상호 대체 불가능한 근본적 설계 차이가 존재. "갈아타기"가 아닌 "역할 분담"이 정답. AI 에이전트 선택은 기능표 비교가 아닌 "나를 얼마나 아느냐"가 핵심 기준
18. **브라우저 자동화 3분야**: Playwright MCP(깨끗한 환경), agent-browser(컨텍스트 효율), mcp-chrome(사용자 환경)이 각각 다른 최적화 축을 가짐. "어떤 브라우저를 제어하느냐"가 도구 선택의 핵심 기준
19. **Markdown이 프로그래밍 언어로**: Quarkdown이 CommonMark/GFM에 함수 호출을 도입해 Turing-complete Markdown 실현. 하나의 소스에서 책/논문/슬라이드/위키를 모두 생성. "구조가 곧 프롬프트" 테제의 확장 — 구조화된 Markdown이 곧 실행 가능한 프로그램. LLM Wiki의 출력 포맷으로 직접 활용 가능
20. **단순함이 곧 성능이다**: Warp 자동완성이 Trie/인덱스 없이 `starts_with()` + 메모리 올인 + 비동기 I/O로 최고 체감 성능을 달성. "간결성=정확성" 테제의 아키텍처급 실증 — 복잡도를 추가하지 않고 제거함으로써 성능 확보
21. **"LLM + Harness"가 에이전트의 본질**: 독스 분석이 정의 — 에이전트는 단순 LLM 래퍼가 아닌 "LLM + 통제 도구(Harness)"의 결합. Harness는 세션, 스킬, 메모리, 샌드박스 등 LLM이 원하는 방향으로 동작하게 만드는 인프라. Superpowers/GSD/gstack의 CLAUDE.md 규칙도 Harness의 일종
22. **클로즈 루프 학습 = Compounding의 메커니즘**: Hermes의 경험→스킬→개선→회상 순환이 Compounding Artifact의 구체적 작동 메커니즘을 보여줌. 모델 가중치 업데이트 없이 메모리+스킬로 누적 개선. 단, 엔트로피 문제(오래된 지식의 유용성 저하)가 과제
23. **Curator = 엔트로피 문제의 구조적 해답**: v0.12.0의 자율 Curator가 스킬 무한 축적의 엔트로피 문제를 7일 주기 자동 정리로 해결. "큐레이션" 단계가 클로즈 루프를 한 단계 발전시킴. 지식 관리의 "적자 흐름" 문제(축적만 하고 정리하지 않음)에 대한 에이전트급 해법
24. **에이전트 프레임워크의 커뮤니티 가속**: Hermes v0.12.0이 213명 기여자, 550 PR을 기록하며, 오픈소스 에이전트 프레임워크의 커뮤니티 기반 개발 속도가 상용 서비스를 압두할 수 있음을 실증
25. **하네스의 소유권 경쟁**: Pi가 "기능 경쟁"이 아닌 "소유권 경쟁"으로 Claude Code에 도전. 사용자가 TypeScript 확장으로 직접 하네스를 구축. "Anthropic은 개발자가 원하는 것을 결정해야 하지만, Pi는 상자를 만들면 되고 개발자가 나머지를 채움." Model=CPU, Context=RAM, Harness=OS 비유가 "LLM + Harness" 모델을 직관적으로 설명
26. **훅의 민주화**: Hookify가 Claude Code의 훅 시스템을 "JSON 설정이 필요한 개발자 전용"에서 "자연어로 규칙을 만드는 모든 사용자용"으로 전환. 복잡한 hooks.json 대신 마크다운 파일로 훅을 생성하는 것은 "구조가 곧 프롬프트" 테제의 도구급 실증 — 마크다운이라는 친숙한 구조가 훅 생성의 프롬프트가 됨
27. **Subagent→Agent Teams는 협업 모델의 진화**: Subagent(프리랜서)는 결과만 보고하는 독립 작업에 적합하지만, 에이전트 간 정보 공유가 필요해지는 순간 Mailbox(직접 메시지)와 Task List(공유 작업)로 무장한 Agent Teams(팀)가 필요. 메인 컨텍스트 병목, 중간 단서 소실, 소통 불가라는 3가지 한계를 구조적으로 해결. 멀티 에이전트 계층과 에이전트 조정 개념의 Claude Code 네이티브 구현
28. **LLM Wiki 패턴의 도구급 구현**: agentmemory가 Karpathy의 LLM Wiki 패턴(이 위키의 기반)을 "지식 관리 방법론"에서 "실행 가능한 메모리 엔진"으로 구체화. 정적 파일(CLAUDE.md, 이 위키의 CLAUDE.md)에서 4-Tier 동적 메모리로의 진화. "지식 재구성 > 지식 검색" 테제의 도구급 실증 — BM25+Vector+Graph 하이브리드 검색이 RAG의 차세대 형태
29. **런타임이 곧 플러그인 시스템**: iii engine이 Express/SQLite/SSE/pm2/Prometheus를 3원시(Functions+Triggers+KV State)로 치환하며, `iii worker add` 한 명령어로 pubsub/cron/queue/sandbox/database를 확장. 별도 플러그인 API가 아니라 런타임 자체가 확장 가능. "단순함이 곧 성능이다" 테제의 런타임급 실증
30. **Display Mode → Agent View: 멀티 세션 관리의 네이티브화**: Agent Teams의 Display Mode(Ingress/Split Panes)가 독립 TUI인 Agent View로 진화. tmux/iTerm2 분할의 외부 의존성 없이 `claude agents` 하나로 멀티 세션 오케스트레이션. 각 세션이 독립 git worktree에서 격리되고, 수퍼바이저 프로세스가 생명주기를 관리. "터미널에서 데스크탑 앱급 멀티 에이전트 경험"이 CLI의 범위를 확장
31. **Computer Use의 오픈소스 도착**: Hermes Agent v0.13.0이 KUA 기반 백그라운드 컴퓨터 제어를 오픈소스로 구현. 커서 이동/키보드 포커스/Space 전환 없이 에이전트가 데스크탑을 조작하며, 비전 지원 모델(Claude, GPT, Gemini, VLM) 모두 호환. Codex 스타일 Computer Use의 오픈소스 대등물. "에이전트가 사용자 워크플로우를 방해하지 않으면서 병렬 작동"이 독립형 에이전트의 새로운 패러다임
32. **칸반 보드 = 멀티 에이전트 오케스트레이션의 UI 패턴**: Hermes의 칸반 웹 UI와 Claude Code의 Agent View가 서로 다른 접근으로 같은 문제(멀티 에이전트 관리)를 해결. Hermes는 웹 기반 칸반 보드(To-Do→In Progress→Done), Claude Code는 터미널 TUI(5상태). /goal 명령으로 장기 자율 목표를 추적하는 패턴이 두 플랫폼에서 수렴 진화
## Open Questions
- 이 위키 자체의 구조가 "좋은 프롬프트"인가? — 위키 스키마를 AI에게 더 나은 프롬프트로 만드는 방법
- ECS 철학을 LLM Wiki 에이전트 자체에 적용하면? — ingest/query/lint를 독립 시스템으로
- 멀티에이전트 시스템에서 "에이전트 간 호출 금지"를 강제하는 방법은?
- YouTube community post 접근 방법 — yt-dlp/webReader 모두 불가. 대안은?
- "간결성=정확성"의 일반화 가능성 — Caveman의 결과를 다른 도메인에서도 검증할 수 있는가?

- [MCP 프로토콜](/wiki/entities/mcp-protocol/): AI 에이전트-외부 시스템 연결 표준 프로토콜

## Entities
- [Claude Code](/wiki/claude-code/): 이 위키의 실행 환경
- [Donchitos](/wiki/donchitos/): Claude Code Game Studios 작성자
- [Array's DevBook](/wiki/arrays-devbook/): ECS/DOTS 게임 개발 유튜브 채널
- [Karpathy](/wiki/karpathy/): LLM Wiki 패턴의 영감 원천
- [GeekNews](/wiki/geeknews/): 이 위키의 주요 정보 소스
- [WeekdayCode 평일코딩](/wiki/weekdaycode/): 한국어 AI 코딩 유튜버
- [짐코딩](/wiki/gymcoding/): LLM Wiki 대중화 유튜버
- [투더제이 TTJ](/wiki/ttj/): 바이브 코딩 수익화 유튜버, 치트키 15 가이드북
- [AI Korea Community](/wiki/aikorea-community/): 한국어 AI 커뮤니티/뉴스 플랫폼
- [Keygraph](/wiki/keygraph/): AI 보안 테스트 기업 (Shannon 개발사)
- [Figma](/wiki/figma/): 웹 기반 디자인 협업 도구, 공식 MCP 서버 (13개 Tool, Write to Canvas)
- [갓대희](/wiki/goddaehee/): 한국어 기술 블로거, MCP 추천 시리즈
- [헤이제임스](/wiki/heyjames/): 한국어 AI 코딩 유튜버, Claude Code 프레임워크 비교 분석
- [Superpowers](/wiki/superpowers/): TDD 강제 Claude Code 프레임워크 (149K stars)
- [GSD](/wiki/gsd/): 컨텍스트 격리 Claude Code 프레임워크 (51K stars)
- [gstack](/wiki/gstack/): 23역할 리뷰 게이트 Claude Code 프레임워크 (71K stars)
- [Hermes Agent](/wiki/hermes-agent/): Nous Research 독립 자가 개선 AI 에이전트 (47 도구, 200+ 모델)
- [OpenClaw](/wiki/openclaw/): 개인 AI 어시스턴트 플랫폼, ACP 기반 멀티에이전트 통합, Pi 기반
- [Pi](/wiki/pi/): 미니멀 터미널 코딩 하네스, TypeScript 확장, OpenClaw의 기반
- [ImageSorcery MCP](/wiki/imagesorcery-mcp/): Python 기반 로컬 이미지 처리 MCP 서버 (17개 도구)
- [agent-browser](/wiki/entities/agent-browser/): AI 에이전트용 브라우저 자동화 CLI (Rust, 30.8k stars)
- [mcp-chrome](/wiki/entities/mcp-chrome/): Chrome Extension 기반 MCP 서버 (사용자 실제 브라우저, 20+ 툴)
- [Vercel Labs](/wiki/entities/vercel-labs/): agent-browser 개발 조직
- [Managed Agents](/wiki/entities/managed-agents/): 클라우드 호스티드 Claude 에이전트 플랫폼
- [agentmemory](/wiki/entities/agentmemory/): AI 코딩 에이전트용 영구 메모리 엔진 (iii engine 기반, 51 MCP tools)
- [Quarkdown](/wiki/entities/quarkdown/): Turing-complete Markdown 조판 시스템
- [Warp Terminal](/wiki/entities/warp-terminal/): Rust GPU 가속 터미널→ADE, AGPL 오픈소스
