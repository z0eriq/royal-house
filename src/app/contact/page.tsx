import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/styles";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { generalInquiry, getContactSettings, mapsEmbedUrlFrom, mapsSearchUrlFrom } from "@/lib/site";

export const metadata: Metadata = {
  title: "الموقع والتواصل",
  description: "تواصل مع رويال هاوس في كربلاء، طويرج، بداية الحولي، خلف حلويات أحمد الياسري. هاتف 0780 877 1427.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const contact = await getContactSettings();

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
              {contact.city}، {contact.area}
            </p>
            <p className="mt-3 text-lg leading-8">{contact.street}</p>
          </address>
          <div className="mt-8 space-y-2">
            <p className="text-sm text-muted">من داخل العراق</p>
            <a href={contact.phoneHref} dir="ltr" className="inline-flex font-display text-3xl text-ink">
              {contact.phoneDisplay}
            </a>
            <p dir="ltr" className="text-sm text-muted">
              {contact.phoneInternational}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink
              message={generalInquiry}
              whatsappNumber={contact.whatsappNumber}
              className={primaryButtonClass}
            >
              واتساب
            </WhatsAppLink>
            <a href={contact.phoneHref} className={secondaryButtonClass}>
              اتصال
            </a>
            <a
              href={mapsSearchUrlFrom(contact.mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButtonClass}
            >
              خرائط جوجل
            </a>
          </div>
        </div>
        <div>
          <div className="overflow-hidden border border-line bg-sand">
            <iframe
              title="خريطة البحث عن رويال هاوس في طويرج"
              src={mapsEmbedUrlFrom(contact.mapsQuery)}
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
