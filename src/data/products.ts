export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  number: string;
  title: string;
  category: string;
  categorySlug: string;
  short: string;
  overview: string;
  applications: string[];
  specs: ProductSpec[];
  accent: "green" | "navy";
};

export const products: Product[] = [
  {
    slug: "new-human-power",
    number: "01",
    title: "New Human Power",
    category: "Saf Su Sistemleri",
    categorySlug: "saf-su-sistemleri",
    short: "Reverse Ozmoz ve Saf Su bir arada!",
    overview:
      "Reverse ozmoz ve saf su üretimini aynı sistemde birleştiren laboratuvar su çözümü. Teknik ayrıntılar ve kapasite değerleri talep üzerine paylaşılır.",
    applications: [
      "Analitik laboratuvarlar",
      "Üniversite ve araştırma laboratuvarları",
      "Kalite kontrol",
    ],
    specs: [],
    accent: "green",
  },
  {
    slug: "labtech-chiller",
    number: "02",
    title: "Labtech Chiller",
    category: "Chiller Sistemleri",
    categorySlug: "chiller-sistemleri",
    short:
      "Gelişmiş enerji tasarrufu, hassas sıcaklık kontrolü, sessiz ve güçlü performans, çevre dostu yapısı ve dayanıklılığıyla, fiyatına kıyasla piyasadaki en yüksek toplam kaliteyi sunar.",
    overview:
      "Laboratuvar cihazları için soğutma ihtiyacına yönelik chiller çözümü. Enerji tasarrufu, hassas sıcaklık kontrolü ve sessiz çalışma vurgusu mevcut şirket anlatımına dayanır. Sayısal performans değerleri bu sitede yer almaz; teknik bilgi talebiyle iletilir.",
    applications: [
      "Analitik cihaz soğutması",
      "Endüstriyel laboratuvarlar",
      "Araştırma altyapısı",
    ],
    specs: [],
    accent: "navy",
  },
  {
    slug: "xray-flux",
    number: "03",
    title: "XRay Flux",
    category: "XRF Sarf Malzemeleri",
    categorySlug: "xrf-sarf",
    short: "Lityum Tetraborat ile XRF cihazlarınız için eritiş kimyasalları",
    overview:
      "XRF sistemleri için lityum tetraborat bazlı eritiş kimyasalları. Kullanım ve uyumluluk bilgisi uygulama desteği kapsamında paylaşılır.",
    applications: ["XRF uygulamaları", "Kalite kontrol", "Analitik laboratuvarlar"],
    specs: [],
    accent: "green",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}
