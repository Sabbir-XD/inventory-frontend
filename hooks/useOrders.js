"use client";
import { useState, useEffect, useCallback } from "react";
import API from "@/services/api";

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await API.get("/orders");
            setOrders(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const createOrder = async (payload) => {
        const res = await API.post("/orders", payload);
        setOrders((prev) => [res.data, ...prev]);
        return res.data;
    };

    const updateStatus = async (id, status) => {
        const res = await API.put(`/orders/${id}/status`, { status });
        setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
    };

    const cancelOrder = async (id) => {
        const res = await API.put(`/orders/${id}/cancel`);
        setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
    };

    const deleteOrder = async (id) => {
        await API.delete(`/orders/${id}`);
        setOrders((prev) => prev.filter((o) => o._id !== id));
    };

    return { orders, loading, error, fetchOrders, createOrder, updateStatus, cancelOrder, deleteOrder };
}