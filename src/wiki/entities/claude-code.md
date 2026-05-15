---
title: Claude Code
created: 2026-04-16
updated: 2026-05-13
tags: [entity, tool, anthropic, cli, ai-agent]
sources: [claude-code-game-studios.md, 2026-04-22-geeknews-weekly-352.md, 2026-04-22-playwright-mcp-setup.md, 2026-04-27-claude-mcp-production-agents.md, 2026-04-29-claude-managed-agents-memory.md, 2026-05-09-claude-code-hookify-plugin.md, 2026-05-12-agentmemory.md, 2026-05-13-claude-agent-view.md]
status: stable
category: entities
---

# Claude Code

## Identity
- **Type**: AI 코딩 CLI 도구
- **Developer**: Anthropic (Boris Cherny 등)
- **Install**: `npm install -g @anthropic-ai/claude-code`

## Key Features (from Game Studios usage)
- **Subagents**: 커스텀 에이전트 정의 (49개까지 확장 가능)
- **Skills**: 슬래시 명령어 시스템 (72개까지)
- **Hooks**: 자동화된 검증 (커밋, 푸시, 세션 라이프사이클)
- **Rules**: 경로 기반 코딩 표준
- **Settings**: 권한 관리, 안전 규칙

## 숨겨진 기능 (Boris Cherny 공개, 2026-04)
- `/loop`: 최대 1주일 자동 반복 작업
- `/batch`: 수천 개 워크트리 병렬 처리
- `--teleport`: 모바일↔데스크탑 세션 이동
- `NO_FLICKER` 모드: `CLAUDE_CODE_NO_FLICKER=1` 화면 깜빡임 해결

## 소스 코드 유출 사태 (2026-04)
- npm 패키지 소스맵 파일 포함으로 전체 소스 노출 (804파일, 22만줄)
- 내부 구조: anti-distillation 가짜 도구, undercover 모드, 욕설 정규식
- 실험 기능: 자율 에이전트 KAIROS, Tamagotchi 동반자 시스템
- 11단계 에이전트 루프, 50개 이상 도구 체계

## MCP 서버
- **Playwright MCP**: `claude mcp add playwright --scope user -- npx -y @playwright/mcp@latest` — 브라우저 자동화 (쿠키 동의 벽 통과, 웹 스크래핑)
- **mcp-chrome**: Chrome Extension 기반 MCP — 사용자의 실제 Chrome 브라우저 제어 (Streamable HTTP)

## Skills 통합
- **agent-browser**: `npx skills add vercel-labs/agent-browser` — CLI 기반 브라우저 자동화. Playwright MCP 대비 82% 적은 컨텍스트

## MCP 생태계에서의 역할 (2026-04)
- Claude Code는 MCP 클라이언트이자 채널 기능의 기반
- MCP SDK 3억 다운로드/월, Claude Cowork·Managed Agents·channels 기반 기술
- CIMD/Vaults로 OAuth 표준화, Tool Search/Programmatic Tool Calling으로 컨텍스트 효율화
- **Managed Agents Memory (2026-04-23)**: 파일시스템 기반 메모리 — Claude Code의 CLAUDE.md/memory와 동일 패턴의 클라우드 구현

## 경쟁 도구

### Pi (터미널 코딩 하네스)
- 미니멀 오픈소스 하네스로 Claude Code의 대안으로 부상
- Pi는 MCP, 서브에이전트, 플랜 모드, 권한 시스템이 없지만 TypeScript 확장으로 사용자가 직접 구축
- 주요 차별점: 컴팩션 커스터마이제이션, 모델 스위칭(수백 개 프로바이더), 세션 트리 구조
- OpenClaw의 기반 하네스
- "임대 vs 소유" 프레이밍: Claude Code는 하네스를 빌리는 것, Pi는 소유하는 것

## 플러그인 생태계 (2026-05)

### Hookify
- 공식 Claude Code 플러그인 (28개 중 하나)
- 마크다운 파일로 훅(Hook) 생성 — `hooks.json` 직접 편집 불필요
- 자연어 `/hookify Warn me when...`로 규칙 자동 생성
- 이벤트: bash, file, stop, prompt | 액션: warn, block
- Python 3.7+ stdlib만 사용 (외부 의존성 없음)
- Claude Code Marketplace에서 auto-discovery

### agentmemory
- AI 코딩 에이전트용 영구 메모리 엔진 (12 hooks + 51 MCP tools + 4 skills)
- Karpathy LLM Wiki 패턴 확장: confidence scoring, lifecycle, knowledge graphs, hybrid search
- iii engine 기반: Express/SQLite/SSE/pm2/Prometheus를 3개 원시로 대체
- 4-Tier Memory Consolidation: Working → Episodic → Semantic → Procedural
- 설치: `/plugin marketplace add rohitg00/agentmemory` → 12 hooks 자동 등록
- Session Replay: JSONL 트랜스크립트 import + 타임라인 재생
- 16개 에이전트 지원 (Cursor, Gemini CLI, pi, Hermes 등)

### Agent View (Research Preview, v2.1.139)
- 터미널 내 멀티 세션 관리 TUI. `claude agents` 명령으로 실행
- 5가지 세션 상태: 고정됨, 작업 중, 입력 필요, 검토 준비 완료, 완료됨
- Space(브리핑 피크), Enter(세션 진입), Ctrl+X(삭제), Ctrl+T(고정), Shift+↑↓(순서 변경)
- `/bg`로 기존 세션을 백그라운드 → Agent View에 자동 등록
- 각 세션은 독립 git worktree에서 격리, 사용자별 수퍼바이저 프로세스가 호스팅
- 상태 저장: `~/.claude/jobs/<id>/`, ~1시간 비활성 후 유휴 종료
- 필터링: `a:<agent>`, `s:<state>`, `#<PR-number>`, PR 상태 컬러 점
- CLI 전용 (데스크탑 앱 미지원)
- 공식 문서: https://code.claude.com/docs/en/agent-view

### Agent Teams (실험적)
- 여러 에이전트가 팀으로 협업: Mailbox(직접 메시지), Task List(공유 작업), Spawn(팀원 생성)
- Subagent(프리랜서) vs Agent Teams(팀): 소통 필요성이 핵심 기준
- 구성: Team Lead(팀장 세션) + Teammate(독립 세션) + Task List + Mailbox
- 활성화: `settings.json`에 `CLAUDE_CODE_ENABLE_AGENT_TEAMS: "1"` 설정
- Display Mode: Ingress(기본, Shift+Down) | Split Panes(tmux/iTerm2)
- 비용: 팀원 N명 ≈ N배 이상 토큰. 소통 필요 없는 작업은 Subagent가 효율적

## Relevance
이 위키의 실행 환경. LLM Wiki 에이전트 자체도 Claude Code 위에서 동작함.

## See also
- [Claude Code Game Studios](/wiki/entities/0LLMWiki/wiki/sources/claude-code-game-studios/)
- [GeekNews Weekly #352](/wiki/sources/geeknews-weekly-352/)
- [Caveman 토큰 절약](/wiki/sources/caveman-token-reduction/)
- [Playwright MCP 설정](/wiki/sources/playwright-mcp-setup/)
- [MCP 프로토콜](/wiki/entities/mcp-protocol/)
- [Anthropic MCP 프로덕션 패턴](/wiki/sources/claude-mcp-production-agents/)
- [Managed Agents Memory](/wiki/sources/claude-managed-agents-memory/)
- [agent-browser](/wiki/entities/agent-browser/)
- [mcp-chrome](/wiki/entities/mcp-chrome/)
- [Pi](/wiki/entities/pi/) — 미니멀 터미널 코딩 하네스, 경쟁 도구
- [Hookify Plugin](/wiki/sources/hookify/) — 마크다운으로 훅 생성하는 공식 플러그인
- [Claude Code Hooks 개념](/wiki/concepts/claude-code-hooks/) — 훅 시스템 원리
- [Agent Teams](/wiki/concepts/agent-teams/) — 팀 협업 모델 (Subagent vs Agent Teams)
- [Agent View](/wiki/sources/claudagent-view/) — 터미널 멀티 세션 관리 TUI (Research Preview)
- [Agent Teams 설정](/wiki/important/setup/agent-teams/) — 활성화 및 Display Mode
- [agentmemory](/wiki/entities/agentmemory/) — 영구 메모리 엔진 (12 hooks + 51 MCP tools)
- [agentmemory 설정](/wiki/important/setup/agentmemory/) — 설치 가이드
- [iii Engine](/wiki/concepts/iii-engine/) — 기반 런타임 원시
- [Memory Consolidation Tiers](/wiki/concepts/memory-consolidation-tiers/) — 4-Tier 기억 모델
- [에이전트 메모리 접근법 비교](/wiki/comparisons/agent-memory-approaches/) — agentmemory vs mem0 vs Letta vs built-in
