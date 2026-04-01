// components/Sidebar.jsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>

      <ul className="space-y-2">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/orders">Orders</Link>
        </li>
      </ul>
    </div>
  );
}
