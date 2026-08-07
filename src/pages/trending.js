import React, { useEffect, useMemo, useState } from 'react';
import { withPrefix } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const fmt = (n) => (Number.isFinite(n) ? n.toLocaleString() : '—');

/* ---- date helpers (local; KST user) ---- */
const pad = (n) => String(n).padStart(2, '0');
const toStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayStr = () => toStr(new Date());
function shiftDays(dateStr, delta) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + delta);
  return toStr(dt);
}

const spin = keyframes`to { transform: rotate(360deg); }`;

const GH_BLUE = '#0969da';

const PageWrapper = styled.div`
  padding: 32px 24px 80px;
  max-width: 1024px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
  padding-bottom: 16px;
  margin-bottom: 8px;
`;

const TitleBox = styled.div`
  h1 {
    margin: 0;
    font-size: 1.9rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.headline};
  }
  p {
    margin: 6px 0 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const DateNav = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: 8px;
  padding: 4px;
`;

const NavBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.gray : theme.colors.text)};
  font-size: 1rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  padding: 4px 10px;
  border-radius: 6px;
  &:hover { background: ${({ theme }) => theme.colors.glassBorder}; }
`;

const DateLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const RepoList = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: 12px;
  overflow: hidden;
`;

const RepoRow = styled.article`
  padding: 20px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.glassBorder};
  &:first-child { border-top: none; }
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background 0.2s ease;
  &:hover { background: ${({ theme }) => theme.colors.backgroundSecondary}; }
`;

const RepoHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const StarIcon = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
`;

const RepoName = styled.a`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${GH_BLUE};
  text-decoration: none;
  &:hover { text-decoration: underline; }
  .slash { color: ${({ theme }) => theme.colors.gray}; font-weight: 400; margin: 0 2px; }
`;

const RepoDesc = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.paragraph};
`;

const RepoMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  margin-top: 2px;
  font-size: 0.85rem;
`;

const MetaLeft = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 18px;
  color: ${({ theme }) => theme.colors.text};
  font-variant-numeric: tabular-nums;
`;

const Lang = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: '';
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${({ $color }) => $color || '#818cf8'};
    display: inline-block;
  }
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.text};
  &:hover { color: ${GH_BLUE}; }
`;

const StarsToday = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-variant-numeric: tabular-nums;
`;

const StatusBox = styled.div`
  text-align: center;
  padding: 72px 24px;
  color: ${({ theme }) => theme.colors.gray};
  h2 { font-size: 1.2rem; margin: 0 0 8px; color: ${({ theme }) => theme.colors.headline}; }
`;

const Spinner = styled.div`
  width: 32px; height: 32px; margin: 0 auto 14px;
  border: 3px solid ${({ theme }) => theme.colors.glassBorder};
  border-top-color: ${GH_BLUE};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const TrendingPage = () => {
  // selected: '' = today (latest.json); else 'YYYY-MM-DD' (history)
  const [selected, setSelected] = useState('');
  const [snapshot, setSnapshot] = useState(null);
  const [failed, setFailed] = useState(false);

  const url = selected === ''
    ? withPrefix('/trending/latest.json')
    : withPrefix(`/trending/history/${selected}.json`);

  useEffect(() => {
    setSnapshot(null);
    setFailed(false);
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setSnapshot)
      .catch(() => setFailed(true));
  }, [url]);

  const viewingDate = selected === '' ? todayStr() : selected;
  const isToday = viewingDate >= todayStr();

  const repositories = snapshot?.repositories ?? [];
  const hasData = repositories.length > 0;

  const goPrev = () => setSelected(shiftDays(viewingDate, -1));
  const goNext = () => {
    const next = shiftDays(viewingDate, +1);
    setSelected(next >= todayStr() ? '' : next);
  };

  const subtitle = useMemo(
    () => (isToday ? '오늘 GitHub 커뮤니티가 가장 주목하는 저장소' : `${viewingDate}의 GitHub 트렌딩`),
    [isToday, viewingDate]
  );

  return (
    <Layout>
      <SEO title="Trending" description="GitHub Trending Daily" pathname="/trending/" />
      <PageWrapper>
        <TopBar>
          <TitleBox>
            <h1>Trending</h1>
            <p>{subtitle}</p>
          </TitleBox>
          <DateNav>
            <NavBtn onClick={goPrev} title="이전 날짜">‹</NavBtn>
            <DateLabel>📅 {viewingDate}</DateLabel>
            <NavBtn onClick={goNext} $disabled={isToday} title="다음 날짜">›</NavBtn>
            <NavBtn onClick={() => setSelected('')} $disabled={isToday} title="오늘">오늘</NavBtn>
          </DateNav>
        </TopBar>

        {snapshot === null && !failed ? (
          <StatusBox>
            <Spinner />
            <p>불러오는 중…</p>
          </StatusBox>
        ) : failed ? (
          <StatusBox>
            <h2>{viewingDate} 데이터가 없어요</h2>
            <p>이 날짜의 수집 데이터가 존재하지 않습니다. 다른 날짜를 선택해 보세요.</p>
          </StatusBox>
        ) : (
          <RepoList>
            {repositories.map((repo) => (
              <RepoRow key={repo.fullName || repo.url}>
                <RepoHead>
                  <StarIcon>★</StarIcon>
                  <RepoName href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.owner}<span className="slash">/</span>{repo.name}
                  </RepoName>
                </RepoHead>
                {repo.description && <RepoDesc>{repo.description}</RepoDesc>}
                <RepoMeta>
                  <MetaLeft>
                    {repo.language && <Lang $color={repo.languageColor}>{repo.language}</Lang>}
                    <MetaItem>★ {fmt(repo.stars)}</MetaItem>
                    <MetaItem>⑂ {fmt(repo.forks)}</MetaItem>
                  </MetaLeft>
                  {repo.starsToday > 0 && (
                    <StarsToday>★ {fmt(repo.starsToday)} stars today</StarsToday>
                  )}
                </RepoMeta>
              </RepoRow>
            ))}
            {!hasData && (
              <StatusBox>
                <h2>표시할 저장소가 없어요</h2>
              </StatusBox>
            )}
          </RepoList>
        )}
      </PageWrapper>
    </Layout>
  );
};

export default TrendingPage;
