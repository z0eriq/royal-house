export const site = {
  name: "رويال هاوس",
  nameEn: "Royal House",
  description:
    "رويال هاوس معمل أثاث في طويرج، كربلاء. نفصّل القنفات والكراسي والديوان حسب الطلب وكرسي الحديد وتخم القنفات. العنوان: بداية الحولي، خلف حلويات أحمد الياسري.",
  phoneDisplay: "0780 877 1427",
  phoneInternational: "+964 780 877 1427",
  phoneHref: "tel:+9647808771427",
  phoneE164: "+9647808771427",
  whatsappNumber: "9647808771427",
  city: "كربلاء",
  area: "طويرج",
  street: "بداية الحولي، خلف حلويات أحمد الياسري",
  addressLine: "كربلاء، طويرج، بداية الحولي، خلف حلويات أحمد الياسري",
  mapsQuery: "كربلاء طويرج بداية الحولي خلف حلويات أحمد الياسري",
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

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=14&hl=ar&output=embed`;

export const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "الأنواع" },
  { href: "/custom", label: "التفصيل" },
  { href: "/about", label: "المعمل" },
  { href: "/contact", label: "التواصل" },
] as const;
