import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { getCms } from "@/lib/cms/store";
import { addressLines, emailHref, phoneHref } from "@/lib/cms/map";

export const metadata: Metadata = { title: "İletişim" };

function ContactFormFallback() {
  return <div className="min-h-[420px] border border-[var(--frekans-border)] bg-white" />;
}

export default async function ContactPage() {
  const cms = await getCms();
  const { contact, contactCta } = cms;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;

  return (
    <div className="container-wide grid gap-14 pb-24 pt-28 lg:grid-cols-2 md:pt-32">
      <div>
        <p className="eyebrow mb-4">İLETİŞİM</p>
        <h1 className="section-title whitespace-pre-line text-[var(--frekans-navy)]">
          {contactCta.title}
        </h1>
        <ul className="mt-8 space-y-3 text-[var(--frekans-muted)]">
          <li><a href={emailHref(contact.email)}>{contact.email}</a></li>
          <li><a href={phoneHref(contact.phone)}>{contact.phone}</a></li>
          {addressLines(contact.address).map((l) => (
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
