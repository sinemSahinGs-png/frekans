"use client";

import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const password = String(new FormData(e.currentTarget).get("password") || "");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (!res.ok) {
      setError("Şifre hatalı.");
      return;
    }
    window.location.reload();
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-[12px] border border-white/10 bg-white/5 p-8">
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-white/50">FREKANS / ADMIN</p>
        <h1 className="mt-3 font-display text-3xl text-white">İçerik paneli</h1>
        <label className="mt-8 block">
          <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.16em] text-white/55">ŞİFRE</span>
          <input
            name="password"
            type="password"
            autoFocus
            className="min-h-12 w-full rounded-[8px] border border-white/15 bg-white/8 px-3 text-white outline-none focus:border-[var(--frekans-green)]"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="mt-6 min-h-12 w-full rounded-[8px] bg-[var(--frekans-green)] font-mono text-xs tracking-[0.16em] text-white disabled:opacity-60"
        >
          {pending ? "GİRİLİYOR…" : "GİRİŞ"}
        </button>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      </form>
    </div>
  );
}
