import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/Section";
import { firstParam } from "@/lib/params";
import { filterProducts, getCategory, listCategories, modelsLabel } from "@/lib/products";
import { imageNote } from "@/lib/site";

type ProductsPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const category = await getCategory(firstParam((await searchParams).category));
  if (!category) {
    return {
      title: "الأنواع",
      description: "قنفات، كراسي، ديوان حسب الطلب، كرسي حديد، وتخم قنفات من رويال هاوس في طويرج.",
      alternates: { canonical: "/products" },
    };
  }

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/products?category=${category.slug}` },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const selectedSlug = firstParam((await searchParams).category);
  const [selected, categories] = await Promise.all([getCategory(selectedSlug), listCategories()]);
  const invalidFilter = Boolean(selectedSlug) && !selected;
  const items = invalidFilter ? [] : await filterProducts(selected?.slug);
  const categoryNames = new Map(categories.map((category) => [category.slug, category.name]));

  return (
    <>
      <PageHero
        eyebrow="الكتالوج"
        title={selected ? selected.name : "الأنواع التي نفصّلها"}
        text={
          selected
            ? selected.description
            : "اختر النوع وشاهد النماذج. كل قطعة تُنفذ بعد الاتفاق على المقاس واللون."
        }
      />
      <Container className="py-10 md:py-14">
        <nav aria-label="تصفية الأنواع" className="flex flex-wrap gap-2">
          <Link
            href="/products"
            aria-current={!selected && !invalidFilter ? "page" : undefined}
            className={chipClass(!selected && !invalidFilter)}
          >
            الكل
          </Link>
          {categories.map((category) => {
            const active = selected?.slug === category.slug;
            return (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                aria-current={active ? "page" : undefined}
                className={chipClass(active)}
              >
                {category.name}
              </Link>
            );
          })}
        </nav>

        {invalidFilter ? (
          <p className="mt-8 text-base leading-8 text-muted">
            هذا النوع غير موجود.{" "}
            <Link href="/products" className="font-medium text-burgundy underline underline-offset-4">
              عرض كل النماذج
            </Link>
          </p>
        ) : (
          <>
            <p className="mt-8 text-sm text-muted">
              {modelsLabel(items.length)}
              {selected ? ` ضمن ${selected.name}` : ""}. {imageNote}
            </p>
            {items.length === 0 ? (
              <p className="mt-6 text-base leading-8 text-muted">
                لا توجد نماذج ضمن هذا النوع حالياً. أرسل المقاس على واتساب ونرتب الطلب.
              </p>
            ) : (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <li key={product.slug}>
                    <ProductCard product={product} categoryName={categoryNames.get(product.category)} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Container>
    </>
  );
}

function chipClass(active: boolean): string {
  return active
    ? "inline-flex min-h-11 items-center bg-wood px-4 text-sm text-paper"
    : "inline-flex min-h-11 items-center border border-line bg-paper px-4 text-sm text-ink";
}
