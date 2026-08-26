import { requireAdmin } from "@/lib/auth/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin } = await requireAdmin();

  return (
    <div className="min-h-dvh bg-background text-primary">
      <AdminSidebar email={admin.email} />
      <AdminMobileNav email={admin.email} />
      <div className="lg:pl-56">
        <main className="px-5 py-6 pb-24 sm:px-8 sm:py-8 lg:pb-8">{children}</main>
      </div>
    </div>
  );
}
