"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { availableImages } from "@/lib/images";

type CategoryOption = { slug: string; name: string };
type ProductRow = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  summary: string;
  description: string;
  details: unknown;
  image: string;
  imageAlt: string;
  imagePosition: string;
  featured: boolean;
};

const emptyForm = {
  id: "",
  slug: "",
  name: "",
  categorySlug: "",
  summary: "",
  description: "",
  detailsText: "",
  image: "/images/hero.jpg",
  imageAlt: "",
  imagePosition: "center",
  featured: false,
};

export function ProductAdminClient({
  products,
  categories,
}: {
  products: ProductRow[];
  categories: CategoryOption[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({ ...emptyForm, categorySlug: categories[0]?.slug ?? "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const editing = Boolean(form.id);
  const imageOptions = useMemo(() => {
    const values = new Set(availableImages.map((item) => item.value));
    if (form.image && !values.has(form.image as (typeof availableImages)[number]["value"])) {
      return [{ value: form.image, label: `مخصص: ${form.image}` }, ...availableImages];
    }
    return [...availableImages];
  }, [form.image]);

  function startCreate() {
    setForm({ ...emptyForm, categorySlug: categories[0]?.slug ?? "" });
    setMessage("");
  }

  function startEdit(product: ProductRow) {
    const details = Array.isArray(product.details)
      ? product.details.filter((item): item is string => typeof item === "string").join("\n")
      : "";
    setForm({
      id: product.id,
      slug: product.slug,
      name: product.name,
      categorySlug: product.categorySlug,
      summary: product.summary,
      description: product.description,
      detailsText: details,
      image: product.image,
      imageAlt: product.imageAlt,
      imagePosition: product.imagePosition,
      featured: product.featured,
    });
    setMessage("");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const payload = {
      slug: form.slug,
      name: form.name,
      categorySlug: form.categorySlug,
      summary: form.summary,
      description: form.description,
      details: form.detailsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      image: form.image,
      imageAlt: form.imageAlt,
      imagePosition: form.imagePosition,
      featured: form.featured,
    };

    try {
      const response = await fetch(editing ? `/api/admin/products/${form.id}` : "/api/admin/products", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setMessage(data.error ?? "تعذر الحفظ");
        return;
      }
      setMessage(editing ? "تم تحديث المنتج." : "تمت إضافة المنتج.");
      startCreate();
      router.refresh();
    } catch {
      setMessage("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string, name: string) {
    if (!window.confirm(`حذف المنتج «${name}»؟`)) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setMessage(data.error ?? "تعذر الحذف");
        return;
      }
      if (form.id === id) startCreate();
      setMessage("تم حذف المنتج.");
      router.refresh();
    } catch {
      setMessage("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl">المنتجات ({products.length})</h2>
          <button type="button" onClick={startCreate} className="text-sm text-burgundy underline underline-offset-4">
            إضافة جديد
          </button>
        </div>
        <ul className="space-y-3">
          {products.map((product) => (
            <li key={product.id} className="flex gap-3 border border-line bg-paper p-3">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-sand">
                <Image src={product.image} alt="" fill className="object-cover" sizes="64px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-muted">
                  {product.categorySlug}
                  {product.featured ? " · مميز" : ""}
                </p>
                <div className="mt-2 flex gap-3">
                  <button type="button" className="text-sm text-burgundy" onClick={() => startEdit(product)}>
                    تعديل
                  </button>
                  <button
                    type="button"
                    className="text-sm text-muted"
                    onClick={() => remove(product.id, product.name)}
                    disabled={loading}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={save} className="border border-line bg-paper p-5">
        <h2 className="font-display text-2xl">{editing ? "تعديل منتج" : "إضافة منتج"}</h2>
        <div className="mt-5 grid gap-4">
          <Field label="الاسم">
            <input
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="الرابط (slug)">
            <input
              value={form.slug}
              onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
              className={inputClass}
              dir="ltr"
              placeholder="اختياري عند الإضافة"
            />
          </Field>
          <Field label="النوع">
            <select
              required
              value={form.categorySlug}
              onChange={(event) => setForm((current) => ({ ...current, categorySlug: event.target.value }))}
              className={inputClass}
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="ملخص قصير">
            <input
              value={form.summary}
              onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="الوصف">
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="التفاصيل (سطر لكل نقطة)">
            <textarea
              rows={4}
              value={form.detailsText}
              onChange={(event) => setForm((current) => ({ ...current, detailsText: event.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="الصورة">
            <select
              value={form.image}
              onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
              className={inputClass}
            >
              {imageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="أو مسار صورة مخصص">
            <input
              value={form.image}
              onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
              className={inputClass}
              dir="ltr"
            />
          </Field>
          <Field label="وصف الصورة">
            <input
              value={form.imageAlt}
              onChange={(event) => setForm((current) => ({ ...current, imageAlt: event.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="موضع الصورة">
            <select
              value={form.imagePosition}
              onChange={(event) => setForm((current) => ({ ...current, imagePosition: event.target.value }))}
              className={inputClass}
            >
              <option value="center">وسط</option>
              <option value="top">أعلى</option>
              <option value="bottom">أسفل</option>
            </select>
          </Field>
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))}
            />
            إظهار في الصفحة الرئيسية
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
          {loading ? "جارٍ الحفظ…" : editing ? "حفظ التعديلات" : "إضافة المنتج"}
        </button>
      </form>
    </div>
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
