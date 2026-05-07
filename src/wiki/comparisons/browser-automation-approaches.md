---
title: "브라우저 자동화 3접근법: Playwright MCP vs agent-browser vs mcp-chrome"
created: 2026-04-28
updated: 2026-04-28
tags: [comparison, browser-automation, mcp, cli, chrome-extension]
sources: [2026-04-28-agent-browser.md, 2026-04-28-mcp-chrome.md]
status: stable
category: comparisons
---

# 브라우저 자동화 3접근법: Playwright MCP vs agent-browser vs mcp-chrome

## 공통점
- 모두 AI 에이전트가 브라우저를 제어할 수 있게 함
- Claude Code, Cursor 등 AI 코딩 도구와 통합 가능
- 스크린샷, 네비게이션, 클릭, 폼 입력 등 기본 브라우저 조작 지원

## 차이점

| 차원 | Playwright MCP | agent-browser | mcp-chrome |
|------|---------------|---------------|------------|
| **아키텍처** | MCP 서버 (Node.js) | CLI + Rust 데몬 | Chrome Extension |
| **브라우저** | Headless 전용 (독립 실행) | Chrome for Testing (별도 다운로드) | 사용자의 실제 Chrome |
| **연결 방식** | MCP (STDIO) | CLI 명령어 | MCP (Streamable HTTP / STDIO) |
| **로그인 상태** | 매번 재로그인 필요 | 매번 재로그인 필요 | 기존 세션 그대로 사용 |
| **사용자 환경** | 깨끗한 환경 (빈 상태) | 깨끗한 환경 | 북마크, 확장프로그램, 쿠키 보존 |
| **시작 속도** | 브라우저 프로세스 실행 필요 | 데몬 실행 + Chrome 실행 필요 | 확장 프로그램 활성화만 |
| **응답 속도** | 50-200ms (IPC) | 빠름 (로컬 데몬) | 빠름 (Extension API) |
| **컨텍스트 효율** | 표준 | 82% 적은 컨텍스트 (ref 기반) | 표준 (CSS 선택자) |
| **요소 선택** | 접근성 스냅샷 | ref 기반 (@e1, @e2) | CSS 선택자 |
| **언어** | TypeScript | Rust + TypeScript | TypeScript |
| **설치 복잡도** | npm 한 줄 | npm + Chrome 다운로드 | npm + Extension 수동 로드 |
| **특수 기능** | 쿠키 동의 벽 통과 | AI Chat, React DevTools, iOS Simulator | 시맨틱 검색, 북마크/히스토리, 스크립트 인젝션 |

## 선택 기준

**Playwright MCP 선택:**
- 스크래핑, 자동화 테스트 등 "깨끗한 환경"이 필요할 때
- 설치가 가장 간단해야 할 때
- 기존 Playwright 지식이 있을 때

**agent-browser 선택:**
- 컨텍스트 효율이 최우선일 때 (82% 절감)
- MCP 프로토콜 없이 CLI로 제어하고 싶을 때
- React DevTools, iOS 시뮬레이터가 필요할 때
- 다중 클라우드 브라우저 환경이 필요할 때

**mcp-chrome 선택:**
- 사용자의 실제 브라우저 환경(로그인, 북마크)이 필요할 때
- "내 브라우저를 대신 조작해줘" 시나리오
- 열린 탭 전체를 대상으로 시맨틱 검색이 필요할 때
- 북마크, 히스토리, 네트워크 모니터링이 필요할 때

## See also
- [agent-browser](/wiki/entities/agent-browser/)
- [mcp-chrome](/wiki/entities/mcp-chrome/)
- [MCP 프로토콜](/wiki/entities/mcp-protocol/)
- [Ref 기반 선택](/wiki/concepts/ref-based-selection/)
- [클라이언트-데몬 아키텍처](/wiki/concepts/client-daemon-architecture/)
- [API vs CLI vs MCP](/wiki/comparisons/api-vs-cli-vs-mcp/)
