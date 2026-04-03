"use client";

import { useEffect, useState, useCallback } from "react";
import { useOrders } from "../../hooks/useOrders";
import StatsRow from "./StatsRow";
import Toolbar from "./Toolbar";
import OrderCard from "./OrderCard";
import CreateOrderModal from "./CreateOrderModal";
import { FaPlus } from "react-icons/fa";

export default function OrderManagement() {
  const {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateStatus,
    cancelOrder,
  } = useOrders();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [showCreate, setShowCreate] = useState(false);

  // Fetch on mount and when filter changes
  useEffect(() => {
    fetchOrders(filter === "All" ? "" : filter);
  }, [filter, fetchOrders]);

  const sorted = [...orders].sort((a, b) => {
    if (sort === "date-desc")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "date-asc")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "total-desc") return b.totalPrice - a.totalPrice;
    if (sort === "total-asc") return a.totalPrice - b.totalPrice;
    return 0;
  });

  const handleCreate = useCallback(
    async (payload) => {
      const result = await createOrder(payload);
      if (result) setShowCreate(false);
    },
    [createOrder],
  );

  if (showCreate)
    return (
      <CreateOrderModal
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />
    );

  return (
    <div
      style={{ padding: "1.25rem 1rem 2rem", maxWidth: 700, margin: "0 auto" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "var(--color-text-primary)",
            }}
          >
            Order management
          </span>
          <span
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              marginLeft: 10,
            }}
          >
            {orders.length} orders
          </span>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 16px",
            border: "none",
            borderRadius: "var(--border-radius-md)",
            background: "var(--color-text-primary)",
            color: "var(--color-background-primary)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <FaPlus /> New order
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            padding: "10px 14px",
            background: "var(--color-background-danger)",
            color: "var(--color-text-danger)",
            border: "0.5px solid var(--color-border-danger)",
            borderRadius: "var(--border-radius-md)",
            fontSize: 13,
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      <StatsRow orders={orders} />
      <Toolbar
        filter={filter}
        sort={sort}
        onFilter={setFilter}
        onSort={setSort}
      />

      {/* Loading */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--color-text-tertiary)",
            fontSize: 13,
          }}
        >
          Loading orders…
        </div>
      )}

      {/* Orders list */}
      {!loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sorted.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "2.5rem",
                color: "var(--color-text-tertiary)",
                fontSize: 13,
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: "var(--border-radius-lg)",
              }}
            >
              No orders found.
            </div>
          ) : (
            sorted.map((o) => (
              <OrderCard
                key={o._id}
                order={o}
                onUpdateStatus={updateStatus}
                onCancel={cancelOrder}
                onDelete={() => {}} // wire a deleteOrder service if needed
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
