export const PRODUCTS = [
    { _id: "p1", name: "Wireless Headphones", price: 89.99 },
    { _id: "p2", name: "Mechanical Keyboard", price: 129.99 },
    { _id: "p3", name: "USB-C Hub 7-Port", price: 49.99 },
    { _id: "p4", name: '27" Monitor Stand', price: 74.99 },
    { _id: "p5", name: "Ergonomic Mouse", price: 59.99 },
    { _id: "p6", name: "Webcam HD 1080p", price: 79.99 },
];

export const STATUSES = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

export const STATUS_NEXT = {
    Pending: "Confirmed",
    Confirmed: "Shipped",
    Shipped: "Delivered",
};

export const AVATAR_COLORS = [
    { bg: "#E6F1FB", fg: "#0C447C" },
    { bg: "#EAF3DE", fg: "#27500A" },
    { bg: "#EEEDFE", fg: "#3C3489" },
    { bg: "#FAEEDA", fg: "#633806" },
    { bg: "#FBEAF0", fg: "#72243E" },
    { bg: "#E1F5EE", fg: "#085041" },
];