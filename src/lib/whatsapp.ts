import { site } from "./site.ts";

function clean(value: string, fallback: string): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > 0 ? normalized : fallback;
}

export function whatsappHref(message: string, whatsappNumber: string = site.whatsappNumber): string {
  const base = `https://wa.me/${whatsappNumber}`;
  const trimmed = message.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}

export function productInquiryMessage(productName: string): string {
  return [
    "السلام عليكم رويال هاوس",
    `أريد الاستفسار عن: ${productName}`,
    "المقاس:",
    "اللون والخامة:",
  ].join("\n");
}

export type OrderDetails = {
  name: string;
  phone: string;
  item: string;
  size: string;
  material: string;
  notes: string;
};

export function orderMessage(input: OrderDetails): string {
  return [
    "السلام عليكم رويال هاوس",
    `الاسم: ${clean(input.name, "غير مذكور")}`,
    `الهاتف: ${clean(input.phone, "غير مذكور")}`,
    `الطلب: ${clean(input.item, "غير محدد")}`,
    `المقاس: ${clean(input.size, "غير محدد")}`,
    `اللون والخامة: ${clean(input.material, "غير محدد")}`,
    `ملاحظات: ${clean(input.notes, "لا يوجد")}`,
  ].join("\n");
}
