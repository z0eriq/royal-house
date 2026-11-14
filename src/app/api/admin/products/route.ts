import { NextResponse } from "next/server";
import { asImagePosition, asStringDetails } from "@/lib/catalog-types";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const categorySlug = String(body.categorySlug ?? "").trim();
  if (!name || !categorySlug) {
    return NextResponse.json({ error: "الاسم والنوع مطلوبان" }, { status: 400 });
  }

  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) {
    return NextResponse.json({ error: "النوع غير موجود" }, { status: 400 });
  }

  const slug = String(body.slug ?? "").trim() || slugify(name) || `product-${Date.now()}`;
  const count = await prisma.product.count();

  try {
    const product = await prisma.product.create({
      data: {
        slug,
        name,
        categorySlug,
        summary: String(body.summary ?? "").trim(),
        description: String(body.description ?? "").trim(),
        details: asStringDetails(body.details),
        image: String(body.image ?? "/images/hero.jpg").trim() || "/images/hero.jpg",
        imageAlt: String(body.imageAlt ?? "").trim() || name,
        imagePosition: asImagePosition(String(body.imagePosition ?? "center")),
        featured: Boolean(body.featured),
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : count,
      },
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "تعذر الحفظ. تحقق من أن الرابط (slug) غير مستخدم." }, { status: 400 });
  }
}
