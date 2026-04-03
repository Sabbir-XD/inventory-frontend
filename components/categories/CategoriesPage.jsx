"use client";

import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import API from "@/services/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleCreated = (cat) => setCategories((prev) => [...prev, cat]);
  const handleDeleted = (id) =>
    setCategories((prev) => prev.filter((c) => c._id !== id));

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Categories</h1>
      <CategoryForm onCreated={handleCreated} />
      <CategoryList categories={categories} onDeleted={handleDeleted} />
    </div>
  );
}
