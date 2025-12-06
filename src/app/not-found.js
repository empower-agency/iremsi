'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>Aradığınız Sayfa Bulunamadı</h2>
                <p className={styles.description}>
                    Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak servis dışı kalmış olabilir.
                    Aşağıdaki popüler hizmetlerimizden birine göz atmak ister misiniz?
                </p>

                <div className={styles.suggestions}>
                    <h3>Popüler Hizmetler</h3>
                    <div className={styles.links}>
                        <Link href="/pendik-protez-tirnak" className={styles.link}>
                            Pendik Protez Tırnak
                        </Link>
                        <Link href="/kartal-protez-tirnak" className={styles.link}>
                            Kartal Protez Tırnak
                        </Link>
                        <Link href="/pendik-nail-art" className={styles.link}>
                            Pendik Nail Art
                        </Link>
                        <Link href="/kartal-nail-art" className={styles.link}>
                            Kartal Nail Art
                        </Link>
                    </div>
                </div>

                <Link href="/" className={styles.homeBtn}>
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}
