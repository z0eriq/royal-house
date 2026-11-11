import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/styles";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-medium text-copper-deep">404</p>
      <h1 className="mt-3 font-display text-4xl">الصفحة غير موجودة</h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-8 text-muted">
        الرابط ناقص، أو النموذج تغيّر. تقدر ترجع للأنواع أو تراسل المعمل مباشرة.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/products" className={primaryButtonClass}>
          الأنواع
        </Link>
        <Link href="/" className={secondaryButtonClass}>
          الرئيسية
        </Link>
      </div>
    </Container>
  );
}
