'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { SERVICES, DISTRICTS } from '@/lib/constants';
import styles from '../../admin.module.css';

export default function EditService() {
    const params = useParams();
    const slug = params.slug; // örn: "pendik-protez-tirnak"
    const router = useRouter();
    const editorRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [content, setContent] = useState('');

    // Slug'dan ilçe ve hizmeti ayır
    const district = DISTRICTS.find(d => slug.startsWith(d.toLowerCase() + '-'));
    const serviceSlug = district ? slug.replace(district.toLowerCase() + '-', '') : null;
    const service = serviceSlug ? SERVICES.find(s => s.slug === serviceSlug) : null;

    useEffect(() => {
        checkAuth();
        loadContent();
    }, [slug]);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth');
            if (!res.ok) {
                router.push('/admin');
            }
        } catch {
            router.push('/admin');
        }
    };

    const loadContent = async () => {
        try {
            const res = await fetch(`/api/content?slug=${slug}`);
            if (res.ok) {
                const data = await res.json();
                setContent(data.content || '');
            }
        } catch (err) {
            console.error('İçerik yüklenemedi:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccess(false);

        const htmlContent = editorRef.current?.innerHTML || '';

        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, content: htmlContent }),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (err) {
            alert('Kaydetme hatası!');
        } finally {
            setSaving(false);
        }
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const insertHeading = (level) => {
        execCommand('formatBlock', `h${level}`);
    };

    if (!district || !service) {
        return <div className={styles.container}><p style={{ color: '#fff' }}>Sayfa bulunamadı: {slug}</p></div>;
    }

    if (loading) {
        return <div className={styles.container}><p style={{ color: '#fff' }}>Yükleniyor...</p></div>;
    }

    return (
        <div className={styles.editor}>
            <header className={styles.header}>
                <h1>✏️ {district} {service.title}</h1>
                <Link href="/admin/dashboard" className={styles.logoutBtn}>
                    ← Geri
                </Link>
            </header>

            <div className={styles.editorContent}>
                {success && (
                    <div className={styles.success}>
                        ✅ İçerik başarıyla kaydedildi!
                    </div>
                )}

                <div className={styles.editorBox}>
                    <h2>Makale İçeriği</h2>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        Bu içerik <strong>{district} {service.title}</strong> sayfasında görünecek.
                        <br />
                        <small>URL: /{slug}</small>
                    </p>

                    {/* Toolbar */}
                    <div className={styles.toolbar}>
                        <button className={styles.toolbarBtn} onClick={() => execCommand('bold')} title="Kalın">
                            <b>B</b>
                        </button>
                        <button className={styles.toolbarBtn} onClick={() => execCommand('italic')} title="İtalik">
                            <i>I</i>
                        </button>
                        <button className={styles.toolbarBtn} onClick={() => execCommand('underline')} title="Altı Çizili">
                            <u>U</u>
                        </button>
                        <button className={styles.toolbarBtn} onClick={() => insertHeading(2)} title="Başlık 2">
                            H2
                        </button>
                        <button className={styles.toolbarBtn} onClick={() => insertHeading(3)} title="Başlık 3">
                            H3
                        </button>
                        <button className={styles.toolbarBtn} onClick={() => execCommand('insertUnorderedList')} title="Liste">
                            • Liste
                        </button>
                        <button className={styles.toolbarBtn} onClick={() => execCommand('insertOrderedList')} title="Numaralı Liste">
                            1. Liste
                        </button>
                        <button className={styles.toolbarBtn} onClick={() => {
                            const url = prompt('Link URL:');
                            if (url) execCommand('createLink', url);
                        }} title="Link">
                            🔗
                        </button>
                        <button className={styles.toolbarBtn} onClick={() => execCommand('removeFormat')} title="Formatı Temizle">
                            ✕
                        </button>
                    </div>

                    {/* Editor */}
                    <div
                        ref={editorRef}
                        className={styles.editorArea}
                        contentEditable
                        dangerouslySetInnerHTML={{ __html: content }}
                        onBlur={() => setContent(editorRef.current?.innerHTML || '')}
                    />

                    {/* Actions */}
                    <div className={styles.actions}>
                        <button
                            className={styles.saveBtn}
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Kaydediliyor...' : '💾 Kaydet'}
                        </button>
                        <a
                            href={`/${slug}`}
                            target="_blank"
                            className={styles.previewBtn}
                        >
                            👁️ Önizle
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
