---
title: React Node View 패턴
created: 2026-04-23
updated: 2026-04-23
tags: [concept, pattern, react, tiptap, editor, inline-widget]
category: react-node-view.md
---

# React Node View

ProseMirror/Tiptap에서 커스텀 노드를 React 컴포넌트로 렌더링하는 패턴. 텍스트 흐름 내에 인터랙티브 UI 요소를 삽입할 수 있게 함.

## 핵심 원리

1. **Node 정의**: `Node.create()`로 커스텀 노드 타입 정의 (속성, HTML 파싱/렌더링 규칙)
2. **NodeViewRenderer**: `ReactNodeViewRenderer(Component)`로 React 컴포넌트를 Node View로 등록
3. **NodeViewWrapper**: React 컴포넌트의 루트 래퍼. `as="span"`으로 인라인 렌더링
4. **atom: true**: 편집 불가능한 원자 노드. 커서가 내부에 들어가지 않음
5. **inline: true**: 인라인 노드. 텍스트 흐름 내에 배치

## 인라인 위젯 구현 패턴

```
Node.create({ group: 'inline', inline: true, atom: true })
  → ReactNodeViewRenderer(WidgetComponent)
    → NodeViewWrapper as="span"
      → 클릭 가능한 UI 요소 (버튼, 마커, 배지)
```

**Why:** textarea는 인라인 UI 요소를 텍스트 내부에 배치할 수 없음. contenteditable 기반 에디터만 가능. React Node View는 이를 React 컴포넌트 패러다임으로 구현.

**How to apply:** 텍스트 편집 영역에 버튼, 마커, 배지 등 인터랙티브 요소를 삽입해야 할 때 Tiptap + React Node Views 사용.

## Node View Props

| Prop | 설명 |
|------|------|
| node | 현재 ProseMirror 노드 (attrs로 속성 접근) |
| updateAttributes | 노드 속성 업데이트 함수 |
| deleteNode | 노드 삭제 함수 |
| getPos | 문서 내 위치 반환 |
| selected | 선택 상태 |
| editor | 에디터 인스턴스 |

## 실제 적용 사례

- **Mention/Tag 시스템**: @username, #tag를 인라인 컴포넌트로 렌더링
- **수식 편집기**: 인라인 수식을 LaTeX 컴포넌트로 렌더링
- **인라인 마커/배지**: 텍스트 흐름 내 클릭 가능한 UI 요소 삽입

## See also

- [tiptap-rich-text-editor](/wiki/sources/tiptap-rich-text-editor/) — Tiptap 에디터 전체 개요
