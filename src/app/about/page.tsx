import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/styles";
import { listCategories } from "@/lib/products";
import { getContactSettings, mapsSearchUrlFrom } from "@/lib/site";

export const metadata: Metadata = {
  title: "المعمل",
  description: "رويال هاوس معمل أثاث في طويرج، كربلاء. تفصيل القنفات والديوان والكراسي وكرسي الحديد وتخم القنفات.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [categories, contact] = await Promise.all([listCategories(), getContactSettings()]);

  return (
    <>
      <PageHero
        eyebrow="المعمل"
        title="رويال هاوس في طويرج"
        text="نشتغل أثاث جلسات: قنفات، كراسي، ديوان حسب الطلب، كرسي حديد، وتخم قنفات. التفصيل يبدأ من مقاس المكان."
      />
      <Container className="grid gap-12 py-12 md:grid-cols-2 md:py-16">
        <div className="space-y-4 text-base leading-8">
          <p>
            إذا تقدر تزور المعمل، تشوف القماش واللون قبل أن نبدأ. وإذا ما تقدر، أرسل المقاس والصور على واتساب ونرجع
            لك بالتفاصيل.
          </p>
          <p>
            ما نعلن سعراً ثابتاً على الموقع، لأن السعر يتغير مع المقاس ونوع القماش وعدد القطع. بعد ما تتضح التفاصيل
            نعطيك السعر، وقبل القص.
          </p>
          <p>الاستلام من المعمل في طويرج. إذا تحتاج توصيلاً، نرتب تفاصيله معك على واتساب ولا نعد به قبل الاتفاق.</p>
        </div>
        <div>
          <h2 className="font-display text-3xl">الذي نبيعه</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/products?category=${category.slug}`} className="flex min-h-14 items-center justify-between gap-4">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-muted">{category.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={contact.phoneHref} className={primaryButtonClass}>
              <span>اتصال</span>
              <span dir="ltr">{contact.phoneDisplay}</span>
            </a>
            <a
              href={mapsSearchUrlFrom(contact.mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButtonClass}
            >
              عنوان المعمل
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
