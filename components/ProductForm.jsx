"use client";
import { useEffect, useState } from "react";
import API from "@/services/api";

export default function ProductForm() {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
  });

  // fetch categories
  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", form);
      alert("Product created");

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        minStock: "",
      });
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        placeholder="Stock"
        type="number"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <input
        placeholder="Min Stock"
        type="number"
        value={form.minStock}
        onChange={(e) => setForm({ ...form, minStock: e.target.value })}
      />

      <button type="submit">Add Product</button>
    </form>
  );
}
