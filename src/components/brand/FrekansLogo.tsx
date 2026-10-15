import Link from "next/link";
import { FrekansEmblem } from "@/components/brand/FrekansEmblem";
import { cn } from "@/lib/utils";

type Props = { href?: string; className?: string; compact?: boolean; inverted?: boolean };

export function FrekansLogo({ href = "/", className, compact, inverted }: Props) {
  const mark = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <FrekansEmblem size={compact ? 34 : 42} inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold tracking-[0.2em]",
            compact ? "text-[0.95rem] md:text-[1.05rem]" : "text-[1.05rem] md:text-[1.2rem]",
            inverted ? "text-white" : "text-[var(--frekans-navy)]",
          )}
        >
          FREKANS
        </span>
        {!compact ? (
          <span
            className={cn(
              "mt-1 hidden font-mono text-[0.52rem] tracking-[0.14em] sm:block",
              inverted ? "text-white/70" : "text-[var(--frekans-muted)]",
            )}
          >
            TEKNİK CİHAZLAR LTD. ŞTİ.
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
