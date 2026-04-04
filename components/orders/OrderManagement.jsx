"use client";
import { useState, useMemo } from "react";
import { MdAdd } from "react-icons/md";
import { useOrders } from "@/hooks/useOrders";
import StatsRow from "./StatsRow";
import Toolbar from "./Toolbar";
import OrderCard from "./OrderCard";
import CreateOrderModal from "./CreateOrderModal";

export default function OrdersPage() {
  const {
    orders,
    loading,
    error,
    createOrder,
    updateStatus,
    cancelOrder,
    deleteOrder,
  } = useOrders();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    const list =
      filter === "All" ? orders : orders.filter((o) => o.status === filter);
    return [...list].sort((a, b) => {
      if (sort === "date-desc")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "date-asc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === "total-desc")
        return (b.totalPrice ?? 0) - (a.totalPrice ?? 0);
      if (sort === "total-asc")
        return (a.totalPrice ?? 0) - (b.totalPrice ?? 0);
      return 0;
    });
  }, [orders, filter, sort]);

  const handleCreate = async (payload) => {
    try {
      await createOrder(payload);
      setShowModal(false);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-7 px-1">
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Orders</h1>
          <p className="text-sm text-gray-400 mt-1">
            {orders.length} total ·{" "}
            <span className="text-amber-600">
              {orders.filter((o) => o.status === "Pending").length} pending
            </span>
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl
            bg-[#042C53] text-white text-sm font-medium
            hover:bg-[#0C447C] transition-colors"
        >
          <MdAdd size={17} /> New order
        </button>
      </div>

      <StatsRow orders={orders} />
      <Toolbar
        filter={filter}
        sort={sort}
        onFilter={setFilter}
        onSort={setSort}
      />

      {/* States */}
      {loading && (
        <div className="text-center py-16 text-sm text-gray-400">
          Loading orders…
        </div>
      )}
      {error && (
        <div className="text-center py-16 text-sm text-red-500">{error}</div>
      )}

      {/* List */}
      {!loading && !error && (
        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-sm text-gray-400">
              No orders match this filter.
            </div>
          ) : (
            filtered.map((o) => (
              <OrderCard
                key={o._id}
                order={o}
                onUpdateStatus={updateStatus}
                onCancel={cancelOrder}
                onDelete={deleteOrder}
              />
            ))
          )}
        </div>
      )}

      {/* Modal overlay */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center
          justify-center p-4"
        >
          <CreateOrderModal
            onClose={() => setShowModal(false)}
            onCreate={handleCreate}
          />
        </div>
      )}
    </div>
  );
}
