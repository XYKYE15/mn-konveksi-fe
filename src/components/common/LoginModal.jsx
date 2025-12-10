import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * props:
 * - open: boolean (tampilkan modal)
 * - onClose: function
 * - role: "user" | "admin" (default "user")
 *
 * Usage:
 * <LoginModal open={open} onClose={() => setOpen(false)} role="user" />
 */
export default function LoginModal({ open, onClose, role = "user" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  // local loading & error (karena kita fetch langsung)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Isi email dan password.");
      return;
    }

    setIsLoading(true);
    try {
      // endpoint menyesuaikan implementasi backend kamu
      const res = await fetch("https://be-mn-konveksi.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({})); // guard json parse

      if (!res.ok) {
        const msg = data?.message || data?.error || "Login gagal, periksa kredensial.";
        throw new Error(msg);
      }

      // coba berbagai bentuk respons umum
      const token = data.token || data.accessToken || data.access_token || data.data?.token || "";
      const user = data.user || data.data?.user || data.data || null;

      // simpan token & user ke localStorage (jika tersedia)
      if (token) {
        try {
          localStorage.setItem("mn_token", token);
        } catch (e) {
          console.warn("Gagal menyimpan token ke localStorage", e);
        }
      }
      if (user) {
        try {
          localStorage.setItem("mn_user", JSON.stringify(user));
        } catch (e) {
          console.warn("Gagal menyimpan user ke localStorage", e);
        }
      }

      // beri tahu komponen lain bahwa auth berubah (Header dll)
      window.dispatchEvent(new Event("authChanged"));

      // tentukan role: prioritas ke role dari backend, fallback ke prop role
      const roleFromUser = (user?.role || user?.role_name || user?.roleType || "").toString().toLowerCase();
      const finalRole = roleFromUser || role || "customer";

      if (finalRole.includes("admin")) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      onClose?.();
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.message || "Terjadi kesalahan saat login.");
    } finally {
      setIsLoading(false);
    }
  }

  function fillDemo() {
    if (role === "admin") {
      setEmail("admin@konveksi.test");
      setPassword("password123");
    } else {
      setEmail("user@konveksi.test");
      setPassword("password123");
    }
  }

  return (
    // overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* close x */}
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-600 hover:text-black">
          <span className="text-lg font-bold">x</span>
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center">Masuk</h2>
          <p className="text-xs text-center text-gray-500 mt-2">Detail kata sandi adalah hal sensitif</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <div className="flex items-center border rounded-full px-3 py-2 gap-3">
                {/* user icon */}
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20v-1c0-2.761 4.477-5 8-5s8 2.239 8 5v1" />
                </svg>
                <input
                  className="w-full outline-none text-sm"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center border rounded-full px-3 py-2 gap-3">
                {/* eye icon */}
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                </svg>

                <input
                  className="w-full outline-none text-sm"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kata sandi"
                  required
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-gray-500">
                  {showPwd ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 012.15-3.477M3 3l18 18" /></svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c1.161 0 2.284.17 3.324.487" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full rounded-full py-3 text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-gray-700 hover:opacity-95"}`}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>

          {/* error */}
          {error && (
            <div className="mt-3 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          {/* separator */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">atau lanjutkan dengan</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Google button (non functional, UI only) */}
          <div>
            <button
              type="button"
              className="w-full rounded-full py-3 border flex items-center justify-center gap-2"
              onClick={() => alert("Integrasi Google sign-in nanti")}
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="google" className="w-5 h-5" />
              <span className="text-sm">Lanjutkan dengan Google</span>
            </button>
          </div>

          {/* Buat akun */}
          <div className="mt-6 text-center">
            <h3 className="text-base font-semibold">Buat Akun</h3>
            <button
              onClick={() => {
                onClose?.();
                if (role === "admin") navigate("/admin/register");
                else navigate("/register");
              }}
              className="mt-3 w-full rounded-full py-3 border"
            >
              Buat Akun
            </button>
          </div>

          {/* demo creds */}
          <div className="mt-5 text-center text-xs text-gray-400">
            <button onClick={fillDemo} className="underline">Isi demo creds</button>
          </div>
        </div>
      </div>
    </div>
  );
}
