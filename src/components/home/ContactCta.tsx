import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <section className="border-t border-[var(--frekans-border)] bg-[var(--frekans-lab)] py-14 md:py-20">
      <div className="container-wide">
        <p className="eyebrow mb-4">İLETİŞİM</p>
        <h2 className="section-title max-w-4xl text-[var(--frekans-navy)]">
          Laboratuvarınız için
          <br />
          doğru çözümü konuşalım.
        </h2>
        <div className="mt-8 flex flex-wrap gap-8 text-sm text-[var(--frekans-muted)]">
          <a href={site.emailHref} className="hover:text-[var(--frekans-green-dark)]">
            {site.email}
          </a>
          <a href={site.phoneHref} className="hover:text-[var(--frekans-green-dark)]">
            {site.phone}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/iletisim">TEKLİF AL</Button>
          <Button href={`mailto:${site.email}`} variant="secondary">
            UZMANA SOR
          </Button>
        </div>
      </div>
    </section>
  );
}
