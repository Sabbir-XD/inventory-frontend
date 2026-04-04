import { memo } from "react";
import { formatPrice } from "./utils";

const OrderItemsTable = ({ items = [], totalPrice = 0 }) => (
  <div className="bg-gray-50 rounded-xl p-4 mb-4">
    <table
      className="w-full"
      style={{ tableLayout: "fixed", borderCollapse: "collapse" }}
    >
      <thead>
        <tr className="border-b border-gray-200">
          {[
            { label: "Product", w: "45%", align: "left" },
            { label: "Qty", w: "15%", align: "left" },
            { label: "Unit price", w: "20%", align: "left" },
            { label: "Subtotal", w: "20%", align: "right" },
          ].map(({ label, w, align }) => (
            <th
              key={label}
              style={{ width: w, textAlign: align }}
              className="pb-2.5 text-[10px] font-medium text-gray-400 uppercase tracking-wider"
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((it, i) => {
          const name = it.product?.name ?? "—";
          const price = it.price ?? it.product?.price ?? 0;
          const qty = it.quantity ?? 1;
          const isLast = i === items.length - 1;
          return (
            <tr key={i} className={!isLast ? "border-b border-gray-100" : ""}>
              <td className="py-2.5 text-sm font-medium text-gray-800">
                {name}
              </td>
              <td className="py-2.5 text-sm text-gray-500">{qty}</td>
              <td className="py-2.5 text-sm text-gray-500">
                {formatPrice(price)}
              </td>
              <td className="py-2.5 text-sm text-right text-gray-800">
                {formatPrice(price * qty)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <div className="flex items-center justify-end gap-3 pt-3 mt-1 border-t border-gray-200">
      <span className="text-xs text-gray-400 uppercase tracking-wider">
        Order total
      </span>
      <span className="text-lg font-medium text-gray-900">
        {formatPrice(totalPrice)}
      </span>
    </div>
  </div>
);

export default memo(OrderItemsTable);
