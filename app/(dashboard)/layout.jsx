import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-74">
        <Sidebar />
      </aside>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
