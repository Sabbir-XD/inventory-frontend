"use client";
import { useState } from "react";
import { FiTag, FiPlus } from "react-icons/fi";
import API from "@/services/api";

export default function CategoryForm({ onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await API.post("/categories", { name });
      onCreated?.(res.data);
      setName("");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
    >
      <FiTag className="text-indigo-500 text-xl shrink-0" />
      <input
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Category name (e.g. Electronics)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50"
      >
        <FiPlus /> Add
      </button>
    </form>
  );
}
