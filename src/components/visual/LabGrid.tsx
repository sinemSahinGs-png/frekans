import { cn } from "@/lib/utils";

export function LabGrid({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 lab-grid", className)} aria-hidden>
      <span className="absolute left-6 top-6 font-mono text-[10px] tracking-widest text-[var(--frekans-navy)]/25">00.00</span>
      <span className="absolute bottom-6 right-6 font-mono text-[10px] tracking-widest text-[var(--frekans-navy)]/25">SIG / HZ</span>
    </div>
  );
}
