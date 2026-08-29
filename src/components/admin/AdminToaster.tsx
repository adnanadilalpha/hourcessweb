"use client";

import { Toaster } from "sonner";

export default function AdminToaster() {
  return (
    <Toaster
      theme="light"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-xl font-ui",
          success: "border-emerald-200 bg-emerald-50 text-emerald-800",
          error: "border-red-200 bg-red-50 text-red-800",
        },
      }}
    />
  );
}
