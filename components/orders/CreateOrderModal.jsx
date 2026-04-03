"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";

const field = {
  width: "100%",
  height: 38,
  padding: "0 11px",
  border: "0.5px solid var(--color-border-secondary)",
  borderRadius: "var(--border-radius-md)",
  background: "var(--color-background-primary)",
  color: "var(--color-text-primary)",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
};

export default function CreateOrderModal({ onClose, onCreate }) {
  const { products } = useProducts();
  // const products = [
  //   { _id: "p1", name: "Wireless Headphones", price: 89.99 },
  //   { _id: "p2", name: "Mechanical Keyboard", price: 129.99 },
  //   { _id: "p3", name: "USB-C Hub 7-Port", price: 49.99 },
  //   { _id: "p4", name: '27" Monitor Stand', price: 74.99 },
  //   { _id: "p5", name: "Ergonomic Mouse", price: 59.99 },
  //   { _id: "p6", name: "Webcam HD 1080p", price: 79.99 },
  // ];
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: 1 }]);
  const [submitting, setSubmitting] = useState(false);

  const setField = (i, f, v) =>
    setItems((p) => p.map((it, idx) => (idx === i ? { ...it, [f]: v } : it)));

  const addItem = () => setItems((p) => [...p, { product: "", quantity: 1 }]);
  const removeItem = (i) => setItems((p) => p.filter((_, idx) => idx !== i));

  const validItems = items.filter(
    (it) => it.product && parseInt(it.quantity) > 0,
  );
  const canSubmit = customer.trim() && validItems.length > 0;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    await onCreate({
      customerName: customer.trim(),
      items: validItems.map((it) => ({
        product: it.product,
        quantity: parseInt(it.quantity),
      })),
    });
    setSubmitting(false);
    onClose();
  };

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.3)",
        borderRadius: "var(--border-radius-lg)",
        padding: "2rem 1rem",
        display: "flex",
        justifyContent: "center",
        minHeight: 420,
      }}
    >
      <div
        style={{
          background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: "var(--border-radius-lg)",
          padding: "1.25rem 1.5rem",
          width: "100%",
          maxWidth: 520,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: "1.25rem" }}>
          New order
        </div>

        <label
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "var(--color-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: ".06em",
            display: "block",
            marginBottom: 5,
          }}
        >
          Customer name
        </label>
        <input
          style={{ ...field, marginBottom: "1rem" }}
          placeholder="Full name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <label
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "var(--color-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: ".06em",
            display: "block",
            marginBottom: 8,
          }}
        >
          Products
        </label>

        {items.map((it, i) => {
          const selected = products.find((p) => p._id === it.product);
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 70px 70px 28px",
                gap: 8,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <select
                style={{
                  ...field,
                  height: 34,
                  fontSize: 13,
                  appearance: "none",
                  padding: "0 8px",
                }}
                value={it.product}
                onChange={(e) => setField(i, "product", e.target.value)}
              >
                <option value="">Select product…</option>
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
                style={{ ...field, height: 34, fontSize: 13, padding: "0 8px" }}
                type="number"
                min={1}
                max={selected?.stock ?? 999}
                value={it.quantity}
                onChange={(e) => setField(i, "quantity", e.target.value)}
              />
              <span
                style={{
                  fontSize: 13,
                  color: "var(--color-text-secondary)",
                  textAlign: "right",
                }}
              >
                {selected ? `$${selected.price.toFixed(2)}` : "—"}
              </span>
              <button
                onClick={() => removeItem(i)}
                style={{
                  width: 28,
                  height: 28,
                  border: "0.5px solid var(--color-border-tertiary)",
                  borderRadius: "var(--border-radius-md)",
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--color-text-tertiary)",
                  fontSize: 16,
                }}
              >
                ×
              </button>
            </div>
          );
        })}

        <button
          onClick={addItem}
          style={{
            fontSize: 12,
            color: "var(--color-text-secondary)",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            marginBottom: "1rem",
          }}
        >
          + Add product
        </button>

        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            borderTop: "0.5px solid var(--color-border-tertiary)",
            paddingTop: "1rem",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "6px 14px",
              border: "0.5px solid var(--color-border-secondary)",
              borderRadius: "var(--border-radius-md)",
              background: "transparent",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              color: "var(--color-text-secondary)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!canSubmit || submitting}
            style={{
              padding: "6px 14px",
              border: "none",
              borderRadius: "var(--border-radius-md)",
              background: "var(--color-text-primary)",
              color: "var(--color-background-primary)",
              fontSize: 12,
              fontWeight: 500,
              cursor: canSubmit ? "pointer" : "default",
              fontFamily: "inherit",
              opacity: canSubmit && !submitting ? 1 : 0.4,
            }}
          >
            {submitting ? "Creating…" : "Create order"}
          </button>
        </div>
      </div>
    </div>
  );
}
