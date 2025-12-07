
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import styles from './blog.module.css';

// Read all published posts
function getPublishedPosts() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
        if (!fs.existsSync(filePath)) return [];
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return data.filter(post => post.status === 'published');
    } catch {
        return [];
    }
}

export const metadata = {
    title: 'Güzellik Blogu - Protez Tırnak & Nail Art İpuçları | İremsi',
    description: 'Protez tırnak, nail art, kalıcı oje ve güzellik trendleri hakkında en güncel ipuçları, bakım önerileri ve teknikler iremsi blogunda.',
};

export default function BlogPage() {
    const posts = getPublishedPosts();

    return (
        <div className="container section">
            <header className={styles.header}>
                <h1 className={styles.title}>Güzellik & Bakım Blogu</h1>
                <p className={styles.subtitle}>
                    Trendler, ipuçları ve <b>protez tırnak</b> dünyasından haberler.
                </p>
            </header>

            {posts.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>Henüz blog yazısı eklenmemiş. Çok yakında buradayız!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {posts.map((post) => (
                        <article key={post.id} className={styles.card}>
                            <Link href={`/blog/${post.slug}`} className={styles.imageLink}>
                                {post.featuredImage ? (
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={post.featuredImage}
                                            alt={post.title}
                                            fill
                                            className={styles.image}
                                        />
                                    </div>
                                ) : (
                                    <div className={`${styles.imageWrapper} ${styles.placeholder}`}>
                                        <span>🎨</span>
                                    </div>
                                )}
                            </Link>
                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span className={styles.date}>
                                        {new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <h2 className={styles.cardTitle}>
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className={styles.excerpt}>
                                    {post.excerpt && post.excerpt.length > 120
                                        ? post.excerpt.substring(0, 120) + '...'
                                        : post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                                    Devamını Oku ➡️
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
