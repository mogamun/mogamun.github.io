import React from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
`;

const Wrapper = styled.footer`
  position: relative;
  padding: 48px 40px 32px;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid ${({ theme }) => theme.colors.glassBorder};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 20px 28px;
  }
`;

const ShimmerLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 25%;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.primary}, transparent);
  animation: ${shimmer} 3s ease infinite;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Brand = styled(Link)`
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled(Link)`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }
`;

const Copy = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;
  opacity: 0.7;
  line-height: 1.5;
  text-align: center;
`;

const Footer = () => (
  <Wrapper>
    <ShimmerLine />
    <Inner>
      <Brand to="/">EightTails</Brand>
      <Links>
        <FooterLink to="/">Story</FooterLink>
        <FooterLink to="/">Tech</FooterLink>
        <FooterLink to="/">Design</FooterLink>
        <FooterLink to="/todaydailyeng/">일기써영</FooterLink>
        <FooterLink to="/privacy-policy/">Privacy Policy</FooterLink>
        <FooterLink to="/terms-of-service/">Terms</FooterLink>
      </Links>
      <Copy>
        &copy; {new Date().getFullYear()} EightTails. All rights reserved.
      </Copy>
    </Inner>
  </Wrapper>
);

export default Footer;
