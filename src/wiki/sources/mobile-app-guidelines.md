---
title: 모바일앱 개발 지침
created: 2026-04-22
updated: 2026-06-09
tags: [source, mobile, css, build, capacitor, native-plugin]
sources: [모바일앱 지침.md]
status: stable
category: sources
---

# 모바일앱 개발 지침

## 개요
모바일 웹/하이브리드 앱 개발에서 반복적으로 사용하는 안전 영역 처리 패턴과 APK 빌드 파이프라인 지침.

## 핵심 내용

### 안전 영역(Safe Area) 처리
- 외부 div에 `env(safe-area-inset-*)` 패딩 적용
- 내부 div에 `relative`로 오버레이 포함
- 오버레이는 `absolute inset-0`로 내부 div 안에 자동 제한
- 핵심: 오버레이가 안전 영역 밖으로 벗어나지 않도록 중첩 구조로 제한

## Capacitor + Vite APK 빌드 파이프라인

### 필수 순서
```
npm install --include=dev → vite build → cap sync android → gradle assembleDebug → APK 복사
```

### 1. npm install
```bash
npm install --include=dev
```
**npm 11 기본 `omit=dev` 때문에 devDependencies가 설치되지 않음.** 반드시 `--include=dev` 필요.
vite, typescript, tailwindcss, @vitejs/plugin-react 모두 devDependencies.

### 2. Vite 빌드
```bash
npx vite build
```
- `npm run build`는 `tsc -b && vite build`이나, 기존 tsc 에러로 실패 가능
- vite build만 실행하면 정상 빌드 (vite는 타입체크 안함)

### 3. Capacitor 동기화
```bash
npx cap sync android
```

### 4. APK 빌드
```bash
cd android && ./gradlew assembleDebug
```
APK: `android/app/build/outputs/apk/debug/app-debug.apk`

### Vite 버전 호환성
- `vite@8.x` 사용 불가 — `@vitejs/plugin-react@4.7.0`이 vite ^4-7 까지만 지원
- 현재 `vite@7.3.2` 사용

## Capacitor 네이티브 플러그인 복제 체크리스트

새 프로젝트로 Capacitor 네이티브 플러그인을 가져올 때 반드시 확인:
1. `definitions.ts` — `registerPlugin` 정의 존재
2. Kotlin/Java 소스파일 — `android/src/main/java/` 실제 소스 존재 (빌드 캐시만 있는 경우 주의)
3. `capacitor.plugins.json` — `npx cap sync` 후 수동 등록 필요할 수 있음
4. 네이티브 의존성 — Google AI Edge(`com.google.ai.edge.litertlm:litertlm-android:0.10.0`) 등
5. AAR은 AGP 8.x에서 DEX 누락 가능 → Android 라이브러리 모듈(`apply plugin: 'com.android.library'`)로 래핑
6. `npx cap sync`는 `capacitor.plugins.json`을 덮어씀 → sync 후 수동 등록 or 자동화

### Android 11+ 파일 접근 권한
`MANAGE_EXTERNAL_STORAGE`는 일반 권한 요청으로 허용 불가.
`Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION` 인텐트로 설정 이동 필요.
네이티브 플러그인의 `checkStoragePermission()` / `openStorageSettings()` 사용.

## 원문 인용
> 안전 영역: 외부 div에 env(safe-area-inset-*) 패딩, 내부 div에 relative로 오버레이 포함 — 오버레이는 absolute inset-0로 내부 div 안에 자동 제한
> npm 11은 기본 omit=dev → npm install --include=dev 필수

## See also
- [safe-area-inset](/wiki/concepts/safe-area-inset/)
