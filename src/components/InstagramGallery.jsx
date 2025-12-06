'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './InstagramGallery.module.css';

const INSTAGRAM_POSTS = [
    {
        id: 1,
        image: '/images/gallery/pendik-protez-tirnak-modeli-1.png',
        link: 'https://instagram.com/iremsinails',
        alt: 'Pendik protez tırnak uygulaması ve altın detaylı nail art tasarımı'
    },
    {
        id: 2,
        image: '/images/gallery/kartal-nail-art-tasarimi-1.png',
        link: 'https://instagram.com/iremsinails',
        alt: 'Kartal nail art ve kırmızı kalıcı oje uygulaması'
    },
    {
        id: 3,
        image: '/images/gallery/pendik-nail-art-ornek-1.png',
        link: 'https://instagram.com/iremsinails',
        alt: 'Pendik nail art örneği, french oje tasarımı'
    },
    {
        id: 4,
        image: '/images/gallery/kartal-protez-tirnak-uygulama-1.png',
        link: 'https://instagram.com/iremsinails',
        alt: 'Kartal protez tırnak sonrası görünüm, nude renkler ve taş süsleme'
    },
];

export default function InstagramGallery() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <span className={styles.icon}>📸</span>
                        Instagram'da Biz
                    </h2>
                    <p className={styles.subtitle}>
                        En son çalışmalarımız, tırnak sanatı örneklerimiz ve mutlu müşterilerimiz için bizi takip edin.
                        <a href="https://instagram.com/iremsinails" target="_blank" rel="noopener noreferrer" className={styles.handle}>
                            @iremsinails
                        </a>
                    </p>
                </div>

                <div className={styles.gallery}>
                    {INSTAGRAM_POSTS.map((post) => (
                        <a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.item}
                            title={post.alt} // Tooltip for SEO/UX
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={post.image}
                                    alt={post.alt}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className={styles.overlay}>
                                    <span>Instagram'da Gör</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className={styles.footer}>
                    <a href="https://instagram.com/iremsinails" target="_blank" rel="noopener noreferrer" className={styles.followButton}>
                        Takip Et
                    </a>
                </div>
            </div>
        </section>
    );
}
