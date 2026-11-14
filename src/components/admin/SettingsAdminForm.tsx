"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type SettingsForm = {
  phoneDisplay: string;
  phoneInternational: string;
  whatsappNumber: string;
  city: string;
  area: string;
  street: string;
  addressLine: string;
  mapsQuery: string;
};

export function SettingsAdminForm({ initial }: { initial: SettingsForm }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setMessage(data.error ?? "تعذر الحفظ");
        return;
      }
      setMessage("تم حفظ بيانات التواصل.");
      router.refresh();
    } catch {
      setMessage("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={save} className="max-w-2xl space-y-4 border border-line bg-paper p-5">
      <Field label="هاتف العرض">
        <input
          dir="ltr"
          className={inputClass}
          value={form.phoneDisplay}
          onChange={(event) => setForm({ ...form, phoneDisplay: event.target.value })}
          required
        />
      </Field>
      <Field label="الهاتف الدولي">
        <input
          dir="ltr"
          className={inputClass}
          value={form.phoneInternational}
          onChange={(event) => setForm({ ...form, phoneInternational: event.target.value })}
        />
      </Field>
      <Field label="رقم واتساب (بدون +)">
        <input
          dir="ltr"
          className={inputClass}
          value={form.whatsappNumber}
          onChange={(event) => setForm({ ...form, whatsappNumber: event.target.value })}
          required
        />
      </Field>
      <Field label="المدينة">
        <input
          className={inputClass}
          value={form.city}
          onChange={(event) => setForm({ ...form, city: event.target.value })}
        />
      </Field>
      <Field label="المنطقة">
        <input
          className={inputClass}
          value={form.area}
          onChange={(event) => setForm({ ...form, area: event.target.value })}
        />
      </Field>
      <Field label="الشارع / الدلالة">
        <input
          className={inputClass}
          value={form.street}
          onChange={(event) => setForm({ ...form, street: event.target.value })}
        />
      </Field>
      <Field label="العنوان الكامل">
        <input
          className={inputClass}
          value={form.addressLine}
          onChange={(event) => setForm({ ...form, addressLine: event.target.value })}
          required
        />
      </Field>
      <Field label="نص البحث في الخريطة">
        <input
          className={inputClass}
          value={form.mapsQuery}
          onChange={(event) => setForm({ ...form, mapsQuery: event.target.value })}
        />
      </Field>
      {message ? (
        <p className="text-sm text-burgundy" role="status">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-11 items-center bg-burgundy px-5 text-sm font-medium text-paper disabled:opacity-60"
      >
        {loading ? "جارٍ الحفظ…" : "حفظ الإعدادات"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass = "w-full border border-line bg-ivory px-3 py-3 text-base font-normal";
