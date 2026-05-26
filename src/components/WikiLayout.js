import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from './ThemeContext';
import Header from './Header';
import Footer from './Footer';
import WikiGraph from './WikiGraph';
import CoupangBanner from './CoupangBanner';

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  padding-top: 70px;
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
`;

const WikiLayout = ({ children, currentSlug }) => (
  <ThemeProvider>
    <Header />
    <CoupangBanner />
    <Wrapper>
      <WikiGraph currentSlug={currentSlug} />
      <Main>{children}</Main>
    </Wrapper>
    <Footer />
  </ThemeProvider>
);

export default WikiLayout;
