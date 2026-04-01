// hooks/useAuth.js
"use client";

export default function useAuth() {
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  return {
    isAuthenticated: !!token,
  };
}
