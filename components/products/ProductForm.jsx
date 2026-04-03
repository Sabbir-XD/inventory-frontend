"use client";
import { useEffect, useState } from "react";
import { FiPackage, FiPlus } from "react-icons/fi";
import API from "@/services/api";

const empty = { name: "", category: "", price: "", stock: "", minStock: "" };

export default function ProductForm({ onCreated }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/products", form);
      onCreated?.(res.data);
      setForm(empty);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400 w-full";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3"
    >
      <div className="flex items-center gap-2 mb-1 text-indigo-600 font-semibold">
        <FiPackage /> New Product
      </div>
      <input
        className={field}
        placeholder="Product Name"
        value={form.name}
        onChange={set("name")}
        required
      />
      <select
        className={field}
        value={form.category}
        onChange={set("category")}
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-3 gap-3">
        <input
          className={field}
          placeholder="Price"
          type="number"
          min="0"
          value={form.price}
          onChange={set("price")}
          required
        />
        <input
          className={field}
          placeholder="Stock Qty"
          type="number"
          min="0"
          value={form.stock}
          onChange={set("stock")}
          required
        />
        <input
          className={field}
          placeholder="Min Stock"
          type="number"
          min="0"
          value={form.minStock}
          onChange={set("minStock")}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg transition disabled:opacity-50"
      >
        <FiPlus /> {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
