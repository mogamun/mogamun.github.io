---
title: Agent Teams
created: 2026-05-09
updated: 2026-05-09
tags: [concept, claude-code, agent-teams, multi-agent, collaboration, subagent]
sources: [2026-05-09-claude-code-agent-teams.md]
status: stable
category: concepts
---

# Agent Teams

## 정의

Claude Code에서 여러 AI 에이전트가 하나의 팀을 이루어 소통하며 협업하는 방식. 기존 Subagent(독립 작업, 결과만 보고)와 달리, 에이전트 간 직접 메시지 전송과 공유 작업 목록으로 실시간 협업 가능.

## 핵심 원칙

### Subagent vs Agent Teams

| 차원 | Subagent | Agent Teams |
|------|----------|-------------|
| **비유** | 프리랜서 | 하나의 팀 |
| **소통** | 메인에게만 보고 | 팀원 간 직접 메시지 (Mailbox) |
| **컨텍스트** | 결과 요약만 반환 | 각자 독립 컨텍스트 유지 (이력 보존) |
| **조율** | 메인이 전부 관리 (병목) | 공유 Task List로 자율 할당 |
| **비용** | 낮음 | 팀원 N배 이상 |
| **적합한 작업** | 독립적, 소통 불필요 | 상호 의존적, 실시간 협업 필요 |

### 전환 기준

공식 문서가 명시한 Subagent → Agent Teams 전환 타이밍:
1. 서브 에이전트 여러 개 운영 시 메인 컨텍스트가 조율로 포화
2. 에이전트 간 정보 공유 필요 (예: 예산 담당이 시장 조사 결과 필요)
3. 서브 에이전트 간 의존성 발생

### 구성 요소 5가지

- **Team Lead**: 팀을 생성한 Claude Code 세션. 팀장 역할. 변경 불가
- **Teammate**: 리드가 Spawn(생성)한 추가 세션. 완전한 독립 컨텍스트
- **Spawn**: 새 팀원 세션 생성 (게임 캐릭터 생성과 유사)
- **Task List**: 공유 작업 목록 (대기/진행/완료). 리드 지정 + 팀원 자율 할당
- **Mailbox**: 팀원 간 메시지 시스템. 리드↔팀원, 팀원↔팀원 모두 가능

### 작업 할당 이중 구조

1. **하향 할당**: 리드가 직접 "A에게 시장 조사, B에게 경쟁사 분석" 지정
2. **자율 할당**: 작업 완료한 팀원이 배정 안 된 작업을 스스로 가져감

→ 메인 컨텍스트 병목 해소 + 유연성 확보

## 적용 사례

### 언제 Subagent?
- 커피 프랜차이즈 시장 조사 (서울/부산/대구/광주 각각 독립)
- 파일 분석, 코드 리뷰 등 결과만 필요한 작업
- 2-3개 이하의 단순 병렬 작업

### 언제 Agent Teams?
- 도시락 배달 서비스 기획안 (시장 조사↔예산↔경쟁사↔일정 상호 의존)
- 보안/성능/스타일 리뷰 (발견 간 상호 영향)
- 복잡한 다단계 프로젝트 (에이전트 간 실시간 정보 교환 필요)

### 위키 내 연결

Agent Teams는 기존 위키 개념들의 Claude Code 네이티브 구현:
- **멀티 에이전트 계층**의 실례: Team Lead = Director, Teammate = Specialist
- **에이전트 조정**의 수평 소통 구현: Mailbox = 수평 상담 채널
- **LLM + Harness 모델**의 확장: Agent Teams = Harness의 협업 레이어
- **구조가 암묵적 프롬프트**의 실증: Task List 구조가 작업 분배를 암묵적으로 지시

## See also

- [Agent Teams 소스](/wiki/sources/agent-teams/) — 영상 분석 상세
- [Agent Teams 설정 가이드](/wiki/important/setup/agent-teams/) — 활성화 및 Display Mode
- [Claude Code](/wiki/entities/claude-code/) — Agent Teams가 동작하는 환경
- [멀티 에이전트 계층](/wiki/concepts/multi-agent-hierarchy/) — 3티어 계층 조직화 패턴
- [에이전트 조정](/wiki/concepts/agent-coordination/) — 수직 위임, 수평 상담 등 5가지 패턴
- [LLM + Harness 모델](/wiki/concepts/llm-harness-model/) — Agent Teams가 Harness의 협업 레이어인 이유
- [구조가 암묵적 프롬프트](/wiki/synthesis/structure-as-implicit-prompt/) — Task List가 암묵적 지시인 원리
