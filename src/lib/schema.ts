import type { Category, ContactSettings, Product } from "./catalog-types.ts";
import { siteBrand, siteUrl } from "./site.ts";

export function localBusinessSchema(categories: readonly Category[], contact: ContactSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: siteBrand.name,
    alternateName: siteBrand.nameEn,
    description: siteBrand.description,
    telephone: contact.phoneE164,
    image: new URL("/images/hero.jpg", siteUrl).toString(),
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      addressLocality: contact.area,
      addressRegion: contact.city,
      addressCountry: "IQ",
    },
    areaServed: contact.city,
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

export function productSchema(product: Product, categoryName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: new URL(product.image, siteUrl).toString(),
    category: categoryName,
    brand: {
      "@type": "Brand",
      name: siteBrand.name,
    },
    url: new URL(`/products/${product.slug}`, siteUrl).toString(),
  };
}
