# Wiki → Blog 자동 발행 시스템 설계 문서

> 작성일: 2026-05-07  
> 목적: /Users/mogamun/Documents/Company/0LLMWiki/wiki/ 의 MD 파일을 Gatsby 블로그에 자동으로 발행

---

## 1. 시스템 개요

```
[Obsidian 편집]
  └─ /Documents/Company/0LLMWiki/wiki/        ← MD 파일 편집
  └─ /Documents/Company/z.Files/              ← 이미지 붙여넣기 자동 저장

npm run sync-wiki (로컬에서 실행)
  └─ scripts/sync-wiki.js
       ├─ MD 파일 복사   → src/wiki/
       ├─ 이미지 복사    → static/wiki-assets/
       ├─ .md 링크 변환  → Gatsby 경로 (/wiki/concepts/rag/)
       └─ 이미지 참조 변환 → /wiki-assets/filename.png

git add . && git commit && git push
  └─ GitHub Actions 트리거
       └─ gatsby build → mogamun.github.io/wiki/concepts/rag/
```

---

## 2. 경로 매핑

| 출처 | 대상 | 설명 |
|---|---|---|
| `0LLMWiki/wiki/concepts/rag.md` | `src/wiki/concepts/rag.md` | MD 파일 복사 |
| `0LLMWiki/wiki/entities/agent-browser.md` | `src/wiki/entities/agent-browser.md` | MD 파일 복사 |
| `z.Files/Pasted image 20260507115527.png` | `static/wiki-assets/Pasted image 20260507115527.png` | 이미지 복사 |
| `/wiki/concepts/rag/` | Gatsby 페이지 경로 | 블로그 URL |

---

## 3. 변환 규칙

### 3-1. MD 링크 → Gatsby 경로
```
입력:  [RAG](../concepts/rag.md)
출력:  [RAG](/wiki/concepts/rag/)

입력:  [Figma](figma.md)                  (현재 파일: entities/figma.md)
출력:  [Figma](/wiki/entities/figma/)

입력:  [https://github.com/...]           (외부 링크)
출력:  변환 없음
```

### 3-2. 이미지 참조 변환
```
입력:  ![](Pasted%20image%2020260507115527.png)
출력:  ![](/wiki-assets/Pasted image 20260507115527.png)

입력:  ![alt text](screenshot.png)
출력:  ![alt text](/wiki-assets/screenshot.png)
```

### 3-3. Obsidian [[wikilink]] 변환 (미래 대응)
```
입력:  [[rag]]
출력:  [rag](/wiki/concepts/rag/)     ← 파일 검색 후 경로 결정

입력:  [[rag|RAG란 무엇인가]]
출력:  [RAG란 무엇인가](/wiki/concepts/rag/)
```

---

## 4. Gatsby 슬러그 규칙

```
src/wiki/concepts/rag.md          → /wiki/concepts/rag/
src/wiki/entities/agent-browser.md → /wiki/entities/agent-browser/
src/wiki/comparisons/api-vs-cli.md → /wiki/comparisons/api-vs-cli/
src/wiki/index.md                  → /wiki/index/  (특별 처리 필요)
src/wiki/log.md                    → /wiki/log/
```

---

## 5. 프론트매터 정규화

### 위키 MD 원본 프론트매터
```yaml
---
title: RAG (Retrieval-Augmented Generation)
created: 2026-04-16
updated: 2026-04-22
tags: [concept, llm, retrieval, rag]
sources: [llm-wiki-pattern.md]
status: stable
---
```

### Gatsby가 인식할 수 있는 필드 (유지)
- `title` → 페이지 제목
- `created` → 생성일 (정렬 보조)
- `updated` → 수정일 (정렬 기준)
- `tags` → 태그 표시
- `status` → 배지 표시 (stable / draft / wip)
- `category` → 폴더명 자동 추출 (concepts, sources, entities 등)

---

## 6. 구현 파일 목록

| # | 파일 | 작업 유형 | 설명 |
|---|---|---|---|
| 1 | `scripts/sync-wiki.js` | **신규** | 핵심 동기화 스크립트 |
| 2 | `package.json` | 수정 | `sync-wiki`, `prebuild` 스크립트 추가 |
| 3 | `gatsby-config.js` | 수정 | `src/wiki` 소스 추가 |
| 4 | `gatsby-node.js` | 수정 | wiki 슬러그(`/wiki/...`) + `isWiki` 필드 + 페이지 생성 |
| 5 | `src/templates/wiki-page.js` | **신규** | 위키 전용 페이지 템플릿 (글래스 스타일) |
| 6 | `src/pages/wiki/index.js` | **신규** | 카테고리별 위키 인덱스 (최근 수정순) |
| 7 | `src/pages/index.js` | 수정 | 블로그 포스트만 표시 (wiki 제외), 날짜 내림차순 |

---

## 7. 실행 방법

### 최초 설정
```bash
# 의존성 없음 (Node.js 내장 fs만 사용)
npm run sync-wiki   # 위키 동기화
git add src/wiki/ static/wiki-assets/
git commit -m "sync wiki"
git push
```

### 일상적인 발행 흐름
```bash
# Obsidian에서 편집 완료 후
npm run sync-wiki && git add -A && git commit -m "wiki update" && git push
```

### CI (GitHub Actions)
- `src/wiki/` 가 이미 커밋되어 있으면 CI에서 별도 sync 불필요
- Actions에서 `prebuild`는 wiki 경로 없을 시 자동 스킵

---

## 8. 주의사항

- `src/wiki/` 는 gitignore에 추가하지 않음 (CI가 읽어야 함)
- `static/wiki-assets/` 도 커밋 대상 (이미지 파일 포함)
- 이미지 파일명에 공백이 있는 경우 URL 인코딩 처리
- 위키 인덱스(`/wiki/index.md`) 는 `/wiki/` 루트로 리다이렉트
- `prebuild` 스크립트는 wiki 원본 경로 없으면 경고만 출력하고 통과
