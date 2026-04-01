// lib/auth.ts

export async function verifyToken(token) {
  try {
    // example (JWT better verify use)
    return { token };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
