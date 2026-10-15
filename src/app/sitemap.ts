import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://frekanslab.com.tr";
  const staticRoutes = ["", "/urunler", "/uygulamalar", "/teknik-servis", "/hakkimizda", "/dokumanlar", "/iletisim"];
  return [
    ...staticRoutes.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${base}/urunler/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
