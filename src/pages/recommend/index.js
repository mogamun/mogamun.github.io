import React from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';

const shimmerAnim = keyframes`
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
`;

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 28px 80px;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.headline};
`;

const PageDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;
`;

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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.a`
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $color }) => `${$color || '#818cf8'}60`};
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.12),
      0 12px 40px rgba(0, 0, 0, 0.16),
      0 0 0 1px ${({ $color }) => `${$color || '#818cf8'}30`};
    opacity: 1;
  }
`;

const ProductImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.glass};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.headline};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDesc = styled.span`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPrice = styled.span`
  font-size: 0.9rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 4px;
`;

const ProductTag = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: ${({ theme }) => `${theme.colors.primary}18`};
  color: ${({ theme }) => theme.colors.primary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.gray};
  opacity: 0.5;
  font-size: 0.9rem;
`;

import { PRODUCTS, PRODUCT_CATEGORIES, PRODUCT_CATEGORY_ORDER } from '../../data/products';

const RecommendPage = () => {
  const grouped = {};
  for (const product of PRODUCTS) {
    if (!grouped[product.category]) grouped[product.category] = [];
    grouped[product.category].push(product);
  }

  const sortedCategories = PRODUCT_CATEGORY_ORDER.filter(c => grouped[c]);

  return (
    <Layout>
      <SEO title="추천 상품" />
      <PageWrapper>
        <PageHeader>
          <PageTitle>추천 상품</PageTitle>
          <PageDesc>직접 사용해보고 좋았던 제품들을 추천합니다</PageDesc>
        </PageHeader>

        {sortedCategories.length === 0 ? (
          <EmptyState>아직 등록된 상품이 없습니다. 곧 추가될 예정입니다.</EmptyState>
        ) : (
          sortedCategories.map(cat => {
            const { emoji, label, color } = PRODUCT_CATEGORIES[cat];
            return (
              <CategorySection key={cat}>
                <CategoryHeader>
                  <CategoryAccent $color={color} />
                  <CategoryTitle>{emoji} {label}</CategoryTitle>
                  <CategoryLine />
                </CategoryHeader>
                <CardGrid>
                  {grouped[cat].map(product => (
                    <ProductCard
                      key={product.id}
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      $color={color}
                    >
                      {product.image && (
                        <ProductImage>
                          <img src={product.image} alt={product.title} loading="lazy" />
                        </ProductImage>
                      )}
                      <ProductInfo>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductDesc>{product.desc}</ProductDesc>
                        {product.price && <ProductPrice>{product.price}</ProductPrice>}
                      </ProductInfo>
                      {product.tag && <ProductTag>{product.tag}</ProductTag>}
                    </ProductCard>
                  ))}
                </CardGrid>
              </CategorySection>
            );
          })
        )}
      </PageWrapper>
    </Layout>
  );
};

export default RecommendPage;
