import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ThemeProvider } from './ThemeContext';
import Header from './Header';
import Footer from './Footer';
import CoupangBanner from './CoupangBanner';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  padding-top: 70px;
`;

const SidebarOuter = styled.aside`
  position: sticky;
  top: 70px;
  height: calc(100vh - 70px);
  width: ${({ $collapsed }) => ($collapsed ? '48px' : '260px')};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid ${({ theme }) => theme.colors.glassBorder};
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  z-index: 10;
  animation: ${fadeIn} 0.4s ease both;

  @media (max-width: 900px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};
  padding: ${({ $collapsed }) => ($collapsed ? '14px 0' : '14px 12px')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
  flex-shrink: 0;
`;

const SidebarTitle = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  overflow: hidden;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray};
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}15`};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg { width: 16px; height: 16px; }
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: opacity 0.2s ease;
  padding: ${({ $collapsed }) => ($collapsed ? '0' : '8px')};
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
`;

const SidebarLayout = ({ children, sidebar, title, headerExtra }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <Header />
      <CoupangBanner />
      <Wrapper>
        <SidebarOuter $collapsed={collapsed}>
          <SidebarHeader $collapsed={collapsed}>
            {!collapsed && <SidebarTitle>{title}</SidebarTitle>}
            <div style={{ display: 'flex', gap: 4 }}>
              {!collapsed && headerExtra}
              <IconBtn onClick={() => setCollapsed(c => !c)} title={collapsed ? '펼치기' : '접기'}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  {collapsed
                    ? <path d="M6 4l4 4-4 4" />
                    : <path d="M10 4L6 8l4 4" />}
                </svg>
              </IconBtn>
            </div>
          </SidebarHeader>
          <SidebarContent $collapsed={collapsed}>
            {!collapsed && sidebar}
          </SidebarContent>
        </SidebarOuter>
        <Main>{children}</Main>
      </Wrapper>
      <Footer />
    </ThemeProvider>
  );
};

export default SidebarLayout;
