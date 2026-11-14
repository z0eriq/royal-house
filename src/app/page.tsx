import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CategoryMosaic } from "@/components/CategoryMosaic";
import { ProductCard } from "@/components/ProductCard";
import { Container, SectionHeading } from "@/components/Section";
import { inverseButtonClass, primaryButtonClass, secondaryButtonClass } from "@/components/styles";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { getFeaturedProducts, listCategories } from "@/lib/products";
import { generalInquiry, getContactSettings, mapsSearchUrlFrom } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const steps = [
  {
    title: "اختر النوع",
    text: "قنفة، كرسي، ديوان، كرسي حديد، أو تخم قنفات.",
  },
  {
    title: "أرسل المقاس",
    text: "طول الجدار أو عدد المقاعد، وصورة المكان إذا موجودة.",
  },
  {
    title: "نتفق على السعر",
    text: "بعد القماش واللون وعدد القطع، نثبت السعر قبل الشغل.",
  },
  {
    title: "التجهيز والاستلام",
    text: "ننفذ القطعة، والاستلام من المعمل في طويرج. التوصيل إذا تحتاجه نرتبه معك.",
  },
];

export default async function HomePage() {
  const [featured, categories, contact] = await Promise.all([
    getFeaturedProducts(),
    listCategories(),
    getContactSettings(),
  ]);
  const categoryNames = new Map(categories.map((category) => [category.slug, category.name]));

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-medium text-copper-deep">كربلاء · طويرج · بداية الحولي</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.35] text-ink sm:text-6xl">
              قنفات وكراسي
              <span className="mt-1 block">على مقاس بيتك</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              رويال هاوس معمل في طويرج. نفصّل القنفات، الكراسي، الديوان حسب الطلب، كرسي الحديد، وتخم القنفات. تشوف الخامة واللون، والقطعة تُنفذ بعد الاتفاق.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppLink
                message={generalInquiry}
                whatsappNumber={contact.whatsappNumber}
                className={primaryButtonClass}
              >
                اطلب على واتساب
              </WhatsAppLink>
              <Link href="/products" className={secondaryButtonClass}>
                شوف الأنواع
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-3 gap-3 border-t border-line pt-6">
              <li>
                <p className="text-xs text-muted">المكان</p>
                <p className="mt-1 font-display text-lg text-ink sm:text-2xl">طويرج</p>
              </li>
              <li>
                <p className="text-xs text-muted">الشغل</p>
                <p className="mt-1 font-display text-lg text-ink sm:text-2xl">حسب الطلب</p>
              </li>
              <li>
                <p className="text-xs text-muted">الطلب</p>
                <p className="mt-1 font-display text-lg text-ink sm:text-2xl">واتساب</p>
              </li>
            </ul>
          </div>
          <div className="relative md:ms-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-wood">
              <Image
                src="/images/hero.jpg"
                alt="غرفة جلوس بقنفة رمادية وطاولة خشب، صورة توضيحية لطراز الجلسات"
                width={1600}
                height={2000}
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 border border-line bg-paper/95 p-4 backdrop-blur-sm md:inset-x-auto md:-end-8 md:bottom-8 md:w-64">
              <p className="text-xs text-copper-deep">صورة توضيحية للطراز</p>
              <p className="mt-1 font-display text-2xl leading-snug">قماش، لون، ومقاس</p>
              <p className="mt-2 text-sm leading-6 text-muted">الجلسة النهائية حسب طلبك، وليست بالضرورة نفس الصورة.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper" aria-labelledby="types-heading">
        <Container className="py-16 md:py-20">
          <SectionHeading
            id="types-heading"
            eyebrow="شنو نبيع"
            title="خمسة أنواع، كلها تُفصَّل"
            text="اختر النوع، وبعدها نثبت المقاس والخامة. ما نعرض عدداً في المخزون، لأن الشغل على الطلب."
          />
          <div className="mt-10">
            <CategoryMosaic categories={categories} />
          </div>
        </Container>
      </section>

      <section className="border-b border-line" aria-labelledby="process-heading">
        <Container className="py-16 md:py-20">
          <SectionHeading id="process-heading" eyebrow="الطلب" title="من الرسالة إلى الاستلام" />
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-ink pt-4">
                <span className="font-display text-3xl text-burgundy">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-line bg-paper" aria-labelledby="models-heading">
        <Container className="py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="models-heading"
              eyebrow="نماذج"
              title="أشكال نقدر نفصلها"
              text="هذي أمثلة على الشغل، مو قائمة أسعار. الصورة تقرب الطراز، والتفاصيل والسعر على واتساب."
            />
            <Link href="/products" className="text-sm font-medium text-burgundy underline decoration-burgundy/40 underline-offset-4">
              كل النماذج
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} categoryName={categoryNames.get(product.category)} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-wood text-paper" aria-labelledby="custom-heading">
        <Container className="grid gap-8 py-16 md:grid-cols-[1.4fr_0.6fr] md:items-center md:py-20">
          <div>
            <p className="text-sm text-sand">حسب الطلب</p>
            <h2 id="custom-heading" className="mt-3 font-display text-4xl leading-[1.35] md:text-5xl">
              ديوان وطقم على مقاس الغرفة
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-sand">
              إذا الجدار طويل أو المجلس بمقاس غير جاهز، أرسل الطول وعدد الجلوس. نرجع لك بالتفاصيل والسعر قبل القص.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/custom" className="inline-flex min-h-11 items-center justify-center bg-paper px-5 text-sm font-medium text-ink">
              نموذج الطلب
            </Link>
            <WhatsAppLink
              message={generalInquiry}
              whatsappNumber={contact.whatsappNumber}
              className={inverseButtonClass}
            >
              واتساب مباشر
            </WhatsAppLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="visit-heading">
        <Container className="grid gap-8 py-16 md:grid-cols-2 md:py-20">
          <div>
            <SectionHeading
              id="visit-heading"
              eyebrow="الزيارة"
              title="المعمل خلف حلويات أحمد الياسري"
              text="العنوان في بداية الحولي بطويرج. راسلنا قبل ما تجي حتى نكون بالمعمل، وتقدر تجيب مقاس الغرفة أو صورة المكان."
            />
            <div className="mt-8 flex flex-wrap gap-3">
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
                فتح العنوان في الخريطة
              </a>
            </div>
          </div>
          <address className="not-italic border border-line bg-paper p-6 leading-8">
            <p className="text-sm text-copper-deep">العنوان</p>
            <p className="mt-2 font-display text-3xl text-ink">
              {contact.city}، {contact.area}
            </p>
            <p className="mt-3 text-muted">{contact.street}</p>
            <p className="mt-6 text-sm text-muted">
              الخريطة تفتح بحثاً عن هذا العنوان. الدلالة الأدق هي خلف حلويات أحمد الياسري، بداية الحولي.
            </p>
          </address>
        </Container>
      </section>
    </>
  );
}
