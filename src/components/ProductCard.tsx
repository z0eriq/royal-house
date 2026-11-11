import Image from "next/image";
import Link from "next/link";
import { getCategory, imagePositionClass, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <article className="h-full border border-line bg-paper">
      <Link href={`/products/${product.slug}`} className="group flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className={`object-cover transition duration-700 motion-safe:group-hover:scale-[1.03] ${imagePositionClass(product.imagePosition)}`}
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs text-copper-deep">{category?.name}</p>
          <h3 className="mt-2 font-display text-2xl leading-snug text-ink">{product.name}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{product.summary}</p>
          <p className="mt-auto pt-4 text-sm font-medium text-burgundy">السعر بعد تحديد المقاس</p>
        </div>
      </Link>
    </article>
  );
}
