export const STATUSES = [
    "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled",
];

export const STATUS_NEXT = {
    Pending: "Confirmed",
    Confirmed: "Shipped",
    Shipped: "Delivered",
    Delivered: null,
    Cancelled: null,
};