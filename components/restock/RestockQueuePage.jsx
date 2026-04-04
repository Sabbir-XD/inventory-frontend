"use client";

import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import useRestockQueue from "@/hooks/useRestockQueue";
import RestockQueueList from "./RestockQueueList";
import RestockModal from "./RestockModal";

export default function RestockQueuePage() {
  const { queue, loading, restock, remove } = useRestockQueue();
  const [selected, setSelected] = useState(null);

  if (loading)
    return <p className="text-sm text-gray-400 p-8">Loading queue...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-1">
        <FiAlertCircle className="text-red-500" /> Restock Queue
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        Products below minimum stock threshold — ordered by lowest stock first.
      </p>

      <RestockQueueList
        queue={queue}
        onRestock={setSelected}
        onRemove={remove}
      />

      {selected && (
        <RestockModal
          item={selected}
          onConfirm={restock}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
