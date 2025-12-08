import { DISTRICTS, SERVICES, BRAND_INFO } from '@/lib/constants';
import { DISTRICT_SEO, SERVICE_SEO_ARTICLES, SERVICE_SEO_TEMPLATES } from '@/lib/seo-content';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { ServiceSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/StructuredData';
import InstagramGallery from '@/components/InstagramGallery';
import UrgencyCTA from '@/components/UrgencyCTA';
import fs from 'fs';
import path from 'path';

// SEO içeriği al (hizmet bazlı)
function getSeoContent(serviceSlug, district) {
    const seoData = SERVICE_SEO_ARTICLES[serviceSlug] || SERVICE_SEO_TEMPLATES[serviceSlug];
    const districtData = DISTRICT_SEO[district] || DISTRICT_SEO['Pendik'];

    if (!seoData) return null;

    // Template değişkenlerini değiştir
    const replaceVars = (text) => {
        if (!text) return '';
        return text
            .replace(/\{district\}/g, district)
            .replace(/\{intro\}/g, districtData.intro)
            .replace(/\{local_vibe\}/g, districtData.local_vibe || '')
            .replace(/\{transport_access\}/g, districtData.transport_access || '')
            .replace(/\{why_us_district\}/g, districtData.why_us_district || '')
            .replace(/\{target_audience\}/g, districtData.target_audience || '')
            .replace(/\{landmarks\}/g, districtData.landmarks)
            .replace(/\{advantages\}/g, districtData.advantages)
            .replace(/\{population\}/g, districtData.population);
    };

    return {
        image: seoData.image,
        imageAlt: replaceVars(seoData.imageAlt),
        metaTitle: replaceVars(seoData.metaTitle),
        metaDescription: replaceVars(seoData.metaDescription),
        article: seoData.article ? replaceVars(seoData.article) : null
    };
}

// Özel içerik oku (ilçe-hizmet bazlı)
function getCustomContent(fullSlug) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'service-content.json');
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return data[fullSlug] || null;
        }
    } catch (error) {
        console.error('İçerik okuma hatası:', error);
    }
    return null;
}

// Helper to parse slug
function parseSlug(slug) {
    const district = DISTRICTS.find(d => slug.startsWith(d.toLowerCase() + '-'));

    if (!district) return null;

    const serviceSlug = slug.replace(district.toLowerCase() + '-', '');
    const service = SERVICES.find(s => s.slug === serviceSlug);

    if (!service) return null;

    return { district, service };
}

export async function generateStaticParams() {
    const params = [];

    DISTRICTS.forEach((district) => {
        SERVICES.forEach((service) => {
            params.push({
                slug: `${district.toLowerCase()}-${service.slug}`,
            });
        });
    });

    return params;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = parseSlug(slug);

    if (!data) {
        return {
            title: 'Sayfa Bulunamadı',
        };
    }

    const { district, service } = data;
    const seoContent = getSeoContent(service.slug, district);

    // Benzersiz meta başlık ve açıklama
    const title = seoContent?.metaTitle || `${district} ${service.title} - Profesyonel Hizmet | ${BRAND_INFO.name}`;
    const description = seoContent?.metaDescription || `${district} bölgesinde profesyonel ${service.title} hizmeti. ${service.description} Hijyenik ortamda, uzman kadromuzla. Hemen randevu alın: ${BRAND_INFO.phoneDisplay}`;

    // Genişletilmiş anahtar kelimeler (LSI)
    const keywords = [
        `${district.toLowerCase()} ${service.title.toLowerCase()}`,
        `${service.title.toLowerCase()} ${district.toLowerCase()}`,
        `${district.toLowerCase()} ${service.title.toLowerCase()} fiyatları`,
        `${district.toLowerCase()} ${service.title.toLowerCase()} salon`,
        `en iyi ${service.title.toLowerCase()} ${district.toLowerCase()}`,
        BRAND_INFO.name
    ].join(', ');

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: 'website',
            locale: 'tr_TR',
            images: seoContent?.image ? [{ url: `https://www.pendiknailart.com${seoContent.image}` }] : [],
        },
        alternates: {
            canonical: `https://www.pendiknailart.com/${slug}`,
        },
    };
}

export default async function ServicePage({ params }) {
    const { slug } = await params;
    const data = parseSlug(slug);

    if (!data) {
        notFound();
    }

    const { district, service } = data;

    // SEO içerik (görsel, makale, alt etiket)
    const seoContent = getSeoContent(service.slug, district);

    // Özel içerik (admin panelinden düzenlenmiş - ilçe-hizmet bazlı)
    const customContent = getCustomContent(slug);

    // İç linkleme için ilgili hizmetler (aynı ilçe, farklı hizmet)
    const relatedServices = SERVICES
        .filter(s => s.slug !== service.slug)
        .slice(0, 5)
        .map(s => ({
            ...s,
            url: `/${district.toLowerCase()}-${s.slug}`,
            label: `${district} ${s.title}`
        }));

    // Diğer ilçeler (aynı hizmet, farklı ilçe)
    const otherDistricts = DISTRICTS
        .filter(d => d !== district)
        .map(d => ({
            district: d,
            url: `/${d.toLowerCase()}-${service.slug}`,
            label: `${d} ${service.title}`
        }));

    // Breadcrumb
    const breadcrumbItems = [
        { name: 'Ana Sayfa', url: 'https://www.pendiknailart.com' },
        { name: `${district} ${service.title}`, url: `https://www.pendiknailart.com/${slug}` }
    ];

    // Markdown'ı basit HTML'e çevir
    const renderArticle = (markdown) => {
        if (!markdown) return null;
        return markdown
            .replace(/^## (.*$)/gm, '<h2 class="' + styles.articleH2 + '">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="' + styles.articleH3 + '">$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <>
            <ServiceSchema
                serviceName={service.title}
                district={district}
                image={seoContent?.image}
            />
            <BreadcrumbSchema items={breadcrumbItems} />

            <div className={styles.container}>
                {/* Breadcrumb Navigation */}
                <nav className={styles.breadcrumb}>
                    <div className="container">
                        <Link href="/">Ana Sayfa</Link>
                        <span> / </span>
                        <span><strong>{district} {service.title}</strong></span>
                    </div>
                </nav>

                {/* Header */}
                <header className={styles.header}>
                    <div className="container">
                        <h1 className={styles.title}>
                            <strong>{district}</strong> {service.title}
                        </h1>
                        <p className={styles.subtitle}>
                            <b>{BRAND_INFO.name}</b> kalitesiyle <b>{district}</b> bölgesinde
                            en iyi <b>{service.title.toLowerCase()}</b> deneyimini yaşayın.
                        </p>
                        <a href={BRAND_INFO.whatsappLink} className="btn">
                            Hemen Randevu Al
                        </a>
                    </div>
                </header>

                <div className="container section">
                    <div className={styles.content}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>

                            {/* Hizmet Görseli */}
                            {seoContent?.image && (
                                <div className={styles.serviceImageWrapper}>
                                    <img
                                        src={seoContent.image}
                                        alt={seoContent.imageAlt}
                                        className={styles.serviceImage}
                                        loading="lazy"
                                    />
                                    <p className={styles.imageCaption}>{seoContent.imageAlt}</p>
                                </div>
                            )}

                            <h2 className={styles.sectionTitle}>
                                <b>{district} {service.title}</b> Hizmetimiz
                            </h2>
                            <p className={styles.text}>
                                {service.description} <b>{BRAND_INFO.name}</b> olarak, <b>{district}</b> ve çevresinde
                                müşterilerimize hijyenik, konforlu ve profesyonel bir ortamda
                                <b> {service.title.toLowerCase()}</b> hizmeti sunuyoruz.
                                Uzman ekibimiz, en son trendleri ve teknikleri takip ederek size özel çözümler üretir.
                            </p>

                            <UrgencyCTA type="banner" />

                            <h3 className={styles.subTitle}>
                                Neden <b>{district}</b> Bölgesinde <b>{BRAND_INFO.name}</b>'yi Seçmelisiniz?
                            </h3>
                            <ul className={styles.list}>
                                <li><b>Profesyonel ve sertifikalı uzmanlar</b> - {service.title} konusunda deneyimli ekip</li>
                                <li><b>Yüksek kaliteli ve onaylı ürünler</b> - Sadece güvenilir markalar</li>
                                <li><b>Maksimum hijyen ve sterilizasyon</b> - Sağlığınız bizim önceliğimiz</li>
                                <li><b>Kişiye özel tasarım</b> - Size özel {service.title.toLowerCase()} uygulaması</li>
                                <li><b>Müşteri memnuniyeti odaklı</b> - %100 memnuniyet garantisi</li>
                            </ul>

                            {/* Uzun SEO Makalesi */}
                            {seoContent?.article && (
                                <article
                                    className={styles.seoArticle}
                                    dangerouslySetInnerHTML={{ __html: renderArticle(seoContent.article) }}
                                />
                            )}

                            {/* Instagram Gallery */}
                            <InstagramGallery />

                            {/* Admin Panelden Düzenlenen Özel İçerik */}
                            {customContent && (
                                <div
                                    className={styles.customContent}
                                    dangerouslySetInnerHTML={{ __html: customContent }}
                                />
                            )}

                            {/* İç Linkleme - İlgili Hizmetler */}
                            <div className={styles.internalLinking}>
                                <h3 className={styles.subTitle}>
                                    <b>{district}</b> Bölgesinde Diğer Hizmetlerimiz
                                </h3>
                                <p className={styles.text}>
                                    <b>{service.title}</b> hizmetimizin yanı sıra, <b>{district}</b> bölgesinde
                                    sunduğumuz diğer profesyonel güzellik hizmetlerimize göz atın:
                                </p>
                                <div className={styles.relatedLinks}>
                                    {relatedServices.map((s) => (
                                        <Link key={s.url} href={s.url} className={styles.relatedLink}>
                                            <strong>{s.label}</strong>
                                            <span>{s.description}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* SSS Bölümü */}
                            {service.faqs && service.faqs.length > 0 && (
                                <>
                                    <FAQPageSchema faqs={service.faqs} />

                                    <div className={styles.faqSection}>
                                        <h3 className={styles.subTitle}>
                                            <b>{district} {service.title}</b> Hakkında Sıkça Sorulan Sorular
                                        </h3>

                                        <div className={styles.faqList}>
                                            {service.faqs.map((faq, index) => (
                                                <div key={index} className={styles.faqItem}>
                                                    <h4 className={styles.faqQuestion}>
                                                        {faq.question}
                                                    </h4>
                                                    <p className={styles.faqAnswer}>
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className={styles.ctaBox}>
                                <h3>Güzelliğinize Değer Katın</h3>
                                <p>
                                    <b>{district}</b> şubemize gelerek veya telefonla randevu alarak
                                    kendinizi şımartmaya başlayın.
                                </p>
                                <a href={`tel:${BRAND_INFO.phone}`} className="btn">
                                    {BRAND_INFO.phoneDisplay}
                                </a>
                            </div>
                        </div>

                        {/* Sidebar - SEO Internal Linking */}
                        <aside className={styles.sidebar}>
                            {/* Diğer İlçeler */}
                            <div className={styles.sidebarBox}>
                                <h3><b>{service.title}</b> Hizmet Bölgelerimiz</h3>
                                <p className={styles.sidebarIntro}>
                                    <b>{service.title}</b> hizmeti için diğer bölgelerimiz:
                                </p>
                                <ul className={styles.sidebarList}>
                                    {otherDistricts.map((d) => (
                                        <li key={d.url}>
                                            <Link href={d.url}>
                                                <strong>{d.label}</strong>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Popüler Hizmetler */}
                            <div className={styles.sidebarBox}>
                                <h3>Popüler Hizmetler</h3>
                                <ul className={styles.sidebarList}>
                                    <li>
                                        <Link href="/pendik-protez-tirnak">
                                            <strong>Pendik Protez Tırnak</strong>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pendik-nail-art">
                                            <strong>Pendik Nail Art</strong>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/kartal-protez-tirnak">
                                            <strong>Kartal Protez Tırnak</strong>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/kartal-nail-art">
                                            <strong>Kartal Nail Art</strong>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pendik-protez-tirnak-egitimi">
                                            <strong>Protez Tırnak Eğitimi</strong>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* CTA Box */}
                            <div className={styles.sidebarCta}>
                                <h4>Randevu Alın</h4>
                                <p>Hemen iletişime geçin</p>
                                <a href={BRAND_INFO.whatsappLink} className="btn" style={{ width: '100%' }}>
                                    WhatsApp
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
