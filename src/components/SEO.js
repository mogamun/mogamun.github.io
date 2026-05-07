import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, pathname, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          keywords
        }
      }
    }
  `);

  const { title: defaultTitle, description: defaultDescription, siteUrl: siteUrl, keywords } = site.siteMetadata;
  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || '/'}`,
    keywords: keywords.join(', '),
  };

  return (
    <>
      <title>{seo.title}</title>
      <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={`${siteUrl}/og-cover.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {children}
    </>
  );
};

export default SEO;
