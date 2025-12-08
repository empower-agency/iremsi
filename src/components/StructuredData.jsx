import { BRAND_INFO } from '@/lib/constants';

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "name": BRAND_INFO.name,
        "image": "https://www.pendiknailart.com/logo.png",
        "@id": "https://www.pendiknailart.com",
        "url": "https://www.pendiknailart.com",
        "telephone": BRAND_INFO.phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Batı Mahallesi Gazi Paşa Caddesi No:66/2",
            "addressLocality": "Pendik",
            "addressRegion": "İstanbul",
            "postalCode": "34890",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.8788,
            "longitude": 29.2355
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "20:00"
        },
        "priceRange": "$$",
        "servesCuisine": null,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "120"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function ServiceSchema({ serviceName, district, image }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": serviceName,
        "image": image ? `https://www.pendiknailart.com${image}` : undefined,
        "provider": {
            "@type": "BeautySalon",
            "name": BRAND_INFO.name,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": district,
                "addressRegion": "İstanbul"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": district
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function BreadcrumbSchema({ items }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function FAQPageSchema({ faqs }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function ArticleSchema({ title, description, image, datePublished, dateModified }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image ? [image] : [],
        "datePublished": datePublished,
        "dateModified": dateModified || datePublished,
        "author": [{
            "@type": "Organization",
            "name": BRAND_INFO.name,
            "url": "https://www.pendiknailart.com"
        }],
        "publisher": {
            "@type": "Organization",
            "name": BRAND_INFO.name,
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.pendiknailart.com/logo.png"
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

