'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function BlogList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blog');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug) => {
        if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== slug));
            }
        } catch (error) {
            alert('Silme işlemi başarısız');
        }
    };

    if (loading) return <div className={styles.container}><p style={{ color: '#fff' }}>Yükleniyor...</p></div>;

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h1>📰 Blog Yönetimi</h1>
                    <Link href="/admin/dashboard" style={{ color: '#fff', textDecoration: 'underline' }}>
                        ⬅️ Hizmetlere Dön
                    </Link>
                </div>
                <Link href="/admin/blog/edit/new" className={styles.logoutBtn} style={{ background: '#28a745' }}>
                    + Yeni Yazı Ekle
                </Link>
            </header>

            <div className={styles.content}>
                <div className={styles.serviceGrid}>
                    {posts.length === 0 ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                            Henüz hiç blog yazısı yok. Yeni eklemek için butona tıklayın!
                        </p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className={styles.serviceCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                                        {post.title}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            background: post.status === 'published' ? '#d4edda' : '#fff3cd',
                                            color: post.status === 'published' ? '#155724' : '#856404',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {post.status === 'published' ? 'YAYINDA' : 'TASLAK'}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
                                        {post.excerpt ? post.excerpt.substring(0, 100) + '...' : 'Özet yok'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Link href={`/admin/blog/edit/${post.id}`} className={styles.editBtn} style={{ flex: 1, textAlign: 'center' }}>
                                        ✏️ Düzenle
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className={styles.editBtn}
                                        style={{ background: '#dc3545', width: 'auto' }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
