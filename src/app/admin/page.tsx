import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "لوحة التحكم",
};

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, featuredCount, settings] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({ where: { featured: true } }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);

  const cards = [
    { label: "المنتجات", value: productCount, href: "/admin/products" },
    { label: "الأنواع", value: categoryCount, href: "/admin/categories" },
    { label: "مميزة في الرئيسية", value: featuredCount, href: "/admin/products" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl">لوحة التحكم</h1>
        <p className="mt-2 text-sm leading-7 text-muted">إدارة كتالوج رويال هاوس وبيانات التواصل.</p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <li key={card.label}>
            <Link href={card.href} className="block border border-line bg-paper p-5 hover:border-wood">
              <p className="text-sm text-muted">{card.label}</p>
              <p className="mt-2 font-display text-4xl">{card.value}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="border border-line bg-paper p-5">
        <h2 className="font-display text-2xl">التواصل الحالي</h2>
        <p className="mt-3 text-sm leading-7">{settings?.addressLine ?? "—"}</p>
        <p className="mt-1 text-sm" dir="ltr">
          {settings?.phoneDisplay ?? "—"}
        </p>
        <Link href="/admin/settings" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-burgundy underline underline-offset-4">
          تعديل بيانات التواصل
        </Link>
      </div>
    </div>
  );
}
