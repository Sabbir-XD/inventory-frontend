"use client";

import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import OrderProductRow from "./OrderProductRow";
import { deductStock } from "@/services/order.service";

export default function OrderForm({ products, onOrderPlaced }) {
  const [selections, setSelections] = useState({});
  const [loading, setLoading] = useState(false);

  const handleQtyChange = (productId, qty, isInsufficient) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: { qty, isInsufficient },
    }));
  };

  const hasInsufficient = Object.values(selections).some(
    (s) => s.isInsufficient,
  );
  const hasSelections = Object.values(selections).some((s) => s.qty > 0);
  const canSubmit = hasSelections && !hasInsufficient;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      for (const [productId, { qty }] of Object.entries(selections)) {
        if (qty > 0) await deductStock(productId, qty);
      }
      onOrderPlaced?.();
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {products.map((p) => (
        <OrderProductRow
          key={p._id}
          product={p}
          onQtyChange={handleQtyChange}
        />
      ))}

      <button
        type="submit"
        disabled={!canSubmit || loading}
        className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm py-3 rounded-xl transition font-medium"
      >
        {loading ? (
          "Placing Order..."
        ) : (
          <>
            <FiCheckCircle /> Confirm Order
          </>
        )}
      </button>

      {hasInsufficient && (
        <p className="text-center text-xs text-red-500">
          Fix stock issues above before confirming.
        </p>
      )}
    </form>
  );
}
