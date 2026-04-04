import { memo } from "react";
import { STATUSES } from "./constants";
import { MdTune } from "react-icons/md";

const FILTERS = ["All", ...STATUSES];

const Toolbar = ({ filter, sort, onFilter, onSort }) => (
  <div className="flex items-center gap-3 mb-4 flex-wrap">
    {/* Filter pills */}
    <div className="flex items-center gap-1.5 flex-wrap flex-1">
      {FILTERS.map((f) => {
        const active = filter === f;
        return (
          <button
            key={f}
            onClick={() => onFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all
              ${
                active
                  ? "bg-[#042C53] text-white"
                  : "bg-transparent border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
          >
            {f}
          </button>
        );
      })}
    </div>

    {/* Sort */}
    <div className="flex items-center gap-2">
      <MdTune size={14} className="text-gray-400" />
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className="h-8 px-2.5 border border-gray-200 rounded-lg bg-white
          text-gray-500 text-xs outline-none cursor-pointer"
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="total-desc">Highest total</option>
        <option value="total-asc">Lowest total</option>
      </select>
    </div>
  </div>
);

export default memo(Toolbar);
