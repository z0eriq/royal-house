import { whatsappHref } from "@/lib/whatsapp";

export function WhatsAppLink({
  message,
  className,
  children,
  whatsappNumber,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
  whatsappNumber?: string;
}) {
  return (
    <a href={whatsappHref(message, whatsappNumber)} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
