// src/pages/admin/OrdersAdmin.jsx
import React, { useMemo, useState } from "react";
import {
  MdSearch,
  MdFileDownload,
  MdAdd,
  MdShoppingBag,
  MdPendingActions,
  MdAutorenew,
  MdCheckCircle,
  MdCancel,
  MdFilterList,
} from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * OrdersAdmin.jsx - Revised: taller rows inside the "Daftar Pesanan" card
 * - Keep stat cards and filter card as before
 * - Increase table row height, avatar size, and card min-height
 */

// --- MOCK DATA (3 sample shown) ---
const mockOrdersAll = [
  {
    id: "ORD-20251208-001",
    customer: "Budi Setiawan",
    email: "budi@email.com",
    product: "Seragam Kantor",
    qty: 25,
    total: 2500000,
    dp: 1250000,
    status: "Menunggu Approve",
    priority: "Tinggi",
    date: "2025-12-08T10:30:00",
  },
  {
    id: "ORD-20251207-012",
    customer: "Sari Dewi",
    email: "sari@email.com",
    product: "Jaket Komunitas",
    qty: 15,
    total: 1750000,
    dp: 1750000,
    status: "Diproses",
    priority: "Sedang",
    date: "2025-12-07T09:15:00",
  },
  {
    id: "ORD-20251206-020",
    customer: "Rama Pratama",
    email: "rama@email.com",
    product: "PDL Perusahaan",
    qty: 40,
    total: 4200000,
    dp: 4200000,
    status: "Selesai",
    priority: "Biasa",
    date: "2025-12-06T14:20:00",
  },
];

const formatIDR = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

// Avatar helper (bigger)
function Avatar({ name }) {
  const initial = (name || "U").charAt(0).toUpperCase();
  const colors = ["bg-blue-500", "bg-pink-500", "bg-green-500", "bg-indigo-500", "bg-yellow-500"];
  const idx = (name || "a").charCodeAt(0) % colors.length;
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${colors[idx]}`}>
      {initial}
    </div>
  );
}

function StatusBadge({ status }) {
  const base = "inline-block px-3 py-1 text-sm rounded-full font-medium";
  if (!status) return null;
  const s = status.toLowerCase();
  if (s.includes("menunggu")) return <span className={base + " bg-yellow-50 text-yellow-800"}>{status}</span>;
  if (s.includes("diproses")) return <span className={base + " bg-blue-50 text-blue-800"}>{status}</span>;
  if (s.includes("selesai")) return <span className={base + " bg-green-50 text-green-800"}>{status}</span>;
  if (s.includes("dibatalkan") || s.includes("batal") || s.includes("reject")) return <span className={base + " bg-red-50 text-red-800"}>{status}</span>;
  return <span className={base + " bg-gray-100 text-gray-800"}>{status}</span>;
}

// Pill
function Pill({ label, color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border ${
        active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
      }`}
    >
      <span className={`w-3 h-3 rounded-full inline-block ${color}`} />
      <span>{label}</span>
    </button>
  );
}

export default function OrdersAdmin() {
  const [orders] = useState(mockOrdersAll);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [fromDate, setFromDate] = useState("2025-12-01");
  const [toDate, setToDate] = useState("2025-12-08");
  const [sortBy, setSortBy] = useState("Tanggal Terbaru");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const stats = useMemo(
    () => ({
      total: 42,
      pending: 5,
      processing: 8,
      done: 26,
      canceled: 3,
      revenue: 32500000,
    }),
    []
  );

  const filtered = useMemo(() => {
    let res = [...orders];
    if (filter !== "Semua") {
      if (filter === "Menunggu Pembayaran") res = res.filter((o) => o.status.toLowerCase().includes("pembayaran"));
      else res = res.filter((o) => o.status.toLowerCase().includes(filter.toLowerCase()));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      res = res.filter((o) => o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.product.toLowerCase().includes(q));
    }
    if (fromDate) {
      const f = new Date(fromDate);
      res = res.filter((o) => new Date(o.date) >= f);
    }
    if (toDate) {
      const t = new Date(toDate);
      t.setHours(23, 59, 59, 999);
      res = res.filter((o) => new Date(o.date) <= t);
    }
    if (sortBy === "Tanggal Terbaru") res.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === "Tanggal Terlama") res.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "Total Terbesar") res.sort((a, b) => (b.total || 0) - (a.total || 0));
    return res;
  }, [orders, filter, query, fromDate, toDate, sortBy]);

  // paging derived
  const totalCount = filtered.length || 42;
  const pages = Math.max(1, Math.ceil(totalCount / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  const currentShown = totalCount === 0 ? "0-0" : `${(page - 1) * perPage + 1}-${Math.min(page * perPage, totalCount)}`;

  function handleApprove(id) { alert("Approved " + id + " (mock)"); }
  function handleReject(id) { alert("Rejected " + id + " (mock)"); }
  function handleExport() { alert("Export CSV (mock)"); }

  const handlePillClick = (label) => () => {
    setFilter(label);
    setPage(1);
  };

  return (
    <div className="flex-1 overflow-y-auto max-w-screen-xl mx-auto w-full px-1">
      <div className="max-w-screen-xl mx-auto h-full flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Pesanan</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola dan verifikasi pesanan pelanggan</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Cari pesanan..."
                className="pl-10 pr-4 py-2 rounded-md border text-sm w-72 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><MdSearch /></div>
            </div>

            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
              <MdAdd /> Tambah Pesanan
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 flex-shrink-0">
          <StatCard title="Total Pesanan" value={stats.total} subtitle="" icon={<MdShoppingBag />} />
          <StatCard title="Menunggu Approve" value={stats.pending} subtitle="" icon={<MdPendingActions />} accent="yellow" />
          <StatCard title="Diproses" value={stats.processing} subtitle="" icon={<MdAutorenew />} accent="blue" />
          <StatCard title="Selesai" value={stats.done} subtitle="" icon={<MdCheckCircle />} accent="green" />
          <StatCard title="Dibatalkan" value={stats.canceled} subtitle="" icon={<MdCancel />} accent="red" />
        </div>

        {/* FILTER STATUS CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-700">Filter Status</h3>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm bg-white hover:bg-gray-50">
                <MdFilterList className="text-gray-600" /> Filter Lainnya
              </button>
              <button onClick={handleExport} className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm bg-white hover:bg-gray-50">
                <MdFileDownload className="text-gray-600" /> Ekspor
              </button>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap mb-4">
            <Pill label="Semua" color="bg-blue-500" active={filter === "Semua"} onClick={handlePillClick("Semua")} />
            <Pill label="Menunggu Pembayaran" color="bg-yellow-400" active={filter === "Menunggu Pembayaran"} onClick={handlePillClick("Menunggu Pembayaran")} />
            <Pill label="Menunggu Approve" color="bg-yellow-300" active={filter === "Menunggu Approve"} onClick={handlePillClick("Menunggu Approve")} />
            <Pill label="Diproses" color="bg-blue-200" active={filter === "Diproses"} onClick={handlePillClick("Diproses")} />
            <Pill label="Selesai" color="bg-green-400" active={filter === "Selesai"} onClick={handlePillClick("Selesai")} />
            <Pill label="Dibatalkan" color="bg-red-400" active={filter === "Dibatalkan"} onClick={handlePillClick("Dibatalkan")} />
          </div>

          <hr className="border-t border-gray-100 mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <div className="text-sm text-gray-600 mb-2">Rentang Tanggal</div>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => { setFromDate(e.target.value); setPage(1); }}
                  className="border rounded px-3 py-2 text-sm w-full md:w-56"
                />
                <div className="text-sm text-gray-400">s/d</div>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => { setToDate(e.target.value); setPage(1); }}
                  className="border rounded px-3 py-2 text-sm w-full md:w-56"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-end gap-3">
                <div className="w-full md:w-1/2">
                  <div className="text-sm text-gray-600 mb-2 text-right md:text-left md:mb-0 md:mr-4">Urutkan Berdasarkan</div>
                  <select
                    className="border rounded px-3 py-2 text-sm w-full"
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                  >
                    <option>Tanggal Terbaru</option>
                    <option>Tanggal Terlama</option>
                    <option>Total Terbesar</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ORDERS TABLE - make card taller and rows taller */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden min-h-[360px]">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="text-sm text-gray-600 font-medium">Daftar Pesanan</div>
            <div className="text-sm text-gray-500">Menampilkan {currentShown} dari {totalCount} pesanan</div>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="py-4">Kode Pesanan</th>
                  <th className="py-4">Pelanggan</th>
                  <th className="py-4">Produk</th>
                  <th className="py-4">Total</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Aksi</th>
                  <th className="py-4">Tanggal</th>
                </tr>
              </thead>

              <tbody>
                {pageData.map((o) => (
                  <tr key={o.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    {/* Increased vertical padding for taller rows */}
                    <td className="py-6 align-top text-sm w-48">
                      <div className="font-medium">{o.id}</div>
                      <div className="text-xs text-gray-400 mt-1">Prioritas: <span className={`font-medium ${o.priority === "Tinggi" ? "text-red-600" : o.priority === "Sedang" ? "text-blue-600" : "text-green-600"}`}>{o.priority}</span></div>
                    </td>

                    <td className="py-6 align-top text-sm w-56">
                      <div className="flex items-center gap-4">
                        <Avatar name={o.customer} />
                        <div>
                          <div className="font-medium text-[15px]">{o.customer}</div>
                          <div className="text-xs text-gray-400 mt-1">{o.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-6 align-top text-sm w-72">
                      <div className="font-medium">{o.product}</div>
                      <div className="text-xs text-gray-400 mt-1">Qty: {o.qty} pcs</div>
                    </td>

                    <td className="py-6 align-top text-sm w-36">
                      <div className="font-medium">{formatIDR(o.total)}</div>
                      <div className="text-xs text-gray-400 mt-1">DP: {formatIDR(o.dp)}</div>
                    </td>

                    <td className="py-6 align-top text-sm w-40">
                      <StatusBadge status={o.status} />
                    </td>

                    <td className="py-6 align-top text-sm w-56">
                      <div className="flex items-center gap-3">
                        {o.status.toLowerCase().includes("menunggu") && (
                          <>
                            <button onClick={() => handleApprove(o.id)} className="text-sm px-3 py-1 rounded bg-green-600 text-white">Approve</button>
                            <button onClick={() => handleReject(o.id)} className="text-sm px-3 py-1 rounded bg-red-500 text-white">Reject</button>
                            <button className="text-sm px-3 py-1 rounded border">Detail</button>
                          </>
                        )}

                        {o.status.toLowerCase().includes("diproses") && (
                          <>
                            <button className="text-sm px-3 py-1 rounded border">Detail</button>
                            <button className="text-sm px-3 py-1 rounded border">Update</button>
                          </>
                        )}

                        {o.status.toLowerCase().includes("selesai") && (
                          <>
                            <button className="text-sm px-3 py-1 rounded border">Detail</button>
                            <button className="text-sm px-3 py-1 rounded border">Invoice</button>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="py-6 align-top text-sm text-gray-500 w-36">
                      <div className="text-sm">{new Date(o.date).toLocaleDateString("id-ID")}</div>
                      <div className="text-xs mt-1">{new Date(o.date).toLocaleTimeString("id-ID")}</div>
                    </td>
                  </tr>
                ))}

                {pageData.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-sm text-gray-500">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* pagination footer */}
          <div className="px-6 py-4 flex items-center justify-between bg-white border-t">
            <div className="text-sm text-gray-500">Menampilkan {currentShown} dari {totalCount} pesanan</div>

            <div className="flex items-center gap-3">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="p-2 rounded border">
                <FiChevronLeft />
              </button>

              <div className="inline-flex items-center gap-1">
                {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                  const n = i + 1;
                  return (
                    <button key={n} onClick={() => setPage(n)} className={`px-3 py-1 rounded ${page === n ? "bg-blue-600 text-white" : "border"}`}>{n}</button>
                  );
                })}
                {pages > 5 && <div className="px-2 text-sm text-gray-400">...</div>}
                {pages > 5 && <button onClick={() => setPage(pages)} className="px-3 py-1 rounded border">{pages}</button>}
              </div>

              <button onClick={() => setPage((p) => Math.min(pages, p + 1))} className="p-2 rounded border">
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* small footer */}
        <div className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} MN Konveksi. Dashboard Admin v2.1
        </div>
      </div>
    </div>
  );
}

/* ---------- small helpers ---------- */

function StatCard({ title, value, subtitle = "", icon, accent = "default" }) {
  const accentBg =
    accent === "yellow" ? "bg-yellow-50 text-yellow-600" :
    accent === "blue" ? "bg-blue-50 text-blue-600" :
    accent === "green" ? "bg-green-50 text-green-600" :
    accent === "red" ? "bg-red-50 text-red-600" :
    "bg-blue-50 text-blue-600";

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">{title}</div>
          <div className="text-2xl font-bold mt-2 text-gray-900">{value}</div>
          {subtitle && <div className="text-xs text-green-600 mt-1">{subtitle}</div>}
        </div>
        <div className={`p-3 rounded-full ${accentBg} opacity-90`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
