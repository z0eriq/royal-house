import type { Metadata } from "next";
import { ProductAdminClient } from "@/components/admin/ProductAdminClient";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "المنتجات",
};

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { slug: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">المنتجات</h1>
        <p className="mt-2 text-sm leading-7 text-muted">أضف أو عدّل نماذج الكتالوج الظاهرة للزوار.</p>
      </div>
      <ProductAdminClient products={products} categories={categories} />
    </div>
  );
}
