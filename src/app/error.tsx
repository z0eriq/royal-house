"use client";

import { primaryButtonClass } from "@/components/styles";
import { generalInquiry } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="font-display text-4xl">تعذر فتح الصفحة</h1>
      <p className="mt-4 text-base leading-8 text-muted">حاول مرة أخرى، أو تواصل معنا على واتساب.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className={primaryButtonClass}>
          إعادة المحاولة
        </button>
        <a href={whatsappHref(generalInquiry)} className="inline-flex min-h-11 items-center px-5 text-sm font-medium text-burgundy underline underline-offset-4">
          واتساب
        </a>
      </div>
    </div>
  );
}
