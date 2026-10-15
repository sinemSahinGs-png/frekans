"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { getProductAsset } from "@/config/site-assets";
import { ProductWaveFallback } from "@/components/product/ProductWaveFallback";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  image?: string;
  imageAlt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  showIndex?: string;
};

export function ProductVisual({ slug, image, imageAlt, sizes, className, priority, showIndex }: Props) {
  const asset = getProductAsset(slug);
  const src = image || asset?.src;
  const alt = imageAlt || asset?.alt || "";
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "product-visual relative overflow-hidden rounded-[10px] border border-[var(--frekans-navy)]/18 bg-[var(--frekans-lab)]",
        className,
      )}
      style={
        asset
          ? ({
              "--pos-d": asset.desktopPosition,
              "--pos-m": asset.mobilePosition,
            } as CSSProperties)
          : undefined
      }
    >
      <ProductWaveFallback className="absolute inset-0 h-full w-full opacity-70" />
      {src && showPhoto ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="product-photo"
          onError={() => setFailed(true)}
        />
      ) : null}
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--frekans-navy)]/20" aria-hidden />
      <span className="product-signal pointer-events-none absolute inset-x-0 top-0 z-[2] h-px origin-left bg-[var(--frekans-green)]" aria-hidden />
      <span className="product-scan pointer-events-none absolute inset-x-0 top-0 z-[2] h-[2px] bg-[var(--frekans-green)] opacity-0" aria-hidden />
      {showIndex ? (
        <span className="product-index absolute left-5 top-5 z-[3] font-mono text-xs tracking-[0.2em] text-white/90 drop-shadow-[0_1px_8px_rgba(6,26,57,0.55)]">
          {showIndex}
        </span>
      ) : null}
    </div>
  );
}
