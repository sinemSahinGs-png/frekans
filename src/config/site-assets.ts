export type ProductAsset = {
  src: string;
  alt: string;
  desktopPosition: string;
  mobilePosition: string;
};

export const siteAssets = {
  products: {
    newHumanPower: {
      src: "/Premium laboratuvar su arıtma cihazı.png",
      alt: "New Human Power laboratuvar su arıtma sistemi",
      desktopPosition: "68% 50%",
      mobilePosition: "74% 48%",
    },
    labtechChiller: {
      src: "/Premium Laboratuvar Soğutucusu.png",
      alt: "Labtech Chiller laboratuvar sıcaklık kontrol cihazı",
      desktopPosition: "62% 52%",
      mobilePosition: "70% 50%",
    },
    xrayFlux: {
      src: "/XRay Flux Laboratuvar Şişeleri.png",
      alt: "XRay Flux XRF numune hazırlama ergitme kimyasalları",
      desktopPosition: "32% 50%",
      mobilePosition: "28% 48%",
    },
  } satisfies Record<string, ProductAsset>,
} as const;

const productAssetsBySlug: Record<string, ProductAsset> = {
  "new-human-power": siteAssets.products.newHumanPower,
  "labtech-chiller": siteAssets.products.labtechChiller,
  "xray-flux": siteAssets.products.xrayFlux,
};

export function getProductAsset(slug: string): ProductAsset | undefined {
  return productAssetsBySlug[slug];
}
