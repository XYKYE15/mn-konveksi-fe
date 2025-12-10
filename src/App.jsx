// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/common/Header";

/* Customer pages */
import Catalog from "./pages/customer/Home";
import ProductDetail from "./pages/customer/ProductDetail";

/* Admin pages */
import AdminLoginPage from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import ProductsAdmin from "./pages/admin/ProductsAdmin";

/* Admin layout that includes Sidebar (placed in src/pages/admin/AdminLayout.jsx) */
import AdminLayout from "./pages/admin/AdminLayout";

/* ===== Helpers (auth checks) ===== */
function getToken() {
  return localStorage.getItem("mn_token") || null;
}
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("mn_user") || "null");
  } catch {
    return null;
  }
}

/* ===== Guards ===== */
function PrivateAdmin({ children }) {
  const token = getToken();
  const user = getUser();

  if (!token) return <Navigate to="/admin/login" replace />;

  const role = (user?.role || "").toString().toLowerCase();
  if (!role.includes("admin")) return <Navigate to="/" replace />;

  return children;
}

function PrivateUser({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const location = useLocation();

  // detect admin area (any path starting with /admin)
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header hanya tampil untuk customer/public pages */}
      {!isAdminRoute && <Header />}

      {/* Main: admin area uses full-width (AdminLayout has fixed sidebar) */}
      {isAdminRoute ? (
        <main className="min-h-screen">
          <Routes>
            {/* Admin login (standalone) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin area (protected) */}
            <Route
              path="/admin"
              element={
                <PrivateAdmin>
                  <AdminLayout />
                </PrivateAdmin>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
              {/* add other admin child routes here (users, reports, settings, etc.) */}
            </Route>

            {/* fallback for other /admin/* */}
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </main>
      ) : (
        /* Public/customer area wrapped in container */
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/product/:slug" element={<ProductDetail />} />

            {/* Example protected customer page */}
            <Route
              path="/profile"
              element={
                <PrivateUser>
                  <div>
                    <h2 className="text-2xl font-bold">Profile Pelanggan</h2>
                    <p className="text-sm text-gray-600">
                      Halaman profile / riwayat pesanan (butuh login user)
                    </p>
                  </div>
                </PrivateUser>
              }
            />

            {/* 404 fallback */}
            <Route path="*" element={<div>404 — Halaman tidak ditemukan</div>} />
          </Routes>
        </main>
      )}
    </div>
  );
}
