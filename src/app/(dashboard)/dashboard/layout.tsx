import DashboardLink from "@/components/DashboardLink";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 h-[100vh] bg-secondary shadow-md fixed flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700 p-4">Dashboard</h1>

          <nav className="mt-4 space-y-2 px-2">
            <DashboardLink href="/dashboard">Statistics</DashboardLink>
            <DashboardLink href="/dashboard/categories">
              Categories
            </DashboardLink>
            <DashboardLink href="/dashboard/products">Products</DashboardLink>
            <DashboardLink href="/dashboard/sales">
              Sales & Discounts
            </DashboardLink>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4 ml-64 overflow-scroll">{children}</main>
    </div>
  );
}
