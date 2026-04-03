"use client";

import { useState, memo } from "react";
import StatusBadge from "./StatusBadge";
import OrderItemsTable from "./OrderItemsTable";
import OrderActions from "./OrderActions";
import { initials, avatarColor } from "./utils";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const OrderCard = ({ order, onUpdateStatus, onCancel, onDelete }) => {
  const [open, setOpen] = useState(false);
  const { bg, fg } = avatarColor(order.customerName);

  // Real API: totalPrice comes from backend, no need to recalculate
  const total = order.totalPrice ?? 0;

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : "—";

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: `0.5px solid ${open ? "var(--color-border-primary)" : "var(--color-border-tertiary)"}`,
        borderRadius: "var(--border-radius-lg)",
        overflow: "hidden",
      }}
    >
      {/* Header row — click to expand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
          cursor: "pointer",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: bg,
            color: fg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {initials(order.customerName)}
        </div>

        {/* Customer + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-text-primary)",
            }}
          >
            {order.customerName}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--color-text-secondary)",
              marginTop: 2,
            }}
          >
            {order._id} · {formattedDate} · {order.items.length} item
            {order.items.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Status + total + chevron */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <StatusBadge status={order.status} />
          <span style={{ fontSize: 15, fontWeight: 500 }}>
            ${total.toFixed(2)}
          </span>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* Expanded body */}
      {open && (
        <div
          style={{
            borderTop: "0.5px solid var(--color-border-tertiary)",
            padding: "14px 16px",
          }}
        >
          <OrderItemsTable items={order.items} />
          <OrderActions
            order={order}
            onUpdateStatus={onUpdateStatus}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default memo(OrderCard);
