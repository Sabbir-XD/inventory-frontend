import { memo } from "react";

const STATUS_STYLES = {
  Pending: { bg: "#FAEEDA", fg: "#633806", dot: "#854F0B" },
  Confirmed: { bg: "#E6F1FB", fg: "#0C447C", dot: "#185FA5" },
  Shipped: { bg: "#EEEDFE", fg: "#3C3489", dot: "#534AB7" },
  Delivered: { bg: "#EAF3DE", fg: "#27500A", dot: "#3B6D11" },
  Cancelled: { bg: "#FCEBEB", fg: "#791F1F", dot: "#A32D2D" },
};

const StatusBadge = ({ status }) => {
  const { bg, fg, dot } = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 500,
        padding: "3px 9px",
        borderRadius: 999,
        background: bg,
        color: fg,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
};

export default memo(StatusBadge);
