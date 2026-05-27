import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BannerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ $visible }) => ($visible ? '8px 0' : '0')};
  margin-top: 70px;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  max-height: ${({ $visible }) => ($visible ? '200px' : '0')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease;
`;

const CoupangBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === 'coupang-loaded') setVisible(true);
      if (e.data === 'coupang-blocked') setVisible(false);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <BannerWrap $visible={visible}>
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
};

export default CoupangBanner;
