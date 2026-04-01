// src/app/(dashboard)/dashboard/page.jsx
"use client";

import { useMemo } from "react";
import Card from "@/components/Card";

export default function Dashboard() {
  const orders = [100, 200, 300];

  const revenue = useMemo(() => {
    return orders.reduce((a, b) => a + b, 0);
  }, [orders]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card title="Revenue" value={revenue} />
      <Card title="Orders Today" value={orders.length} />
    </div>
  );
}
