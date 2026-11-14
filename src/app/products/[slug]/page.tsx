import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/styles";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { getCategory, getProduct, imagePositionClass, listProducts, relatedProducts } from "@/lib/products";
import { productSchema } from "@/lib/schema";
import { getContactSettings, imageNote, priceNote } from "@/lib/site";
import { productInquiryMessage } from "@/lib/whatsapp";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "النموذج غير موجود" };
  const category = await getCategory(product.category);

  return {
    title: product.name,
    description: `${product.summary} ${category?.name ?? ""} من رويال هاوس في طويرج.`.trim(),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [category, related, contact] = await Promise.all([
    getCategory(product.category),
    relatedProducts(product.slug),
    getContactSettings(),
  ]);

  return (
    <Container className="py-10 md:py-14">
      <JsonLd data={productSchema(product, category?.name)} />
      <nav aria-label="مسار الصفحة" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="underline decoration-line underline-offset-4">
              الرئيسية
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li>
            <Link href="/products" className="underline decoration-line underline-offset-4">
              الأنواع
            </Link>
          </li>
          {category ? (
            <>
              <li aria-hidden="true">·</li>
              <li>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="underline decoration-line underline-offset-4"
                >
                  {category.name}
                </Link>
              </li>
            </>
          ) : null}
          <li aria-hidden="true">·</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <article className="mt-8 grid items-start gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className={`object-cover ${imagePositionClass(product.imagePosition)}`}
          />
        </div>
        <div>
          {category ? <p className="text-sm font-medium text-copper-deep">{category.name}</p> : null}
          <h1 className="mt-2 font-display text-4xl leading-[1.35] text-ink md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{product.summary}</p>
          <p className="mt-4 text-base leading-8">{product.description}</p>

          <h2 className="mt-8 font-display text-2xl">الذي نتفق عليه</h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-7">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          <div className="mt-8 border border-line bg-paper p-4">
            <p className="text-sm font-medium">السعر</p>
            <p className="mt-2 text-sm leading-7 text-muted">{priceNote}</p>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">{imageNote}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppLink
              message={productInquiryMessage(product.name)}
              whatsappNumber={contact.whatsappNumber}
              className={primaryButtonClass}
            >
              اطلب هذا الموديل على واتساب
            </WhatsAppLink>
            <Link href={`/custom?item=${product.slug}`} className={secondaryButtonClass}>
              أرسل المقاس
            </Link>
            <a href={contact.phoneHref} className={secondaryButtonClass}>
              اتصال بالمعمل
            </a>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mt-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display text-3xl">
            من نفس النوع
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} categoryName={category?.name} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}
