'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BRAND_INFO, SERVICES } from '@/lib/constants';
import AppointmentModal from './AppointmentModal';
import styles from './Footer.module.css';

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <footer className={styles.footer}>
                <div className={`container ${styles.container}`}>
                    <div className={styles.grid}>
                        <div className={styles.column}>
                            <Link href="/" className={styles.logo}>
                                {BRAND_INFO.name}
                            </Link>
                            <p className={styles.description}>
                                {BRAND_INFO.description}
                            </p>
                            <div className={styles.contactInfo}>
                                <p>{BRAND_INFO.address}</p>
                                <a href={`tel:${BRAND_INFO.phone}`}>{BRAND_INFO.phoneDisplay}</a>
                            </div>
                        </div>

                        <div className={styles.column}>
                            <h3 className={styles.heading}>Hızlı Bağlantılar</h3>
                            <ul className={styles.links}>
                                <li><Link href="/">Anasayfa</Link></li>
                                <li><Link href="/hakkimizda">Hakkımızda</Link></li>
                                <li><Link href="/iletisim">İletişim</Link></li>
                                <li><Link href="/politika">Gizlilik Politikası</Link></li>
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3 className={styles.heading}>Hizmetlerimiz</h3>
                            <ul className={styles.links}>
                                {SERVICES.slice(0, 6).map((service) => (
                                    <li key={service.slug}>
                                        <Link href={`/pendik-${service.slug}`}>
                                            {service.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <p>&copy; {new Date().getFullYear()} {BRAND_INFO.name}. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>

            {/* Floating Action Buttons */}
            <div className={styles.floatingButtons}>
                {/* Randevu Butonu */}
                <button
                    id="footer-appointment-btn"
                    className={styles.appointmentFloat}
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Online randevu al"
                >
                    📅
                </button>

                {/* Instagram Butonu */}
                <a
                    href="https://instagram.com/iremsinails"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.instagramFloat}
                    aria-label="Instagram'da takip et"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.645.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>

                {/* WhatsApp Butonu */}
                <a
                    href={BRAND_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappFloat}
                    aria-label="WhatsApp ile iletişime geç"
                >
                    <svg viewBox="0 0 32 32" fill="currentColor">
                        <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.957 0-7.51 6.11-13.62 13.62-13.62s13.62 6.11 13.62 13.62c0 7.51-6.11 13.62-13.62 13.62zM21.305 19.26c-0.346-0.174-2.049-1.007-2.366-1.123-0.316-0.117-0.547-0.174-0.776 0.174s-0.893 1.123-1.094 1.347c-0.2 0.224-0.4 0.251-0.747 0.076-0.346-0.174-1.461-0.539-2.785-1.722-1.031-0.922-1.727-2.061-1.929-2.407-0.2-0.346-0.021-0.533 0.152-0.707 0.156-0.155 0.346-0.4 0.518-0.6 0.174-0.2 0.231-0.346 0.346-0.571 0.117-0.224 0.058-0.423-0.028-0.594-0.087-0.174-0.776-1.87-1.063-2.565-0.28-0.672-0.56-0.58-0.776-0.591-0.2-0.010-0.428-0.012-0.656-0.012s-0.6 0.087-0.917 0.423c-0.316 0.346-1.206 1.179-1.206 2.873s1.235 3.333 1.406 3.561c0.174 0.224 2.425 3.732 5.872 5.234 0.821 0.354 1.462 0.566 1.962 0.724 0.825 0.262 1.577 0.225 2.168 0.137 0.662-0.099 2.049-0.835 2.335-1.642 0.288-0.807 0.288-1.501 0.2-1.642-0.087-0.174-0.316-0.262-0.662-0.436z" />
                    </svg>
                </a>
            </div>

            {/* Appointment Modal */}
            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
