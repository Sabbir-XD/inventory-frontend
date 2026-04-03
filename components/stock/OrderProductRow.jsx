import { FiPackage } from "react-icons/fi";
import QuantityInput from "./QuantityInput";
import StockWarningBadge from "./StockWarningBadge";
import useStockValidator from "@/hooks/useStockValidator";

export default function OrderProductRow({ product, onQtyChange }) {
  const { qty, warning, isInsufficient, handleChange } = useStockValidator(
    product.stock,
  );

  const handleQtyUpdate = (val) => {
    handleChange(val);
    onQtyChange(product._id, val, val > product.stock);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium text-gray-800">
          <FiPackage className="text-indigo-400" />
          {product.name}
        </div>
        <span className="text-sm text-gray-500">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>

      <QuantityInput
        qty={qty}
        stock={product.stock}
        onChange={handleQtyUpdate}
      />
      <StockWarningBadge message={warning} />

      {product.stock === 0 && (
        <p className="text-xs font-semibold text-red-500 mt-1">
          This product is Out of Stock
        </p>
      )}
    </div>
  );
}
