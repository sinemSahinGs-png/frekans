import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { FrekansWave } from "@/components/visual/FrekansWave";

export function ContactCta() {
  return (
    <section className="border-t border-[var(--frekans-border)] bg-[var(--frekans-lab)] py-20 md:py-28">
      <div className="container-wide">
        <p className="eyebrow mb-4">İLETİŞİM</p>
        <h2 className="section-title max-w-4xl text-[var(--frekans-navy)]">
          Laboratuvarınız için
          <br />
          doğru çözümü konuşalım.
        </h2>
        <FrekansWave variant="footer" amplitude={0.3} className="my-10 max-w-2xl" />
        <div className="flex flex-wrap gap-8 text-sm text-[var(--frekans-muted)]">
          <a href={site.emailHref} className="hover:text-[var(--frekans-green-dark)]">{site.email}</a>
          <a href={site.phoneHref} className="hover:text-[var(--frekans-green-dark)]">{site.phone}</a>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/iletisim">TEKLİF AL</Button>
          <Button href={`mailto:${site.email}`} variant="secondary">UZMANA SOR</Button>
        </div>
      </div>
    </section>
  );
}
