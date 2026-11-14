import type { Metadata } from "next";
import { CategoryAdminClient } from "@/components/admin/CategoryAdminClient";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "الأنواع",
};

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">الأنواع</h1>
        <p className="mt-2 text-sm leading-7 text-muted">عدّل أسماء الأنواع وأوصافها وصورها في الموقع.</p>
      </div>
      <CategoryAdminClient categories={categories} />
    </div>
  );
}
