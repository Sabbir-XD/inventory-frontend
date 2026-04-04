import RestockQueueRow from "./RestockQueueRow";

export default function RestockQueueList({ queue, onRestock, onRemove }) {
  if (!queue.length)
    return (
      <p className="text-sm text-gray-400 mt-6 text-center">
        No products in restock queue.
      </p>
    );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mt-4">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            {["Product", "Stock", "Priority", "Added", "Actions"].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {queue.map((item) => (
            <RestockQueueRow
              key={item._id}
              item={item}
              onRestock={onRestock}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
