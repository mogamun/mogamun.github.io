import React from 'react';
import { graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import WikiLayout from '../components/WikiLayout';
import SEO from '../components/SEO';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── 페이지 래퍼 ── */
const PageWrapper = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 32px 80px;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 768px) {
    padding: 32px 16px 60px;
  }
`;

/* ── 브레드크럼 ── */
const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const BreadLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: ${({ theme }) => theme.colors.primary}; opacity: 1; }
`;

const BreadSep = styled.span`opacity: 0.4;`;

const CategoryBadge = styled.span`
  padding: 2px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  backdrop-filter: blur(8px);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

/* ── 헤더 ── */
const ArticleHeader = styled.header`
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 900;
  line-height: 1.25;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.headline};
  letter-spacing: -0.5px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
  opacity: 0.8;
`;

const StatusBadge = styled.span`
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ $status, theme }) =>
    $status === 'stable'  ? `${theme.colors.primary}22` :
    $status === 'draft'   ? `${theme.colors.secondary}22` :
    `${theme.colors.gray}22`};
  color: ${({ $status, theme }) =>
    $status === 'stable'  ? theme.colors.primary :
    $status === 'draft'   ? theme.colors.secondary :
    theme.colors.gray};
  border: 1px solid ${({ $status, theme }) =>
    $status === 'stable'  ? `${theme.colors.primary}40` :
    $status === 'draft'   ? `${theme.colors.secondary}40` :
    `${theme.colors.gray}40`};
`;

/* ── 태그 ── */
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const Tag = styled(Link)`
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.2s, color 0.2s, border-color 0.2s;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}15`};
    border-color: ${({ theme }) => `${theme.colors.primary}50`};
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }
`;

/* ── 본문 ── */
const ArticleBody = styled.article`
  color: ${({ theme }) => theme.colors.paragraph};
  line-height: 1.85;
  font-size: 1rem;

  h1, h2, h3, h4 {
    color: ${({ theme }) => theme.colors.headline};
    font-weight: 700;
    margin-top: 2.5em;
    margin-bottom: 0.75em;
    scroll-margin-top: 90px;
  }

  h2 {
    font-size: 1.45rem;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
      border-radius: 2px;
    }
  }

  h3 { font-size: 1.15rem; }

  p { margin: 0 0 1.2em; }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => `${theme.colors.primary}40`};
    transition: border-color 0.2s;
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
      opacity: 1;
    }
  }

  ul, ol {
    padding-left: 1.5em;
    margin-bottom: 1.2em;
    li { margin-bottom: 0.4em; }
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    padding: 12px 20px;
    margin: 1.5em 0;
    background: ${({ theme }) => theme.colors.glass};
    border-radius: 0 12px 12px 0;
    backdrop-filter: blur(8px);
    font-style: italic;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: 0.9rem;
    th, td {
      padding: 10px 14px;
      border: 1px solid ${({ theme }) => theme.colors.glassBorder};
      text-align: left;
    }
    th {
      background: ${({ theme }) => theme.colors.glass};
      backdrop-filter: blur(8px);
      font-weight: 700;
      color: ${({ theme }) => theme.colors.headline};
    }
    tr:nth-child(even) td {
      background: ${({ theme }) => `${theme.colors.glass}`};
    }
  }

  pre {
    border-radius: 12px;
    margin: 1.5em 0;
    overflow-x: auto;
  }

  code {
    font-size: 0.88em;
  }

  img {
    max-width: 100%;
    border-radius: 12px;
    margin: 1.5em 0;
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }

  hr {
    border: none;
    height: 1px;
    background: ${({ theme }) => theme.colors.glassBorder};
    margin: 2.5em 0;
  }
`;

/* ── 하단 네비 ── */
const BottomNav = styled.div`
  margin-top: 60px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.glassBorder};
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const NavBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  backdrop-filter: blur(12px);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.headline};
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}15`};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.glowPrimary};
    opacity: 1;
  }
`;

/* ── 컴포넌트 ── */
const WikiPage = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const slug = data.markdownRemark.fields?.slug || '';

  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags
    : typeof frontmatter.tags === 'string'
      ? frontmatter.tags.replace(/[\[\]]/g, '').split(',').map(t => t.trim()).filter(Boolean)
      : [];

  const category = frontmatter.category || '';

  return (
    <WikiLayout currentSlug={slug}>
      <SEO title={frontmatter.title} />
      <PageWrapper>
        {/* 브레드크럼 */}
        <Breadcrumb>
          <BreadLink to="/">Home</BreadLink>
          <BreadSep>/</BreadSep>
          <BreadLink to="/wiki/">Wiki</BreadLink>
          {category && (
            <>
              <BreadSep>/</BreadSep>
              <CategoryBadge>{category}</CategoryBadge>
            </>
          )}
        </Breadcrumb>

        {/* 헤더 */}
        <ArticleHeader>
          <Title>{frontmatter.title}</Title>
          <MetaRow>
            {frontmatter.updated && (
              <MetaItem>수정 {frontmatter.updated}</MetaItem>
            )}
            {frontmatter.created && (
              <MetaItem>생성 {frontmatter.created}</MetaItem>
            )}
            {frontmatter.status && (
              <StatusBadge $status={frontmatter.status}>
                {frontmatter.status}
              </StatusBadge>
            )}
          </MetaRow>
          {tags.length > 0 && (
            <TagList>
              {tags.map(tag => (
                <Tag key={tag} to={`/wiki/?tag=${encodeURIComponent(tag)}`}>
                  #{tag}
                </Tag>
              ))}
            </TagList>
          )}
        </ArticleHeader>

        {/* 본문 */}
        <ArticleBody dangerouslySetInnerHTML={{ __html: html }} />

        {/* 하단 네비 */}
        <BottomNav>
          <NavBtn to="/wiki/">← 위키 목록으로</NavBtn>
        </BottomNav>
      </PageWrapper>
    </WikiLayout>
  );
};

export default WikiPage;

export const query = graphql`
  query WikiPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields { slug }
      html
      frontmatter {
        title
        created
        updated
        tags
        status
        category
      }
    }
  }
`;
