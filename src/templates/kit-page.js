import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import KitLayout from '@/components/KitLayout';
import SEO from '@/components/SEO';

const fadeInAnim = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const PageWrapper = styled.div`
  padding: 24px 28px 80px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-shrink: 0;
`;

const ToolEmoji = styled.span`
  font-size: 1.6rem;
`;

const ToolTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0;
  color: ${({ theme }) => theme.colors.headline};
`;

const ToolDesc = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-left: auto;
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 12px;
  flex-shrink: 0;
`;

const ToolbarBtn = styled.button`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.colors.gray};
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.2s, color 0.2s;
  font-family: inherit;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}15`};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ToolFrame = styled.div`
  flex: 1;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  position: relative;
  min-height: 400px;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;

const FullscreenOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  animation: ${fadeInAnim} 0.2s ease both;
`;

const FullscreenBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.glass};
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
  flex-shrink: 0;
`;

const FullscreenTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.headline};
`;

const FullscreenFrame = styled.div`
  flex: 1;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;

const KitPage = ({ pageContext }) => {
  const { slug, tool } = pageContext;
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const fsIframeRef = useRef(null);

  if (!tool) {
    return (
      <KitLayout>
        <SEO title="Kit - Not Found" />
        <PageWrapper>
          <p>도구를 찾을 수 없습니다.</p>
        </PageWrapper>
      </KitLayout>
    );
  }

  const category = tool.category;
  const iframeSrc = tool.type === 'html' ? `/kit/${tool.slug}.html` : null;

  return (
    <KitLayout activeCategory={tool.category}>
      <SEO title={tool.title} />
      <PageWrapper>
        <ToolHeader>
          <ToolEmoji>{tool.emoji}</ToolEmoji>
          <ToolTitle>{tool.title}</ToolTitle>
          <ToolDesc>{tool.desc}</ToolDesc>
          <BtnGroup>
            <ToolbarBtn onClick={() => setFullscreen(true)}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
              </svg>
              전체화면
            </ToolbarBtn>
          </BtnGroup>
        </ToolHeader>

        <ToolFrame>
          {iframeSrc && <iframe ref={iframeRef} src={iframeSrc} title={tool.title} />}
        </ToolFrame>
      </PageWrapper>

      {fullscreen && iframeSrc && (
        <FullscreenOverlay>
          <FullscreenBar>
            <ToolEmoji>{tool.emoji}</ToolEmoji>
            <FullscreenTitle>{tool.title}</FullscreenTitle>
            <ToolbarBtn style={{ marginLeft: 'auto' }} onClick={() => setFullscreen(false)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
              닫기
            </ToolbarBtn>
          </FullscreenBar>
          <FullscreenFrame>
            <iframe ref={fsIframeRef} src={iframeSrc} title={`${tool.title} fullscreen`} />
          </FullscreenFrame>
        </FullscreenOverlay>
      )}
    </KitLayout>
  );
};

export default KitPage;
