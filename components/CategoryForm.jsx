"use client";
import { useState } from "react";
import API from "@/services/api";

export default function CategoryForm({ onSuccess }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/categories", { name });
      alert("Category created");
      setName("");
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Category</button>
    </form>
  );
}
