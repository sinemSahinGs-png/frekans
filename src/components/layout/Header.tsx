"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FrekansLogo } from "@/components/brand/FrekansLogo";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const inverted = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-[var(--frekans-border)] bg-white/85 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="container-wide flex h-[72px] items-center justify-between md:h-20">
          <FrekansLogo compact={scrolled} inverted={inverted} />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[0.68rem] tracking-[0.18em] transition-colors",
                  inverted
                    ? "text-white/80 hover:text-white"
                    : "text-[var(--frekans-navy)]/80 hover:text-[var(--frekans-green-dark)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button
              href="/iletisim"
              className={cn(
                "!min-h-11 !px-5",
                inverted && "bg-white text-[var(--frekans-navy)] hover:bg-[var(--frekans-green)] hover:text-white",
              )}
            >
              TEKLİF AL
            </Button>
          </div>
          <button
            type="button"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-[8px] border lg:hidden",
              inverted ? "border-white/30" : "border-[var(--frekans-border)]",
            )}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-1.5">
              <span className={cn("block h-px w-5 transition", inverted ? "bg-white" : "bg-[var(--frekans-navy)]", open && "translate-y-[7px] rotate-45")} />
              <span className={cn("block h-px w-5 transition", inverted ? "bg-white" : "bg-[var(--frekans-navy)]", open && "opacity-0")} />
              <span className={cn("block h-px w-5 transition", inverted ? "bg-white" : "bg-[var(--frekans-navy)]", open && "-translate-y-[7px] -rotate-45")} />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-white pt-24 lg:hidden">
          <nav className="container-wide flex flex-col gap-5" aria-label="Mobil menü">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-[var(--frekans-navy)]"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/iletisim" className="mt-4 w-fit" onClick={() => setOpen(false)}>
              TEKLİF AL
            </Button>
          </nav>
        </div>
      ) : null}
    </>
  );
}
