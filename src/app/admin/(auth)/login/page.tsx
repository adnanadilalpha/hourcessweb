import { Suspense } from "react";
import { HourcessIcon, HourcessWordmarkSVG } from "@/components/HourcessBrand";
import LoginForm from "@/components/admin/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import "../../admin.css";

export default function AdminLoginPage() {
  return (
    <div className="admin-root flex min-h-dvh items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-3xl bg-zinc-900 text-admin-accent shadow-xl">
            <HourcessIcon size={36} />
          </div>
          <HourcessWordmarkSVG width={160} className="text-white" />
          <p className="text-sm text-zinc-400">Admin dashboard</p>
        </div>

        <Card className="border-zinc-200/80 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in to manage waitlist, analytics, and email.</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
