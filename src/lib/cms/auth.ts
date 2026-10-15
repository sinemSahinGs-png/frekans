import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "frekans_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "frekans-admin-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function verifyPassword(input: string) {
  const expected = adminPassword();
  if (!expected || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string | undefined) {
  if (!token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}

export async function isAdmin() {
  const jar = await cookies();
  return readSessionToken(jar.get(COOKIE)?.value);
}

export async function setAdminCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
