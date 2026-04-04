import { FiRefreshCw, FiTrash2 } from "react-icons/fi";
import RestockPriorityBadge from "./RestockPriorityBadge";

export default function RestockQueueRow({ item, onRestock, onRemove }) {
  const { product } = item;

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium text-gray-800">{product?.name}</td>
      <td className="px-4 py-3 text-center">
        <span className="font-semibold text-red-500">{item.currentStock}</span>
        <span className="text-gray-400 text-xs"> / {item.minStock} min</span>
      </td>
      <td className="px-4 py-3">
        <RestockPriorityBadge priority={item.priority} />
      </td>
      <td className="px-4 py-3 text-xs text-gray-400">
        {new Date(item.addedAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onRestock(item)}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-xs font-medium transition"
          >
            <FiRefreshCw size={13} /> Restock
          </button>
          <button
            onClick={() => onRemove(item._id)}
            className="text-red-400 hover:text-red-600 transition"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
