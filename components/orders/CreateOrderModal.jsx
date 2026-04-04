"use client";
import { useState } from "react";
import { MdClose, MdAdd, MdShoppingCart } from "react-icons/md";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "./utils";

const inputCls = `w-full h-9 px-3 border border-gray-200 rounded-lg bg-white
  text-gray-900 text-sm outline-none focus:border-blue-400
  focus:ring-2 focus:ring-blue-50 transition-all placeholder-gray-300`;

const labelCls =
  "block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5";

export default function CreateOrderModal({ onClose, onCreate }) {
  const { products } = useProducts();
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: 1 }]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const setField = (i, f, v) =>
    setItems((prev) =>
      prev.map((it, idx) => (idx === i ? { ...it, [f]: v } : it)),
    );

  const addItem = () => setItems((p) => [...p, { product: "", quantity: 1 }]);
  const removeItem = (i) => setItems((p) => p.filter((_, idx) => idx !== i));

  const validItems = items.filter(
    (it) => it.product && parseInt(it.quantity) > 0,
  );

  const orderTotal = validItems.reduce((sum, it) => {
    const p = products.find((x) => x._id === it.product);
    return sum + (p ? p.price * parseInt(it.quantity) : 0);
  }, 0);

  const canSubmit = customer.trim() && validItems.length > 0;

  const submit = async () => {
    if (!canSubmit || submitting) return;
    setError("");
    setSubmitting(true);
    try {
      await onCreate({
        customerName: customer.trim(),
        items: validItems.map((it) => ({
          product: it.product,
          quantity: parseInt(it.quantity),
        })),
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl w-full max-w-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#042C53] flex items-center justify-center">
            <MdShoppingCart size={15} color="white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">New order</p>
            <p className="text-[11px] text-gray-400">
              Add customer and products
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg
            border border-gray-200 text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <MdClose size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-5 space-y-5">
        {/* Customer */}
        <div>
          <label className={labelCls}>Customer name</label>
          <input
            className={inputCls}
            placeholder="Full name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        {/* Products */}
        <div>
          <label className={labelCls}>Products</label>

          {/* Col headers */}
          <div
            className="grid gap-2 mb-2"
            style={{ gridTemplateColumns: "1fr 72px 60px 28px" }}
          >
            {["Item", "Qty", "Price", ""].map((h) => (
              <span
                key={h}
                className="text-[10px] font-medium text-gray-400 uppercase tracking-wider"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {items.map((it, i) => {
              const selected = products.find((p) => p._id === it.product);
              const isOver = selected && parseInt(it.quantity) > selected.stock;

              return (
                <div key={i} className="space-y-1">
                  <div
                    className="grid gap-2 items-center"
                    style={{ gridTemplateColumns: "1fr 72px 60px 28px" }}
                  >
                    <select
                      className={`${inputCls} cursor-pointer`}
                      style={{ appearance: "none" }}
                      value={it.product}
                      onChange={(e) => setField(i, "product", e.target.value)}
                    >
                      <option value="">Select…</option>
                      {products.map((p) => (
                        <option
                          key={p._id}
                          value={p._id}
                          disabled={p.status === "Out of Stock"}
                        >
                          {p.name}
                          {p.status === "Out of Stock" ? " (out of stock)" : ""}
                        </option>
                      ))}
                    </select>

                    <input
                      className={`${inputCls} ${isOver ? "border-red-300 focus:border-red-400 focus:ring-red-50" : ""}`}
                      type="number"
                      min={1}
                      max={selected?.stock ?? 999}
                      value={it.quantity}
                      onChange={(e) => setField(i, "quantity", e.target.value)}
                    />

                    <span className="text-sm font-medium text-gray-700 text-right">
                      {selected ? formatPrice(selected.price) : "—"}
                    </span>

                    <button
                      onClick={() => removeItem(i)}
                      disabled={items.length === 1}
                      className="w-7 h-7 flex items-center justify-center rounded-lg
                        border border-gray-200 text-gray-400 text-base
                        hover:bg-red-50 hover:border-red-200 hover:text-red-500
                        disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      ×
                    </button>
                  </div>

                  {isOver && (
                    <p className="text-[11px] text-red-600 bg-red-50 rounded-lg px-2.5 py-1.5">
                      Only {selected.stock} item
                      {selected.stock !== 1 ? "s" : ""} available
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={addItem}
            className="inline-flex items-center gap-1 mt-3 text-xs font-medium
              text-blue-600 hover:text-blue-800 transition-colors"
          >
            <MdAdd size={14} /> Add product
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
        {validItems.length > 0 && (
          <div className="flex-1">
            <span className="text-xs text-gray-400">Total · </span>
            <span className="text-base font-medium text-gray-900">
              {formatPrice(orderTotal)}
            </span>
          </div>
        )}
        {error && <p className="text-xs text-red-600 flex-1">{error}</p>}

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white
            text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={!canSubmit || submitting}
          className="px-4 py-2 rounded-lg bg-[#042C53] text-white text-xs
            font-medium hover:bg-[#0C447C] disabled:opacity-40
            disabled:cursor-not-allowed transition-all"
        >
          {submitting ? "Creating…" : "Create order"}
        </button>
      </div>
    </div>
  );
}
