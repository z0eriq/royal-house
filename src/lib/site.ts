import { cache } from "react";
import type { ContactSettings } from "./catalog-types.ts";
import { prisma } from "./db.ts";
import { seedSiteSettings } from "./seed-site.ts";

export const siteBrand = {
  name: "رويال هاوس",
  nameEn: "Royal House",
  description:
    "رويال هاوس معمل أثاث في طويرج، كربلاء. نفصّل القنفات والكراسي والديوان حسب الطلب وكرسي الحديد وتخم القنفات. العنوان: بداية الحولي، خلف حلويات أحمد الياسري.",
} as const;

export const priceNote =
  "السعر يتحدد بعد الاتفاق على المقاس ونوع القماش أو الجلد وعدد القطع. لا نثبت رقماً قبل هذه التفاصيل.";

export const imageNote =
  "الصور على الموقع توضيحية للطراز، والقطعة النهائية تُنفذ حسب المقاس والخامة التي تختارها.";

export const generalInquiry =
  "السلام عليكم رويال هاوس\nأريد الاستفسار عن الأثاث والتفصيل حسب الطلب.";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export const metaPixelId = "3059870334350963";

export const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "الأنواع" },
  { href: "/custom", label: "التفصيل" },
  { href: "/about", label: "المعمل" },
  { href: "/contact", label: "التواصل" },
] as const;

export const getContactSettings = cache(async (): Promise<ContactSettings> => {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (row) {
      return {
        phoneDisplay: row.phoneDisplay,
        phoneInternational: row.phoneInternational,
        phoneHref: row.phoneHref,
        phoneE164: row.phoneE164,
        whatsappNumber: row.whatsappNumber,
        city: row.city,
        area: row.area,
        street: row.street,
        addressLine: row.addressLine,
        mapsQuery: row.mapsQuery,
      };
    }
  } catch {
    /* fall through */
  }
  return { ...seedSiteSettings };
});

export function mapsSearchUrlFrom(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbedUrlFrom(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&hl=ar&output=embed`;
}

/** Sync fallback for client components and tests — matches seed until settings load. */
export const site = {
  ...siteBrand,
  ...seedSiteSettings,
} as const;

export const mapsSearchUrl = mapsSearchUrlFrom(site.mapsQuery);
export const mapsEmbedUrl = mapsEmbedUrlFrom(site.mapsQuery);
