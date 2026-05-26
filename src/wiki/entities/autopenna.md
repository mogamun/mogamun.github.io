---
title: autopenna
created: 2026-04-22
updated: 2026-05-16
tags: [project, react, typescript, capacitor, mobile-app, vite7, zustand]
status: stable
category: entities
---

# autopenna

## 개요
인터랙티브 스토리 게임 + AI 글쓰기 도우미 모바일 앱. Capacitor 기반 네이티브 앱으로, 로컬 Gemma 모델을 사용한 온디바이스 AI 생성.

## 기술 스택
- React 19 + TypeScript 6
- Vite 7 (빌드) — 8.x는 @vitejs/plugin-react 미지원
- Capacitor 8 (네이티브 래핑, Android)
- Tailwind CSS 3 (스타일링)
- Zustand 5 + persist (상태 관리)
- ai-core (서브모듈, 구 capacitor-gemma-core) — Ollama 웹 / Gemma 네이티브
- Zod 4 (스키마 검증)

## 빌드 파이프라인
```
npm install --include=dev    # npm 11 omit=dev 기본값 때문에 필수
npx tsx scripts/sync-server-data.ts && npx vite build
npx cap sync android
cd android && ./gradlew assembleDebug
cp android/app/build/outputs/apk/debug/app-debug.apk "/Volumes/Vol3So/autopenna-debug.apk"
```

## 캐릭터 시스템
- 10개 내장 캐릭터 (JSON + 웹툰풍 이미지)
- CharacterTemplate Zod 스키마: imageUrl, slotTypes, genreIncarnations, traitProfile
- CharacterStore: import.meta.glob으로 JSON 자동 로드 + Zustand persist로 커스텀 저장
- 토글 선택 UI: ConceptSetupPage, GamePage customChars phase

## LLM Wiki 연동
- 연동 시작: 2026-04-22
- 자동 기록: 실수 교정, 사용자 지시, 반복 패턴

## 최근 설계 기록
- 2026-05-16: 웹/dev 서버에서 `AUTOPENNA_LLM_PROVIDER=litert`일 때 로컬 Gemma4 LiteRT 서버를 health check 후 자동 시작하도록 `server/features/llm/litertServer.ts`를 추가했다. 자동 시작은 로컬 URL에만 적용하고, Gemma `run.sh` 실행 시 `PORT=8088`을 명시해 Autopenna dev 서버 포트 `9231` 상속 충돌을 방지한다.
- 2026-05-05: 웹 LLM 통신을 Hono 미들웨어로 통합하는 계획 수립. 클라이언트는 Ollama 직접 호출을 중단하고 `/api/llm/*`, `/api/characters/:characterId/chat`을 사용한다.
- 2026-05-05: 캐릭터 상세의 `대화하기` 버튼, 카카오톡형 채팅 팝업, 캐릭터별 compact memory fact 파일 저장 계획 수립. 신규 프론트 AI 응답 호출은 `useStreamingChoices` 계층을 거친다.
- 2026-05-05: 글쓰기 페이지 검토와 페이지형 `textarea` 설계 문서 작성. 펜 입력 요구 때문에 본문 입력은 Tiptap보다 `textarea`를 유지하고, 챕터와 별개인 페이지 모델과 5초 유휴 자동 다음 문장 3개 추천을 설계했다.

## 기록된 교정 사항
- npm 11은 기본 `omit=dev` → `npm install --include=dev` 필수
- vite 8.x 사용 불가 → 7.x 사용

## 사용자 선호 패턴
- (아직 없음)

## See also
- CLAUDE.md — 프로젝트 루트 설정 파일
- [모바일앱 개발 지침](/wiki/sources/mobile-app-guidelines/)
- [빌드 파이프라인 상세](/wiki/../raw/2026-04-24-autopenna-work-build-pipeline/)
