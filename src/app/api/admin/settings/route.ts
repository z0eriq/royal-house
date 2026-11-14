import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function digitsOnly(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  const phoneDisplay = String(body.phoneDisplay ?? "").trim();
  const phoneInternational = String(body.phoneInternational ?? "").trim();
  const whatsappRaw = String(body.whatsappNumber ?? "").trim();
  const city = String(body.city ?? "").trim();
  const area = String(body.area ?? "").trim();
  const street = String(body.street ?? "").trim();
  const addressLine = String(body.addressLine ?? "").trim();
  const mapsQuery = String(body.mapsQuery ?? "").trim();

  if (!phoneDisplay || !whatsappRaw || !addressLine) {
    return NextResponse.json({ error: "الهاتف وواتساب والعنوان مطلوبة" }, { status: 400 });
  }

  const e164Digits = digitsOnly(phoneInternational || phoneDisplay).replace(/^\+/, "");
  const phoneE164 = e164Digits.startsWith("964") ? `+${e164Digits}` : phoneInternational || `+${e164Digits}`;
  const phoneHref = `tel:${phoneE164}`;
  const whatsappNumber = digitsOnly(whatsappRaw).replace(/^\+/, "");

  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      phoneDisplay,
      phoneInternational: phoneInternational || phoneE164,
      phoneHref,
      phoneE164,
      whatsappNumber,
      city,
      area,
      street,
      addressLine,
      mapsQuery: mapsQuery || addressLine,
    },
    create: {
      id: 1,
      phoneDisplay,
      phoneInternational: phoneInternational || phoneE164,
      phoneHref,
      phoneE164,
      whatsappNumber,
      city,
      area,
      street,
      addressLine,
      mapsQuery: mapsQuery || addressLine,
    },
  });

  return NextResponse.json({ settings });
}
