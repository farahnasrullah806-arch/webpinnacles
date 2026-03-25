export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WebPinnacles',
    url: 'https://webpinnacles.com/',
    logo: 'https://webpinnacles.com/logo.png',
    sameAs: [
      'https://www.linkedin.com/company/webpinnacles',
      'https://www.facebook.com/webpinnacles',
    ],
  }
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'WebPinnacles',
    url: 'https://webpinnacles.com/',
    image: 'https://webpinnacles.com/logo.png',
    telephone: '+1-000-000-0000',
    areaServed: 'US',
  }
}
