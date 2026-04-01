// components/auth/AuthLayout.jsx
export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex font-sans bg-[#0b0f1a]">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-14">
        {/* Backgrounds */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b3e] via-[#091229] to-[#0b0f1a]" />
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#1a56db]/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#0ea5e9]/15 blur-[100px]" />
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#6366f1]/10 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-blue-900/40">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
              />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Inventra
          </span>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-[#1a56db] text-sm font-semibold tracking-widest uppercase mb-4">
              Smart Inventory &amp; Orders
            </p>
            <h1 className="text-white text-5xl font-bold leading-[1.15] tracking-tight">
              Full control of your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9]">
                supply chain
              </span>{" "}
              in one place.
            </h1>
            <p className="text-[#8ca0c0] text-lg mt-5 leading-relaxed max-w-md">
              Manage products, monitor stock levels, process customer orders,
              and streamline fulfillment — all from a single, powerful
              dashboard.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {[
              "Real-time Stock",
              "Order Fulfillment",
              "Analytics",
              "Role-based Access",
            ].map((f) => (
              <span
                key={f}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-[#a0b4cc] backdrop-blur-sm"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { val: "99.9%", label: "Uptime" },
              { val: "10K+", label: "Products tracked" },
              { val: "500+", label: "Businesses" },
            ].map((s) => (
              <div
                key={s.label}
                className="border border-white/10 rounded-2xl p-5 bg-white/[0.03] backdrop-blur-sm"
              >
                <p className="text-white text-2xl font-bold">{s.val}</p>
                <p className="text-[#7a90ac] text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust row */}
        <div className="relative z-10 flex items-center gap-4 border-t border-white/10 pt-8">
          <div className="flex -space-x-3">
            {["#1a56db", "#0ea5e9", "#6366f1"].map((c, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-[#0b0f1a] flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: c }}
              >
                {["JK", "AS", "MR"][i]}
              </div>
            ))}
          </div>
          <p className="text-[#7a90ac] text-sm">
            Trusted by{" "}
            <span className="text-white font-semibold">500+ businesses</span>{" "}
            worldwide
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute inset-0 bg-[#0f1420]" />
        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a56db] to-[#0ea5e9] flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                />
              </svg>
            </div>
            <span className="text-white font-bold">Inventra</span>
          </div>

          <h2 className="text-white text-3xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="text-[#7a90ac] mt-2 text-sm">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
