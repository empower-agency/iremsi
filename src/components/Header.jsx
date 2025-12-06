import Link from 'next/link';
import { BRAND_INFO } from '@/lib/constants';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    {BRAND_INFO.name}
                </Link>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href="/" className={styles.navLink}>Anasayfa</Link></li>
                        <li><Link href="/hakkimizda" className={styles.navLink}>Hakkımızda</Link></li>
                        <li><Link href="/iletisim" className={styles.navLink}>İletişim</Link></li>
                    </ul>
                </nav>

                <a href={BRAND_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn">
                    Randevu Al
                </a>
            </div>
        </header>
    );
}
