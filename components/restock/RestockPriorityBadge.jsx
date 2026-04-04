import { FiArrowUp, FiMinus, FiArrowDown } from "react-icons/fi";

const config = {
  high: {
    label: "High",
    icon: FiArrowUp,
    cls: "bg-red-100 text-red-700 border-red-200",
  },
  medium: {
    label: "Medium",
    icon: FiMinus,
    cls: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  low: {
    label: "Low",
    icon: FiArrowDown,
    cls: "bg-green-100 text-green-700 border-green-200",
  },
};

export default function RestockPriorityBadge({ priority }) {
  const { label, icon: Icon, cls } = config[priority] || config.low;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border ${cls}`}
    >
      <Icon size={11} /> {label}
    </span>
  );
}
