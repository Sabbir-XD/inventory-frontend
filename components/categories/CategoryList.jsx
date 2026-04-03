"use client";
import { FiTag, FiTrash2 } from "react-icons/fi";
import API from "@/services/api";

export default function CategoryList({ categories, onDeleted }) {
  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await API.delete(`/categories/${id}`);
      onDeleted?.(id);
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting");
    }
  };

  if (!categories.length)
    return <p className="text-sm text-gray-400 mt-4">No categories yet.</p>;

  return (
    <ul className="mt-4 space-y-2">
      {categories.map((cat) => (
        <li
          key={cat._id}
          className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FiTag className="text-indigo-400" />
            {cat.name}
          </span>
          <button
            onClick={() => handleDelete(cat._id)}
            className="text-red-400 hover:text-red-600 transition"
          >
            <FiTrash2 size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
}
