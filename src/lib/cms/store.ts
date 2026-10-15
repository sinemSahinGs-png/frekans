import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { defaultCms } from "@/lib/cms/defaults";
import type { CmsContent } from "@/lib/cms/types";

const CMS_REL = "data/cms.json";
const CMS_PATH = path.join(process.cwd(), CMS_REL);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeCms(base: CmsContent, patch: unknown): CmsContent {
  if (!isRecord(patch)) return base;
  const next = structuredClone(base);
  const contact = isRecord(patch.contact) ? patch.contact : {};
  next.contact = { ...base.contact, ...pickStrings(contact, Object.keys(base.contact)) };
  const hero = isRecord(patch.hero) ? patch.hero : {};
  next.hero = { ...base.hero, ...pickStrings(hero, Object.keys(base.hero)) };
  if (Array.isArray(patch.intro)) next.intro = patch.intro.filter(isIntro);
  if (typeof patch.applicationsHeading === "string") next.applicationsHeading = patch.applicationsHeading;
  if (Array.isArray(patch.products)) next.products = patch.products.filter(isProduct);
  if (Array.isArray(patch.applications)) next.applications = patch.applications.filter(isApplication);
  const services = isRecord(patch.services) ? patch.services : {};
  next.services = { ...base.services, ...pickStrings(services, Object.keys(base.services)) };
  const about = isRecord(patch.about) ? patch.about : {};
  next.about = { ...base.about, ...pickStrings(about, Object.keys(base.about)) };
  const contactCta = isRecord(patch.contactCta) ? patch.contactCta : {};
  next.contactCta = { ...base.contactCta, ...pickStrings(contactCta, Object.keys(base.contactCta)) };
  if (typeof patch.footerNote === "string") next.footerNote = patch.footerNote;
  return next;
}

function pickStrings(source: Record<string, unknown>, keys: string[]) {
  const out: Record<string, string> = {};
  for (const key of keys) {
    if (typeof source[key] === "string") out[key] = source[key];
  }
  return out;
}

function isIntro(value: unknown): value is CmsContent["intro"][number] {
  return isRecord(value) && typeof value.n === "string" && typeof value.t === "string" && typeof value.d === "string";
}

function isProduct(value: unknown): value is CmsContent["products"][number] {
  if (!isRecord(value)) return false;
  const keys = [
    "slug",
    "number",
    "title",
    "category",
    "categorySlug",
    "short",
    "overview",
    "applications",
    "featuredCategory",
    "featuredDescription",
    "image",
    "imageAlt",
  ] as const;
  return keys.every((key) => typeof value[key] === "string");
}

function isApplication(value: unknown): value is CmsContent["applications"][number] {
  return isRecord(value) && typeof value.slug === "string" && typeof value.title === "string" && typeof value.text === "string";
}

function githubConfig() {
  return {
    token: process.env.CMS_GITHUB_TOKEN || "",
    repo: process.env.CMS_GITHUB_REPO || "sinemSahinGs-png/frekans",
    branch: process.env.CMS_GITHUB_BRANCH || "master",
  };
}

async function githubGet(filePath: string) {
  const { token, repo, branch } = githubConfig();
  if (!token) return null;
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}?ref=${encodeURIComponent(branch)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "frekans-cms",
    },
    cache: "no-store",
  });
  if (res.status === 404) return { sha: undefined as string | undefined, content: undefined as string | undefined };
  if (!res.ok) throw new Error(`GitHub dosyası okunamadı (${res.status}).`);
  const data = (await res.json()) as { sha?: string; content?: string };
  return { sha: data.sha, content: data.content };
}

async function githubPut(filePath: string, contentBase64: string, message: string, sha?: string) {
  const { token, repo, branch } = githubConfig();
  if (!token) return;
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "frekans-cms",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch,
      sha,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub kaydı başarısız (${res.status}): ${text.slice(0, 280)}`);
  }
}

async function readCmsFile(): Promise<CmsContent> {
  const { token } = githubConfig();
  if (token) {
    try {
      const existing = await githubGet(CMS_REL);
      if (existing?.content) {
        const json = Buffer.from(existing.content.replace(/\s/g, ""), "base64").toString("utf8");
        return mergeCms(defaultCms, JSON.parse(json) as unknown);
      }
    } catch {
      // fall back to the deployed file
    }
  }
  try {
    const raw = await fs.readFile(CMS_PATH, "utf8");
    return mergeCms(defaultCms, JSON.parse(raw) as unknown);
  } catch {
    return structuredClone(defaultCms);
  }
}

export async function getCms(): Promise<CmsContent> {
  "use cache";
  cacheTag("cms");
  return readCmsFile();
}

export async function getCmsFresh(): Promise<CmsContent> {
  return readCmsFile();
}

export async function saveCms(input: unknown) {
  const content = mergeCms(defaultCms, input);
  if (!content.products.length) throw new Error("En az bir ürün gerekli.");
  const json = `${JSON.stringify(content, null, 2)}\n`;

  try {
    await fs.mkdir(path.dirname(CMS_PATH), { recursive: true });
    await fs.writeFile(CMS_PATH, json, "utf8");
  } catch {
    if (!process.env.VERCEL) throw new Error("İçerik dosyası yazılamadı.");
  }

  const { token } = githubConfig();
  if (token) {
    const existing = await githubGet(CMS_REL);
    await githubPut(CMS_REL, Buffer.from(json).toString("base64"), "cms: site içeriğini güncelle", existing?.sha);
  } else if (process.env.VERCEL) {
    throw new Error("Canlı sitede kaydetmek için CMS_GITHUB_TOKEN ortam değişkeni gerekli.");
  }

  revalidateTag("cms", { expire: 0 });
  revalidatePath("/", "layout");
  return content;
}

export function sanitizeUploadName(name: string) {
  const base = name
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return base || "dosya";
}

export async function saveUpload(file: File) {
  const allowed = /^(image\/(png|jpeg|jpg|webp|gif|svg\+xml)|video\/mp4)$/i;
  if (!allowed.test(file.type)) throw new Error("Sadece görsel (PNG, JPG, WEBP) veya MP4 video yüklenebilir.");
  if (file.size > 4 * 1024 * 1024) throw new Error("Dosya 4 MB sınırını aşıyor. Daha büyük dosyayı public klasörüne koyup yolu yazın.");

  const safe = sanitizeUploadName(file.name);
  const filename = `${Date.now()}-${safe}`;
  const relative = `public/uploads/${filename}`;
  const publicPath = `/uploads/${filename}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  try {
    const diskPath = path.join(process.cwd(), relative);
    await fs.mkdir(path.dirname(diskPath), { recursive: true });
    await fs.writeFile(diskPath, bytes);
  } catch {
    if (!process.env.VERCEL) throw new Error("Dosya diske yazılamadı.");
  }

  const { token } = githubConfig();
  if (token) {
    const existing = await githubGet(relative);
    await githubPut(relative, bytes.toString("base64"), `cms: ${filename} yükle`, existing?.sha);
  } else if (process.env.VERCEL) {
    throw new Error("Canlıda fotoğraf kaydı için CMS_GITHUB_TOKEN gerekli.");
  }

  revalidatePath("/", "layout");
  return publicPath;
}
