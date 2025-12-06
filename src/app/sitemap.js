import { DISTRICTS, SERVICES } from '@/lib/constants';

export default function sitemap() {
    const baseUrl = 'https://www.iremsi.com'; // Sitenizin domain'ini buraya yazın

    // Ana sayfalar
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/politika`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Tüm ilçe-hizmet kombinasyonları
    const servicePages = [];

    DISTRICTS.forEach((district) => {
        SERVICES.forEach((service) => {
            const slug = `${district.toLowerCase()}-${service.slug}`;

            // Pendik ve Kartal'a daha yüksek öncelik
            let priority = 0.7;
            if (district === 'Pendik' || district === 'Kartal') {
                priority = 0.9;
                // Protez Tırnak ve Nail Art'a ekstra öncelik
                if (service.slug === 'protez-tirnak' || service.slug === 'nail-art') {
                    priority = 0.95;
                }
            }

            servicePages.push({
                url: `${baseUrl}/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority,
            });
        });
    });

    return [...staticPages, ...servicePages];
}
