import Link from 'next/link';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, district = 'pendik' }) {
    return (
        <Link href={`/${district.toLowerCase()}-${service.slug}`} className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
                <span className={styles.link}>Detaylı Bilgi &rarr;</span>
            </div>
        </Link>
    );
}
