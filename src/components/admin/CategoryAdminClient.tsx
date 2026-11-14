"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { availableImages } from "@/lib/images";

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
};

export function CategoryAdminClient({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? "");
  const selected = categories.find((category) => category.id === selectedId) ?? categories[0];
  const [form, setForm] = useState(() => selected ?? null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function choose(category: CategoryRow) {
    setSelectedId(category.id);
    setForm(category);
    setMessage("");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/categories/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setMessage(data.error ?? "تعذر الحفظ");
        return;
      }
      setMessage("تم حفظ النوع.");
      router.refresh();
    } catch {
      setMessage("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  if (!form) {
    return <p className="text-sm text-muted">لا توجد أنواع بعد. شغّل عملية الـ seed أولاً.</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => choose(category)}
              className={
                category.id === form.id
                  ? "w-full border border-wood bg-paper px-4 py-3 text-start"
                  : "w-full border border-line bg-paper px-4 py-3 text-start"
              }
            >
              <span className="block font-medium">{category.name}</span>
              <span className="block text-xs text-muted" dir="ltr">
                {category.slug}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={save} className="border border-line bg-paper p-5">
        <h2 className="font-display text-2xl">تعديل: {form.name}</h2>
        <p className="mt-1 text-xs text-muted" dir="ltr">
          slug: {form.slug} (ثابت لارتباط المنتجات)
        </p>
        <div className="mt-5 grid gap-4">
          <label className="text-sm font-medium">
            الاسم
            <input
              className={inputClass}
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label className="text-sm font-medium">
            نبذة قصيرة
            <input
              className={inputClass}
              value={form.blurb}
              onChange={(event) => setForm({ ...form, blurb: event.target.value })}
            />
          </label>
          <label className="text-sm font-medium">
            الوصف
            <textarea
              className={inputClass}
              rows={4}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
            />
          </label>
          <label className="text-sm font-medium">
            الصورة
            <select
              className={inputClass}
              value={form.image}
              onChange={(event) => setForm({ ...form, image: event.target.value })}
            >
              {availableImages.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            مسار مخصص
            <input
              className={inputClass}
              dir="ltr"
              value={form.image}
              onChange={(event) => setForm({ ...form, image: event.target.value })}
            />
          </label>
          <label className="text-sm font-medium">
            وصف الصورة
            <input
              className={inputClass}
              value={form.imageAlt}
              onChange={(event) => setForm({ ...form, imageAlt: event.target.value })}
            />
          </label>
          <label className="text-sm font-medium">
            موضع الصورة
            <select
              className={inputClass}
              value={form.imagePosition}
              onChange={(event) => setForm({ ...form, imagePosition: event.target.value })}
            >
              <option value="center">وسط</option>
              <option value="top">أعلى</option>
              <option value="bottom">أسفل</option>
            </select>
          </label>
        </div>
        {message ? (
          <p className="mt-4 text-sm text-burgundy" role="status">
            {message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 inline-flex min-h-11 items-center bg-burgundy px-5 text-sm font-medium text-paper disabled:opacity-60"
        >
          {loading ? "جارٍ الحفظ…" : "حفظ النوع"}
        </button>
      </form>
    </div>
  );
}

const inputClass = "mt-2 w-full border border-line bg-ivory px-3 py-3 text-base font-normal";
