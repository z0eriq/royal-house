import Image from "next/image";
import Link from "next/link";
import { getCategory, imagePositionClass, mosaicOrder } from "@/lib/products";

const areaClass: Record<(typeof mosaicOrder)[number], string> = {
  sofas: "area-sofas",
  "sofa-sets": "area-sets",
  "custom-divan": "area-divan",
  chairs: "area-chairs",
  "iron-chairs": "area-iron",
};

export function CategoryMosaic() {
  const ordered = mosaicOrder.map((slug) => getCategory(slug)).filter((category) => category !== undefined);

  return (
    <ul className="category-mosaic">
      {ordered.map((category) => (
        <li key={category.slug} className={areaClass[category.slug]}>
          <Link
            href={`/products?category=${category.slug}`}
            className="group relative flex min-h-[250px] flex-col justify-end bg-wood text-paper md:h-full md:min-h-[230px]"
          >
            <span className="absolute inset-0 overflow-hidden">
              <Image
                src={category.image}
                alt=""
                fill
                sizes={category.slug === "sofas" ? "(min-width: 768px) 46vw, 100vw" : "(min-width: 768px) 27vw, 100vw"}
                className={`object-cover transition duration-700 motion-safe:group-hover:scale-105 ${imagePositionClass(category.imagePosition)}`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-wood via-wood/30 to-wood/10" />
            </span>
            <span className="relative p-5">
              <span className="block font-display text-3xl leading-snug">{category.name}</span>
              <span className="mt-2 block max-w-sm text-sm leading-6 text-sand">{category.blurb}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
