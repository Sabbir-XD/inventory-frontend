import { useState, useCallback } from "react";
import { orderService } from "@/services/order.service";

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleError = (err) =>
        setError(err?.response?.data?.message ?? "Something went wrong");

    const fetchOrders = useCallback(async (status = "") => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await orderService.getOrders(status);
            setOrders(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createOrder = useCallback(async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await orderService.createOrder(payload);
            setOrders((prev) => [data, ...prev]);
            return data;
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateStatus = useCallback(async (id, status) => {
        setError(null);
        try {
            const { data } = await orderService.updateStatus(id, status);
            setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
        } catch (err) {
            handleError(err);
        }
    }, []);

    const cancelOrder = useCallback(async (id) => {
        setError(null);
        try {
            const { data } = await orderService.cancelOrder(id);
            setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
        } catch (err) {
            handleError(err);
        }
    }, []);

    return {
        orders,
        loading,
        error,
        fetchOrders,
        createOrder,
        updateStatus,
        cancelOrder,
    };
}
