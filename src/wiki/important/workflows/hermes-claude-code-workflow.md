---
title: Hermes Agent + Claude Code 연동 워크플로우
created: 2026-06-11
updated: 2026-06-11
tags: [important, workflow, hermes-agent, claude-code, mcp, prd, health-check]
sources: [2026-06-11-hermes-claude-code-integration.md]
status: stable
category: important
---

# Hermes Agent + Claude Code 연동 워크플로우

## 목적
Hermes Agent를 MCP 서버로 실행하여 Claude Code와 양방향 연동. Hermes의 자가 진화 스킬 + 메모리 + 메시징을 Claude Code에 부여하는 실전 워크플로우.

## 전제 조건
- Hermes Agent 설치 완료 (`hermes setup`)
- Claude Code 설치
- 메시징 플랫폼 연결 완료 (Discord/Slack)

## 워크플로우

### 1. Hermes를 MCP 서버로 실행

1. **Hermes MCP 서버 시작**
   - 입력: 터미널
   - 실행: `hermes mcp serve`
   - 출력: 터미널 출력 없지만 백그라운드에서 MCP 서버 실행 중

2. **Claude Code에 Hermes MCP 연결**
   - 입력: `.mcp.json` 파일
   - 실행: 프로젝트 루트 또는 `~/.claude/`에 Hermes MCP 설정 추가
   - 출력: Claude Code에서 Hermes 도구 사용 가능

   **프로젝트 스코프** (해당 프로젝트만): `.mcp.json` (프로젝트 루트)
   **글로벌 스코프** (전체 프로젝트): `~/.claude/.mcp.json`

3. **연결 확인**
   - Claude Code에서 Hermes 도구가 보이는지 확인
   - Hermes의 메모리, 스킬, 연결된 앱에 접근 가능한지 테스트

### 2. Slack PRD 스킬 자동화 (팀 협업)

1. **Slack 채널 준비**
   - 입력: 프로젝트 전용 Slack 채널
   - 실행: 팀이 요구사항을 자유롭게 논의
   - 출력: 요구사항 논의 스레드

2. **Hermes에 크론잡 생성**
   - 입력: Hermes 채팅에서 지시
   - 실행: "이 Slack 채널을 모니터링해서 PRD 스킬을 만들어. 30분마다 업데이트해."
   - 출력: 30분 주기 크론잡 + PRD 스킬 생성

3. **개발 세션에서 활용**
   - 입력: Claude Code 개발 세션
   - 실행: Hermes MCP를 통해 PRD 스킬이 필요한 부분만 컨텍스트에 주입
   - 출력: 요구사항과 정렬된 코드 구현

4. **요구사항 변경 반영**
   - 입력: Slack 채널에서 새 논의
   - 실행: 크론잡이 자동 감지 → PRD 업데이트 → 로컬 프로젝트 스킬 동기화
   - 출력: Claude Code도 최신 요구사항 인지

**핵심 통찰**: PRD를 파일로 두면 컨텍스트 노이즈. 스킬은 필요할 때만 "fresh part of context window"에 로드.

### 3. 배포 앱 헬스체크 (운영 자동화)

1. **모니터링 스킬 생성**
   - 입력: Claude Code (앱 코드 컨텍스트)
   - 실행: 앱 구조 기반으로 모니터링/헬스체크 스킬 작성
   - 출력: 앱 맞춤형 헬스체크 스킬

2. **Hermes에 스킬 임포트 + 크론잡 설정**
   - 입력: Hermes 채팅
   - 실행: 스킬 임포트 + 스케줄 설정 + "이슈 발견 시 로컬 프로젝트에 동기화" 지시
   - 출력: 자동 모니터링 루프 시작

3. **모니터링 루프 (자동)**
   - 입력: 크론잡 스케줄
   - 실행: Hermes가 앱 + 코드 동시 모니터링 → 이슈 발견 시 보고 + 스킬 동기화
   - 출력: Discord/Slack에 보고서 + Claude Code에서 수정 가능

4. **이슈 해결 (반자동 또는 자동)**
   - 입력: 헬스체크 보고서
   - 실행: Claude Code에서 직접 수정 OR Hermes에 Claude Code로 자동 수정 지시
   - 출력: 수정 완료 + 스킬 자가 개선 (다음 실행에서 더 나은 헬스체크)

**핵심 통찰**: Claude Code가 앱을 가장 잘 알기 때문에 모니터링 스킬을 작성하는 것이 효과적. Hermes가 실행하고 개선.

## 팁
- **Slack MCP의 한계**: 전체 대화 히스토리를 못 읽음 → Hermes 경유가 더 나은 라우트
- **Anthropic 6월 15일 이후**: Agent SDK 사용량이 별도 청구 → 비용 모니터링 필요
- **OpenClaw 마이그레이션**: 임포트보다 깔끔한 시작 권장 (명령어 비호환)
- **스킬 vs 파일**: 반복 참조가 필요한 정보는 스킬로 만들어라. 파일은 노이즈, 스킬은 필요할 때만 로드.
- **양방향 동기화**: Hermes ↔ Claude Code 간 스킬 동기화를 명시적으로 지시해야 함

## 출처
- [Hermes Agent × Claude Code MCP 연동 실전 가이드](/wiki/important/sources/hermes-claude-code-integration/)
- [Hermes Agent MCP 공식 문서](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp)

## See also
- [Hermes Agent 설정 가이드](/wiki/important/workflows/hermes-agent-setup/)
- [Hermes Agent × Claude Code 연동 소스](/wiki/sources/hermes-claude-code-integration/)
- [루프 엔지니어링](/wiki/concepts/loop-engineering/) — 크론잡 기반 루프의 이론적 배경
- [Closed Learning Loop](/wiki/concepts/closed-learning-loop/) — 스킬 자가 진화 메커니즘
