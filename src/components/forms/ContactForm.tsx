"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/services/contact/submit-contact";

export function ContactForm() {
  const searchParams = useSearchParams();
  const defaultProduct = searchParams.get("urun") ?? "";

  const [status, setStatus] = useState<"idle" | "not-configured">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = await submitContact({
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      product: String(form.get("product") || ""),
      message: String(form.get("message") || ""),
      kvkk: form.get("kvkk") === "on",
    });
    if (!result.ok) setStatus("not-configured");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 border border-[var(--frekans-border)] bg-white p-6 md:p-8">
      <Field name="name" label="Ad Soyad" required />
      <Field name="company" label="Firma" />
      <Field name="email" label="E-posta" type="email" required />
      <Field name="phone" label="Telefon" type="tel" />
      <label className="block">
        <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.16em] uppercase text-[var(--frekans-muted)]">Ilgilendiginiz Urun</span>
        <select name="product" defaultValue={defaultProduct ?? ""} className="min-h-12 w-full rounded-[8px] border border-[var(--frekans-border)] px-3 text-base">
          <option value="">Seciniz</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>{p.title}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.16em] uppercase text-[var(--frekans-muted)]">Mesaj</span>
        <textarea name="message" required rows={5} className="w-full rounded-[8px] border border-[var(--frekans-border)] px-3 py-3 text-base" />
      </label>
      <label className="flex items-start gap-2 text-sm text-[var(--frekans-muted)]">
        <input type="checkbox" name="kvkk" className="mt-1" />
        Iletisim talebim icin bilgilerimin islenmesini kabul ediyorum.
      </label>
      <Button type="submit">GONDER</Button>
      {status === "not-configured" ? (
        <p className="text-sm text-[var(--frekans-muted)]">
          Form altyapisi henuz baglanmadi. Lutfen dogrudan e-posta veya telefon ile ulasin.
        </p>
      ) : null}
    </form>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.16em] uppercase text-[var(--frekans-muted)]">{label}</span>
      <input name={name} type={type} required={required} className="min-h-12 w-full rounded-[8px] border border-[var(--frekans-border)] px-3 text-base outline-none focus:border-[var(--frekans-green)]" />
    </label>
  );
}
