import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = { href?: string; className?: string; compact?: boolean };

export function FrekansLogo({ href = "/", className, compact }: Props) {
  const mark = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg width={compact ? 42 : 52} height={compact ? 28 : 34} viewBox="0 0 78 50" fill="none" aria-hidden>
        <path d="M4 32 C16 12, 28 12, 40 32 C52 52, 64 52, 74 32" stroke="#00A84F" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M4 20 C16 40, 28 40, 40 20 C52 0, 64 0, 74 20" stroke="#0B2857" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-[0.22em] text-[var(--frekans-navy)] md:text-[1.2rem]">FREKANS</span>
        {!compact ? (
          <span className="mt-1 hidden font-mono text-[0.52rem] tracking-[0.16em] text-[var(--frekans-muted)] sm:block">
            TEKNIK CIHAZLAR LTD. STI.
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
