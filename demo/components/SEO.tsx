import React, { useEffect } from 'react';

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

type Cleanup = (() => void) | undefined;

const updateMetaTag = (
  attribute: 'name' | 'property',
  key: string,
  content?: string
): Cleanup => {
  if (!content || typeof document === 'undefined') {
    return undefined;
  }

  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  let created = false;
  let previousContent: string | null = null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    element.dataset.asciirSeo = 'true';
    document.head.appendChild(element);
    created = true;
  } else if (!element.dataset.asciirSeo) {
    previousContent = element.getAttribute('content');
  }

  element.setAttribute('content', content);

  return () => {
    if (!element) return;
    if (created || element.dataset.asciirSeo === 'true') {
      element.remove();
    } else if (previousContent !== null) {
      element.setAttribute('content', previousContent);
    } else {
      element.removeAttribute('content');
    }
  };
};

const appendLinkTag = (
  rel: string,
  href?: string,
  extra?: Record<string, string>
): Cleanup => {
  if (!href || typeof document === 'undefined') {
    return undefined;
  }

  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  link.dataset.asciirSeo = 'true';

  if (extra) {
    Object.entries(extra).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
  }

  document.head.appendChild(link);
  return () => link.remove();
};

const injectJsonLd = (data: object): Cleanup => {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.asciirSeo = 'true';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);

  return () => script.remove();
};

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

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const cleanups: Cleanup[] = [];
    const previousTitle = document.title;
    document.title = fullTitle;
    cleanups.push(() => {
      document.title = previousTitle;
    });

    const baseNameMeta: Array<[string, string | undefined]> = [
      ['title', fullTitle],
      ['description', description],
      ['keywords', keywords],
      ['author', author],
      ['robots', 'index, follow'],
      ['language', 'English'],
      ['revisit-after', '7 days'],
      ['twitter:card', 'summary_large_image'],
      ['twitter:url', url],
      ['twitter:title', fullTitle],
      ['twitter:description', description],
      ['twitter:image', image],
      ['twitter:site', TWITTER_HANDLE],
      ['twitter:creator', TWITTER_HANDLE],
      ['format-detection', 'telephone=no'],
      ['theme-color', '#2563EB'],
      ['msapplication-TileColor', '#2563EB'],
    ];

    baseNameMeta.forEach(([key, value]) => {
      cleanups.push(updateMetaTag('name', key, value));
    });

    const propertyMeta: Array<[string, string | undefined]> = [
      ['og:type', type],
      ['og:url', url],
      ['og:title', fullTitle],
      ['og:description', description],
      ['og:image', image],
      ['og:image:width', '1200'],
      ['og:image:height', '630'],
      ['og:site_name', SITE_NAME],
      ['og:locale', 'en_US'],
    ];

    propertyMeta.forEach(([key, value]) => {
      cleanups.push(updateMetaTag('property', key, value));
    });

    cleanups.push(appendLinkTag('canonical', url));
    cleanups.push(appendLinkTag('preconnect', 'https://fonts.googleapis.com'));
    cleanups.push(
      appendLinkTag('preconnect', 'https://fonts.gstatic.com', {
        crossOrigin: 'anonymous',
      })
    );

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
      description,
      url,
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

    [jsonLd || defaultJsonLd, organizationJsonLd, breadcrumbJsonLd].forEach(
      (block) => {
        cleanups.push(injectJsonLd(block));
      }
    );

    return () => {
      cleanups.forEach((cleanup) => cleanup && cleanup());
    };
  }, [
    author,
    description,
    fullTitle,
    image,
    jsonLd,
    keywords,
    type,
    url,
  ]);

  return null;
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
