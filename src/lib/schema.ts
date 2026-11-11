import { categories, getCategory, type Product } from "./products.ts";
import { site, siteUrl } from "./site.ts";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: site.name,
    alternateName: site.nameEn,
    description: site.description,
    telephone: site.phoneE164,
    image: new URL("/images/hero.jpg", siteUrl).toString(),
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.area,
      addressRegion: site.city,
      addressCountry: "IQ",
    },
    areaServed: site.city,
    currenciesAccepted: "IQD",
    inLanguage: "ar",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "أنواع الأثاث",
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: category.name,
          description: category.description,
        },
      })),
    },
  };
}

export function productSchema(product: Product) {
  const category = getCategory(product.category);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: new URL(product.image, siteUrl).toString(),
    category: category?.name,
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    url: new URL(`/products/${product.slug}`, siteUrl).toString(),
  };
}
