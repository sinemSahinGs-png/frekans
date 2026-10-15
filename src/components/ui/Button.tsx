import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "technical";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({ href, children, variant = "primary", className, type = "button", onClick }: Props) {
  const styles = {
    primary: "bg-[var(--frekans-navy)] text-white hover:bg-[var(--frekans-green-dark)]",
    secondary: "bg-white text-[var(--frekans-navy)] border border-[var(--frekans-navy)]/25 hover:border-[var(--frekans-green)] hover:bg-[var(--frekans-green)]/5",
    technical: "bg-transparent px-0 text-[var(--frekans-navy)] underline-offset-8 hover:underline",
  }[variant];
  const cls = cn(
    "group inline-flex min-h-12 items-center gap-2 rounded-[8px] px-6 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 focus-ring",
    styles,
    className,
  );
  const content = (
    <>
      {children}
      {variant !== "technical" ? <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">→</span> : null}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {content}
    </button>
  );
}
