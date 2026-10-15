import { NextResponse } from "next/server";
import { createSessionToken, setAdminCookie, verifyPassword } from "@/lib/cms/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!verifyPassword(body?.password || "")) {
    return NextResponse.json({ ok: false, error: "Şifre hatalı." }, { status: 401 });
  }
  await setAdminCookie(createSessionToken());
  return NextResponse.json({ ok: true });
}
