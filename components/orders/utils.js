const AVATAR_COLORS = [
    { bg: "bg-blue-50", text: "text-blue-800" },
    { bg: "bg-teal-50", text: "text-teal-800" },
    { bg: "bg-purple-50", text: "text-purple-800" },
    { bg: "bg-amber-50", text: "text-amber-800" },
    { bg: "bg-pink-50", text: "text-pink-800" },
];

export const initials = (name = "") =>
    name.trim().split(" ").filter(Boolean)
        .slice(0, 2).map((w) => w[0].toUpperCase()).join("");

export const avatarColor = (name = "") =>
    AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export const shortId = (id = "") => "#" + id.slice(-6).toUpperCase();

export const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
    });
};

export const formatPrice = (amount = 0) =>
    "$" + Number(amount).toFixed(2);