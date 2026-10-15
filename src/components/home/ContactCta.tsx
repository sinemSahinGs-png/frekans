"use client";

import { Button } from "@/components/ui/Button";
import { useCms } from "@/lib/cms/cms-context";
import { emailHref, phoneHref } from "@/lib/cms/map";

export function ContactCta() {
  const { contact, contactCta } = useCms();
  return (
    <section className="border-t border-[var(--frekans-border)] bg-[var(--frekans-lab)] py-14 md:py-20">
      <div className="container-wide">
        <p className="eyebrow mb-4">İLETİŞİM</p>
        <h2 className="section-title max-w-4xl whitespace-pre-line text-[var(--frekans-navy)]">{contactCta.title}</h2>
        <div className="mt-8 flex flex-wrap gap-8 text-sm text-[var(--frekans-muted)]">
          <a href={emailHref(contact.email)} className="hover:text-[var(--frekans-green-dark)]">
            {contact.email}
          </a>
          <a href={phoneHref(contact.phone)} className="hover:text-[var(--frekans-green-dark)]">
            {contact.phone}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/iletisim">TEKLİF AL</Button>
          <Button href={emailHref(contact.email)} variant="secondary">
            UZMANA SOR
          </Button>
        </div>
      </div>
    </section>
  );
}
