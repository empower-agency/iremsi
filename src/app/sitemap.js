
import { DISTRICTS, SERVICES } from '@/lib/constants';
import fs from 'fs';
import path from 'path';

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
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
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

    // Blog Yazıları (Dinamik)
    let blogPages = [];
    try {
        const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
        if (fs.existsSync(filePath)) {
            const blogs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const publishedBlogs = blogs.filter(p => p.status === 'published');

            blogPages = publishedBlogs.map(post => ({
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post.updatedAt),
                changeFrequency: 'weekly',
                priority: 0.8,
            }));
        }
    } catch (e) {
        console.error('Blog sitemap error', e);
    }


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

    return [...staticPages, ...servicePages, ...blogPages];
}
