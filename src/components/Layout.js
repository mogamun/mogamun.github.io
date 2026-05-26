import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Header from './Header';
import Footer from './Footer';
import CoupangBanner from './CoupangBanner';

const Layout = ({ children }) => (
  <ThemeProvider>
    <Header />
    <CoupangBanner />
    {children}
    <Footer />
  </ThemeProvider>
);

export default Layout;
