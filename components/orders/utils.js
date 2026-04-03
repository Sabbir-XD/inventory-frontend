import { PRODUCTS, AVATAR_COLORS } from "./constants";

let _counter = 10;
export const uid = () => `ord-${++_counter}`;

export const calcTotal = (items) =>
    items.reduce((sum, it) => {
        const p = PRODUCTS.find((x) => x._id === it.productId);
        return sum + (p ? p.price * (parseInt(it.qty) || 0) : 0);
    }, 0);

export const initials = (name) =>
    name.trim().split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export const avatarColor = (name) =>
    AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export const SEED_ORDERS = [
    { id: "ord-1", customer: "Alex Johnson", date: "2026-04-01", status: "Delivered", items: [{ productId: "p1", qty: 2 }, { productId: "p5", qty: 1 }] },
    { id: "ord-2", customer: "Sara Ahmed", date: "2026-04-02", status: "Shipped", items: [{ productId: "p2", qty: 1 }, { productId: "p3", qty: 2 }] },
    { id: "ord-3", customer: "Carlos Rivera", date: "2026-04-02", status: "Confirmed", items: [{ productId: "p4", qty: 1 }] },
    { id: "ord-4", customer: "Mei Lin", date: "2026-04-03", status: "Pending", items: [{ productId: "p6", qty: 3 }, { productId: "p1", qty: 1 }] },
    { id: "ord-5", customer: "Tom Baker", date: "2026-03-30", status: "Cancelled", items: [{ productId: "p2", qty: 2 }] },
];