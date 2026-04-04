import { memo } from "react";
import { STATUSES } from "./constants";
import { formatPrice } from "./utils";

const DOT = {
  Pending: "bg-amber-400",
  Confirmed: "bg-blue-400",
  Shipped: "bg-purple-400",
  Delivered: "bg-green-400",
  Cancelled: "bg-red-400",
};

const StatsRow = ({ orders }) => {
  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + (o.totalPrice || 0), 0);

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-6 gap-2 mb-6">
      {/* Revenue */}
      <div className="col-span-2 bg-[#042C53] rounded-xl p-4 flex flex-col gap-1.5">
        <span className="text-[10px] font-medium text-blue-300 uppercase tracking-widest">
          Revenue
        </span>
        <span className="text-2xl font-medium text-white leading-none">
          {formatPrice(revenue)}
        </span>
        <span className="text-[11px] text-blue-300">
          {orders.filter((o) => o.status !== "Cancelled").length} confirmed
        </span>
      </div>

      {/* Per status */}
      {STATUSES.map((s) => (
        <div
          key={s}
          className="bg-gray-50 rounded-xl p-3.5 flex flex-col gap-1.5"
        >
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${DOT[s]}`} />
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider truncate">
              {s}
            </span>
          </span>
          <span className="text-xl font-medium text-gray-900 leading-none">
            {counts[s]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default memo(StatsRow);
