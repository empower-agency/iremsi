import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND_INFO } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  metadataBase: new URL('https://www.pendiknailart.com'),
  title: {
    template: `%s | ${BRAND_INFO.name}`,
    default: `${BRAND_INFO.name} - Pendik Protez Tırnak & Nail Art Uzmanı`,
  },
  description: 'Pendik, Kartal, Maltepe bölgelerinde profesyonel protez tırnak, nail art, kalıcı oje, ipek kirpik hizmetleri. Uzman kadromuzla randevu alın!',
  keywords: 'pendik protez tırnak, kartal protez tırnak, pendik nail art, protez tırnak eğitimi, kalıcı oje pendik, ipek kirpik',
  authors: [{ name: 'Pendik Nail Art' }],
  creator: 'Pendik Nail Art',
  publisher: 'Pendik Nail Art',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.pendiknailart.com',
    siteName: BRAND_INFO.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

import SocialProofPopup from "@/components/SocialProofPopup";
import UrgencyCTA from "@/components/UrgencyCTA";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <UrgencyCTA type="sticky" />
        <Header />
        <main>{children}</main>
        <SocialProofPopup />
        <Footer />
      </body>
    </html>
  );
}
