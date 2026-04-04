import { useState, useEffect } from "react";
import API from "@/services/api";

export default function useRestockQueue() {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQueue = async () => {
        const res = await API.get("/restock-queue");
        setQueue(res.data);
        setLoading(false);
    };

    useEffect(() => {
        (async () => {
            const res = await API.get("/restock-queue");
            setQueue(res.data);
            setLoading(false);
        })();
    }, []);

    const restock = async (id, quantity) => {
        await API.patch(`/restock-queue/${id}/restock`, { quantity });
        await fetchQueue();
    };

    const remove = async (id) => {
        await API.delete(`/restock-queue/${id}`);
        setQueue((prev) => prev.filter((item) => item._id !== id));
    };

    return { queue, loading, restock, remove };
}