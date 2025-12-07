'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../admin.module.css';
// ReactQuill removed due to React 19 incompatibility

export default function BlogEditor({ params }) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        status: 'draft',
        seo: { title: '', description: '', keywords: '' }
    });
    const router = useRouter();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const { slug } = await params;
        if (slug && slug !== 'new') {
            try {
                const res = await fetch(`/api/blog/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('seo.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                seo: { ...prev.seo, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, content }));
    };

    const insertTag = (open, close) => {
        const textarea = document.getElementById('contentEditor');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData.content;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newContent = before + open + selection + close + after;
        setFormData(prev => ({ ...prev, content: newContent }));

        // Restore cursor? A bit tricky with state update, simply setting focus back
        textarea.focus();
    };

    // Otomatik slug oluşturma (sadece yeni yazıda ve kullanıcı elle değiştirmediyse)
    const handleTitleChange = (e) => {
        const title = e.target.value;
        const autoSlug = title.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');

        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug ? prev.slug : autoSlug
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSaving(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });

            if (res.ok) {
                const result = await res.json();
                setFormData(prev => ({ ...prev, featuredImage: result.url }));
            } else {
                alert('Resim yüklenemedi!');
            }
        } catch (error) {
            console.error(error);
            alert('Hata oluştu!');
        } finally {
            setSaving(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const { slug: paramSlug } = await params;
        const isNew = paramSlug === 'new';
        const url = isNew ? '/api/blog' : `/api/blog/${formData.id}`;
        const method = isNew ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert(isNew ? 'Yazı oluşturuldu!' : 'Yazı güncellendi!');
                if (isNew) router.push('/admin/blog');
            } else {
                const err = await res.json();
                alert('Hata: ' + err.error);
            }
        } catch (error) {
            alert('Bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className={styles.container}><p>Yükleniyor...</p></div>;

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h1>✏️ Blog Düzenleyici</h1>
                    <Link href="/admin/blog" style={{ color: '#fff', textDecoration: 'underline' }}>⬅️ Listeye Dön</Link>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className={styles.logoutBtn}
                    style={{ backgroundColor: '#28a745', opacity: saving ? 0.7 : 1 }}
                >
                    {saving ? 'Kaydediliyor...' : '💾 Kaydet & Yayınla'}
                </button>
            </header>

            <div className={styles.content} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Sol Kolon: Editör */}
                <div style={{ background: '#fff', padding: '30px', borderRadius: '12px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Makale Başlığı</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            style={{ width: '100%', padding: '12px', fontSize: '1.1rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            placeholder="Örn: 2025 Protez Tırnak Trendleri"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>İçerik (HTML)</label>
                        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                            {/* Toolbar */}
                            <div style={{ background: '#f8f9fa', padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <button type="button" onClick={() => insertTag('<b>', '</b>')} style={{ fontWeight: 'bold', padding: '5px 10px' }}>B</button>
                                <button type="button" onClick={() => insertTag('<i>', '</i>')} style={{ fontStyle: 'italic', padding: '5px 10px' }}>I</button>
                                <button type="button" onClick={() => insertTag('<h2>', '</h2>')} style={{ padding: '5px 10px' }}>H2</button>
                                <button type="button" onClick={() => insertTag('<h3>', '</h3>')} style={{ padding: '5px 10px' }}>H3</button>
                                <button type="button" onClick={() => insertTag('<p>', '</p>')} style={{ padding: '5px 10px' }}>P</button>
                                <button type="button" onClick={() => insertTag('<ul>\n<li>', '</li>\n</ul>')} style={{ padding: '5px 10px' }}>Liste</button>
                                <button type="button" onClick={() => {
                                    const url = prompt('Link adresi:');
                                    if (url) insertTag(`<a href="${url}">`, '</a>');
                                }} style={{ padding: '5px 10px' }}>Link</button>
                            </div>

                            <textarea
                                id="contentEditor"
                                name="content"
                                value={formData.content}
                                onChange={(e) => handleContentChange(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    padding: '15px',
                                    border: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'monospace',
                                    fontSize: '14px',
                                    lineHeight: '1.5'
                                }}
                            />
                        </div>
                        <small style={{ color: '#666' }}>* HTML etiketleri kullanabilirsiniz.</small>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Kısa Özet (Excerpt)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px' }}
                            placeholder="Makale listesinde görünecek kısa açıklama..."
                        />
                    </div>
                </div>

                {/* Sağ Kolon: Ayarlar & SEO */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Yayın Ayarları */}
                    <div style={{ background: '#fff', padding: '25px', borderRadius: '12px' }}>
                        <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>⚙️ Yayın Ayarları</h3>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Durum</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            >
                                <option value="draft">Taslak (Draft)</option>
                                <option value="published">Yayında (Published)</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>URL Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', background: '#f8f9fa' }}
                            />
                            <small style={{ display: 'block', marginTop: '5px', color: '#999' }}>Örn: pendik-protez-tirnak-trendleri</small>
                        </div>
                    </div>

                    {/* Medya */}
                    <div style={{ background: '#fff', padding: '25px', borderRadius: '12px' }}>
                        <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>📸 Öne Çıkan Görsel</h3>

                        {formData.featuredImage && (
                            <img src={formData.featuredImage} alt="Preview" style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }} />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ width: '100%' }}
                        />
                    </div>

                    {/* SEO Ayarları */}
                    <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '2px solid #D4AF37' }}>
                        <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px', color: '#D4AF37' }}>🔎 SEO Ayarları</h3>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>SEO Başlığı Title</label>
                            <input
                                type="text"
                                name="seo.title"
                                value={formData.seo.title}
                                onChange={handleChange}
                                placeholder={formData.title}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>SEO Açıklaması (Description)</label>
                            <textarea
                                name="seo.description"
                                value={formData.seo.description}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', minHeight: '80px' }}
                                placeholder="Google arama sonuçlarında görünecek açıklama..."
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Anahtar Kelimeler</label>
                            <input
                                type="text"
                                name="seo.keywords"
                                value={formData.seo.keywords}
                                onChange={handleChange}
                                placeholder="protez tırnak, nail art, pendik..."
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
