export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [],
        },
        sitemap: 'https://www.iremsi.com/sitemap.xml',
    };
}
