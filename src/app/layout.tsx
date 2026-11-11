import type { Metadata, Viewport } from "next";
import { Amiri, Tajawal } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { localBusinessSchema } from "@/lib/schema";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2a2118",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "رويال هاوس | قنفات وكراسي وديوان في كربلاء",
    template: "%s | رويال هاوس",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    siteName: site.name,
    title: "رويال هاوس | قنفات وكراسي وديوان في كربلاء",
    description: site.description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 2000,
        alt: "جلسة معيشة، صورة توضيحية لطراز رويال هاوس",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "رويال هاوس | قنفات وكراسي وديوان في كربلاء",
    description: site.description,
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${amiri.variable} ${tajawal.variable}`}>
      <body className="bg-ivory font-sans text-ink antialiased">
        <a href="#content" className="skip-link">
          تخطي إلى المحتوى
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
