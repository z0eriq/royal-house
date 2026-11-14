"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryButtonClass } from "@/components/styles";
import type { ContactSettings } from "@/lib/catalog-types";
import { generalInquiry, navLinks } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ contact }: { contact: ContactSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-wood text-sand">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-2 text-xs">
          <p className="hidden sm:block">{contact.addressLine}</p>
          <a href={contact.phoneHref} dir="ltr" className="inline-flex min-h-11 items-center font-medium text-paper">
            {contact.phoneDisplay}
          </a>
        </div>
      </div>
      <header className="relative border-b border-line bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 36 36" aria-hidden="true" className="h-9 w-9 text-burgundy">
              <rect x="1.5" y="1.5" width="33" height="33" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M8 24V16.5L13 19.5 18 12l5 7.5L28 16.5V24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            <span className="min-w-0">
              <span className="block whitespace-nowrap font-display text-[1.65rem] leading-none text-ink">رويال هاوس</span>
              <span className="mt-1 block text-[10px] tracking-[0.28em] text-copper-deep">ROYAL HOUSE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? "text-sm font-medium text-ink" : "text-sm text-muted hover:text-ink"}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <a
              href={whatsappHref(generalInquiry, contact.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButtonClass}
            >
              اطلب على واتساب
            </a>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 shrink-0 items-center px-2 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "إغلاق" : "القائمة"}
          </button>
        </div>

        {open ? (
          <nav
            id="mobile-menu"
            aria-label="قائمة الجوال"
            className="absolute inset-x-0 top-full border-b border-line bg-ivory shadow-[0_18px_40px_-28px_rgba(34,28,22,0.7)] md:hidden"
          >
            <ul className="flex flex-col px-5 py-2">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="flex min-h-11 items-center text-base text-ink"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href={whatsappHref(generalInquiry, contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center text-base font-medium text-burgundy"
                >
                  واتساب
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>
    </div>
  );
}
