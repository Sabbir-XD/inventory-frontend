// components/Sidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdCategory,
  MdInventory2,
  MdShoppingCart,
  MdStackedBarChart,
  MdAutorenew,
} from "react-icons/md";

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/dashboard", label: "Dashboard", icon: MdDashboard }],
  },
  {
    label: "Catalogue",
    items: [
      { href: "/categories", label: "Categories", icon: MdCategory },
      { href: "/products", label: "Products", icon: MdInventory2, badge: "24" },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        href: "/orders",
        label: "Orders",
        icon: MdShoppingCart,
        badge: "3",
        badgeType: "info",
      },
      { href: "/stock", label: "Stock", icon: MdStackedBarChart },
      {
        href: "/restock",
        label: "Restock",
        icon: MdAutorenew,
        badge: "!",
        badgeType: "danger",
      },
    ],
  },
];

const badgeStyles = {
  default: "bg-gray-100 text-gray-500",
  info: "bg-blue-50 text-blue-600",
  danger: "bg-red-50 text-red-600",
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[250px] h-screen bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#042C53] rounded-lg flex items-center justify-center shrink-0">
          <MdInventory2 size={16} color="white" />
        </div>
        <div>
          <p className="text-[13px] font-medium text-gray-900 leading-none">
            Inventra
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="text-[10px] font-medium tracking-widest text-gray-400 uppercase px-2.5 mb-1.5">
              {group.label}
            </p>

            {group.items.map(
              ({ href, label, icon: Icon, badge, badgeType = "default" }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] mb-0.5 transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={15} className="shrink-0" />
                    <span>{label}</span>
                    {badge && (
                      <span
                        className={`ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full ${badgeStyles[badgeType]}`}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              },
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-2.5 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#042C53] flex items-center justify-center text-[11px] font-medium text-white shrink-0">
            SB
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-gray-800 truncate">
              Sabbir
            </p>
            <p className="text-[11px] text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
