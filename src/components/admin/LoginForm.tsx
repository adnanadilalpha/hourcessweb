"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { safeAdminNextPath } from "@/lib/auth/paths";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "not_admin"
      ? "This account is not an admin."
      : null,
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const supabase = createClient();
    const { error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signError) {
      setError(signError.message);
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Unable to verify session.");
      setLoading(false);
      return;
    }

    const { data: admin } = await supabase
      .from("admin_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setError("This account is not an admin. Add it in Supabase first.");
      setLoading(false);
      return;
    }

    router.push(safeAdminNextPath(searchParams.get("next")));
    router.refresh();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 font-ui text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <label className="flex flex-col gap-1.5">
        <span className="font-ui text-sm text-secondary">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@hourcess.com"
          className="h-11 rounded-xl border border-white/12 bg-black/40 px-4 font-ui text-sm text-primary outline-none transition focus:border-lavender/50"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-ui text-sm text-secondary">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-11 rounded-xl border border-white/12 bg-black/40 px-4 font-ui text-sm text-primary outline-none transition focus:border-lavender/50"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-lavender px-4 font-ui text-sm font-medium text-ink transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center font-ui text-[11px] text-secondary/70">
        Login only. Accounts are created manually.
      </p>
    </form>
  );
}
