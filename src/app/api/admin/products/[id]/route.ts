import { NextResponse } from "next/server";
import { asImagePosition, asStringDetails } from "@/lib/catalog-types";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
  }

  const name = String(body.name ?? existing.name).trim();
  const categorySlug = String(body.categorySlug ?? existing.categorySlug).trim();
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) {
    return NextResponse.json({ error: "النوع غير موجود" }, { status: 400 });
  }

  const slug =
    String(body.slug ?? existing.slug).trim() || slugify(name) || existing.slug;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        slug,
        name,
        categorySlug,
        summary: String(body.summary ?? existing.summary).trim(),
        description: String(body.description ?? existing.description).trim(),
        details: body.details !== undefined ? asStringDetails(body.details) : asStringDetails(existing.details),
        image: String(body.image ?? existing.image).trim() || existing.image,
        imageAlt: String(body.imageAlt ?? existing.imageAlt).trim() || name,
        imagePosition: asImagePosition(String(body.imagePosition ?? existing.imagePosition)),
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
        sortOrder:
          typeof body.sortOrder === "number" ? body.sortOrder : existing.sortOrder,
      },
    });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "تعذر التحديث. تحقق من أن الرابط (slug) غير مستخدم." }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "تعذر الحذف" }, { status: 400 });
  }
}
