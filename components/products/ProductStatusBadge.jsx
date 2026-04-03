export default function ProductStatusBadge({ stock, minStock }) {
  const isOutOfStock = stock === 0;
  const isLow = stock > 0 && stock <= minStock;

  if (isOutOfStock)
    return (
      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-600">
        Out of Stock
      </span>
    );

  if (isLow)
    return (
      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
        Low Stock
      </span>
    );

  return (
    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
      Active
    </span>
  );
}
