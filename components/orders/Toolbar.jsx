import { memo } from "react";
import { STATUSES } from "./constants";

const FILTERS = ["All", ...STATUSES];

const Toolbar = ({ filter, sort, onFilter, onSort }) => (
  <div
    style={{
      display: "flex",
      gap: 8,
      marginBottom: "1rem",
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onFilter(f)}
          style={{
            padding: "5px 12px",
            borderRadius: 999,
            border: "0.5px solid var(--color-border-secondary)",
            background:
              filter === f ? "var(--color-text-primary)" : "transparent",
            color:
              filter === f
                ? "var(--color-background-primary)"
                : "var(--color-text-secondary)",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {f}
        </button>
      ))}
    </div>
    <select
      value={sort}
      onChange={(e) => onSort(e.target.value)}
      style={{
        marginLeft: "auto",
        height: 30,
        padding: "0 10px",
        border: "0.5px solid var(--color-border-secondary)",
        borderRadius: "var(--border-radius-md)",
        background: "var(--color-background-primary)",
        color: "var(--color-text-secondary)",
        fontSize: 12,
        fontFamily: "inherit",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <option value="date-desc">Newest first</option>
      <option value="date-asc">Oldest first</option>
      <option value="total-desc">Highest total</option>
      <option value="total-asc">Lowest total</option>
    </select>
  </div>
);

export default memo(Toolbar);
