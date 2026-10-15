import type { Metadata } from "next";
import { Suspense } from "react";
import { isAdmin } from "@/lib/cms/auth";
import { getCmsFresh } from "@/lib/cms/store";
import { AdminPanel } from "@/app/admin/admin-panel";
import { LoginForm } from "@/app/admin/login-form";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-svh bg-[var(--frekans-navy-deep)]" />}>
      <AdminGate />
    </Suspense>
  );
}

async function AdminGate() {
  if (!(await isAdmin())) return <LoginForm />;
  const content = await getCmsFresh();
  return <AdminPanel initial={content} />;
}
