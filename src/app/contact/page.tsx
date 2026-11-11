import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/styles";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { generalInquiry, mapsEmbedUrl, mapsSearchUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "الموقع والتواصل",
  description: "تواصل مع رويال هاوس في كربلاء، طويرج، بداية الحولي، خلف حلويات أحمد الياسري. هاتف 0780 877 1427.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="التواصل"
        title="المعمل في بداية الحولي"
        text="راسلنا قبل الزيارة حتى نكون موجودين. ما نعلن ساعات ثابتة على الموقع."
      />
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:py-16">
        <div>
          <address className="not-italic">
            <p className="text-sm font-medium text-copper-deep">العنوان</p>
            <p className="mt-3 font-display text-4xl leading-snug">
              {site.city}، {site.area}
            </p>
            <p className="mt-3 text-lg leading-8">{site.street}</p>
          </address>
          <div className="mt-8 space-y-2">
            <p className="text-sm text-muted">من داخل العراق</p>
            <a href={site.phoneHref} dir="ltr" className="inline-flex font-display text-3xl text-ink">
              {site.phoneDisplay}
            </a>
            <p dir="ltr" className="text-sm text-muted">
              {site.phoneInternational}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink message={generalInquiry} className={primaryButtonClass}>
              واتساب
            </WhatsAppLink>
            <a href={site.phoneHref} className={secondaryButtonClass}>
              اتصال
            </a>
            <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className={secondaryButtonClass}>
              خرائط جوجل
            </a>
          </div>
        </div>
        <div>
          <div className="overflow-hidden border border-line bg-sand">
            <iframe
              title="خريطة البحث عن رويال هاوس في طويرج"
              src={mapsEmbedUrl}
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            الخريطة تفتح بحثاً عن العنوان. الدلالة الأدق: بداية الحولي، خلف حلويات أحمد الياسري.
          </p>
        </div>
      </Container>
    </>
  );
}
