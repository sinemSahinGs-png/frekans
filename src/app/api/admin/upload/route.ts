import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/cms/auth";
import { saveUpload } from "@/lib/cms/store";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Dosya seçilmedi." }, { status: 400 });
    }
    const path = await saveUpload(file);
    return NextResponse.json({ ok: true, path });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Yükleme başarısız.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
