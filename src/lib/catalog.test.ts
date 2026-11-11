import assert from "node:assert/strict";
import { test } from "node:test";
import { firstParam } from "./params.ts";
import { isPhoneNumber } from "./phone.ts";
import {
  categories,
  filterProducts,
  getCategory,
  getProduct,
  modelsLabel,
  products,
} from "./products.ts";
import { localBusinessSchema } from "./schema.ts";
import { orderMessage, whatsappHref } from "./whatsapp.ts";

test("builds a WhatsApp link and leaves an empty message without text", () => {
  const href = whatsappHref("السلام عليكم");
  assert.equal(href.startsWith("https://wa.me/9647808771427?text="), true);
  assert.equal(decodeURIComponent(href.split("text=")[1] ?? ""), "السلام عليكم");
  assert.equal(whatsappHref("   "), "https://wa.me/9647808771427");
});

test("order message keeps one line per field", () => {
  const message = orderMessage({
    name: "أبو محمد\nتفاصيل",
    phone: "0780 111 2233",
    item: "ديوان على الجدار",
    size: "",
    material: "مخمل زيتي",
    notes: "   ",
  });
  assert.match(message, /الاسم: أبو محمد تفاصيل/);
  assert.match(message, /المقاس: غير محدد/);
  assert.match(message, /ملاحظات: لا يوجد/);
  assert.equal(message.includes("\n\n"), false);
});

test("accepts Iraqi local and Arabic-Indic phone numbers", () => {
  assert.equal(isPhoneNumber("+964 780 877 1427"), true);
  assert.equal(isPhoneNumber("07808771427"), true);
  assert.equal(isPhoneNumber("٠٧٨٠٨٧٧١٤٢٧"), true);
  assert.equal(isPhoneNumber("۰۷۸۰۸۷۷۱۴۲۷"), true);
  assert.equal(isPhoneNumber("1234"), false);
  assert.equal(isPhoneNumber("ليس رقماً"), false);
});

test("catalog slugs and categories stay consistent", () => {
  const slugs = products.map((product) => product.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  const names = products.map((product) => product.name);
  assert.equal(new Set(names).size, names.length);

  for (const product of products) {
    assert.ok(getCategory(product.category));
    assert.equal(getProduct(product.slug)?.name, product.name);
  }

  assert.equal(filterProducts(undefined).length, products.length);
  assert.equal(filterProducts("sofas").every((product) => product.category === "sofas"), true);
  assert.equal(filterProducts("missing").length, 0);
  assert.equal(getProduct("missing"), undefined);
});

test("Arabic model counts use the right plural", () => {
  assert.equal(modelsLabel(0), "لا توجد نماذج");
  assert.equal(modelsLabel(1), "نموذج واحد");
  assert.equal(modelsLabel(2), "نموذجان");
  assert.equal(modelsLabel(5), "5 نماذج");
  assert.equal(modelsLabel(11), "11 نموذجاً");
});

test("first query parameter ignores blanks", () => {
  assert.equal(firstParam(["  sofas  ", "chairs"]), "sofas");
  assert.equal(firstParam("   "), undefined);
  assert.equal(firstParam(undefined), undefined);
});

test("business schema includes the workshop phone and every category", () => {
  const json = JSON.stringify(localBusinessSchema());
  assert.match(json, /\+9647808771427/);
  assert.match(json, /بداية الحولي، خلف حلويات أحمد الياسري/);
  for (const category of categories) {
    assert.equal(json.includes(category.name), true);
  }
});
