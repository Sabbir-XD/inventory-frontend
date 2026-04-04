// components/StatCard.jsx
export default function StatCard({ label, value, sub, subType = "neutral" }) {
  const subColors = {
    success: "text-green-700",
    danger: "text-red-600",
    neutral: "text-gray-400",
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">
        {label}
      </span>
      <span className="text-2xl font-medium text-gray-900 leading-none">
        {value}
      </span>
      {sub && (
        <span className={`text-[12px] mt-0.5 ${subColors[subType]}`}>
          {sub}
        </span>
      )}
    </div>
  );
}
