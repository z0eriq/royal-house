import { NextResponse } from "next/server";
import { asImagePosition } from "@/lib/catalog-types";
import { prisma } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "النوع غير موجود" }, { status: 404 });
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: String(body.name ?? existing.name).trim() || existing.name,
        blurb: String(body.blurb ?? existing.blurb).trim(),
        description: String(body.description ?? existing.description).trim(),
        image: String(body.image ?? existing.image).trim() || existing.image,
        imageAlt: String(body.imageAlt ?? existing.imageAlt).trim() || existing.name,
        imagePosition: asImagePosition(String(body.imagePosition ?? existing.imagePosition)),
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : existing.sortOrder,
      },
    });
    return NextResponse.json({ category });
  } catch {
    return NextResponse.json({ error: "تعذر التحديث" }, { status: 400 });
  }
}
