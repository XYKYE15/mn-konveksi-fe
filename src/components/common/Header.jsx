// src/components/common/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LoginModal from "./LoginModal";

export default function Header() {
  const navigate = useNavigate();
  const [openUserLogin, setOpenUserLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // state untuk cek login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fungsi cek token
    const check = () => {
      const token = localStorage.getItem("mn_token");
      setIsLoggedIn(!!token);
    };

    // set awal
    check();

    // listener untuk event kustom authChanged
    const onAuthChanged = () => {
      check();
    };
    window.addEventListener("authChanged", onAuthChanged);

    // juga dengarkan perubahan storage (multi-tab)
    const onStorage = (e) => {
      if (e.key === "mn_token" || e.key === "mn_user") {
        check();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("authChanged", onAuthChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // fungsi logout
  function handleLogout() {
    localStorage.removeItem("mn_token");
    localStorage.removeItem("mn_user");

    // beri tahu komponen lain supaya update juga
    window.dispatchEvent(new Event("authChanged"));

    setIsLoggedIn(false);
    navigate("/", { replace: true });
  }

  return (
    <header className="bg-[#57595B] border-b border-gray-500 w-full">
      <div className="w-full px-4 md:px-6 py-3 flex items-center relative">
        {/* BRAND */}
        <Link
          to="/"
          className="text-2xl font-serif tracking-wider text-white drop-shadow-[0_0_1px_rgba(0,0,0,0.7)]"
        >
          MN KONVEKSI
        </Link>

        {/* NAV */}
        <nav className="flex-1 flex justify-center items-center">
          <ul className="hidden md:flex gap-8 text-gray-200 text-sm">
            <li><Link to="/" className="hover:text-white transition">Beranda</Link></li>
            <li><Link to="/produk" className="hover:text-white transition">Produk</Link></li>
            <li><Link to="/tentang" className="hover:text-white transition">Tentang</Link></li>
            <li><Link to="/kontak" className="hover:text-white transition">Kontak</Link></li>
          </ul>

          <div className="md:hidden text-gray-200 text-sm">Menu</div>
        </nav>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="p-1 rounded hover:bg-white/10 transition"
            title="Cari"
          >
            <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer text-gray-200 hover:text-white transition" />
          </button>

          {/* Login / Logout Button */}
          {!isLoggedIn ? (
            <button
              onClick={() => setOpenUserLogin(true)}
              className="text-sm text-gray-200 hover:text-white transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm text-red-300 hover:text-red-500 font-semibold transition"
            >
              Logout
            </button>
          )}

          {/* mobile hamburger */}
          <button
            className="md:hidden p-1 rounded hover:bg-white/10 transition"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Open menu"
          >
            {mobileOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-200" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`md:hidden bg-[#5a5a5a] border-t border-gray-600 overflow-hidden transition-max-h duration-300 ${
          mobileOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-4 pb-3 pt-2 gap-2 text-gray-200">
          <li><Link to="/" className="block py-2 hover:text-white">Beranda</Link></li>
          <li><Link to="/produk" className="block py-2 hover:text-white">Produk</Link></li>
          <li><Link to="/tentang" className="block py-2 hover:text-white">Tentang</Link></li>
          <li><Link to="/kontak" className="block py-2 hover:text-white">Kontak</Link></li>

          {/* mobile logout button */}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="block py-2 text-red-300 hover:text-red-500 font-semibold"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Login Modal */}
      <LoginModal open={openUserLogin} onClose={() => setOpenUserLogin(false)} role="user" />
    </header>
  );
}
