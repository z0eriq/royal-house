import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const nextPath = (await searchParams).next;
  const safeNext = nextPath?.startsWith("/admin") ? nextPath : "/admin";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-12">
      <div className="border border-line bg-paper p-6 shadow-[0_24px_50px_-36px_rgba(34,28,22,0.45)] md:p-8">
        <p className="text-sm text-copper-deep">رويال هاوس</p>
        <h1 className="mt-2 font-display text-4xl">تسجيل الدخول</h1>
        <p className="mt-3 text-sm leading-7 text-muted">أدخل بيانات الاعتماد للوصول إلى لوحة التحكم.</p>
        <AdminLoginForm nextPath={safeNext} />
      </div>
    </div>
  );
}
