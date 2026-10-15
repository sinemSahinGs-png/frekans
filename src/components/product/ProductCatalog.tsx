"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";
import { ProductVisual } from "@/components/product/ProductVisual";
import { cn } from "@/lib/utils";

export function ProductCatalog({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = cat === "all" || p.categorySlug === cat;
      const hay = `${p.title} ${p.category} ${p.short}`.toLowerCase();
      return matchCat && hay.includes(q.toLowerCase());
    });
  }, [products, q, cat]);

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Urun ara"
          className="min-h-12 w-full max-w-md rounded-[8px] border border-[var(--frekans-border)] bg-white px-4 text-base outline-none focus:border-[var(--frekans-green)]"
        />
        <div className="flex flex-wrap gap-2">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")} label="Tumu" />
          {categories.map((c) => (
            <FilterChip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)} label={c.title} />
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/urunler/${p.slug}`}
            className="group overflow-hidden border border-[var(--frekans-border)] bg-white transition-colors hover:border-[var(--frekans-green)]"
          >
            <ProductVisual
              slug={p.slug}
              image={p.image}
              imageAlt={p.imageAlt}
              showIndex={p.number}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="aspect-[5/4] rounded-none border-0"
            />
            <div className="p-6">
              <p className="font-mono text-xs text-[var(--frekans-muted)]">{p.number} / {p.category}</p>
              <h2 className="mt-3 font-display text-2xl text-[var(--frekans-navy)]">{p.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm text-[var(--frekans-muted)]">{p.short}</p>
              <p className="mt-5 font-mono text-xs tracking-[0.16em] text-[var(--frekans-navy)] transition-transform group-hover:translate-x-1">
                DETAYLAR →
              </p>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 ? <p className="mt-10 text-[var(--frekans-muted)]">Eslesen urun yok.</p> : null}
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-[8px] border px-4 text-xs tracking-[0.12em] uppercase",
        active ? "border-[var(--frekans-green)] text-[var(--frekans-green-dark)]" : "border-[var(--frekans-border)] text-[var(--frekans-muted)]",
      )}
    >
      {label}
    </button>
  );
}
