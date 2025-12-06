import { BRAND_INFO } from '@/lib/constants';

export const metadata = {
    title: 'İletişim',
    description: `${BRAND_INFO.name} iletişim bilgileri. Adres, telefon ve randevu.`,
};

export default function ContactPage() {
    return (
        <div className="container section">
            <h1 className="section-title">İletişim</h1>
            <p className="section-subtitle">Bize ulaşın, randevunuzu hemen oluşturalım.</p>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                <div style={{ padding: '30px', backgroundColor: 'var(--color-background-alt)', borderRadius: 'var(--border-radius)' }}>
                    <h3 style={{ marginBottom: '20px' }}>İletişim Bilgileri</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <strong>Adres:</strong>
                        <p>{BRAND_INFO.address}</p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <strong>Telefon:</strong>
                        <p><a href={`tel:${BRAND_INFO.phone}`}>{BRAND_INFO.phoneDisplay}</a></p>
                    </div>

                    <div>
                        <a href={BRAND_INFO.whatsappLink} className="btn" target="_blank" rel="noopener noreferrer">
                            WhatsApp'tan Yazın
                        </a>
                    </div>
                </div>

                <div style={{ padding: '30px', backgroundColor: 'var(--color-background-alt)', borderRadius: 'var(--border-radius)' }}>
                    <h3 style={{ marginBottom: '20px' }}>Çalışma Saatleri</h3>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Pazartesi - Cumartesi:</span>
                            <span>09:00 - 20:00</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Pazar:</span>
                            <span>Kapalı</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
