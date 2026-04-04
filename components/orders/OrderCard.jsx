"use client";
import { useState, memo } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import StatusBadge from "./StatusBadge";
import OrderItemsTable from "./OrderItemsTable";
import OrderActions from "./OrderActions";
import {
  initials,
  avatarColor,
  shortId,
  formatDate,
  formatPrice,
} from "./utils";

const OrderCard = ({ order, onUpdateStatus, onCancel, onDelete }) => {
  const [open, setOpen] = useState(false);
  const { bg, text } = avatarColor(order.customerName ?? "");

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-150
      ${open ? "border-blue-300 shadow-sm" : "border-gray-100 hover:border-gray-200"}`}
    >
      {/* Header */}
      <div
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer rounded-xl
          transition-colors ${open ? "bg-gray-50 rounded-b-none" : "hover:bg-gray-50/60"}`}
      >
        {/* Avatar */}
        <div
          className={`w-9 h-9 rounded-full ${bg} ${text} flex items-center
          justify-center text-xs font-medium shrink-0`}
        >
          {initials(order.customerName)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {order.customerName}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
            <span>{shortId(order._id)}</span>
            <span>·</span>
            <span>{formatDate(order.createdAt)}</span>
            <span>·</span>
            <span>
              {order.items?.length ?? 0} item
              {order.items?.length !== 1 ? "s" : ""}
            </span>
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5 shrink-0">
          <StatusBadge status={order.status} />
          <span className="text-sm font-medium text-gray-900 min-w-[56px] text-right">
            {formatPrice(order.totalPrice ?? 0)}
          </span>
          {open ? (
            <MdExpandLess size={18} className="text-gray-400" />
          ) : (
            <MdExpandMore size={18} className="text-gray-400" />
          )}
        </div>
      </div>

      {/* Expanded body */}
      {open && (
        <div className="px-4 pt-3.5 pb-4 border-t border-gray-100">
          <OrderItemsTable
            items={order.items ?? []}
            totalPrice={order.totalPrice}
          />
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
