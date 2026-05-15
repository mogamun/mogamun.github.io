---
title: 파일시스템 기반 메모리
created: 2026-04-29
updated: 2026-04-29
tags: [concept, ai-agent, memory, filesystem, anthropic]
sources: [2026-04-29-claude-managed-agents-memory.md]
status: stable
category: concepts
---

# 파일시스템 기반 메모리 (Filesystem-based Memory)

## 정의
AI 에이전트의 메모리를 파일시스템에 파일로 저장하여, 에이전트가 기존 파일 조작 능력(bash, code execution)으로 직접 접근하는 패턴. 별도 API나 프로토콜 없이 표준 파일 I/O로 메모리 읽기/쓰기.

## 핵심 원칙
- **메모리 = 파일**: 특수 데이터베이스나 벡터 스토어가 아닌, 파일시스템의 파일
- **기존 도구 재사용**: 새 API 학습 없이 bash/code execution으로 접근
- **내보내기 가능**: 파일이므로 복사, 이동, 버전 관리, 감사 가능
- **범위 권한**: 조직 전체(읽기 전용) + 사용자별(읽기/쓰기) 스코프

## 적용 사례
- **Claude Managed Agents Memory (2026-04)**: Anthropic 공식 구현. 파일시스템 마운트, 감사 로그, 버전 롤백
- **Claude Code CLAUDE.md/memory**: 동일 패턴의 로컬 구현. 파일 기반 지식 → 매 세션 로드
- **이 LLM Wiki**: CLAUDE.md가 곧 에이전트 메모리. 파일로 구조화된 지식 저장
- **agentmemory (2026-05)**: 파일시스템 메모리의 진화. hooks로 자동 캡처 → 4-Tier 통합 → BM25+Vector+Graph 하이브리드 검색. 정적 파일의 한계(200줄, 전체 로드)를 동적 메모리 엔진으로 극복

## "구조가 곧 프롬프트"와의 연결
파일시스템 기반 메모리는 "구조가 곧 프롬프트" 테제의 메모리 계층 실증. 파일의 구조(디렉토리, 파일명, 마크다운 형식)가 곧 에이전트가 해석하는 "프롬프트". RAG의 비구조적 검색과 달리, 파일 구조 자체가 의미를 전달.

## See also
- [Managed Agents](/wiki/entities/managed-agents/)
- [Claude Code](/wiki/entities/claude-code/)
- [컨텍스트 로트 방지](/wiki/concepts/context-rot-prevention/)
- [Structure as Implicit Prompt](/wiki/synthesis/structure-as-implicit-prompt/)
- [RAG](/wiki/concepts/rag/)
- [agentmemory](/wiki/entities/agentmemory/) — 파일시스템 메모리의 진화형
- [Memory Consolidation Tiers](/wiki/concepts/memory-consolidation-tiers/) — 4-Tier 기억 모델
- [에이전트 메모리 접근법 비교](/wiki/comparisons/agent-memory-approaches/) — 메모리 시스템 비교
- [Managed Agents Memory 소스](/wiki/sources/claude-managed-agents-memory/)
