import type { MetadataRoute } from "next";
import { getCms } from "@/lib/cms/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://frekanslab.com.tr";
  const cms = await getCms();
  const staticRoutes = ["", "/urunler", "/uygulamalar", "/teknik-servis", "/hakkimizda", "/dokumanlar", "/iletisim"];
  return [
    ...staticRoutes.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...cms.products.map((p) => ({ url: `${base}/urunler/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
