import React from 'react';
import styled from 'styled-components';

const BannerWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0;
  margin-top: 70px;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4px 8px;
  }
`;

const CoupangBanner = () => (
  <BannerWrap>
    <iframe
      src="/coupang-banner.html"
      width="680"
      height="160"
      scrolling="no"
      frameBorder="0"
      style={{ border: 'none', maxWidth: '100%' }}
      title="추천 상품"
    />
  </BannerWrap>
);

export default CoupangBanner;
