import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/cms/auth";
import { getCmsFresh, saveCms } from "@/lib/cms/store";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  return NextResponse.json(await getCmsFresh());
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  try {
    const body = (await request.json()) as unknown;
    const content = await saveCms(body);
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kayıt başarısız.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
