import { FiAlertTriangle } from "react-icons/fi";

export default function StockWarningBadge({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm px-3 py-2 rounded-lg mt-1">
      <FiAlertTriangle className="shrink-0 text-yellow-500" size={15} />
      <span>{message}</span>
    </div>
  );
}
