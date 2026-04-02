"use client";
import { useEffect, useState, useMemo, useCallback, memo } from "react";
// import API from "@/services/api";

// ─── Mock data for preview ───────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  { _id: "1", name: "Wireless Headphones", stock: 42, price: 89.99 },
  { _id: "2", name: "Mechanical Keyboard", stock: 15, price: 129.99 },
  { _id: "3", name: "USB-C Hub 7-Port", stock: 0, price: 49.99 },
  { _id: "4", name: '27" Monitor Stand', stock: 8, price: 74.99 },
  { _id: "5", name: "Ergonomic Mouse", stock: 31, price: 59.99 },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const PackageIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const HashIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);
const PlusIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);
const ChevronIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ShoppingBagIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const AlertIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── Sub-components (memo'd for perf) ─────────────────────────────────────────

const StockBadge = memo(({ stock }) => {
  if (stock === 0)
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
        <AlertIcon /> Out of Stock
      </span>
    );
  if (stock <= 10)
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
        Low — {stock} left
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
      {stock} in stock
    </span>
  );
});
StockBadge.displayName = "StockBadge";

const OrderItemRow = memo(
  ({
    item,
    index,
    products,
    availableProducts,
    onChange,
    onRemove,
    canRemove,
  }) => {
    const selected = useMemo(
      () => products.find((p) => p._id === item.product) || null,
      [products, item.product],
    );

    const isOverStock = useMemo(
      () => selected && Number(item.quantity) > selected.stock,
      [selected, item.quantity],
    );

    const rowTotal = useMemo(
      () =>
        selected ? (selected.price * Number(item.quantity)).toFixed(2) : null,
      [selected, item.quantity],
    );

    return (
      <div className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-200 hover:border-indigo-500/25 hover:bg-white/[0.04]">
        {/* Row number badge */}
        <div className="absolute -top-3 left-5 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-[#0f0f1a] px-2">
            Item {index + 1}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_140px_auto] gap-3 items-start mt-1">
          {/* Product select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
              <PackageIcon /> Product
            </label>
            <div className="relative">
              <select
                value={item.product}
                onChange={(e) => onChange(index, "product", e.target.value)}
                className="w-full appearance-none rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 pr-10 text-sm text-slate-200 outline-none transition-all duration-200 focus:border-indigo-500/50 focus:bg-indigo-500/[0.05] focus:ring-2 focus:ring-indigo-500/10 cursor-pointer"
              >
                <option value="" className="bg-[#1a1a2e]">
                  Select a product…
                </option>
                {availableProducts.map((p) => (
                  <option
                    key={p._id}
                    value={p._id}
                    disabled={p.stock === 0}
                    className="bg-[#1a1a2e]"
                  >
                    {p.name} — ${p.price}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                <ChevronIcon />
              </span>
            </div>
            {/* Stock badge for selected */}
            {selected && (
              <div className="flex items-center gap-2 mt-0.5">
                <StockBadge stock={selected.stock} />
                {isOverStock && (
                  <span className="text-[10px] text-red-400 font-medium">
                    Exceeds stock!
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
              <HashIcon /> Qty
            </label>
            <input
              type="number"
              min="1"
              max={selected?.stock || 999}
              value={item.quantity}
              onChange={(e) => onChange(index, "quantity", e.target.value)}
              className={`rounded-xl bg-white/[0.04] border px-4 py-3 text-sm text-slate-200 outline-none transition-all duration-200 focus:ring-2 text-center
              ${
                isOverStock
                  ? "border-red-500/50 bg-red-500/[0.05] focus:ring-red-500/10"
                  : "border-white/[0.08] focus:border-indigo-500/50 focus:bg-indigo-500/[0.05] focus:ring-indigo-500/10"
              }`}
            />
            {rowTotal && (
              <span className="text-[11px] text-slate-500 text-center font-medium">
                = <span className="text-slate-300">${rowTotal}</span>
              </span>
            )}
          </div>

          {/* Remove */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-transparent select-none">
              &nbsp;
            </label>
            <button
              type="button"
              onClick={() => onRemove(index)}
              disabled={!canRemove}
              className="p-3 rounded-xl border border-white/[0.06] text-slate-600 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    );
  },
);
OrderItemRow.displayName = "OrderItemRow";

// ─── Summary card ──────────────────────────────────────────────────────────────
const OrderSummary = memo(({ items, products }) => {
  const lines = useMemo(
    () =>
      items
        .filter((it) => it.product)
        .map((it) => {
          const p = products.find((pr) => pr._id === it.product);
          return p
            ? {
                name: p.name,
                qty: Number(it.quantity),
                subtotal: p.price * Number(it.quantity),
              }
            : null;
        })
        .filter(Boolean),
    [items, products],
  );

  const total = useMemo(
    () => lines.reduce((acc, l) => acc + l.subtotal, 0),
    [lines],
  );

  if (!lines.length) return null;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">
        Order Summary
      </p>
      <div className="flex flex-col gap-2">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              {l.name} <span className="text-slate-600">× {l.qty}</span>
            </span>
            <span className="text-slate-300 font-medium">
              ${l.subtotal.toFixed(2)}
            </span>
          </div>
        ))}
        <div className="h-px bg-white/[0.06] my-1" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">Total</span>
          <span
            className="text-lg font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
});
OrderSummary.displayName = "OrderSummary";

// ─── Main Component ────────────────────────────────────────────────────────────
export default function OrderForm() {
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: 1 }]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Replace with: API.get("/products").then((res) => setProducts(res.data));
    setTimeout(() => setProducts(MOCK_PRODUCTS), 300);
  }, []);

  // Memoize selected product IDs to filter duplicates in dropdowns
  const selectedProductIds = useMemo(
    () => new Set(items.map((it) => it.product).filter(Boolean)),
    [items],
  );

  // Per-row available products: exclude already-selected ones (except current row's own)
  const availableProductsPerRow = useMemo(
    () =>
      items.map((item) =>
        products.filter(
          (p) => !selectedProductIds.has(p._id) || p._id === item.product,
        ),
      ),
    [items, products, selectedProductIds],
  );

  // Derived: is form valid?
  const isValid = useMemo(
    () =>
      customerName.trim().length > 0 &&
      items.every((it) => it.product && Number(it.quantity) >= 1) &&
      items.every((it) => {
        const p = products.find((pr) => pr._id === it.product);
        return p ? Number(it.quantity) <= p.stock : true;
      }),
    [customerName, items, products],
  );

  // Handlers (stable references via useCallback)
  const handleItemChange = useCallback((index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, { product: "", quantity: 1 }]);
  }, []);

  const removeItem = useCallback((index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isValid) return;
      setLoading(true);
      try {
        // Replace with: await API.post("/orders", { customerName, items });
        await new Promise((r) => setTimeout(r, 900));
        setSuccess(true);
        setCustomerName("");
        setItems([{ product: "", quantity: 1 }]);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        alert(err?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [isValid, customerName, items],
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: #0a0a0f; }
        select option:disabled { color: #475569; }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.35s ease forwards; }
        @keyframes success-pop {
          0%   { transform: scale(0.9); opacity: 0; }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-success { animation: success-pop 0.4s ease forwards; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="w-full max-w-2xl animate-slide-up">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3.5 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8] animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-300">
                  Order Management
                </span>
              </div>
              <h1
                className="text-3xl font-bold text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                New Customer Order
              </h1>
              <p className="text-sm text-slate-500 mt-1.5">
                Fill in customer details and add products below
              </p>
            </div>

            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-500/30">
              <ShoppingBagIcon />
            </div>
          </div>

          {/* Success toast */}
          {success && (
            <div className="animate-success mb-6 flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 px-5 py-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/20">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-300">
                  Order Created Successfully
                </p>
                <p className="text-xs text-emerald-500/70 mt-0.5">
                  Your order has been submitted and is being processed.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Customer Name */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 flex items-center gap-1.5 mb-2">
                <UserIcon /> Customer Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none">
                  <UserIcon />
                </span>
                <input
                  placeholder="e.g. Sarah Rahman"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] pl-10 pr-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-700 outline-none transition-all duration-200 focus:border-indigo-500/50 focus:bg-indigo-500/[0.05] focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  Order Items ({items.length})
                </p>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-150"
                >
                  <PlusIcon /> Add Item
                </button>
              </div>

              {items.map((item, index) => (
                <OrderItemRow
                  key={index}
                  item={item}
                  index={index}
                  products={products}
                  availableProducts={availableProductsPerRow[index] || products}
                  onChange={handleItemChange}
                  onRemove={removeItem}
                  canRemove={items.length > 1}
                />
              ))}
            </div>

            {/* Summary */}
            <OrderSummary items={items} products={products} />

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCustomerName("");
                  setItems([{ product: "", quantity: 1 }]);
                }}
                className="flex-1 py-3.5 rounded-xl border border-white/[0.08] text-sm font-semibold text-slate-500 hover:text-slate-300 hover:border-white/[0.15] transition-all duration-200"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={!isValid || loading}
                className="flex-[2] py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed
                  bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-500/30
                  hover:not-disabled:shadow-indigo-500/50 hover:not-disabled:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M21 12a9 9 0 1 1-6.219-8.56"
                        strokeLinecap="round"
                      />
                    </svg>
                    Creating Order…
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon />
                    Create Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
