// app/(auth)/signup/page.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";

// ── Password-strength-helper ────────────────────
function StrengthBar({ password }) {
  const score = Math.min(4, Math.floor(password.length / 3));
  const colors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className="flex gap-1.5 px-1 mt-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`flex-1 h-1 rounded-full transition-all duration-300 ${
            i < score ? colors[score - 1] : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

// ── Reusable-field ──────────────────────────────
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  hint,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label className="text-[#a0b4cc] text-sm font-medium block">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a6080]">
          {icon}
        </span>
        <input
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white placeholder-[#4a6080] text-sm focus:outline-none focus:border-[#1a56db] focus:ring-1 focus:ring-[#1a56db]/50 transition-all duration-200"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a6080] hover:text-[#a0b4cc] transition-colors"
          >
            {show ? (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {hint}
    </div>
  );
}

// ── Signup-page ─────────────────────────────────
export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password)
      return alert("Please fill in all fields.");
    if (form.password.length < 6)
      return alert("Password must be at least 6 characters.");
    try {
      setLoading(true);
      const res = await API.post("/auth/signup", form);
      alert(res.data.message);
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing inventory smarter — free forever"
    >
      <div className="space-y-4">
        {/* Name */}
        <Field
          label="Full name"
          placeholder="John Kimani"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />

        {/* Email */}
        <Field
          label="Work email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          }
        />

        {/* Password + strength bar */}
        <Field
          label="Password"
          type="password"
          placeholder="Min. 6 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
          hint={<StrengthBar password={form.password} />}
        />

        {/* Terms */}
        <p className="text-[#4a6080] text-xs px-1">
          By signing up you agree to our{" "}
          <Link href="/terms" className="text-[#3b82f6] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#3b82f6] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Submit */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#1a56db] to-[#0ea5e9] hover:from-[#1d4ed8] hover:to-[#0284c7] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:scale-[1.01] active:scale-[0.99]"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p className="text-center text-[#7a90ac] text-sm pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#3b82f6] font-medium hover:text-[#60a5fa] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
