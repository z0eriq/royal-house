import type { Metadata } from "next";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    default: "لوحة التحكم",
    template: "%s | لوحة التحكم",
  },
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "الرئيسية" },
  { href: "/admin/products", label: "المنتجات" },
  { href: "/admin/categories", label: "الأنواع" },
  { href: "/admin/settings", label: "التواصل" },
] as const;

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getAdminSession();

  if (!session) {
    return <div className="min-h-screen bg-ivory">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-line bg-wood text-sand">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="font-display text-2xl text-paper">رويال هاوس</p>
            <p className="text-xs text-sand/80">لوحة التحكم · {session.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="inline-flex min-h-11 items-center px-3 text-sm text-sand underline-offset-4 hover:underline">
              عرض الموقع
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
        <nav aria-label="تنقل لوحة التحكم" className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-3 py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 shrink-0 items-center px-3 text-sm text-paper/90 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <div className="mx-auto w-full max-w-6xl px-5 py-8">{children}</div>
    </div>
  );
}
