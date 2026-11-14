"use client";

import { useState } from "react";
import { isPhoneNumber } from "@/lib/phone";
import { orderMessage, whatsappHref } from "@/lib/whatsapp";

export type OrderOptionGroup = {
  label: string;
  items: readonly string[];
};

type FormErrors = {
  name?: string;
  phone?: string;
  item?: string;
};

const fieldClass = "mt-2 w-full border border-line bg-ivory px-3 py-3 text-base text-ink";

export function OrderForm({
  groups,
  defaultItem,
  whatsappNumber,
}: {
  groups: readonly OrderOptionGroup[];
  defaultItem: string;
  whatsappNumber?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [item, setItem] = useState(defaultItem);
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [notice, setNotice] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) nextErrors.name = "اكتب الاسم.";
    if (!isPhoneNumber(phone)) nextErrors.phone = "اكتب رقم هاتفك حتى نقدر نرجع لك.";
    if (!item.trim()) nextErrors.item = "اختر نوع الطلب.";

    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Array<keyof FormErrors>)[0];
    if (firstInvalid) {
      setNotice("");
      setFallbackHref("");
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const href = whatsappHref(
      orderMessage({
        name,
        phone,
        item,
        size,
        material,
        notes,
      }),
      whatsappNumber,
    );
    setFallbackHref(href);
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    setNotice(
      opened
        ? "جهّزنا الرسالة على واتساب. أرسلها حتى نرد عليك."
        : "المتصفح منع النافذة. استخدم الرابط تحت النموذج لإرسال الطلب.",
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="border border-line bg-paper p-5 shadow-[0_24px_50px_-36px_rgba(34,28,22,0.45)] md:p-7">
      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            الاسم
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            رقم الهاتف
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            maxLength={20}
            placeholder="07xx xxx xxxx"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${fieldClass} text-start`}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="item" className="text-sm font-medium">
            نوع الطلب
          </label>
          <select
            id="item"
            name="item"
            value={item}
            onChange={(event) => setItem(event.target.value)}
            aria-invalid={errors.item ? true : undefined}
            aria-describedby={errors.item ? "item-error" : "item-hint"}
            className={fieldClass}
          >
            {groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.items.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="طلب آخر">طلب آخر</option>
          </select>
          <p id="item-hint" className="mt-2 text-sm leading-6 text-muted">
            إذا اخترت طلب آخر، اكتب التفاصيل في الملاحظات.
          </p>
          <FieldError id="item-error" message={errors.item} />
        </div>

        <div>
          <label htmlFor="size" className="text-sm font-medium">
            المقاس التقريبي
          </label>
          <input
            id="size"
            name="size"
            maxLength={80}
            placeholder="مثال: طول الجدار 4 متر"
            value={size}
            onChange={(event) => setSize(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="material" className="text-sm font-medium">
            اللون والخامة
          </label>
          <input
            id="material"
            name="material"
            maxLength={120}
            placeholder="مثال: قماش زيتي، أو جلد بني"
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="notes" className="text-sm font-medium">
            ملاحظات
          </label>
          <textarea
            id="notes"
            name="notes"
            maxLength={500}
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <button type="submit" className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-burgundy px-5 text-sm font-medium text-paper transition-colors hover:bg-burgundy-deep">
        إرسال الطلب على واتساب
      </button>
      <p className="mt-3 text-sm leading-6 text-muted">الطلب يفتح رسالة واتساب، ولا يُحفظ على الموقع.</p>
      {notice ? (
        <p className="mt-3 text-sm leading-6 text-ink" role="status">
          {notice}
        </p>
      ) : null}
      {fallbackHref ? (
        <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-burgundy underline decoration-burgundy/40 underline-offset-4">
          فتح الرسالة على واتساب
        </a>
      ) : null}
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-burgundy" role="alert">
      {message}
    </p>
  );
}
