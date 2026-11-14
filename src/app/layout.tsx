import type { Metadata, Viewport } from "next";
import { Amiri, Tajawal } from "next/font/google";
import { AppChrome } from "@/components/AppChrome";
import { JsonLd } from "@/components/JsonLd";
import { MetaPixel } from "@/components/MetaPixel";
import { listCategories } from "@/lib/products";
import { localBusinessSchema } from "@/lib/schema";
import { getContactSettings, siteBrand, siteUrl } from "@/lib/site";
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
  description: siteBrand.description,
  applicationName: siteBrand.name,
  openGraph: {
    type: "website",
    locale: "ar_IQ",
    siteName: siteBrand.name,
    title: "رويال هاوس | قنفات وكراسي وديوان في كربلاء",
    description: siteBrand.description,
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
    description: siteBrand.description,
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [contact, categories] = await Promise.all([getContactSettings(), listCategories()]);

  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${amiri.variable} ${tajawal.variable}`}>
      <body className="bg-ivory font-sans text-ink antialiased">
        <MetaPixel />
        <AppChrome contact={contact} jsonLd={<JsonLd data={localBusinessSchema(categories, contact)} />}>
          {children}
        </AppChrome>
      </body>
    </html>
  );
}
