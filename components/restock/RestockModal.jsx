"use client";
import { useState } from "react";
import { FiX, FiPackage } from "react-icons/fi";

export default function RestockModal({ item, onConfirm, onClose }) {
  const [qty, setQty] = useState("");

  const handleConfirm = () => {
    const num = parseInt(qty);
    if (!num || num <= 0) return alert("Enter a valid quantity");
    onConfirm(item._id, num);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <FiPackage className="text-indigo-500" /> Restock Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX />
          </button>
        </div>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            {item.product?.name}
          </span>{" "}
          — current stock:{" "}
          <span className="font-medium text-red-500">{item.currentStock}</span>{" "}
          / min: {item.minStock}
        </p>
        <input
          type="number"
          min="1"
          placeholder="Quantity to add"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
