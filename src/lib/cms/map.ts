import type { Category } from "@/data/categories";
import type { Product } from "@/data/products";
import type { CmsContent, CmsProduct } from "@/lib/cms/types";

export function splitLines(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function phoneHref(phone: string) {
  return `tel:+${phone.replace(/\D/g, "")}`;
}

export function emailHref(email: string) {
  return `mailto:${email}`;
}

export function addressLines(address: string) {
  return address
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function cmsProductToProduct(product: CmsProduct): Product {
  return {
    slug: product.slug,
    number: product.number,
    title: product.title,
    category: product.category,
    categorySlug: product.categorySlug,
    short: product.short,
    overview: product.overview,
    applications: splitLines(product.applications),
    specs: [],
    accent: "green",
    image: product.image,
    imageAlt: product.imageAlt,
  };
}

export function cmsProducts(content: CmsContent): Product[] {
  return content.products.map(cmsProductToProduct);
}

export function cmsCategories(content: CmsContent): Category[] {
  const seen = new Map<string, string>();
  for (const product of content.products) {
    if (!seen.has(product.categorySlug)) seen.set(product.categorySlug, product.category);
  }
  return [...seen.entries()].map(([slug, title]) => ({ slug, title }));
}
