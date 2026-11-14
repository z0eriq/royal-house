import type { Metadata } from "next";
import { SettingsAdminForm } from "@/components/admin/SettingsAdminForm";
import { prisma } from "@/lib/db";
import { seedSiteSettings } from "@/lib/seed-site";

export const metadata: Metadata = {
  title: "التواصل",
};

export default async function AdminSettingsPage() {
  const settings = (await prisma.siteSettings.findUnique({ where: { id: 1 } })) ?? seedSiteSettings;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">بيانات التواصل</h1>
        <p className="mt-2 text-sm leading-7 text-muted">الهاتف وواتساب والعنوان الظاهرة في الموقع.</p>
      </div>
      <SettingsAdminForm
        initial={{
          phoneDisplay: settings.phoneDisplay,
          phoneInternational: settings.phoneInternational,
          whatsappNumber: settings.whatsappNumber,
          city: settings.city,
          area: settings.area,
          street: settings.street,
          addressLine: settings.addressLine,
          mapsQuery: settings.mapsQuery,
        }}
      />
    </div>
  );
}
