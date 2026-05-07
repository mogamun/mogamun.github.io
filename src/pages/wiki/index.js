import React, { useState, useMemo } from 'react';
import { graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import WikiLayout from '../../components/WikiLayout';
import SEO from '../../components/SEO';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmerAnim = keyframes`
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
`;

/* ── 페이지 레이아웃 ── */
const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 28px 80px;

  @media (max-width: 768px) {
    padding: 32px 16px 60px;
  }
`;

/* ── 히어로 ── */
const HeroArea = styled.div`
  margin-bottom: 60px;
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  margin: 0 0 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0 0 28px;
  line-height: 1.7;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const StatChip = styled.div`
  padding: 6px 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  backdrop-filter: blur(8px);
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

/* ── 검색 + 필터 ── */
const ControlRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 12px 18px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  backdrop-filter: blur(12px);
  color: ${({ theme }) => theme.colors.headline};
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder { color: ${({ theme }) => theme.colors.gray}; opacity: 0.6; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.glowPrimary};
  }
`;

const FilterChip = styled.button`
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.glassBorder};
  background: ${({ $active, theme }) =>
    $active ? `${theme.colors.primary}20` : theme.colors.glass};
  backdrop-filter: blur(8px);
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.gray};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
  text-transform: capitalize;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ── 카테고리 섹션 ── */
const CategorySection = styled.section`
  margin-bottom: 48px;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: 20px;
  padding: 24px 24px 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
`;

const CategoryAccent = styled.span`
  display: inline-block;
  width: 4px;
  height: 22px;
  border-radius: 4px;
  background: ${({ $color }) => $color || '#818cf8'};
  flex-shrink: 0;
  box-shadow: 0 0 8px ${({ $color }) => $color || '#818cf8'}60;
`;

const CategoryTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0;
  color: ${({ theme }) => theme.colors.headline};
  text-transform: capitalize;
`;

const CategoryCount = styled.span`
  padding: 2px 10px;
  border-radius: 999px;
  background: ${({ $color }) => `${$color || '#818cf8'}18`};
  border: 1px solid ${({ $color }) => `${$color || '#818cf8'}40`};
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ $color }) => $color || '#818cf8'};
`;

const CategoryLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.glassBorder}, transparent);
`;

/* ── 위키 카드 그리드 ── */
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
`;

const WikiCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px 16px 22px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  /* 기본 그림자 — 배경에서 살짝 떠 있는 느낌 */
  box-shadow:
    0 1px 4px rgba(0, 0, 0, 0.06),
    0 4px 12px rgba(0, 0, 0, 0.08);

  /* 좌측 카테고리 컬러 액센트 바 */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    bottom: 12px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: ${({ $color }) => $color || '#818cf8'};
    opacity: 0.7;
    transition: opacity 0.25s, height 0.25s;
  }

  /* shimmer */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
    animation: ${shimmerAnim} 3s ease infinite;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $color }) => `${$color || '#818cf8'}60`};
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.12),
      0 12px 40px rgba(0, 0, 0, 0.16),
      0 0 0 1px ${({ $color }) => `${$color || '#818cf8'}30`},
      0 0 32px ${({ $color }) => `${$color || '#818cf8'}20`};
    opacity: 1;

    &::before { opacity: 1; top: 8px; bottom: 8px; }
    &::after  { opacity: 1; }
  }
`;

const CardTitle = styled.h3`
  font-size: 0.92rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.headline};
  transition: color 0.25s ease;

  ${WikiCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CardDate = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.gray};
  opacity: 0.7;
`;

const CardStatus = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 1px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background: ${({ $s, theme }) =>
    $s === 'stable' ? `${theme.colors.primary}18` : `${theme.colors.gray}15`};
  color: ${({ $s, theme }) =>
    $s === 'stable' ? theme.colors.primary : theme.colors.gray};
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const CardTag = styled.span`
  font-size: 0.68rem;
  padding: 1px 8px;
  border-radius: 999px;
  background: ${({ theme }) => `${theme.colors.secondary}12`};
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}25`};
`;

/* ── 빈 상태 ── */
const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.gray};
  opacity: 0.6;
`;

/* ── Reveal 래퍼 ── */
function RevealSection({ children }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(30px)',
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {children}
    </div>
  );
}

/* ── 유틸 ── */
const CATEGORY_EMOJI = {
  concepts:    '💡',
  sources:     '📄',
  entities:    '🏷',
  comparisons: '⚖️',
  synthesis:   '🔬',
  important:   '⭐',
  corrections: '✏️',
};

const CATEGORY_COLOR = {
  important:   '#fbbf24',
  sources:     '#34d399',
  concepts:    '#818cf8',
  entities:    '#f472b6',
  comparisons: '#fb923c',
  synthesis:   '#a78bfa',
  corrections: '#60a5fa',
};

const CATEGORY_ORDER = ['important', 'sources', 'concepts', 'entities', 'comparisons', 'synthesis', 'corrections'];

function parseTags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return raw.replace(/[\[\]]/g, '').split(',').map(t => t.trim()).filter(Boolean);
}

/* ── 페이지 ── */
const WikiIndexPage = ({ data }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const allWiki = data.allMarkdownRemark.edges.map(({ node }) => ({
    slug:     node.fields.slug,
    title:    node.frontmatter.title || node.fields.slug,
    updated:  node.frontmatter.updated || node.frontmatter.created || '',
    created:  node.frontmatter.created || '',
    status:   node.frontmatter.status || '',
    category: node.frontmatter.category || 'etc',
    tags:     parseTags(node.frontmatter.tags),
    excerpt:  node.excerpt,
  }));

  // 카테고리 목록
  const categories = useMemo(() => {
    const cats = [...new Set(allWiki.map(w => w.category))];
    return cats.sort((a, b) => {
      const ai = CATEGORY_ORDER.indexOf(a);
      const bi = CATEGORY_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [allWiki]);

  // 필터링 (검색 + 카테고리)
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allWiki.filter(w => {
      const matchCat = activeCategory === 'all' || w.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        w.title.toLowerCase().includes(q) ||
        w.tags.some(t => t.toLowerCase().includes(q)) ||
        w.excerpt?.toLowerCase().includes(q)
      );
    });
  }, [allWiki, search, activeCategory]);

  // 카테고리별 그룹핑 (최근 수정순)
  const grouped = useMemo(() => {
    const map = {};
    for (const item of filtered) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    // 각 카테고리 내 최근 수정순 정렬
    for (const cat of Object.keys(map)) {
      map[cat].sort((a, b) => (b.updated || b.created).localeCompare(a.updated || a.created));
    }
    return map;
  }, [filtered]);

  const sortedCategories = activeCategory === 'all'
    ? categories.filter(c => grouped[c])
    : [activeCategory].filter(c => grouped[c]);

  return (
    <WikiLayout currentSlug="/wiki/">
      <SEO title="Blog" />
      <PageWrapper>
        {/* 히어로 */}
        <HeroArea>
          <HeroTitle>Blog</HeroTitle>
          <HeroDesc>
            수집하고 정리한 이야기 — 개념, 비교, 소스, 인사이트
          </HeroDesc>
          <StatsRow>
            <StatChip>📚 총 {allWiki.length}개 포스트</StatChip>
            <StatChip>📂 {categories.length}개 카테고리</StatChip>
          </StatsRow>
        </HeroArea>

        {/* 카테고리별 그리드 */}
        {sortedCategories.length === 0 ? (
          <EmptyState>검색 결과가 없습니다.</EmptyState>
        ) : (
          sortedCategories.map(cat => {
            const color = CATEGORY_COLOR[cat];
            return (
              <RevealSection key={cat}>
                <CategorySection>
                  <CategoryHeader>
                    <CategoryAccent $color={color} />
                    <CategoryTitle>
                      {CATEGORY_EMOJI[cat] || '📁'} {cat}
                    </CategoryTitle>
                    <CategoryCount $color={color}>{grouped[cat].length}</CategoryCount>
                    <CategoryLine />
                  </CategoryHeader>
                  <CardGrid>
                    {grouped[cat].map(item => (
                      <WikiCard key={item.slug} to={item.slug} $color={color}>
                        <CardTitle>{item.title}</CardTitle>
                        {item.tags.length > 0 && (
                          <CardTags>
                            {item.tags.slice(0, 4).map(t => (
                              <CardTag key={t}>#{t}</CardTag>
                            ))}
                          </CardTags>
                        )}
                        <CardMeta>
                          <CardDate>{item.updated || item.created}</CardDate>
                          {item.status && (
                            <CardStatus $s={item.status}>{item.status}</CardStatus>
                          )}
                        </CardMeta>
                      </WikiCard>
                    ))}
                  </CardGrid>
                </CategorySection>
              </RevealSection>
            );
          })
        )}
      </PageWrapper>
    </WikiLayout>
  );
};

export default WikiIndexPage;

export const query = graphql`
  query WikiIndexQuery {
    allMarkdownRemark(
      filter: { fields: { isWiki: { eq: true } } }
      sort: { frontmatter: { updated: DESC } }
    ) {
      edges {
        node {
          fields { slug }
          frontmatter {
            title
            created
            updated
            tags
            status
            category
          }
          excerpt(pruneLength: 120)
        }
      }
    }
  }
`;
