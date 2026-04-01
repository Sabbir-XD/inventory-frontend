"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then((res) => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}/status`, { status });
    alert("Status updated");
  };

  const cancelOrder = async (id) => {
    await API.put(`/orders/${id}/cancel`);
    alert("Order cancelled");
  };

  return (
    <div>
      <h2>Orders</h2>

      {orders.map((order) => (
        <div key={order._id}>
          <h4>{order.customerName}</h4>
          <p>Total: {order.totalPrice}</p>
          <p>Status: {order.status}</p>

          <button onClick={() => updateStatus(order._id, "Shipped")}>
            Ship
          </button>

          <button onClick={() => cancelOrder(order._id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}
