import { memo } from "react";

const STYLES = {
  Pending: "bg-amber-50  text-amber-800  ring-amber-200",
  Confirmed: "bg-blue-50   text-blue-800   ring-blue-200",
  Shipped: "bg-purple-50 text-purple-800 ring-purple-200",
  Delivered: "bg-green-50  text-green-800  ring-green-200",
  Cancelled: "bg-red-50    text-red-800    ring-red-200",
};

const DOT = {
  Pending: "bg-amber-500",
  Confirmed: "bg-blue-500",
  Shipped: "bg-purple-500",
  Delivered: "bg-green-500",
  Cancelled: "bg-red-500",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-[11px] font-medium
    px-2.5 py-1 rounded-full ring-1 ${STYLES[status] ?? STYLES.Pending}`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${DOT[status] ?? DOT.Pending}`}
    />
    {status}
  </span>
);

export default memo(StatusBadge);
