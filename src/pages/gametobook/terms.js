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

const TermsPage = () => (
  <Layout>
    <SEO title="이용약관 - GameToBook" />
    <Wrapper>
      <BackLink to="/gametobook/">← 돌아가기</BackLink>

      <Title>이용약관</Title>

      <Section>
        <SectionTitle>제1조 (목적)</SectionTitle>
        <Text>본 약관은 Mogamun(이하 "개발자")가 제공하는 GameToBook(이하 "앱")의 이용조건 및 절차를 규정합니다.</Text>
      </Section>

      <Section>
        <SectionTitle>제2조 (이용의 허락)</SectionTitle>
        <Text>개발자는 앱 이용 신청을 한 사용자에게 약관에 동의한 것으로 간주하고 이용을 허락합니다.</Text>
      </Section>

      <Section>
        <SectionTitle>제3조 (이용료)</SectionTitle>
        <Text>본 앱은 무료로 제공됩니다. 단, 일부 콘텐츠는 유료로 제공될 수 있습니다.</Text>
      </Section>

      <Section>
        <SectionTitle>제4조 (이용의 제한)</SectionTitle>
        <Text>개발자는 다음 각 호의 경우 이용을 제한하거나 중지할 수 있습니다.</Text>
        <Text>1. 앱 내 오류 발생 시</Text>
        <Text>2. 시스템 정비 점검 시</Text>
        <Text>3. 기타 불가피한 사유가 있을 때</Text>
      </Section>

      <Section>
        <SectionTitle>제5조 (이용자의 의무)</SectionTitle>
        <Text>이용자는 다음 각 호의 행위를 하여서는 안 됩니다.</Text>
        <Text>1. 앱을 부정한 목적으로 사용하는 행위</Text>
        <Text>2. 앱 내 콘텐츠를 무단 복제/배포하는 행위</Text>
        <Text>3. 기타 관계법령에 위배되는 행위</Text>
      </Section>

      <Section>
        <SectionTitle>제6조 (저작권)</SectionTitle>
        <Text>앱 내 모든 콘텐츠(스토리, 캐릭터, 일러스트 등)의 저작권은 개발자에게 있습니다.</Text>
      </Section>

      <Section>
        <SectionTitle>제7조 (면책)</SectionTitle>
        <Text>개발자는 천재지변, 불가항력 기타 이용자의 귀책사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.</Text>
      </Section>

      <Section>
        <SectionTitle>제8조 (분쟁 해결)</SectionTitle>
        <Text>본 약관과 관련된 분쟁은 대한민국 법에 따라 해결합니다.</Text>
      </Section>

      <Section>
        <SectionTitle>제9조 (시행일)</SectionTitle>
        <Text>본 약관은 2026년 5월 18일부터 시행됩니다.</Text>
      </Section>

      <Section>
        <SectionTitle>문의</SectionTitle>
        <Text>이용약관 관련 문의: support@mogamun.com</Text>
      </Section>
    </Wrapper>
  </Layout>
);

export default TermsPage;
