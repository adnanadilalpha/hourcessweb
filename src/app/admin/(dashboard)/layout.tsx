import { requireAdmin } from "@/lib/auth/admin";
import AdminSidebar, { AdminSignOutForm } from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";
import AdminToaster from "@/components/admin/AdminToaster";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin } = await requireAdmin();

  return (
    <div className="admin-root flex min-h-dvh bg-zinc-950">
      <AdminSidebar email={admin.email} />
      <AdminSignOutForm />

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <AdminMobileNav email={admin.email} />
        <AdminToaster />

        <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4 lg:p-5">
          <div className="flex min-h-0 flex-1 overflow-hidden rounded-[28px] bg-admin-panel shadow-2xl ring-1 ring-white/5 sm:rounded-[36px]">
            <main className="min-w-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
