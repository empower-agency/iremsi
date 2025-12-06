'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SERVICES, DISTRICTS } from '@/lib/constants';
import styles from '../admin.module.css';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [selectedDistrict, setSelectedDistrict] = useState('Pendik');
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth');
            if (!res.ok) {
                router.push('/admin');
            } else {
                setLoading(false);
            }
        } catch {
            router.push('/admin');
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth', { method: 'DELETE' });
        router.push('/admin');
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <p style={{ color: '#fff' }}>Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>📝 İçerik Yönetimi</h1>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    Çıkış Yap
                </button>
            </header>

            <div className={styles.content}>
                {/* İlçe Seçimi */}
                <div className={styles.districtSelector}>
                    <h2>İlçe Seçin:</h2>
                    <div className={styles.districtTabs}>
                        {DISTRICTS.map((district) => (
                            <button
                                key={district}
                                className={`${styles.districtTab} ${selectedDistrict === district ? styles.active : ''}`}
                                onClick={() => setSelectedDistrict(district)}
                            >
                                {district}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Seçili İlçenin Hizmetleri */}
                <h3 className={styles.sectionHeading}>
                    {selectedDistrict} Hizmetleri
                </h3>

                <div className={styles.serviceGrid}>
                    {SERVICES.map((service) => {
                        const slug = `${selectedDistrict.toLowerCase()}-${service.slug}`;
                        return (
                            <div key={slug} className={styles.serviceCard}>
                                <h3>{selectedDistrict} {service.title}</h3>
                                <p>{service.description}</p>
                                <Link
                                    href={`/admin/edit/${slug}`}
                                    className={styles.editBtn}
                                >
                                    ✏️ Düzenle
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
