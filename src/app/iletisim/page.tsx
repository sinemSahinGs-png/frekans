import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/data/site";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = { title: "İletişim" };

function ContactFormFallback() {
  return <div className="min-h-[420px] border border-[var(--frekans-border)] bg-white" />;
}

export default function ContactPage() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

  return (
    <div className="container-wide grid gap-14 pb-24 pt-28 lg:grid-cols-2 md:pt-32">
      <div>
        <p className="eyebrow mb-4">İLETİŞİM</p>
        <h1 className="section-title text-[var(--frekans-navy)]">
          Laboratuvarınız için doğru çözümü konuşalım.
        </h1>
        <ul className="mt-8 space-y-3 text-[var(--frekans-muted)]">
          <li><a href={site.emailHref}>{site.email}</a></li>
          <li><a href={site.phoneHref}>{site.phone}</a></li>
          {site.addressLines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <a href={maps} target="_blank" rel="noreferrer" className="mt-6 inline-block font-mono text-xs tracking-[0.16em] text-[var(--frekans-navy)]">
          HARİTADA AÇ →
        </a>
      </div>
      <Suspense fallback={<ContactFormFallback />}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
