import API from "./api";

export const orderService = {
  // GET /orders?status=Pending
  getOrders: (status = "") =>
    API.get("/orders", { params: status ? { status } : {} }),

  // POST /orders
  createOrder: (data) => API.post("/orders", data),

  // PUT /orders/:id/status
  updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status }),

  // PUT /orders/:id/cancel
  cancelOrder: (id) => API.put(`/orders/${id}/cancel`),
};

export async function placeOrder(productId, quantity) {
  const res = await API.post("/orders", { productId, quantity });
  return res.data;
}

export async function deductStock(productId, quantity) {
  const res = await API.patch(`/products/${productId}/deduct-stock`, {
    quantity,
  });
  return res.data;
}
