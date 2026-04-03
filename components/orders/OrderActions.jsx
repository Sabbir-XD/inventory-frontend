import { memo } from "react";
import { STATUS_NEXT } from "./constants";

const btn = (extra = {}) => ({
  padding: "6px 14px",
  borderRadius: "var(--border-radius-md)",
  border: "0.5px solid var(--color-border-secondary)",
  background: "transparent",
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
  color: "var(--color-text-secondary)",
  transition: "all .12s",
  ...extra,
});

const OrderActions = ({ order, onUpdateStatus, onCancel, onDelete }) => {
  const next = STATUS_NEXT[order.status];
  const canCancel =
    order.status !== "Cancelled" && order.status !== "Delivered";

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {next && (
        <button
          style={btn({
            background: "var(--color-text-primary)",
            color: "var(--color-background-primary)",
            borderColor: "var(--color-text-primary)",
          })}
          onClick={() => onUpdateStatus(order.id, next)}
        >
          Mark as {next}
        </button>
      )}
      {canCancel && (
        <button
          style={btn({ color: "#A32D2D", borderColor: "#F09595" })}
          onClick={() => onCancel(order.id)}
        >
          Cancel order
        </button>
      )}
      <button
        style={btn({ marginLeft: "auto" })}
        onClick={() => onDelete(order.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default memo(OrderActions);
