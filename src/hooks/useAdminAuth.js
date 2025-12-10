// src/hooks/useAdminAuth.js
import { useMutation } from "@tanstack/react-query";

/**
 * Mock admin auth.
 * valid: admin@konveksi.test / password123
 */
function loginFn({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@konveksi.test" && password === "password123") {
        resolve({
          token: "mock-admin-token-123",
          user: { id: 1, name: "Admin Konveksi", email, role: "admin" },
        });
      } else {
        reject({ message: "Email atau password admin salah" });
      }
    }, 700);
  });
}

export default function useAdminAuth() {
  // v5 syntax: pass an options object with mutationFn
  const m = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      sessionStorage.setItem("auth_token", data.token);
      sessionStorage.setItem("auth_user", JSON.stringify(data.user));
    },
  });

  function logout() {
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
  }

  function isAuthenticated() {
    return !!sessionStorage.getItem("auth_token");
  }

  return {
    login: m.mutate,
    loginAsync: m.mutateAsync,
    isLoading: m.isLoading,
    isError: m.isError,
    error: m.error,
    logout,
    isAuthenticated,
  };
}
