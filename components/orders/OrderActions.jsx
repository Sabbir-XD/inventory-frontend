import { memo } from "react";
import { STATUS_NEXT } from "./constants";
import { MdArrowForward, MdCancel, MdDeleteOutline } from "react-icons/md";

const OrderActions = ({ order, onUpdateStatus, onCancel, onDelete }) => {
  const next = STATUS_NEXT[order.status];
  const canCancel =
    order.status !== "Cancelled" && order.status !== "Delivered";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {next && (
        <button
          onClick={() => onUpdateStatus(order._id, next)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
            bg-[#042C53] text-white text-xs font-medium
            hover:bg-[#0C447C] transition-colors"
        >
          <MdArrowForward size={13} /> Mark as {next}
        </button>
      )}

      {canCancel && (
        <button
          onClick={() => onCancel(order._id)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
            border border-red-200 text-red-700 text-xs font-medium bg-transparent
            hover:bg-red-50 transition-colors"
        >
          <MdCancel size={13} /> Cancel
        </button>
      )}

      <button
        onClick={() => {
          if (confirm("Delete this order permanently?")) onDelete(order._id);
        }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
          border border-gray-200 text-gray-500 text-xs font-medium bg-transparent
          hover:bg-gray-50 hover:text-red-600 hover:border-red-200
          transition-colors ml-auto"
      >
        <MdDeleteOutline size={14} /> Delete
      </button>
    </div>
  );
};

export default memo(OrderActions);
