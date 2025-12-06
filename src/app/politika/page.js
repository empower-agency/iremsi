import { BRAND_INFO } from '@/lib/constants';

export const metadata = {
    title: 'Gizlilik Politikası',
    description: `${BRAND_INFO.name} gizlilik politikası ve kişisel verilerin korunması.`,
};

export default function PolicyPage() {
    return (
        <div className="container section">
            <h1 className="section-title">Gizlilik Politikası</h1>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ marginBottom: '20px' }}>
                    {BRAND_INFO.name} olarak, kişisel verilerinizin güvenliği konusuna önem veriyoruz.
                    Bu Gizlilik Politikası, web sitemizi kullandığınızda toplanan bilgilerin nasıl kullanıldığını açıklar.
                </p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>Toplanan Bilgiler</h3>
                <p style={{ marginBottom: '20px' }}>
                    Sitemizi ziyaret ettiğinizde, tarayıcınızın gönderdiği standart bilgileri (IP adresi, tarayıcı türü vb.) alabiliriz.
                    İletişim formları aracılığıyla gönderdiğiniz bilgiler (ad, telefon vb.) sadece size dönüş yapmak amacıyla kullanılır.
                </p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>Çerezler</h3>
                <p style={{ marginBottom: '20px' }}>
                    Web sitemiz, kullanıcı deneyimini geliştirmek için çerezler (cookies) kullanabilir.
                    Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.
                </p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>İletişim</h3>
                <p style={{ marginBottom: '20px' }}>
                    Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz.
                </p>
            </div>
        </div>
    );
}
