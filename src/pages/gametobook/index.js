import React from 'react';
import { Link } from 'gatsby';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 20px 80px;
`;

const HeroCard = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #2d1b4e 100%);
  border-radius: 20px;
  padding: 48px 40px;
  color: #fff;
  margin-bottom: 48px;
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 32px 24px;
    gap: 24px;
  }
`;

const AppIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 28px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  flex-shrink: 0;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 8px;
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px;
  line-height: 1.6;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 8px;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #00c73c;
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 16px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 199, 60, 0.4);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.headline};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 16px;
  padding: 28px 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const FeatureIcon = styled.div`font-size: 2rem; margin-bottom: 12px;`;

const FeatureTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.headline};
`;

const FeatureDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.6;
  margin: 0;
`;

const ScreenshotSection = styled.div`
  margin-bottom: 48px;
`;

const ScreenshotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const ScreenshotImg = styled.img`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.background};
`;

const LegalLink = styled(Link)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: #8b5cf6; }
`;

const GameToBookPage = () => (
  <Layout>
    <SEO title="GameToBook - App Introduction" />
    <Wrapper>
      <HeroCard>
        <AppIcon>📖</AppIcon>
        <div style={{ flex: 1 }}>
          <HeroTitle>GameToBook</HeroTitle>
          <HeroSubtitle>
            AI가 생성하는 무한한 이야기.<br />
            당신의 선택이 세계를 바꿉니다. 비주얼 노벨 RPG.
          </HeroSubtitle>
          <div>
            <Badge>AI 무한 스토리</Badge>
            <Badge>오프라인 플레이</Badge>
            <Badge>무료</Badge>
          </div>
          <DownloadButton
            href="https://play.google.com/store/apps/details?id=com.mogamun.autopenna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            Google Play
          </DownloadButton>
        </div>
      </HeroCard>

      <SectionTitle>특징</SectionTitle>
      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>✨</FeatureIcon>
          <FeatureTitle>AI 무한 스토리</FeatureTitle>
          <FeatureDesc>매번 새로운 이야기가 생성됩니다. 똑같은 결말은 없습니다.</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🎭</FeatureIcon>
          <FeatureTitle>다채로운 캐릭터</FeatureTitle>
          <FeatureDesc>30명 이상의 매력적인 캐릭터들이 당신을 기다립니다.</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>📖</FeatureIcon>
          <FeatureTitle>스토리 설계</FeatureTitle>
          <FeatureDesc>원하는 세계관과 캐릭터를 직접 설정하고 플레이하세요.</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🎮</FeatureIcon>
          <FeatureTitle>선택의 결과</FeatureTitle>
          <FeatureDesc>당신의 선택이 이야기의 방향을 결정합니다.</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🌙</FeatureIcon>
          <FeatureTitle>오프라인 플레이</FeatureTitle>
          <FeatureDesc>기기 내 AI로 언제 어디서나 플레이 가능합니다.</FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🎨</FeatureIcon>
          <FeatureTitle>아름다운 일러스트</FeatureTitle>
          <FeatureDesc>일본 애니메이션 스타일의 감성적인 일러스트를 감상하세요.</FeatureDesc>
        </FeatureCard>
      </FeatureGrid>

      <ScreenshotSection>
        <SectionTitle>스크린샷</SectionTitle>
        <ScreenshotGrid>
          <ScreenshotImg src="/gametobook/screenshot-1.webp" alt="대화 화면" />
          <ScreenshotImg src="/gametobook/screenshot-2.webp" alt="선택지 화면" />
          <ScreenshotImg src="/gametobook/screenshot-3.webp" alt="스토리 설계" />
        </ScreenshotGrid>
      </ScreenshotSection>

      <LegalLinks>
        <LegalLink to="/gametobook/privacy">개인정보처리방침</LegalLink>
        <LegalLink to="/gametobook/terms">이용약관</LegalLink>
      </LegalLinks>
    </Wrapper>
  </Layout>
);

export default GameToBookPage;
