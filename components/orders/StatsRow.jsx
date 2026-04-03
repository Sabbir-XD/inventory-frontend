import { memo } from "react";
import { STATUSES } from "./constants";

const StatsRow = ({ orders }) => {
  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0,1fr))",
        gap: 8,
        marginBottom: "1.25rem",
      }}
    >
      {STATUSES.map((s) => (
        <div
          key={s}
          style={{
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-md)",
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--color-text-secondary)",
              marginBottom: 4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "var(--color-text-primary)",
            }}
          >
            {counts[s]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(StatsRow);
