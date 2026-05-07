import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
    src: url('/fonts/SpoqaHanSansNeo-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
    src: url('/fonts/SpoqaHanSansNeo-Bold.woff2') format('woff2');
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(2deg); }
    66% { transform: translateY(-10px) rotate(-1deg); }
  }

  @keyframes floatReverse {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(15px) rotate(-2deg); }
    66% { transform: translateY(8px) rotate(1deg); }
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }

  @keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(60px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes scaleIn {
    0% { opacity: 0; transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 400;
    line-height: 1.6;
    transition: background-color 0.4s ease, color 0.4s ease;
    overflow-x: hidden;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    opacity: 0.6;
  }

  ::-webkit-scrollbar-thumb:hover {
    opacity: 1;
  }

  p {
    color: ${({ theme }) => theme.colors.paragraph};
    font-size: 1.125rem;
    line-height: 1.8;
  }

  strong {
    font-weight: 700;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.headline};
    font-weight: 700;
    line-height: 1.3;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  code, pre {
    font-family: Menlo, Consolas, Monaco, 'Liberation Mono', monospace;
  }

  pre {
    background: #1e1b4b;
    color: #e2e8f0;
    padding: 1.2em;
    border-radius: 12px;
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.6;
    border: 1px solid rgba(129, 140, 248, 0.2);
  }

  :not(pre) > code {
    background: ${({ theme }) => theme.colors.glass};
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    padding: 0.15em 0.5em;
    border-radius: 6px;
    font-size: 0.875em;
    backdrop-filter: blur(4px);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  th, td {
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    padding: 10px 14px;
    text-align: left;
  }

  th {
    background: ${({ theme }) => theme.colors.glass};
    backdrop-filter: blur(8px);
    color: ${({ theme }) => theme.colors.headline};
    font-weight: 700;
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    padding: 12px 20px;
    margin: 20px 0;
    color: ${({ theme }) => theme.colors.gray};
    font-style: italic;
    background: ${({ theme }) => theme.colors.glass};
    border-radius: 0 8px 8px 0;
    backdrop-filter: blur(8px);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyle;
