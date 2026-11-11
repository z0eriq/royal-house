import type { ReactNode } from "react";
import { whatsappHref } from "@/lib/whatsapp";

export function WhatsAppLink({
  message,
  children,
  className,
}: {
  message: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
