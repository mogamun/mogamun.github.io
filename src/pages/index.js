import React from 'react';
import { graphql, Link } from 'gatsby';
import styled, { keyframes, css } from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostCard from '../components/PostCard';
import ParticleBackground from '../components/ParticleBackground';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTilt } from '../hooks/useTilt';

/* ===== Keyframes ===== */
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const bounceY = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(8px); }
`;

const floatBlob = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -40px) scale(1.05); }
  66%       { transform: translate(-20px, 20px) scale(0.97); }
`;

const floatBlob2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(-40px, 30px) scale(0.95); }
  66%       { transform: translate(20px, -20px) scale(1.04); }
`;

const gradientFlow = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmerAnim = keyframes`
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px ${p => p.theme?.colors?.glowPrimary || 'rgba(129,140,248,0.25)'}; }
  50%       { box-shadow: 0 0 40px ${p => p.theme?.colors?.glowPrimary || 'rgba(129,140,248,0.4)'}; }
`;

/* ===== Hero ===== */
const HeroSection = styled.header`
  position: relative;
  height: 100vh;
  min-height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(
    ellipse at 20% 50%,
    rgba(99, 102, 241, 0.15) 0%,
    transparent 60%
  ),
  radial-gradient(
    ellipse at 80% 50%,
    rgba(236, 72, 153, 0.12) 0%,
    transparent 60%
  ),
  ${({ theme }) => theme.colors.background};
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
`;

const Blob1 = styled(Blob)`
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
  top: -100px;
  left: -100px;
  animation: ${floatBlob} 10s ease-in-out infinite;
`;

const Blob2 = styled(Blob)`
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%);
  bottom: -80px;
  right: -80px;
  animation: ${floatBlob2} 13s ease-in-out infinite;
`;

const Blob3 = styled(Blob)`
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%);
  top: 40%;
  left: 55%;
  animation: ${floatBlob} 8s ease-in-out infinite 2s;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  width: 100%;
  text-align: center;
  padding: 0 24px;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease 0.3s forwards;
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: inline-block;
  animation: ${glowPulse} 2s ease infinite;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 900;
  line-height: 1.15;
  margin: 0 0 20px;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.colors.headline};

  .gradient {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.secondary} 60%,
      ${({ theme }) => theme.colors.tertiary} 100%
    );
    background-size: 200% 200%;
    animation: ${gradientFlow} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .line1 {
    display: block;
    opacity: 0;
    animation: ${slideUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
  }
  .line2 {
    display: block;
    opacity: 0;
    animation: ${slideUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.75s forwards;
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: ${({ theme }) => theme.colors.gray};
  margin: 0 auto 40px;
  max-width: 540px;
  line-height: 1.7;
  opacity: 0;
  animation: ${slideUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease 1.2s forwards;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  ${({ $primary, theme }) => $primary ? css`
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    color: #fff;
    box-shadow: 0 4px 20px ${theme.colors.glowPrimary};
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px ${theme.colors.glowPrimary};
      opacity: 1;
    }
  ` : css`
    background: ${theme.colors.glass};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid ${theme.colors.glassBorder};
    color: ${theme.colors.headline};
    &:hover {
      background: ${theme.colors.glassBorder};
      transform: translateY(-2px);
      opacity: 1;
    }
  `}
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 36px;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease 1.6s forwards;
  animation: ${bounceY} 2s ease-in-out 1.6s infinite;
  z-index: 1;
`;

const ScrollArrow = styled.div`
  width: 24px;
  height: 24px;
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  transform: rotate(45deg);
  opacity: 0.7;
`;

/* ===== Section ===== */
const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 800;
  margin: 0;
  color: ${({ theme }) => theme.colors.headline};
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 36px;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;

/* ===== Reveal wrapper ===== */
function RevealSection({ children, ...rest }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} {...rest}>
      {typeof children === 'function' ? children(isVisible) : children}
    </div>
  );
}

const revealStyle = (visible) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'none' : 'translateY(40px)',
  transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
});

/* ===== App Cards ===== */
const AppCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
`;

const AppCardWrap = styled.div`
  will-change: transform;
`;

const AppCardInner = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
  position: relative;

  &:hover {
    box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.12),
      0 0 30px ${({ theme }) => theme.colors.glowPrimary};
    opacity: 1;
  }
`;

const AppCardIcon = styled.div`
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  background: linear-gradient(
    135deg,
    rgba(129, 140, 248, 0.15) 0%,
    rgba(244, 114, 182, 0.1) 100%
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
    animation: ${shimmerAnim} 3s ease infinite;
    opacity: 0;
  }

  ${AppCardInner}:hover &::after {
    opacity: 1;
  }
`;

const AppCardContent = styled.div`
  padding: 16px 18px;
`;

const AppCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.headline};
`;

const AppCardDesc = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;
  line-height: 1.4;
`;

function AppCard({ to, icon, title, desc }) {
  const { ref, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(5);
  return (
    <AppCardWrap
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <AppCardInner to={to}>
        <AppCardIcon>{icon}</AppCardIcon>
        <AppCardContent>
          <AppCardTitle>{title}</AppCardTitle>
          <AppCardDesc>{desc}</AppCardDesc>
        </AppCardContent>
      </AppCardInner>
    </AppCardWrap>
  );
}

/* ===== Featured Stories ===== */
const FeaturedWrapper = styled.div`
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60px;
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

const HorizontalScroll = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 12px 4px 20px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  scroll-snap-type: x mandatory;
`;

const HighlightCard = styled(Link)`
  min-width: 360px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  scroll-snap-align: start;
  transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 0 30px ${({ theme }) => theme.colors.glowPrimary};
    opacity: 1;
  }

  @media (max-width: 768px) {
    min-width: 290px;
  }
`;

const CardImg = styled.div`
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${HighlightCard}:hover & img {
    transform: scale(1.06);
  }
`;

const CardExcerpt = styled.div`
  height: 220px;
  padding: 24px;
  background: linear-gradient(
    160deg,
    ${({ theme }) => `${theme.colors.primary}22`} 0%,
    ${({ theme }) => `${theme.colors.secondary}15`} 100%
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(transparent 30%, ${({ theme }) => theme.colors.background}cc);
  }

  p {
    position: relative;
    z-index: 1;
    font-size: 13px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.paragraph};
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    opacity: 0.9;
  }
`;

const CardText = styled.div`
  padding: 20px 22px;
`;

const CardCategory = styled.span`
  display: block;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.headline};
  line-height: 1.4;
`;

const CardSummary = styled.p`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* ===== Grid ===== */
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px 20px;
`;

const GridItem = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '40px')});
  transition:
    opacity 0.7s ease-out,
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${({ $delay }) => $delay || 0}s;
`;

/* ===== Divider ===== */
const GradientDivider = styled.div`
  height: 1px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.primary}40,
    ${({ theme }) => theme.colors.secondary}40,
    transparent
  );
`;

/* ===== Page ===== */
const HomePage = ({ data }) => {
  const allPosts = data.allMarkdownRemark.edges;
  const posts = allPosts.filter(({ node }) => node.frontmatter.layout !== 'legal');

  return (
    <Layout>
      <SEO title="Blog" />

      {/* Hero */}
      <HeroSection>
        <ParticleBackground color1="#818cf8" color2="#f472b6" />
        <Blob1 />
        <Blob2 />
        <Blob3 />
        <HeroContent>
          <HeroBadge>
            <BadgeDot />
            기술과 사람, 그리고 이야기
          </HeroBadge>
          <HeroTitle>
            <span className="line1">새로운 시선으로</span>
            <span className="line2 gradient">세상을 읽다</span>
          </HeroTitle>
          <HeroSubtitle>
            기술의 흐름 속에서 사람 냄새 나는 이야기를 전합니다.
          </HeroSubtitle>
          <HeroCTA>
            <CTAButton href="#latest" $primary>
              글 읽기 시작하기 →
            </CTAButton>
            <CTAButton href="/about">
              소개 보기
            </CTAButton>
          </HeroCTA>
        </HeroContent>
        <ScrollIndicator>
          <ScrollArrow />
        </ScrollIndicator>
      </HeroSection>

      {/* Apps */}
      <Section>
        <RevealSection>
          {(visible) => (
            <div style={revealStyle(visible)}>
              <SectionHeader>
                <SectionTitle>Apps</SectionTitle>
              </SectionHeader>
              <AppCardGrid>
                <AppCard to="/todaydailyeng/" icon="📝" title="일기써영" desc="AI 영어 일기 교정" />
              </AppCardGrid>
            </div>
          )}
        </RevealSection>
      </Section>

      <GradientDivider />

      {/* Featured Stories */}
      <Section>
        <RevealSection>
          {(visible) => (
            <div style={revealStyle(visible)}>
              <SectionHeader>
                <SectionTitle>Featured Stories</SectionTitle>
              </SectionHeader>
              <FeaturedWrapper>
                <HorizontalScroll>
                  {posts.map(({ node }) => (
                    <HighlightCard key={node.fields.slug} to={node.fields.slug}>
                      {node.frontmatter.thumbnail ? (
                        <CardImg>
                          <img src={node.frontmatter.thumbnail} alt={node.frontmatter.title} />
                        </CardImg>
                      ) : (
                        <CardExcerpt>
                          <p>{node.excerpt}</p>
                        </CardExcerpt>
                      )}
                      <CardText>
                        {node.frontmatter.category && (
                          <CardCategory>{node.frontmatter.category}</CardCategory>
                        )}
                        <CardTitle>{node.frontmatter.title}</CardTitle>
                        {node.frontmatter.summary && (
                          <CardSummary>{node.frontmatter.summary}</CardSummary>
                        )}
                      </CardText>
                    </HighlightCard>
                  ))}
                </HorizontalScroll>
              </FeaturedWrapper>
            </div>
          )}
        </RevealSection>
      </Section>

      <GradientDivider />

      {/* Latest Updates */}
      <Section id="latest">
        <RevealSection>
          {(visible) => (
            <SectionHeader style={revealStyle(visible)}>
              <SectionTitle>Latest Updates</SectionTitle>
            </SectionHeader>
          )}
        </RevealSection>
        <RevealSection>
          {(visible) => (
            <GridContainer>
              {posts.map(({ node }, i) => (
                <GridItem
                  key={node.fields.slug}
                  $visible={visible}
                  $delay={`${i * 0.08}`}
                >
                  <PostCard
                    slug={node.fields.slug}
                    title={node.frontmatter.title}
                    date={node.frontmatter.date}
                    category={node.frontmatter.category}
                    thumbnail={node.frontmatter.thumbnail}
                    summary={node.frontmatter.summary}
                    excerpt={node.excerpt}
                  />
                </GridItem>
              ))}
            </GridContainer>
          )}
        </RevealSection>
      </Section>
    </Layout>
  );
};

export default HomePage;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
            date(formatString: "YYYY.MM.DD")
            thumbnail
            summary
            layout
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;
