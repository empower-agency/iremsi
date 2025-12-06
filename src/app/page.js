import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import { SERVICES, DISTRICTS, BRAND_INFO } from '@/lib/constants';
import { LocalBusinessSchema } from '@/components/StructuredData';
import InstagramGallery from '@/components/InstagramGallery';
import styles from './page.module.css';

export const metadata = {
  title: 'Pendik Protez Tırnak & Nail Art Uzmanı - iremsi',
  description: 'Pendik, Kartal, Maltepe\'de profesyonel protez tırnak, nail art, kalıcı oje hizmeti. Uzman ekibimizle güzelliğinizi sanata dönüştürüyoruz. Hemen randevu alın!',
  keywords: 'pendik protez tırnak, kartal protez tırnak, pendik nail art, kartal nail art, pendik kalıcı oje, protez tırnak eğitimi, ipek kirpik pendik',
  openGraph: {
    title: 'Pendik Protez Tırnak & Nail Art Uzmanı - iremsi',
    description: 'Profesyonel protez tırnak ve nail art hizmetleri. Pendik, Kartal, Maltepe bölgelerinde.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function Home() {
  // Öncelikli hizmetler (Pendik & Kartal için)
  const priorityServices = [
    { slug: 'protez-tirnak', district: 'Pendik' },
    { slug: 'nail-art', district: 'Pendik' },
    { slug: 'kalici-oje', district: 'Pendik' },
    { slug: 'protez-tirnak', district: 'Kartal' },
    { slug: 'nail-art', district: 'Kartal' },
    { slug: 'kalici-oje', district: 'Kartal' },
  ];

  return (
    <>
      <LocalBusinessSchema />

      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>
              <strong>Pendik Protez Tırnak</strong> & <strong>Nail Art</strong> Uzmanı
            </h1>
            <p className={styles.heroSubtitle}>
              <b>Pendik</b>, <b>Kartal</b>, Maltepe, Tuzla ve Sultanbeyli bölgelerinde
              profesyonel <b>protez tırnak</b>, <b>nail art</b>, <b>kalıcı oje</b> ve
              güzellik hizmetleri sunuyoruz. <b>iremsi</b> kalitesiyle tanışın.
            </p>
            <div className={styles.heroButtons}>
              <a href={BRAND_INFO.whatsappLink} className="btn">Randevu Al</a>
              <Link href="/pendik-protez-tirnak" className="btn btn-outline">
                Pendik Protez Tırnak
              </Link>
            </div>
          </div>
        </section>

        {/* Pendik & Kartal Öncelikli Hizmetler */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">
              <strong>Pendik</strong> ve <strong>Kartal</strong> Bölgelerinde Hizmetlerimiz
            </h2>
            <p className="section-subtitle">
              <b>Pendik protez tırnak</b>, <b>Kartal nail art</b> ve daha fazlası için
              en kaliteli hizmeti sunuyoruz.
            </p>

            <div className={styles.priorityGrid}>
              <Link href="/pendik-protez-tirnak" className={styles.priorityCard}>
                <h3>Pendik <strong>Protez Tırnak</strong></h3>
                <p>Pendik'te en iyi protez tırnak hizmeti. Uzman kadromuzla tanışın.</p>
              </Link>

              <Link href="/pendik-nail-art" className={styles.priorityCard}>
                <h3>Pendik <strong>Nail Art</strong></h3>
                <p>Pendik'te özel tasarım nail art uygulamaları.</p>
              </Link>

              <Link href="/kartal-protez-tirnak" className={styles.priorityCard}>
                <h3>Kartal <strong>Protez Tırnak</strong></h3>
                <p>Kartal'da profesyonel protez tırnak merkezi.</p>
              </Link>

              <Link href="/kartal-nail-art" className={styles.priorityCard}>
                <h3>Kartal <strong>Nail Art</strong></h3>
                <p>Kartal'da sanatsal nail art tasarımları.</p>
              </Link>

              <Link href="/pendik-kalici-oje" className={styles.priorityCard}>
                <h3>Pendik <strong>Kalıcı Oje</strong></h3>
                <p>Pendik'te uzun ömürlü kalıcı oje uygulaması.</p>
              </Link>

              <Link href="/pendik-protez-tirnak-egitimi" className={styles.priorityCard}>
                <h3>Pendik <strong>Protez Tırnak Eğitimi</strong></h3>
                <p>Sertifikalı protez tırnak eğitimi programı.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Tüm Hizmetlerimiz */}
        <section className={`section ${styles.allServicesSection}`}>
          <div className="container">
            <h2 className="section-title">Tüm Hizmetlerimiz</h2>
            <p className="section-subtitle">
              <b>Protez tırnak</b>, <b>nail art</b>, <b>ipek kirpik</b>, <b>manikür</b>,
              <b>pedikür</b> ve daha fazlası için size özel çözümler sunuyoruz.
            </p>

            <div className={styles.grid}>
              {SERVICES.map((service) => (
                <ServiceCard key={service.slug} service={service} district="Pendik" />
              ))}
            </div>
          </div>
        </section>

        {/* Neden Bizi Seçmelisiniz */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">Neden <strong>iremsi</strong>?</h2>
            <div className={styles.whyUs}>
              <div className={styles.whyUsCard}>
                <h3>✨ Uzman Kadro</h3>
                <p>
                  <b>Pendik protez tırnak</b> ve <b>nail art</b> konusunda
                  sertifikalı ve deneyimli uzmanlarımız.
                </p>
              </div>
              <div className={styles.whyUsCard}>
                <h3>🏆 Kalite Garantisi</h3>
                <p>
                  Sadece onaylı, dünya standartlarında <b>protez tırnak</b> ürünleri kullanıyoruz.
                </p>
              </div>
              <div className={styles.whyUsCard}>
                <h3>🧼 Maksimum Hijyen</h3>
                <p>
                  Sterilizasyon kurallarına %100 uygun, temiz ve güvenli ortam.
                </p>
              </div>
              <div className={styles.whyUsCard}>
                <h3>🎨 Özel Tasarım</h3>
                <p>
                  <b>Nail art</b> ve <b>protez tırnak</b> uygulamalarında size özel tasarımlar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Gallery */}
        <InstagramGallery />

        {/* Hizmet Bölgelerimiz */}
        <section className={`section ${styles.districtsSection}`}>
          <div className="container">
            <h2 className="section-title">Hizmet Bölgelerimiz</h2>
            <p className="section-subtitle">
              <b>Pendik</b> merkezli olmakla birlikte, <b>Kartal</b>, Maltepe,
              Tuzla ve Sultanbeyli bölgelerinden gelen müşterilerimize hizmet veriyoruz.
            </p>

            <div className={styles.districtGrid}>
              {DISTRICTS.map((district) => (
                <Link
                  key={district}
                  href={`/${district.toLowerCase()}-protez-tirnak`}
                  className={styles.districtCard}
                >
                  <strong>{district}</strong> Protez Tırnak
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Zengin İçerik Bölümü */}
        <section className="section">
          <div className="container">
            <div className={styles.richContent}>
              <h2>
                <strong>Pendik'te Protez Tırnak ve Nail Art'ın Adresi: iremsi</strong>
              </h2>
              <p>
                <b>Pendik protez tırnak</b> hizmeti arıyorsanız, doğru yerdesiniz.
                <b>iremsi</b> olarak, Pendik Batı Mahallesi'nde konumlanan modern
                salonumuzda, size en kaliteli <b>protez tırnak</b>, <b>nail art</b>,
                <b>kalıcı oje</b> ve güzellik hizmetlerini sunuyoruz.
              </p>

              <h3><b>Pendik Protez Tırnak</b> - Profesyonel Uygulama</h3>
              <p>
                <b>Pendik protez tırnak</b> sektöründe yıllardır hizmet veren ekibimiz,
                tırnaklarınızı sanat eserine dönüştürüyor. Hijyenik ortamda, en kaliteli
                malzemelerle yapılan <b>protez tırnak</b> uygulamalarımız, uzun ömürlü ve
                doğal görünümlüdür.
              </p>

              <h3><b>Kartal Protez Tırnak</b> Hizmeti</h3>
              <p>
                <b>Kartal</b> bölgesinden gelen müşterilerimiz için de aynı kalitede
                <b>protez tırnak</b> hizmeti sunuyoruz. <b>Kartal protez tırnak</b>
                arayanlar için Pendik'teki salonumuz ideal bir konum.
              </p>

              <h3><b>Nail Art</b> - Tırnaklarınıza Sanatsal Dokunuş</h3>
              <p>
                <b>Pendik nail art</b> ve <b>Kartal nail art</b> hizmetlerimizle,
                tırnaklarınıza size özel tasarımlar uyguluyoruz. Trend takibi yapan
                uzman ekibimiz, en son <b>nail art</b> tekniklerini kullanarak sizin
                için benzersiz tasarımlar yaratıyor.
              </p>

              <h3><b>Protez Tırnak Eğitimi</b></h3>
              <p>
                Sektöre girmek isteyen adaylar için <b>Pendik protez tırnak eğitimi</b>
                ve <b>Kartal protez tırnak eğitimi</b> programlarımız mevcuttur.
                Sertifikalı eğitmenlerimizle, <b>protez tırnak</b> uzmanı olma yolunda
                ilk adımınızı atabilirsiniz.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
