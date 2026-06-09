---
title: Tiptap 리치 텍스트 에디터
created: 2026-04-23
updated: 2026-04-23
tags: [source, tiptap, editor, react, prosemirror, rich-text]
sources: [2026-04-23-tiptap-rich-text-editor.md]
status: stable
category: sources
---

# Tiptap 리치 텍스트 에디터

## 개요

ProseMirror 기반 헤드리스 리치 텍스트 에디터 프레임워크. React, Vue, Svelte 지원. contenteditable 기반으로 UI가 포함되지 않아 개발자가 완전히 커스텀 가능.

## 핵심 내용

### 아키텍처
- **ProseMirror 기반**: 문서 모델, 스키마, 트랜잭션 시스템을 ProseMirror에서 상속
- **헤드리스**: UI 컴포넌트 없음. 툴바, 메뉴 등은 개발자가 직접 구성
- **contenteditable**: 브라우저 네이티브 편집 기반. 모바일도 지원

### 확장 시스템 (3가지 유형)
1. **Extension**: 일반 확장 (키보드 단축키, 입력 규칙, 기능 추가)
2. **Node**: 블록/인라인 콘텐츠 요소 (단락, 제목, 이미지, 커스텀 요소)
3. **Mark**: 인라인 텍스트 스타일 (볼드, 이탤릭, 링크)

### React 통합
- `useEditor`: 에디터 인스턴스 생성 훅
- `EditorContent`: 에디터 렌더링 컴포넌트
- `ReactNodeViewRenderer`: 커스텀 노드를 React 컴포넌트로 렌더링
- `NodeViewWrapper`: Node View의 래퍼. `as="span"`으로 인라인 렌더링 가능

### React Node Views (핵심)
- 커스텀 노드를 React 컴포넌트로 렌더링하는 기능
- `atom: true` + `inline: true`로 텍스트 내부에 편집 불가능한 인라인 요소 삽입
- Props: `node`, `updateAttributes`, `deleteNode`, `getPos`, `selected`
- 인라인 버튼, 마커, 배지 등을 텍스트 흐름 내에 배치 가능

### StarterKit
기본 확장 번들: Blockquote, BulletList, CodeBlock, Document, HardBreak, Heading, HorizontalRule, ListItem, OrderedList, Paragraph, Text, Bold, Code, Italic, Strike, Dropcursor, Gapcursor, History

## 원문 인용

> "Tiptap은 헤드리스 에디터 — UI가 포함되지 않음. 개발자가 완전히 커스텀 UI 구성 가능."

## See also

- [prosemirror](/wiki/prosemirror/) — Tiptap의 기반 기술
- [react-node-view](/wiki/react-node-view/) — React Node Views 패턴
- [rich-text-inline-widgets](/wiki/rich-text-inline-widgets/) — 텍스트 내 인라인 위젯 패턴
