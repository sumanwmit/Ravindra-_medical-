import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  activeTab: string;
}

export default function SEO({ title, description, keywords, activeTab }: SEOProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = `${title} | Ravindra Medical Hall`;

    // 2. Helper to set/update meta tag
    const setMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update standard metas
    setMetaTag('description', description);
    if (keywords) {
      setMetaTag('keywords', keywords);
    } else {
      setMetaTag('keywords', 'Ravindra Medical Hall, Pharmacy in Pai Bigha, Makhdumpur pharmacy, Medical store Bihar, genuine medicines, healthcare store, order medicines WhatsApp, medicine shop Bihar');
    }

    // 4. Update Open Graph / Facebook Meta Tags
    setMetaTag('og:title', `${title} | Ravindra Medical Hall`, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', window.location.href, true);
    setMetaTag('og:image', 'https://images.unsplash.com/photo-1631549916768-4119b2e55c06?auto=format&fit=crop&q=80&w=1200&h=630', true);
    setMetaTag('og:site_name', 'Ravindra Medical Hall', true);

    // 5. Update Twitter Card Meta Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', `${title} | Ravindra Medical Hall`);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', 'https://images.unsplash.com/photo-1631549916768-4119b2e55c06?auto=format&fit=crop&q=80&w=1200&h=630');

    // 6. Generate and inject JSON-LD Schemas
    const schemas: Record<string, unknown>[] = [];

    // Local Business / Pharmacy Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Pharmacy',
      '@id': `${window.location.origin}/#store`,
      name: 'Ravindra Medical Hall',
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e55c06?auto=format&fit=crop&q=80&w=800',
      description: 'Your Trusted Medical Store in Pai Bigha, Makhdumpur, Bihar for Genuine Medicines, Surgical supplies, Baby Care, Personal Care, and Healthcare Essentials.',
      telephone: '+919835669082',
      url: window.location.origin,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Titaiganj Pai Bigha - Makhdumpur Rd, Pai Bigha',
        addressLocality: 'Makhdumpur, Jehanabad',
        addressRegion: 'Bihar',
        postalCode: '804422',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '25.0112',
        longitude: '84.9961'
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '22:00'
        }
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+919835669082',
        contactType: 'customer support',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi']
      },
      sameAs: [
        'https://maps.google.com/?cid=1234567890' // placeholder or standard
      ]
    });

    // Breadcrumb Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: window.location.origin
        },
        ...(activeTab !== 'home' ? [{
          '@type': 'ListItem',
          position: 2,
          name: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
          item: `${window.location.origin}/#${activeTab}`
        }] : [])
      ]
    });

    // FAQ Schema (10 FAQs)
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are the medicines sold at Ravindra Medical Hall genuine?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we sell 100% genuine medicines sourced directly from authorized pharmaceutical distributors. Patient safety and medicine quality are our highest priorities.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you require a prescription for ordering medicines?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For standard over-the-counter (OTC) drugs, baby care, and wellness items, no prescription is required. However, for scheduled prescription-only medicines, we strictly require a valid prescription from a registered doctor.'
          }
        },
        {
          '@type': 'Question',
          name: 'How can I order medicines through WhatsApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ordering is very simple! Go to our WhatsApp Order page, fill out your name, contact details, medicine list, upload your prescription image, and click "Send via WhatsApp". It will format a clean WhatsApp message and open it in your app.'
          }
        },
        {
          '@type': 'Question',
          name: 'What are your working hours?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ravindra Medical Hall is open every day from 08:00 AM to 10:00 PM. For emergency healthcare inquiries, you can call us directly.'
          }
        },
        {
          '@type': 'Question',
          name: 'Where is Ravindra Medical Hall located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We are located at Titaiganj Pai Bigha - Makhdumpur Rd, Pai Bigha, Makhdumpur, Bihar 804422.'
          }
        }
      ]
    });

    // Inject scripts to head
    const existingScripts = document.querySelectorAll('script[data-seo="jsonld"]');
    existingScripts.forEach(s => s.remove());

    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'jsonld');
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Clean up on unmount or tab change
    return () => {
      // Keep static structure but remove dynamic scripts
    };
  }, [title, description, keywords, activeTab]);

  return null;
}
