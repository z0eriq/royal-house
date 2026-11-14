import Link from "next/link";
import type { ContactSettings } from "@/lib/catalog-types";
import { imageNote, navLinks, priceNote } from "@/lib/site";

export function SiteFooter({ contact }: { contact: ContactSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-wood text-sand">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-paper">رويال هاوس</p>
          <p className="mt-3 max-w-sm text-sm leading-7">
            معمل أثاث في طويرج. قنفات، كراسي، ديوان حسب الطلب، كرسي حديد، وتخم قنفات.
          </p>
        </div>
        <nav aria-label="روابط التذييل">
          <p className="text-sm font-medium text-paper">الصفحات</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm underline decoration-sand/30 underline-offset-4">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="not-italic">
          <p className="text-sm font-medium text-paper">المعمل</p>
          <p className="mt-3 text-sm leading-7">{contact.addressLine}</p>
          <a href={contact.phoneHref} dir="ltr" className="mt-3 inline-flex min-h-11 items-center text-sm text-paper">
            {contact.phoneInternational}
          </a>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl space-y-2 px-5 py-5 pb-24 text-xs leading-6 text-sand/80 md:pb-5">
          <p>{imageNote}</p>
          <p>{priceNote}</p>
          <p>© {year} رويال هاوس</p>
        </div>
      </div>
    </footer>
  );
}
