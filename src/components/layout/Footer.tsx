import Link from "next/link";
import { FrekansLogo } from "@/components/brand/FrekansLogo";
import { site } from "@/data/site";
import { products } from "@/data/products";

export function Footer() {
  return (
    <footer className="border-t border-[var(--frekans-border)] bg-[var(--frekans-offwhite)]">
      <div className="container-wide py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <FrekansLogo />
            <p className="mt-5 max-w-xs text-sm text-[var(--frekans-muted)]">
              Laboratuvar cihazları, teknik çözümler ve uygulama desteği.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">ÜRÜNLER</p>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/urunler/${p.slug}`} className="text-sm text-[var(--frekans-navy)] hover:text-[var(--frekans-green-dark)]">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">KURUMSAL</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hakkimizda" className="hover:text-[var(--frekans-green-dark)]">Hakkımızda</Link></li>
              <li><Link href="/uygulamalar" className="hover:text-[var(--frekans-green-dark)]">Uygulamalar</Link></li>
              <li><Link href="/teknik-servis" className="hover:text-[var(--frekans-green-dark)]">Teknik Servis</Link></li>
              <li><Link href="/dokumanlar" className="hover:text-[var(--frekans-green-dark)]">Dokümanlar</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">İLETİŞİM</p>
            <ul className="space-y-2 text-sm text-[var(--frekans-muted)]">
              <li><a href={site.emailHref}>{site.email}</a></li>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              {site.addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-[var(--frekans-border)] pt-6 font-mono text-[0.65rem] tracking-[0.14em] text-[var(--frekans-muted)]">
          {site.legalName}
        </p>
      </div>
    </footer>
  );
}
