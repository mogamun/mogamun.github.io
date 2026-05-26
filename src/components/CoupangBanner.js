import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BannerWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0;
  margin-top: 70px;
  min-height: 140px;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 4px 8px;
  }
`;

const CoupangBanner = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const script1 = document.createElement('script');
    script1.src = 'https://ads-partners.coupang.com/g.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.textContent = `new PartnersCoupang.G({"id":992064,"template":"carousel","trackingCode":"AF6738959","width":"680","height":"140","tsource":""});`;

    ref.current.innerHTML = '';
    ref.current.appendChild(script1);
    script1.onload = () => {
      if (ref.current) ref.current.appendChild(script2);
    };
  }, []);

  return (
    <BannerWrap>
      <div ref={ref} />
    </BannerWrap>
  );
};

export default CoupangBanner;
