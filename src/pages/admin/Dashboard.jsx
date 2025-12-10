// src/pages/admin/Dashboard.jsx
import React from "react";
import {
  MdInventory,
  MdPendingActions,
  MdFactory,
  MdAttachMoney,
  MdAdd,
  MdBarChart,
} from "react-icons/md";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("mn_user") || "{}");

  const stats = {
    totalOrders: 128,
    totalOrdersDelta: 12,
    pendingApprove: 7,
    processing: 15,
    totalRevenue: 32500000,
  };

  const recentOrders = [
    {
      code: "ORD-20251208-001",
      customer: "Budi Setiawan",
      product: "Seragam Kantor",
      total: 2500000,
      status: "Menunggu Approve",
      date: "08-12-2025",
    },
    {
      code: "ORD-20251207-004",
      customer: "Sari Dewi",
      product: "Jaket Komunitas",
      total: 1750000,
      status: "Diproses",
      date: "07-12-2025",
    },
    {
      code: "ORD-20251206-010",
      customer: "Rama Pratama",
      product: "PDL Perusahaan",
      total: 4200000,
      status: "Selesai",
      date: "06-12-2025",
    },
  ];

  const salesSummary = {
    todayOrders: 5,
    weekOrders: 23,
    monthOrders: 87,
    monthRevenue: stats.totalRevenue,
  };

  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const statusBadge = (status) => {
    const base = "inline-block px-3 py-0.5 text-sm rounded-full font-medium";

    if (status.includes("Menunggu"))
      return (
        <span className={base + " bg-yellow-50 text-yellow-800 border border-yellow-100"}>
          {status}
        </span>
      );

    if (status.includes("Diproses"))
      return (
        <span className={base + " bg-blue-50 text-blue-800 border border-blue-100"}>
          {status}
        </span>
      );

    if (status.includes("Selesai"))
      return (
        <span className={base + " bg-green-50 text-green-800 border border-green-100"}>
          {status}
        </span>
      );

    return (
      <span className={base + " bg-gray-50 text-gray-800 border border-gray-100"}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto max-w-screen-xl mx-auto w-full">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Ringkasan aktivitas pesanan & penjualan.</p>
          </div>

          <div className="text-right text-sm text-gray-500">
            <p>
              Admin: <span className="font-medium text-gray-800">{user.nama || "Randika"}</span>
            </p>
            <p className="mt-1 text-gray-400 text-xs">
              Terakhir login: <span className="font-normal">08 Des 2025</span>
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Card shared style */}
          <Card>
            <div className="text-sm text-gray-500">Total Pesanan</div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-3xl font-semibold text-gray-900">{stats.totalOrders}</div>
                <div className="text-xs text-green-600 mt-1">+{stats.totalOrdersDelta}</div>
              </div>
              <div className="text-gray-200">
                <MdInventory size={44} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-sm text-gray-500">Menunggu Approve</div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-3xl font-semibold text-gray-900">{stats.pendingApprove}</div>
                <div className="text-xs text-orange-600 mt-1"></div>
              </div>
              <div className="text-gray-200">
                <MdPendingActions size={44} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-sm text-gray-500">Sedang Diproses</div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-3xl font-semibold text-gray-900">{stats.processing}</div>
                <div className="text-xs text-gray-500 mt-1"></div>
              </div>
              <div className="text-gray-200">
                <MdFactory size={44} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-sm text-gray-500">Total Pendapatan</div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{formatIDR(stats.totalRevenue)}</div>
                <div className="text-xs text-gray-500 mt-1">Periode bulan ini</div>
              </div>
              <div className="text-gray-200">
                <MdAttachMoney size={44} />
              </div>
            </div>
          </Card>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Table (2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Pesanan Terbaru</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline">Lihat semua</a>
              </div>

              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 text-xs uppercase tracking-wide">
                        <th className="py-3 px-4">Kode</th>
                        <th className="py-3 px-4">Pelanggan</th>
                        <th className="py-3 px-4">Produk</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Tanggal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentOrders.map((o, idx) => (
                        <tr
                          key={o.code}
                          className={`${idx < recentOrders.length - 1 ? "border-b" : ""} border-gray-100 hover:bg-gray-50`}
                        >
                          <td className="py-3 px-4 font-medium text-gray-700">{o.code}</td>
                          <td className="py-3 px-4 text-gray-600">{o.customer}</td>
                          <td className="py-3 px-4 text-gray-600">{o.product}</td>
                          <td className="py-3 px-4 text-gray-700">{formatIDR(o.total)}</td>
                          <td className="py-3 px-4">{statusBadge(o.status)}</td>
                          <td className="py-3 px-4 text-gray-400">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Ringkasan */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Ringkasan Penjualan</h3>
                  <p className="text-xs text-gray-400 mt-1">Ringkasan singkat performa</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-3">
                <div className="flex justify-between">
                  <span>Pesanan hari ini</span>
                  <span className="font-medium">{salesSummary.todayOrders} pesanan</span>
                </div>

                <div className="flex justify-between">
                  <span>Pesanan minggu ini</span>
                  <span className="font-medium">{salesSummary.weekOrders} pesanan</span>
                </div>

                <div className="flex justify-between">
                  <span>Pesanan bulan ini</span>
                  <span className="font-medium">{salesSummary.monthOrders} pesanan</span>
                </div>

                <div className="flex justify-between">
                  <span>Pendapatan bulan ini</span>
                  <span className="font-medium text-green-600">{formatIDR(salesSummary.monthRevenue)}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-full px-4 py-2 text-sm shadow-md hover:opacity-95">
                  <MdAdd size={18} /> Tambah Produk
                </button>

                <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm hover:bg-gray-50">
                  <MdBarChart size={18} /> Lihat Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card small component defined below to keep JSX cleaner */}
      {/* NOTE: In real project you can move Card to its own file */}
    </div>
  );
}

/* Inline Card component (kepraktisan) */
function Card({ children }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      {children}
    </div>
  );
}
