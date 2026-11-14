import { generalInquiry } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export function WhatsAppFloat({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <a
      href={whatsappHref(generalInquiry, whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-40 inline-flex min-h-12 items-center gap-2 bg-burgundy px-4 text-sm font-medium text-paper shadow-[0_12px_30px_-16px_rgba(34,28,22,0.8)] md:hidden"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9l-4.2 3.2c-.7.5-1.8 0-1.8-.9V5.5z"
        />
      </svg>
      واتساب
    </a>
  );
}
