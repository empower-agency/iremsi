'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './UrgencyCTA.module.css';

export default function UrgencyCTA({ type = 'banner' }) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    if (type === 'sticky') {
        return (
            <div className={styles.stickyBar}>
                <div className={styles.stickyContent}>
                    <span className={styles.pulse}>🔥</span>
                    <p>
                        Bugün için <strong>son 3 randevu</strong> kaldı!
                    </p>
                    <a href="#footer" className={styles.stickyButton}>Hemen Kap</a>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className={styles.closeButton}
                >✕</button>
            </div>
        );
    }

    return (
        <div className={styles.banner}>
            <div className={styles.bannerContent}>
                <h3>🎁 Bu Haftaya Özel Kampanya!</h3>
                <p>Nail Art işlemlerinde <strong>%20 İndirim</strong> fırsatını kaçırma.</p>
                <div className={styles.timer}>
                    Sona ermesine: <span>04:12:35</span>
                </div>
                <button
                    onClick={() => document.getElementById('footer-appointment-btn')?.click()}
                    className={styles.bannerButton}
                >
                    Fırsatı Yakala
                </button>
            </div>
        </div>
    );
}
