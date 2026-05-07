import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled, { keyframes } from 'styled-components';

const glowPulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1; transform: scale(1.05); }
`;

const tickerScroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const CATEGORY_COLOR = {
  concepts:    '#818cf8',
  sources:     '#34d399',
  entities:    '#f472b6',
  comparisons: '#fb923c',
  synthesis:   '#a78bfa',
  important:   '#fbbf24',
};

const TickerOuter = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
  overflow: hidden;
  position: relative;
  height: 48px;
  display: flex;
  align-items: center;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 120px;
    z-index: 2;
    pointer-events: none;
  }
  &::before {
    left: 0;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.background}, transparent);
  }
  &::after {
    right: 0;
    background: linear-gradient(to left, ${({ theme }) => theme.colors.background}, transparent);
  }
`;

const TickerLabel = styled.div`
  position: absolute;
  left: 20px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  padding: 0 12px 0 4px;
  white-space: nowrap;
`;

const LabelDot = styled.span`
  width: 6px; height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${glowPulse} 1.8s ease infinite;
  flex-shrink: 0;
`;

const TickerTrack = styled.div`
  display: flex;
  padding-left: 140px;
`;

const TickerInner = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  width: max-content;
  animation: ${tickerScroll} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const TickerItem = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 28px 0 0;
  text-decoration: none;
  white-space: nowrap;
  font-size: 0.82rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }

  &::after {
    content: '·';
    margin-left: 28px;
    opacity: 0.3;
  }
`;

const TickerDot = styled.span`
  width: 6px; height: 6px;
  border-radius: 50%;
  background: ${({ $cat }) => CATEGORY_COLOR[$cat] || '#94a3b8'};
  flex-shrink: 0;
`;

const TickerTitle = styled.span`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TickerCat = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ $cat }) => CATEGORY_COLOR[$cat] || '#94a3b8'};
  opacity: 0.8;
`;

const WikiTicker = () => {
  const data = useStaticQuery(graphql`
    query WikiTickerQuery {
      allMarkdownRemark(
        filter: { fields: { isWiki: { eq: true } } }
        sort: { frontmatter: { updated: DESC } }
        limit: 24
      ) {
        edges {
          node {
            fields { slug }
            frontmatter { title category updated }
          }
        }
      }
    }
  `);

  const items = data.allMarkdownRemark.edges;
  if (!items.length) return null;

  const doubled = [...items, ...items];

  return (
    <TickerOuter>
      <TickerLabel>
        <LabelDot />
        Latest Posts
      </TickerLabel>
      <TickerTrack>
        <TickerInner>
          {doubled.map(({ node }, i) => (
            <TickerItem key={i} to={node.fields.slug}>
              <TickerDot $cat={node.frontmatter.category} />
              <TickerCat $cat={node.frontmatter.category}>
                {node.frontmatter.category}
              </TickerCat>
              <TickerTitle>{node.frontmatter.title}</TickerTitle>
            </TickerItem>
          ))}
        </TickerInner>
      </TickerTrack>
    </TickerOuter>
  );
};

export default WikiTicker;
