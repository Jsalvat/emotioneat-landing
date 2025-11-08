// SEO utilities and constants

export const SITE_NAME = 'EmotionEat';
export const SITE_URL = 'https://emotioneat.com';
export const SITE_DESCRIPTION = 'AI-powered emotional eating support and pattern analysis';

export const DEFAULT_OG_IMAGE = '/og-image.jpg';

export const SCHEMA_ORG = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EmotionEat',
    url: 'https://emotioneat.com',
    logo: 'https://emotioneat.com/logo.png',
    sameAs: [
      'https://twitter.com/emotioneat',
      'https://github.com/emotioneat'
    ]
  },
  webApplication: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EmotionEat',
    url: 'https://emotioneat.com',
    description: 'AI-powered emotional eating support and pattern analysis',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }
};

