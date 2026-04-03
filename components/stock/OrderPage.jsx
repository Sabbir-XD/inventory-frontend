"use client";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import OrderForm from "./OrderForm";
import API from "@/services/api";

export default function OrderPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    API.get("/products?status=active").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOrderPlaced = () => {
    alert("Order placed successfully!");
    fetchProducts(); // refresh stock
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiShoppingCart className="text-indigo-500" /> Place Order
      </h1>
      {products.length === 0 ? (
        <p className="text-sm text-gray-400">No active products available.</p>
      ) : (
        <OrderForm products={products} onOrderPlaced={handleOrderPlaced} />
      )}
    </div>
  );
}
