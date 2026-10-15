import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/product/ProductVisual";
import { cmsProductToProduct } from "@/lib/cms/map";
import { getCms } from "@/lib/cms/store";

export async function generateStaticParams() {
  const cms = await getCms();
  return cms.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getCms();
  const product = cms.products.find((p) => p.slug === slug);
  if (!product) return { title: "Urun" };
  return { title: product.title, description: product.short };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cms = await getCms();
  const found = cms.products.find((p) => p.slug === slug);
  if (!found) notFound();
  const product = cmsProductToProduct(found);

  return (
    <div className="container-wide grid gap-12 pb-24 pt-28 lg:grid-cols-[1.05fr_0.95fr] md:pt-32">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <ProductVisual
          slug={product.slug}
          image={product.image}
          imageAlt={product.imageAlt}
          showIndex={product.number}
          sizes="(max-width: 768px) 100vw, 55vw"
          className="aspect-[4/3] min-h-[240px] md:aspect-[5/4] md:min-h-[420px]"
        />
      </div>
      <div>
        <p className="eyebrow">{product.category}</p>
        <h1 className="product-title mt-3 text-[var(--frekans-navy)]">{product.title}</h1>
        <p className="mt-5 text-lg text-[var(--frekans-muted)]">{product.short}</p>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-[var(--frekans-navy)]">Genel bakis</h2>
          <p className="mt-3 text-[var(--frekans-muted)]">{product.overview}</p>
        </section>
        {product.applications.length ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-[var(--frekans-navy)]">Uygulamalar</h2>
            <ul className="mt-3 list-disc pl-5 text-[var(--frekans-muted)]">
              {product.applications.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {product.specs.length ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-[var(--frekans-navy)]">Teknik bilgi</h2>
            <dl className="mt-4 divide-y divide-[var(--frekans-border)]">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 py-3 font-mono text-sm">
                  <dt className="text-[var(--frekans-muted)]">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        <section className="mt-10">
          <h2 className="font-display text-2xl text-[var(--frekans-navy)]">Destek</h2>
          <p className="mt-3 text-[var(--frekans-muted)]">Teknik bilgi ve teklif icin iletisim formunu kullanabilirsiniz.</p>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={`/iletisim?urun=${product.slug}`}>TEKLIF AL</Button>
          <Button href={`/iletisim?urun=${product.slug}`} variant="secondary">TEKNIK BILGI ISTE</Button>
        </div>
      </div>
    </div>
  );
}
