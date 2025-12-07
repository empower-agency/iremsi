
export async function pingSearchEngines(slug) {
    const sitemapUrl = `https://www.pendiknailart.com/sitemap.xml`;
    // Usually pinging simply tells engines to check the sitemap, 
    // or specific URLs. Most standard is sitemap ping.

    const services = [
        `https://www.google.com/ping?sitemap=${sitemapUrl}`,
        `https://www.bing.com/ping?sitemap=${sitemapUrl}`
    ];

    console.log(`[SEO Ping] Triggered for new content: ${slug}`);

    try {
        const results = await Promise.allSettled(
            services.map(url => fetch(url, { method: 'GET' }))
        );

        results.forEach((res, index) => {
            if (res.status === 'fulfilled') {
                console.log(`[SEO Ping] Success: ${services[index]}`);
            } else {
                console.error(`[SEO Ping] Failed: ${services[index]}`, res.reason);
            }
        });
    } catch (error) {
        console.error('[SEO Ping] Critical Error:', error);
    }
}
