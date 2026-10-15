import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getCms } from "@/lib/cms/store";

export const metadata: Metadata = { title: "Uygulamalar" };

export default async function ApplicationsPage() {
  const { applications, applicationsHeading } = await getCms();
  return (
    <div className="container-wide pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-4">UYGULAMA ALANLARI</p>
      <h1 className="section-title max-w-3xl text-[var(--frekans-navy)]">{applicationsHeading}</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {applications.map((a, i) => (
          <article key={a.slug} className="border-t border-[var(--frekans-border)] pt-6">
            <p className="font-mono text-xs text-[var(--frekans-green-dark)]">0{i + 1}</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--frekans-navy)]">{a.title}</h2>
            <p className="mt-3 text-[var(--frekans-muted)]">{a.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-12"><Button href="/iletisim">UZMANA SOR</Button></div>
    </div>
  );
}
