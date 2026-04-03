import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantityInput({ qty, stock, onChange }) {
  const decrement = () => onChange(Math.max(1, qty - 1));
  const increment = () => onChange(qty + 1);

  const isOver = qty > stock;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={decrement}
        disabled={qty <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
      >
        <FiMinus size={13} />
      </button>

      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        className={`w-16 text-center border rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 ${
          isOver
            ? "border-red-400 focus:ring-red-300"
            : "border-gray-300 focus:ring-indigo-400"
        }`}
      />

      <button
        type="button"
        onClick={increment}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        <FiPlus size={13} />
      </button>

      <span className="text-xs text-gray-400">/ {stock} in stock</span>
    </div>
  );
}
