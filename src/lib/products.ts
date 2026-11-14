import { cache } from "react";
import {
  asImagePosition,
  asStringDetails,
  type Category,
  type ImagePosition,
  type Product,
} from "./catalog-types.ts";
import { prisma } from "./db.ts";
import { seedCategories, seedProducts } from "./seed-catalog.ts";

export type { Category, ImagePosition, Product };
export type CategorySlug = string;

function mapCategory(row: {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
}): Category {
  return {
    slug: row.slug,
    name: row.name,
    blurb: row.blurb,
    description: row.description,
    image: row.image,
    imageAlt: row.imageAlt,
    imagePosition: asImagePosition(row.imagePosition),
  };
}

function mapProduct(row: {
  slug: string;
  name: string;
  categorySlug: string;
  summary: string;
  description: string;
  details: unknown;
  image: string;
  imageAlt: string;
  imagePosition: string;
  featured: boolean;
}): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.categorySlug,
    summary: row.summary,
    description: row.description,
    details: asStringDetails(row.details),
    image: row.image,
    imageAlt: row.imageAlt,
    imagePosition: asImagePosition(row.imagePosition),
    featured: row.featured,
  };
}

export const listCategories = cache(async (): Promise<Category[]> => {
  try {
    const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return [...seedCategories];
    return rows.map(mapCategory);
  } catch {
    return [...seedCategories];
  }
});

export const listProducts = cache(async (): Promise<Product[]> => {
  try {
    const rows = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return [...seedProducts];
    return rows.map(mapProduct);
  } catch {
    return [...seedProducts];
  }
});

export async function getCategory(slug: string | undefined): Promise<Category | undefined> {
  if (!slug) return undefined;
  try {
    const row = await prisma.category.findUnique({ where: { slug } });
    if (row) return mapCategory(row);
  } catch {
    /* fall through */
  }
  return seedCategories.find((category) => category.slug === slug);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    const row = await prisma.product.findUnique({ where: { slug } });
    if (row) return mapProduct(row);
  } catch {
    /* fall through */
  }
  return seedProducts.find((product) => product.slug === slug);
}

export async function filterProducts(slug: string | undefined): Promise<Product[]> {
  const products = await listProducts();
  if (!slug) return products;
  return products.filter((product) => product.category === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await listProducts();
  return products.filter((product) => product.featured);
}

export async function relatedProducts(slug: string): Promise<Product[]> {
  const product = await getProduct(slug);
  if (!product) return [];
  const products = await listProducts();
  return products.filter((item) => item.category === product.category && item.slug !== slug).slice(0, 3);
}

export function isCategorySlug(value: string, categories: readonly Category[]): boolean {
  return categories.some((category) => category.slug === value);
}

export function modelsLabel(count: number): string {
  if (count <= 0) return "لا توجد نماذج";
  if (count === 1) return "نموذج واحد";
  if (count === 2) return "نموذجان";
  if (count >= 3 && count <= 10) return `${count} نماذج`;
  return `${count} نموذجاً`;
}

export function imagePositionClass(position: ImagePosition | undefined): string {
  if (position === "top") return "object-top";
  if (position === "bottom") return "object-bottom";
  return "object-center";
}

export const mosaicOrder = [
  "sofas",
  "sofa-sets",
  "custom-divan",
  "chairs",
  "iron-chairs",
] as const;

/** @deprecated Use listCategories / listProducts — kept for tests against seed data */
export const categories = seedCategories;
/** @deprecated Use listProducts — kept for tests against seed data */
export const products = seedProducts;
