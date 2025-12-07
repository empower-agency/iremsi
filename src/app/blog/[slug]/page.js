
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import styles from '../blog.module.css';
import UrgencyCTA from '@/components/UrgencyCTA';
import { ArticleSchema } from '@/components/StructuredData';

async function getPost(slug) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
        if (!fs.existsSync(filePath)) return null;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return data.find(p => p.slug === slug && p.status === 'published') || null;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) return { title: 'Yazı Bulunamadı' };

    return {
        title: post.seo?.title || post.title,
        description: post.seo?.description || post.excerpt,
        keywords: post.seo?.keywords,
        openGraph: {
            title: post.seo?.title || post.title,
            description: post.seo?.description || post.excerpt,
            type: 'article',
            images: post.featuredImage ? [post.featuredImage] : [],
        }
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    return (
        <>
            <ArticleSchema
                title={post.seo?.title || post.title}
                description={post.seo?.description || post.excerpt}
                image={post.featuredImage}
                datePublished={post.createdAt}
                dateModified={post.updatedAt}
            />

            <div className="container section">
                <article className={styles.articleContainer}>
                    <header className={styles.articleHeader}>
                        <div className={styles.articleMeta}>
                            <Link href="/blog">⬅️ Blog'a Dön</Link>
                            <span style={{ margin: '0 10px' }}>•</span>
                            <span>{new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <h1 className={styles.articleTitle}>{post.title}</h1>
                    </header>

                    {post.featuredImage && (
                        <div className={styles.featuredImage}>
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    )}

                    {/* Auto CTA Insertion */}
                    <UrgencyCTA type="banner" />

                    <div
                        className={styles.articleBody}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div style={{ marginTop: '60px', padding: '30px', background: '#fafafa', borderRadius: '12px' }}>
                        <h3>Güzelliğinizi Keşfedin</h3>
                        <p>Bu makaleyi beğendiyseniz, uzmanlarımızla tanışmak için randevu alabilirsiniz.</p>
                        <a href="/" className="btn">Randevu Al</a>
                    </div>
                </article>
            </div>
        </>
    );
}
