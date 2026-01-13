import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  jsonLd?: object;
}

const BASE_URL = 'https://asciir.dev';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = 'ASCIIR';
const TWITTER_HANDLE = '@asciir';

export const SEO: React.FC<SEOProps> = ({
  title = 'ASCIIR - Convert Images to Beautiful ASCII Art',
  description = 'A powerful React component for converting images to stunning ASCII art. Features multiple color modes, custom character sets, filters, and export options. Open source and TypeScript ready.',
  keywords = 'ascii art, image to ascii, react component, typescript, image processing, ascii converter, text art, terminal art, open source',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  author = 'ASCIIR Team',
  jsonLd,
}) => {
  const fullTitle = title.includes('ASCIIR') ? title : `${title} | ASCIIR`;

  // Default JSON-LD structured data
  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ASCIIR',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: description,
    url: url,
    author: {
      '@type': 'Organization',
      name: 'ASCIIR',
      url: BASE_URL,
    },
    programmingLanguage: ['TypeScript', 'React', 'JavaScript'],
    softwareRequirements: 'React 18+',
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ASCIIR',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    sameAs: [
      'https://github.com/asciir/asciir',
      'https://www.npmjs.com/package/asciir',
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />

      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
    </Helmet>
  );
};

// Specific SEO configs for each page
export const HomeSEO: React.FC = () => (
  <SEO
    title="ASCIIR - Convert Images to Beautiful ASCII Art | React Component"
    description="Transform any image into stunning ASCII art with ASCIIR. A powerful, open-source React component featuring multiple color modes, custom character sets, real-time preview, and export to PNG/SVG/TXT. TypeScript ready."
    keywords="ascii art generator, image to ascii converter, react ascii component, typescript ascii library, text art generator, terminal art, open source ascii, npm ascii package"
    url="https://asciir.dev"
    jsonLd={{
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ASCIIR',
      url: 'https://asciir.dev',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://asciir.dev/docs?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    }}
  />
);

export const DemoSEO: React.FC = () => (
  <SEO
    title="Interactive Demo - Try ASCIIR Online"
    description="Try ASCIIR live in your browser. Upload images, customize settings, preview ASCII art in real-time, and export to PNG, SVG, or TXT. No installation required."
    keywords="ascii art demo, online ascii converter, try ascii generator, image to text converter online, free ascii art tool"
    url="https://asciir.dev/demo"
    jsonLd={{
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ASCIIR Demo',
      url: 'https://asciir.dev/demo',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    }}
  />
);

export const DocsSEO: React.FC = () => (
  <SEO
    title="Documentation - ASCIIR API Reference & Guides"
    description="Complete documentation for ASCIIR. Learn installation, configuration options, API reference, examples, and advanced usage. Get started in minutes."
    keywords="asciir documentation, ascii art api, react component docs, typescript api reference, ascii generator guide, npm package documentation"
    url="https://asciir.dev/docs"
    type="article"
    jsonLd={{
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'ASCIIR Documentation',
      description: 'Complete documentation for the ASCIIR React component',
      author: {
        '@type': 'Organization',
        name: 'ASCIIR',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ASCIIR',
        logo: {
          '@type': 'ImageObject',
          url: 'https://asciir.dev/logo.svg',
        },
      },
    }}
  />
);

export default SEO;
