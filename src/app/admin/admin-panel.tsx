"use client";

import { useMemo, useState } from "react";
import type { CmsApplication, CmsContent, CmsIntroItem, CmsProduct } from "@/lib/cms/types";

const tabs = [
  ["contact", "İletişim"],
  ["hero", "Hero"],
  ["intro", "Giriş"],
  ["products", "Ürünler"],
  ["applications", "Uygulamalar"],
  ["services", "Teknik servis"],
  ["about", "Hakkımızda"],
] as const;

type Tab = (typeof tabs)[number][0];

export function AdminPanel({ initial }: { initial: CmsContent }) {
  const [content, setContent] = useState(initial);
  const [tab, setTab] = useState<Tab>("contact");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function save() {
    setPending(true);
    setStatus("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setPending(false);
    if (!res.ok) {
      setStatus(data.error || "Kayıt başarısız.");
      return;
    }
    setStatus("Kaydedildi. Ana sitede hemen görünür; canlıda GitHub kaydı sonrası yenileyin.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="min-h-svh bg-[var(--frekans-offwhite)] text-[var(--frekans-text)]">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--frekans-border)] bg-white px-4 py-3 md:px-6">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.18em] text-[var(--frekans-muted)]">FREKANS ADMIN</p>
          <h1 className="font-display text-xl text-[var(--frekans-navy)]">Site içeriği</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/" className="min-h-11 rounded-[8px] border border-[var(--frekans-border)] px-4 py-2 font-mono text-xs tracking-[0.14em]">
            SİTEYİ GÖR
          </a>
          <button type="button" onClick={logout} className="min-h-11 rounded-[8px] border border-[var(--frekans-border)] px-4 py-2 font-mono text-xs tracking-[0.14em]">
            ÇIKIŞ
          </button>
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="min-h-11 rounded-[8px] bg-[var(--frekans-green)] px-5 py-2 font-mono text-xs tracking-[0.14em] text-white disabled:opacity-60"
          >
            {pending ? "KAYDEDİLİYOR…" : "KAYDET"}
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-6 p-4 md:flex-row md:p-6">
        <nav className="flex shrink-0 flex-wrap gap-2 md:w-48 md:flex-col">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-[8px] px-3 py-2 text-left text-sm ${tab === id ? "bg-[var(--frekans-navy)] text-white" : "bg-white border border-[var(--frekans-border)]"}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="min-w-0 flex-1 space-y-5 rounded-[12px] border border-[var(--frekans-border)] bg-white p-5 md:p-7">
          {status ? <p className="rounded-[8px] bg-[var(--frekans-lab)] px-3 py-2 text-sm">{status}</p> : null}
          {tab === "contact" ? <ContactFields content={content} setContent={setContent} /> : null}
          {tab === "hero" ? <HeroFields content={content} setContent={setContent} /> : null}
          {tab === "intro" ? <IntroFields content={content} setContent={setContent} /> : null}
          {tab === "products" ? <ProductFields content={content} setContent={setContent} /> : null}
          {tab === "applications" ? <ApplicationFields content={content} setContent={setContent} /> : null}
          {tab === "services" ? <ServiceFields content={content} setContent={setContent} /> : null}
          {tab === "about" ? <AboutFields content={content} setContent={setContent} /> : null}
        </div>
      </div>
    </div>
  );
}

function ContactFields({ content, setContent }: EditorProps) {
  const c = content.contact;
  function patch(partial: Partial<CmsContent["contact"]>) {
    setContent({ ...content, contact: { ...c, ...partial } });
  }
  return (
    <>
      <Field label="Unvan" value={c.legalName} onChange={(legalName) => patch({ legalName })} />
      <Field label="E-posta" value={c.email} onChange={(email) => patch({ email })} />
      <Field label="Telefon" value={c.phone} onChange={(phone) => patch({ phone })} />
      <Area label="Adres (her satır ayrı)" value={c.address} onChange={(address) => patch({ address })} />
      <Field label="Harita araması" value={c.mapsQuery} onChange={(mapsQuery) => patch({ mapsQuery })} />
      <Area label="Alt bilgi notu" value={content.footerNote} onChange={(footerNote) => setContent({ ...content, footerNote })} />
      <Area label="İletişim çağrı başlığı" value={content.contactCta.title} onChange={(title) => setContent({ ...content, contactCta: { title } })} />
    </>
  );
}

function HeroFields({ content, setContent }: EditorProps) {
  const h = content.hero;
  function patch(partial: Partial<CmsContent["hero"]>) {
    setContent({ ...content, hero: { ...h, ...partial } });
  }
  return (
    <>
      <Field label="Üst etiket" value={h.eyebrow} onChange={(eyebrow) => patch({ eyebrow })} />
      <Field label="Başlık 1. satır" value={h.titleLine1} onChange={(titleLine1) => patch({ titleLine1 })} />
      <Field label="Başlık 2. satır" value={h.titleLine2} onChange={(titleLine2) => patch({ titleLine2 })} />
      <Area label="Alt yazı" value={h.subtitle} onChange={(subtitle) => patch({ subtitle })} />
      <Field label="Birincil buton" value={h.primaryCta} onChange={(primaryCta) => patch({ primaryCta })} />
      <Field label="İkincil buton" value={h.secondaryCta} onChange={(secondaryCta) => patch({ secondaryCta })} />
      <Field label="Etiketler (virgülle)" value={h.tags} onChange={(tags) => patch({ tags })} />
      <MediaField label="Hero video / görsel yolu" value={h.videoUrl} accept="video/mp4,image/*" onChange={(videoUrl) => patch({ videoUrl })} />
    </>
  );
}

function IntroFields({ content, setContent }: EditorProps) {
  function update(index: number, partial: Partial<CmsIntroItem>) {
    const intro = content.intro.map((item, i) => (i === index ? { ...item, ...partial } : item));
    setContent({ ...content, intro });
  }
  return (
    <>
      {content.intro.map((item, i) => (
        <div key={i} className="grid gap-3 border-t border-[var(--frekans-border)] pt-4 md:grid-cols-3">
          <Field label="No" value={item.n} onChange={(n) => update(i, { n })} />
          <Field label="Başlık" value={item.t} onChange={(t) => update(i, { t })} />
          <Area label="Açıklama" value={item.d} onChange={(d) => update(i, { d })} />
        </div>
      ))}
    </>
  );
}

function ProductFields({ content, setContent }: EditorProps) {
  function update(index: number, partial: Partial<CmsProduct>) {
    const products = content.products.map((item, i) => (i === index ? { ...item, ...partial } : item));
    setContent({ ...content, products });
  }
  function add() {
    const n = String(content.products.length + 1).padStart(2, "0");
    setContent({
      ...content,
      products: [
        ...content.products,
        {
          slug: `urun-${Date.now()}`,
          number: n,
          title: "Yeni ürün",
          category: "Kategori",
          categorySlug: "kategori",
          short: "",
          overview: "",
          applications: "",
          featuredCategory: "",
          featuredDescription: "",
          image: "",
          imageAlt: "",
        },
      ],
    });
  }
  function remove(index: number) {
    setContent({ ...content, products: content.products.filter((_, i) => i !== index) });
  }
  return (
    <>
      {content.products.map((product, i) => (
        <article key={product.slug + i} className="space-y-3 border-t border-[var(--frekans-border)] pt-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-[var(--frekans-navy)]">{product.title || `Ürün ${i + 1}`}</h2>
            <button type="button" onClick={() => remove(i)} className="text-sm text-red-600">
              Sil
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Başlık" value={product.title} onChange={(title) => update(i, { title, slug: slugify(title) || product.slug })} />
            <Field label="Slug / URL" value={product.slug} onChange={(slug) => update(i, { slug })} />
            <Field label="Numara" value={product.number} onChange={(number) => update(i, { number })} />
            <Field label="Kategori" value={product.category} onChange={(category) => update(i, { category, categorySlug: slugify(category) })} />
            <Field label="Kategori slug" value={product.categorySlug} onChange={(categorySlug) => update(i, { categorySlug })} />
            <Field label="Ana sayfa kategori etiketi" value={product.featuredCategory} onChange={(featuredCategory) => update(i, { featuredCategory })} />
          </div>
          <Area label="Kısa açıklama" value={product.short} onChange={(short) => update(i, { short })} />
          <Area label="Ana sayfa açıklaması" value={product.featuredDescription} onChange={(featuredDescription) => update(i, { featuredDescription })} />
          <Area label="Genel bakış" value={product.overview} onChange={(overview) => update(i, { overview })} />
          <Area label="Uygulamalar (her satır ayrı)" value={product.applications} onChange={(applications) => update(i, { applications })} />
          <Field label="Görsel alt metni" value={product.imageAlt} onChange={(imageAlt) => update(i, { imageAlt })} />
          <MediaField label="Ürün fotoğrafı" value={product.image} accept="image/*" onChange={(image) => update(i, { image })} />
        </article>
      ))}
      <button type="button" onClick={add} className="rounded-[8px] border border-[var(--frekans-border)] px-4 py-2 text-sm">
        Ürün ekle
      </button>
    </>
  );
}

function ApplicationFields({ content, setContent }: EditorProps) {
  function update(index: number, partial: Partial<CmsApplication>) {
    const applications = content.applications.map((item, i) => (i === index ? { ...item, ...partial } : item));
    setContent({ ...content, applications });
  }
  return (
    <>
      <Field label="Bölüm başlığı" value={content.applicationsHeading} onChange={(applicationsHeading) => setContent({ ...content, applicationsHeading })} />
      {content.applications.map((app, i) => (
        <div key={i} className="grid gap-3 border-t border-[var(--frekans-border)] pt-4">
          <Field label="Başlık" value={app.title} onChange={(title) => update(i, { title, slug: slugify(title) || app.slug })} />
          <Area label="Metin" value={app.text} onChange={(text) => update(i, { text })} />
        </div>
      ))}
    </>
  );
}

function ServiceFields({ content, setContent }: EditorProps) {
  const s = content.services;
  function patch(partial: Partial<CmsContent["services"]>) {
    setContent({ ...content, services: { ...s, ...partial } });
  }
  return (
    <>
      <Field label="Başlık" value={s.title} onChange={(title) => patch({ title })} />
      <Area label="Açıklama" value={s.body} onChange={(body) => patch({ body })} />
      <Area label="Maddeler (her satır ayrı)" value={s.items} onChange={(items) => patch({ items })} />
    </>
  );
}

function AboutFields({ content, setContent }: EditorProps) {
  const a = content.about;
  function patch(partial: Partial<CmsContent["about"]>) {
    setContent({ ...content, about: { ...a, ...partial } });
  }
  return (
    <>
      <Field label="Üst etiket" value={a.eyebrow} onChange={(eyebrow) => patch({ eyebrow })} />
      <Field label="Başlık 1" value={a.heading1} onChange={(heading1) => patch({ heading1 })} />
      <Field label="Başlık 2" value={a.heading2} onChange={(heading2) => patch({ heading2 })} />
      <Area label="Ana metin" value={a.body} onChange={(body) => patch({ body })} />
      <Area label="Ek paragraf" value={a.extra} onChange={(extra) => patch({ extra })} />
      <MediaField label="Hakkımızda görseli" value={a.image} accept="image/*" onChange={(image) => patch({ image })} />
    </>
  );
}

type EditorProps = {
  content: CmsContent;
  setContent: (content: CmsContent) => void;
};

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[0.65rem] tracking-[0.14em] text-[var(--frekans-muted)]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full rounded-[8px] border border-[var(--frekans-border)] px-3 text-sm outline-none focus:border-[var(--frekans-green)]"
      />
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[0.65rem] tracking-[0.14em] text-[var(--frekans-muted)]">{label}</span>
      <textarea
        value={value}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[8px] border border-[var(--frekans-border)] px-3 py-2 text-sm outline-none focus:border-[var(--frekans-green)]"
      />
    </label>
  );
}

function MediaField({
  label,
  value,
  onChange,
  accept,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const preview = useMemo(() => /\.(png|jpe?g|webp|gif|svg)$/i.test(value), [value]);

  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = (await res.json().catch(() => ({}))) as { path?: string; error?: string };
    setBusy(false);
    if (!res.ok || !data.path) {
      setError(data.error || "Yükleme başarısız.");
      return;
    }
    onChange(data.path);
  }

  return (
    <div>
      <Field label={label} value={value} onChange={onChange} />
      <input
        type="file"
        accept={accept}
        className="mt-2 text-sm"
        onChange={(e) => void onFile(e.target.files?.[0])}
      />
      {busy ? <p className="mt-1 text-sm text-[var(--frekans-muted)]">Yükleniyor…</p> : null}
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
      {preview && value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-3 max-h-40 rounded-[8px] border border-[var(--frekans-border)] object-cover" />
      ) : null}
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
