"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="text-lg font-bold">MyApp</div>

      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        <Link href="/products" className="hover:underline">
          Products
        </Link>

        <Link href="/orders" className="hover:underline">
          Orders
        </Link>
      </div>
    </nav>
  );
}
