// app/(auth)/login/page.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";

// ── Reusable field ────────────────────────────────────────────────────────────
function Field({ label, type = "text", placeholder, value, onChange, icon }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label className="text-[#a0b4cc] text-sm font-medium block">{label}</label>
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
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Login page ────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router                = useRouter();

  const handleDemoLogin = () =>
    setForm({ email: "demo@gmail.com", password: "Demo@1234567" });

  const handleLogin = async () => {
    if (!form.email || !form.password) return alert("Please fill in all fields.");
    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Inventra account to continue">
      <div className="space-y-4">

        {/* Email */}
        <Field
          label="Email address"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          }
        />

        {/* Password */}
        <Field
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />

        {/* Remember + forgot */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#1a56db]"
            />
            <span className="text-[#7a90ac] text-sm">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-[#3b82f6] text-sm hover:text-[#60a5fa] transition-colors">
            Forgot password?
          </Link>
        </div>

        {/* Sign in */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-[#1a56db] to-[#0ea5e9] hover:from-[#1d4ed8] hover:to-[#0284c7] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:scale-[1.01] active:scale-[0.99]"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {/* Divider */}
        <div className="relative flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[#4a6080] text-xs">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Demo */}
        <button
          onClick={handleDemoLogin}
          className="w-full flex items-center justify-center gap-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-[#a0b4cc] font-medium py-3.5 rounded-xl transition-all duration-200"
        >
          <svg className="w-4 h-4 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Try Demo Account
        </button>

        <p className="text-center text-[#7a90ac] text-sm pt-2">
          Don&apos;t have an account?
          <Link href="/signup" className="text-[#3b82f6] font-medium hover:text-[#60a5fa] transition-colors">
            Create one free
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}