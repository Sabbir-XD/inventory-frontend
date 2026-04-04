"use client";

import { useEffect, useMemo, useState } from "react";
import StatCard from "@/components/StatCard";
import API from "@/services/api";

export default function Dashboard() {
  const [orders,  setOrders]  = useState([]);
  const [products, setProducts] = useState([]);
  const [restock, setRestock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/orders"),
      API.get("/products"),
      API.get("/restock-queue"),
    ]).then(([o, p, r]) => {
      setOrders(o.data);
      setProducts(p.data);
      setRestock(r.data);
    }).finally(() => setLoading(false));
  }, []);

  const revenue = useMemo(
    () => orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
    [orders]
  );

  const todayOrders = useMemo(() => {
    const today = new Date().toDateString();
    return orders.filter((o) => new Date(o.createdAt).toDateString() === today);
  }, [orders]);

  const lowStockCount  = products.filter((p) => p.stock <= p.minStock && p.stock > 0).length;
  const highPriority   = restock.filter((r) => r.priority === "high").length;
  const pendingOrders  = orders.filter((o) => o.status === "Pending");

  const statusStyle = {
    Confirmed: "bg-green-50 text-green-700",
    Pending:   "bg-amber-50 text-amber-700",
    Cancelled: "bg-red-50 text-red-600",
  };

  const priorityStyle = {
    high:   "bg-red-50 text-red-600",
    medium: "bg-amber-50 text-amber-700",
    low:    "bg-green-50 text-green-700",
  };

  if (loading) return (
    <div className="flex items-center justify-center h-48 text-sm text-gray-400">
      Loading...
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          Live
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Revenue"
          value={`$${revenue.toLocaleString()}`}
          sub="All confirmed orders"
          subType="neutral"
        />
        <StatCard
          label="Orders Today"
          value={todayOrders.length}
          sub={`${pendingOrders.length} pending`}
          subType={pendingOrders.length > 0 ? "danger" : "neutral"}
        />
        <StatCard
          label="Products"
          value={products.length}
          sub={lowStockCount > 0 ? `${lowStockCount} low stock` : "All stocked"}
          subType={lowStockCount > 0 ? "danger" : "success"}
        />
        <StatCard
          label="Restock Queue"
          value={restock.length}
          sub={highPriority > 0 ? `${highPriority} high priority` : "All clear"}
          subType={highPriority > 0 ? "danger" : "success"}
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Recent Orders */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-800">Recent orders</p>
            <a href="/orders" className="text-xs text-blue-600 hover:underline">View all</a>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Customer", "Items", "Total", "Status"].map((h) => (
                  <th key={h} className="pb-2 text-left text-[11px] uppercase tracking-wider text-gray-400 font-medium last:text-right">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 5).map((o) => (
                <tr key={o._id}>
                  <td className="py-2.5 text-gray-800">{o.customerName}</td>
                  <td className="py-2.5 text-gray-400">{o.items.length} items</td>
                  <td className="py-2.5 text-gray-800">${o.totalPrice}</td>
                  <td className="py-2.5 text-right">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusStyle[o.status] || "bg-gray-100 text-gray-500"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">No orders yet.</p>
          )}
        </div>

        {/* Restock Queue */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-800">Restock queue</p>
            <a href="/restock" className="text-xs text-blue-600 hover:underline">Manage</a>
          </div>
          <div className="space-y-3">
            {restock.slice(0, 5).map((r) => {
              const pct = Math.round((r.currentStock / r.minStock) * 100);
              return (
                <div key={r._id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-800">{r.product?.name}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityStyle[r.priority]}`}>
                      {r.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-red-400"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap">
                      {r.currentStock}/{r.minStock}
                    </span>
                  </div>
                </div>
              );
            })}
            {restock.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">Queue is empty.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}