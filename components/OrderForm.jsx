"use client";
import { useEffect, useState } from "react";
import API from "@/services/api";

export default function OrderForm() {
  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] = useState("");

  const [items, setItems] = useState([{ product: "", quantity: 1 }]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { product: "", quantity: 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/orders", {
        customerName,
        items,
      });

      alert("Order created");

      setCustomerName("");
      setItems([{ product: "", quantity: 1 }]);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      {items.map((item, index) => (
        <div key={index}>
          <select
            value={item.product}
            onChange={(e) => handleItemChange(index, "product", e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Stock: {p.stock})
              </option>
            ))}
          </select>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
          />
        </div>
      ))}

      <button type="button" onClick={addItem}>
        + Add More Product
      </button>

      <button type="submit">Create Order</button>
    </form>
  );
}
