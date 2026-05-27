import React from 'react';
import { Link } from 'gatsby';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 120px 20px 80px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 0 32px;
  color: ${({ theme }) => theme.colors.headline};
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.headline};
`;

const Text = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0 0 12px;
`;

const List = styled.ul`
  margin: 0 0 16px;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 8px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
  margin-bottom: 24px;

  &:hover {
    color: #8b5cf6;
  }
`;

const PrivacyPage = () => (
  <Layout>
    <SEO title="개인정보처리방침 - GameToBook" />
    <Wrapper>
      <BackLink to="/gametobook/">← 돌아가기</BackLink>

      <Title>개인정보처리방침</Title>

      <Section>
        <SectionTitle>1. 수집하는 개인정보</SectionTitle>
        <Text>GameToBook은 서비스 이용에 필요한 최소한의 개인정보만을 수집합니다.</Text>
        <List>
          <ListItem>수집 항목: 기기 정보, 게임 진행 데이터</ListItem>
          <ListItem>수집 목적: 게임 플레이, 저장/로드 기능 제공</ListItem>
          <ListItem>보유 기간: 서비스 이용 기간 및 삭제 요청 시 즉시 삭제</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>2. 개인정보의 처리</SectionTitle>
        <Text>본 앱은 모든 데이터를 기기 내부에만 저장합니다. 외부 서버로 전송되지 않습니다.</Text>
        <List>
          <ListItem>온디바이스 AI: 모든 AI 연산이 기기 내에서 수행됨</ListItem>
          <ListItem>로컬 저장: 게임 데이터가 기기 내부에만 저장됨</ListItem>
          <ListItem>데이터 전송 없음: 네트워크를 통한 외부 전송 없음</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. 개인정보의 제3자 제공</SectionTitle>
        <Text>본 앱은 개인정보를 제3자에게 제공하지 않습니다.</Text>
      </Section>

      <Section>
        <SectionTitle>4. 광고 식별자</SectionTitle>
        <Text>본 앱은 Google 광고 ID를 수집하지 않습니다.</Text>
      </Section>

      <Section>
        <SectionTitle>5. 만 14세 미만 아동의 개인정보</SectionTitle>
        <Text>본 앱은 만 14세 미만 아동의 개인정보를 수집하지 않습니다.</Text>
      </Section>

      <Section>
        <SectionTitle>6. 개인정보 처리방침 변경</SectionTitle>
        <Text>본 방침은 2026년 5월 18일부터 시행됩니다. 변경될 경우 앱 내 공지사항을 통해 안내합니다.</Text>
      </Section>

      <Section>
        <SectionTitle>7. 문의</SectionTitle>
        <Text>개인정보 관련 문의: support@mogamun.com</Text>
      </Section>
    </Wrapper>
  </Layout>
);

export default PrivacyPage;
