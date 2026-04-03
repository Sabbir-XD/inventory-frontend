"use client";
import { FiTrash2 } from "react-icons/fi";
import ProductStatusBadge from "./ProductStatusBadge";
import API from "@/services/api";

export default function ProductList({ products, onDeleted }) {
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      onDeleted?.(id);
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting");
    }
  };

  if (!products.length)
    return <p className="text-sm text-gray-400 mt-4">No products yet.</p>;

  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            {[
              "Name",
              "Category",
              "Price",
              "Stock",
              "Min Stock",
              "Status",
              "",
            ].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
              <td className="px-4 py-3 text-gray-500">
                {p.category?.name || "—"}
              </td>
              <td className="px-4 py-3 text-gray-700">
                ${Number(p.price).toFixed(2)}
              </td>
              <td className="px-4 py-3">{p.stock}</td>
              <td className="px-4 py-3">{p.minStock}</td>
              <td className="px-4 py-3">
                <ProductStatusBadge stock={p.stock} minStock={p.minStock} />
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <FiTrash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
