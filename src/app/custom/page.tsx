import type { Metadata } from "next";
import { OrderForm } from "@/components/OrderForm";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Section";
import { firstParam } from "@/lib/params";
import { categories, getProduct, products } from "@/lib/products";

type CustomPageProps = {
  searchParams: Promise<{ item?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "تفصيل حسب الطلب",
  description: "أرسل مقاس الديوان أو القنفة أو كرسي الحديد إلى رويال هاوس على واتساب، والسعر بعد تحديد الخامة.",
  alternates: { canonical: "/custom" },
};

const measures = [
  {
    title: "طول المكان",
    text: "قس الجدار أو المساحة بالمتر. إذا لم يتوفر متر، صورة الغرفة مع الباب أو الشباك تكفي لتقدير أولي.",
  },
  {
    title: "عدد الجلوس",
    text: "كم شخصاً يجلس عادة؟ هذا يحدد عرض القنفة أو طول الديوان.",
  },
  {
    title: "اللون والخامة",
    text: "قماش أو جلد، ولون قريب من الستارة أو السجاد. في زيارة المعمل يمكن مشاهدة العينات.",
  },
  {
    title: "مكان الاستخدام",
    text: "صالة، مجلس، حديقة، أو سفرة. كرسي الحديد للخارج يختلف عن تنجيد القنفة للداخل.",
  },
];

export default async function CustomPage({ searchParams }: CustomPageProps) {
  const item = firstParam((await searchParams).item);
  const defaultItem = getProduct(item ?? "")?.name ?? "ديوان حسب الطلب";
  const groups = categories.map((category) => ({
    label: category.name,
    items: products.filter((product) => product.category === category.slug).map((product) => product.name),
  }));

  return (
    <>
      <PageHero
        eyebrow="التفصيل"
        title="أرسل المقاس، ونرجع بالتفاصيل والسعر"
        text="النموذج يفتح رسالة واتساب جاهزة. لا يُحفظ الطلب على الموقع، والإرسال يتم من عندك بعد ما تتأكد من النص."
      />
      <Container className="grid gap-10 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-16">
        <div>
          <h2 className="font-display text-3xl">ماذا نحتاج قبل القص</h2>
          <ul className="mt-6 space-y-5">
            {measures.map((measure) => (
              <li key={measure.title} className="border-t border-line pt-4">
                <h3 className="font-display text-2xl">{measure.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{measure.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <OrderForm key={defaultItem} groups={groups} defaultItem={defaultItem} />
      </Container>
    </>
  );
}
