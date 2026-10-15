import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCatalog } from "@/components/product/ProductCatalog";

export const metadata: Metadata = {
  title: "Urunler",
  description: "Frekans laboratuvar cozumleri: saf su, chiller ve XRF sarf malzemeleri.",
};

export default function ProductsPage() {
  return (
    <div className="container-wide pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-4">KATALOG</p>
      <h1 className="section-title text-[var(--frekans-navy)]">Urunler</h1>
      <p className="mt-4 max-w-2xl text-[var(--frekans-muted)]">
        Mevcut katalogdaki cozumler. Teknik olcum degerleri talep uzerine paylasilir.
      </p>
      <ProductCatalog products={products} categories={categories} />
      <p className="mt-10 text-sm">
        <Link href="/iletisim" className="text-[var(--frekans-navy)] hover:text-[var(--frekans-green-dark)]">
          Teklif veya teknik bilgi icin iletisim →
        </Link>
      </p>
    </div>
  );
}
