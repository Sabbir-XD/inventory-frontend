import { memo } from "react";
import { PRODUCTS } from "./constants";

const th = {
  fontSize: 11,
  fontWeight: 500,
  color: "var(--color-text-secondary)",
  textTransform: "uppercase",
  letterSpacing: ".05em",
  padding: "0 0 8px",
  textAlign: "left",
  borderBottom: "0.5px solid var(--color-border-tertiary)",
};
const td = {
  padding: "7px 0",
  fontSize: 13,
  borderBottom: "0.5px solid var(--color-border-tertiary)",
  color: "var(--color-text-primary)",
  verticalAlign: "middle",
};

const OrderItemsTable = ({ items }) => {
  const total = items.reduce((s, it) => {
    const p = PRODUCTS.find((x) => x._id === it.productId);
    return s + (p ? p.price * it.qty : 0);
  }, 0);

  return (
    <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 12,
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            <th style={{ ...th, width: "45%" }}>Product</th>
            <th style={{ ...th, width: "15%" }}>Qty</th>
            <th style={{ ...th, width: "20%" }}>Unit price</th>
            <th style={{ ...th, width: "20%", textAlign: "right" }}>
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => {
            const p = PRODUCTS.find((x) => x._id === it.productId);
            if (!p) return null;
            return (
              <tr key={i}>
                <td style={td}>{p.name}</td>
                <td style={td}>{it.qty}</td>
                <td style={td}>${p.price.toFixed(2)}</td>
                <td style={{ ...td, textAlign: "right" }}>
                  ${(p.price * it.qty).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
          paddingTop: 10,
          borderTop: "0.5px solid var(--color-border-tertiary)",
          marginBottom: 14,
        }}
      >
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          Order total
        </span>
        <span
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: "var(--color-text-primary)",
          }}
        >
          ${total.toFixed(2)}
        </span>
      </div>
    </>
  );
};

export default memo(OrderItemsTable);
