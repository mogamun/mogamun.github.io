import React, { useEffect, useState } from 'react';
import { withPrefix } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';

const fmt = (n) => (Number.isFinite(n) ? n.toLocaleString() : '—');

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const PageWrapper = styled.div`
  padding: 24px 28px 80px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`;

const Hero = styled.div`
  margin-bottom: 36px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 8px;
  background: linear-gradient(120deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const MetaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const RepoCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px 24px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => `${theme.colors.primary}60`};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 0 32px ${({ theme }) => theme.colors.glowPrimary};
  }
`;

const RankBadge = styled.span`
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 0.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray};
  font-variant-numeric: tabular-nums;
`;

const RepoName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  padding-right: 36px;
  color: ${({ theme }) => theme.colors.headline};
  word-break: break-word;
  transition: color 0.25s ease;

  ${RepoCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RepoDesc = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
`;

const RepoStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
  margin-top: auto;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.paragraph};
  font-variant-numeric: tabular-nums;
`;

const LangDot = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $color }) => $color || '#818cf8'};
    flex-shrink: 0;
  }
`;

const Stat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.gray};
`;

const TodayStat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
`;

const StatusBox = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: ${({ theme }) => theme.colors.gray};

  h2 {
    font-size: 1.3rem;
    margin: 0 0 12px;
    color: ${({ theme }) => theme.colors.headline};
  }

  code {
    background: ${({ theme }) => theme.colors.glass};
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.85rem;
  }
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  margin: 0 auto 16px;
  border: 3px solid ${({ theme }) => theme.colors.glassBorder};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
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

const TrendingPage = () => {
  const [snapshot, setSnapshot] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(withPrefix('/trending/latest.json'))
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setSnapshot)
      .catch(() => setError(true));
  }, []);

  const repositories = snapshot?.repositories ?? [];
  const { date, fetchedAt, language, since } = snapshot ?? {};
  const hasData = repositories.length > 0;

  return (
    <Layout>
      <SEO title="Trending" description="GitHub Trending Daily" pathname="/trending/" />
      <PageWrapper>
        <Hero>
          <HeroTitle>🔥 GitHub Trending</HeroTitle>
          <HeroMeta>
            <MetaBadge>📅 {date || '—'}</MetaBadge>
            <MetaBadge>🌐 {language || 'all'} · {since || 'daily'}</MetaBadge>
            {fetchedAt && <MetaBadge>🕒 {fetchedAt.slice(0, 10)}</MetaBadge>}
            <MetaBadge>📦 {repositories.length} repos</MetaBadge>
          </HeroMeta>
        </Hero>

        {snapshot === null && !error ? (
          <StatusBox>
            <Spinner />
            <p>불러오는 중…</p>
          </StatusBox>
        ) : hasData ? (
          <RevealSection>
            <CardGrid>
              {repositories.map((repo) => (
                <RepoCard key={repo.fullName || repo.url} href={repo.url} target="_blank" rel="noopener noreferrer">
                  <RankBadge>#{repo.rank}</RankBadge>
                  <RepoName>{repo.fullName}</RepoName>
                  <RepoDesc>{repo.description || '설명 없음'}</RepoDesc>
                  <RepoStats>
                    {repo.language && <LangDot $color={repo.languageColor}>{repo.language}</LangDot>}
                    <Stat>★ {fmt(repo.stars)}</Stat>
                    <Stat>⑂ {fmt(repo.forks)}</Stat>
                    {repo.starsToday > 0 && <TodayStat>↑ {fmt(repo.starsToday)} today</TodayStat>}
                  </RepoStats>
                </RepoCard>
              ))}
            </CardGrid>
          </RevealSection>
        ) : (
          <StatusBox>
            <h2>아직 수집된 데이터가 없어요</h2>
            <p>
              터미널에서 <code>npm run scrape-trending</code> 을 실행한 뒤<br />
              <code>git add static/trending/ &amp;&amp; git commit &amp;&amp; git push</code> 하면 이 페이지에 표시됩니다.
            </p>
          </StatusBox>
        )}
      </PageWrapper>
    </Layout>
  );
};

export default TrendingPage;
