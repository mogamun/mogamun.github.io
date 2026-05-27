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

const BannerFrame = styled.iframe`
  border: none;
  max-width: 100%;
`;

const iframeSrc = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:140px;background:transparent;">
<script src="https://ads-partners.coupang.com/g.js"></script>
<script>new PartnersCoupang.G({"id":992064,"template":"carousel","trackingCode":"AF6738959","width":"680","height":"140","tsource":""});</script>
</body>
</html>`;

const CoupangBanner = () => (
  <BannerWrap>
    <BannerFrame
      srcDoc={iframeSrc}
      width="680"
      height="160"
      scrolling="no"
      title="추천 상품"
    />
  </BannerWrap>
);

export default CoupangBanner;
