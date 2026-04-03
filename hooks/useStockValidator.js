import { useState } from "react";

export default function useStockValidator(stockQty) {
    const [qty, setQty] = useState(1);
    const [warning, setWarning] = useState("");

    const handleChange = (value) => {
        const num = parseInt(value) || 0;
        setQty(num);
        if (num > stockQty) {
            setWarning(
                `Only ${stockQty} item${stockQty !== 1 ? "s" : ""} available in stock`,
            );
        } else {
            setWarning("");
        }
    };

    const isInsufficient = qty > stockQty || qty <= 0;

    return { qty, warning, isInsufficient, handleChange };
}
