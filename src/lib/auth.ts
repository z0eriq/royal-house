import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  createAdminToken,
  verifyAdminToken,
  type AdminSession,
} from "./auth-token.ts";
import { prisma } from "./db.ts";

export {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminToken,
  verifyAdminToken,
  type AdminSession,
} from "./auth-token.ts";

export async function verifyAdminPassword(email: string, password: string): Promise<AdminSession | null> {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.adminUser.findUnique({ where: { email: normalized } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { sub: user.id, email: user.email };
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
