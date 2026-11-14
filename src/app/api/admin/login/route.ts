import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, createAdminToken, verifyAdminPassword } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json({ error: "أدخل البريد وكلمة المرور" }, { status: 400 });
  }

  const session = await verifyAdminPassword(email, password);
  if (!session) {
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
  }

  const token = await createAdminToken(session);
  const response = NextResponse.json({ ok: true, email: session.email });
  response.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());
  return response;
}
