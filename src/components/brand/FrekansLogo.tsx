import Link from "next/link";
import { FrekansEmblem } from "@/components/brand/FrekansEmblem";
import { cn } from "@/lib/utils";

type Props = { href?: string; className?: string; compact?: boolean; inverted?: boolean };

export function FrekansLogo({ href = "/", className, compact, inverted }: Props) {
  const mark = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <FrekansEmblem size={compact ? 42 : 52} inverted={inverted} />
      <span className="flex flex-col justify-center leading-none">
        <span
          className={cn(
            "font-display font-medium uppercase",
            compact ? "text-[1.05rem] tracking-[0.28em] md:text-[1.15rem]" : "text-[1.2rem] tracking-[0.32em] md:text-[1.35rem]",
            inverted ? "text-white" : "text-[var(--frekans-navy)]",
          )}
        >
          FREKANS
        </span>
        {!compact ? (
          <span
            className={cn(
              "mt-1.5 hidden font-display text-[0.58rem] font-medium uppercase tracking-[0.18em] sm:block",
              inverted ? "text-white/80" : "text-[var(--frekans-navy)]",
            )}
          >
            TEKNİK CİHAZLAR LTD.ŞTİ.
          </span>
        ) : null}
      </span>
    </span>
  );
  if (!href) return mark;
  return (
    <Link href={href} className="focus-ring rounded-sm" aria-label="Frekans ana sayfa">
      {mark}
    </Link>
  );
}
