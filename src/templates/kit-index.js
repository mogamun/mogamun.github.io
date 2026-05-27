import React, { useState, useMemo } from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import KitLayout from '@/components/KitLayout';
import SEO from '@/components/SEO';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const shimmerAnim = keyframes`
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
`;

const PageWrapper = styled.div`
  padding: 24px 28px 80px;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`;

const CategorySection = styled.section`
  margin-bottom: 48px;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: 20px;
  padding: 28px 28px 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
`;

const CategoryAccent = styled.span`
  display: inline-block;
  width: 4px;
  height: 24px;
  border-radius: 4px;
  background: ${({ $color }) => $color || '#818cf8'};
  flex-shrink: 0;
  box-shadow: 0 0 8px ${({ $color }) => $color || '#818cf8'}60;
`;

const CategoryTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0;
  color: ${({ theme }) => theme.colors.headline};
`;

const CategoryLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.glassBorder}, transparent);
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(384px, 1fr));
  gap: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const KitCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 26px 28px 24px 32px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.08);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 16px;
    bottom: 16px;
    width: 4px;
    border-radius: 0 4px 4px 0;
    background: ${({ $color }) => $color || '#818cf8'};
    opacity: 0.7;
    transition: opacity 0.25s;
  }

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

    &::before { opacity: 1; top: 10px; bottom: 10px; }
    &::after  { opacity: 1; }
  }

  @media (max-width: 480px) {
    padding: 20px 22px 18px 26px;
  }
`;

const CardEmoji = styled.span`
  font-size: 2rem;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(129,140,248,0.2), rgba(244,114,182,0.15));
  border: 1px solid rgba(129,140,248,0.15);
  border-radius: 14px;
  flex-shrink: 0;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.headline};
  transition: color 0.25s ease;

  ${KitCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardDesc = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.4;
`;

const CardBadge = styled.span`
  margin-left: auto;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${({ $type, theme }) =>
    $type === 'python' ? `${theme.colors.secondary}18` : `${theme.colors.primary}18`};
  color: ${({ $type, theme }) =>
    $type === 'python' ? theme.colors.secondary : theme.colors.primary};
  flex-shrink: 0;
`;

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

const KitIndexPage = ({ pageContext }) => {
  const { tools, categories, categoryOrder } = pageContext;
  const [activeCategory] = useState(null);

  const grouped = useMemo(() => {
    const map = {};
    for (const tool of tools) {
      if (!map[tool.category]) map[tool.category] = [];
      map[tool.category].push(tool);
    }
    return map;
  }, [tools]);

  const sortedCategories = categoryOrder.filter(c => grouped[c]);

  return (
    <KitLayout activeCategory={activeCategory}>
      <SEO title="Kit" />
      <PageWrapper>
        {sortedCategories.map(cat => {
          const { emoji, label, color } = categories[cat] || { emoji: '📁', label: cat, color: '#818cf8' };
          return (
            <RevealSection key={cat}>
              <CategorySection id={cat}>
                <CategoryHeader>
                  <CategoryAccent $color={color} />
                  <CategoryTitle>{emoji} {label}</CategoryTitle>
                  <CategoryLine />
                </CategoryHeader>
                <CardGrid>
                  {grouped[cat].map(tool => (
                    <KitCard key={tool.slug} to={`/kit/${tool.slug}/`} $color={color}>
                      <CardEmoji>{tool.emoji}</CardEmoji>
                      <CardInfo>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDesc>{tool.desc}</CardDesc>
                      </CardInfo>
                      <CardBadge $type={tool.type}>{tool.type}</CardBadge>
                    </KitCard>
                  ))}
                </CardGrid>
              </CategorySection>
            </RevealSection>
          );
        })}
      </PageWrapper>
    </KitLayout>
  );
};

export default KitIndexPage;
