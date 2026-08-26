import { Suspense } from "react";
import { HourcessIcon, HourcessWordmarkSVG } from "@/components/HourcessBrand";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <HourcessIcon size={48} />
          <HourcessWordmarkSVG width={160} />
          <p className="font-ui text-sm text-secondary">Admin sign in</p>
        </div>
        <div
          className="rounded-3xl border border-white/10 p-6"
          style={{ background: "rgba(18,18,22,0.9)" }}
        >
          <Suspense fallback={<p className="font-ui text-sm text-secondary">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
