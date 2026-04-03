"use client";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import API from "@/services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleCreated = (p) => setProducts((prev) => [...prev, p]);
  const handleDeleted = (id) =>
    setProducts((prev) => prev.filter((p) => p._id !== id));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <ProductForm onCreated={handleCreated} />
      <ProductList products={products} onDeleted={handleDeleted} />
    </div>
  );
}
