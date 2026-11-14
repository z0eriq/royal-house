"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import type { ContactSettings } from "@/lib/catalog-types";

type AppChromeProps = {
  children: React.ReactNode;
  contact: ContactSettings;
  jsonLd: React.ReactNode;
};

export function AppChrome({ children, contact, jsonLd }: AppChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#content" className="skip-link">
        تخطي إلى المحتوى
      </a>
      <SiteHeader contact={contact} />
      <main id="content">{children}</main>
      <SiteFooter contact={contact} />
      <WhatsAppFloat whatsappNumber={contact.whatsappNumber} />
      {jsonLd}
    </>
  );
}
