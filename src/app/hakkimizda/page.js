import { BRAND_INFO } from '@/lib/constants';

export const metadata = {
    title: 'Hakkımızda',
    description: `${BRAND_INFO.name} hakkında detaylı bilgi. Vizyonumuz, misyonumuz ve uzman kadromuz.`,
};

export default function AboutPage() {
    return (
        <div className="container section">
            <h1 className="section-title">Hakkımızda</h1>
            <p className="section-subtitle">Güzelliğinize değer katmak için buradayız.</p>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ marginBottom: '20px' }}>
                    {BRAND_INFO.name} olarak, İstanbul Pendik'te kurulan modern ve yenilikçi bir güzellik merkeziyiz.
                    Amacımız, müşterilerimize en kaliteli hizmeti, en hijyenik koşullarda ve en son trendleri takip ederek sunmaktır.
                </p>

                <p style={{ marginBottom: '20px' }}>
                    Uzman kadromuz, alanında deneyimli ve sertifikalı profesyonellerden oluşmaktadır.
                    Protez tırnak, nail art, manikür, pedikür, ipek kirpik ve diğer tüm hizmetlerimizde
                    dünya standartlarında ürünler ve teknikler kullanıyoruz.
                </p>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', marginTop: '30px' }}>Misyonumuz</h3>
                <p style={{ marginBottom: '20px' }}>
                    Müşterilerimizin kendilerini özel ve güzel hissetmelerini sağlamak,
                    kaliteli hizmet anlayışımızla sektörde öncü olmak.
                </p>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', marginTop: '30px' }}>Vizyonumuz</h3>
                <p style={{ marginBottom: '20px' }}>
                    Sürekli gelişen ve yenilenen güzellik sektöründe, trendleri belirleyen ve
                    müşteri memnuniyetini en üst düzeyde tutan bir marka olmak.
                </p>
            </div>
        </div>
    );
}
