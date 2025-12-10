// src/pages/admin/ProductsAdmin.jsx
import React, { useMemo, useState } from "react";
import {
  MdEdit,
  MdDelete,
  MdSearch,
  MdFileDownload,
  MdGridView,
  MdViewList,
  MdFilterList,
} from "react-icons/md";

/* -------------------- Mock Data -------------------- */
const mockProducts = [
  {
    id: "PRD-001",
    name: "Seragam Kantor Premium",
    code: "PRD-001",
    price: 250000,
    category: "Seragam",
    status: "Aktif",
    popular: true,
    material: "Oxford / Drill",
    estimasi: "3-5 Hari",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "PRD-002",
    name: "Jaket Komunitas",
    code: "PRD-002",
    price: 180000,
    category: "Jaket",
    status: "Aktif",
    popular: false,
    material: "Fleece / Cotton",
    estimasi: "4-7 Hari",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "PRD-003",
    name: "PDL Perusahaan",
    code: "PRD-003",
    price: 300000,
    category: "PDL",
    status: "Aktif",
    popular: false,
    material: "American Drill",
    estimasi: "5-7 Hari",
    img: "https://images.unsplash.com/photo-1520975925403-9a6d8f6d1d7f?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "PRD-004",
    name: "Aksesoris Topi",
    code: "PRD-004",
    price: 50000,
    category: "Aksesoris",
    status: "Nonaktif",
    popular: false,
    material: "Cotton",
    estimasi: "2-3 Hari",
    img: "https://images.unsplash.com/photo-1534866111232-6c06f0b1f4f3?auto=format&fit=crop&w=800&q=60",
  },
];

/* -------------------- Utilities -------------------- */
const formatIDR = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v || 0);

/* -------------------- Small UI Helpers -------------------- */
function StatusBadge({ status }) {
  if (!status) return null;
  if (status.toLowerCase() === "aktif")
    return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">Aktif</span>;
  if (status.toLowerCase() === "nonaktif")
    return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">Nonaktif</span>;
  return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Stok Habis</span>;
}

/* -------------------- FilterBar (updated to match screenshot) -------------------- */
function FilterBar({
  categories,
  categoryFilter,
  setCategoryFilter,
  statuses,
  statusFilter,
  setStatusFilter,
  query,
  setQuery,
  sortBy,
  setSortBy,
  onExport,
  onOpenMoreFilters,
  view,
  setView,
}) {
  return (
    <div className="bg-white border rounded-lg shadow-sm">
      {/* Top area: header with chips on left and actions on right */}
      <div className="px-4 py-4 md:px-6 md:py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h3 className="text-sm font-semibold text-gray-700 min-w-[160px]">Filter Produk</h3>

              {/* Kategori chips */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setCategoryFilter("Semua")}
                  className={`text-sm px-3 py-1 rounded-full border ${categoryFilter === "Semua" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"}`}
                >
                  Semua
                </button>

                {categories.slice(1).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`text-sm px-3 py-1 rounded-full border ${categoryFilter === c ? "bg-white text-gray-900 border-gray-200" : "bg-white text-gray-600 border-gray-200"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions on right */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMoreFilters}
              className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-50"
            >
              <MdFilterList /> Filter Lainnya
            </button>

            <button
              onClick={onExport}
              className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-50"
            >
              <MdFileDownload /> Ekspor
            </button>
          </div>
        </div>

        {/* horizontal divider */}
        <div className="mt-4 border-t border-gray-100" />
        {/* bottom row inside same card */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left: status chips */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-sm text-gray-600 min-w-[120px]">Status Produk</div>

            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full border ${statusFilter === s ? "bg-white text-gray-800 border-gray-200" : "bg-white text-gray-600 border-gray-200"}`}
              >
                <span className={`w-2 h-2 rounded-full ${s === "Aktif" ? "bg-green-500" : s === "Nonaktif" ? "bg-red-500" : "bg-yellow-400"}`} />
                {s}
              </button>
            ))}
          </div>

          {/* Right: sort control (aligned right) */}
          <div className="flex justify-end">
            <div className="w-full md:w-64">
              <label className="text-xs text-gray-500">Urutkan Berdasarkan</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-2 block w-full border rounded px-3 py-2 text-sm bg-white"
              >
                <option>Nama A-Z</option>
                <option>Nama Z-A</option>
                <option>Harga Tertinggi</option>
                <option>Harga Terendah</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Main Page -------------------- */
export default function ProductsAdmin() {
  const [products, setProducts] = useState(mockProducts);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [view, setView] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("Nama A-Z");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const categories = useMemo(() => ["Semua", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const statuses = ["Aktif", "Nonaktif", "Stok Habis"];

  const filtered = useMemo(() => {
    let res = [...products];
    if (categoryFilter !== "Semua") res = res.filter((p) => p.category === categoryFilter);
    if (statusFilter !== "Semua") res = res.filter((p) => p.status === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      res = res.filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
    }
    if (sortBy === "Nama A-Z") res.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "Nama Z-A") res.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "Harga Tertinggi") res.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "Harga Terendah") res.sort((a, b) => (a.price || 0) - (b.price || 0));
    return res;
  }, [products, categoryFilter, statusFilter, query, sortBy]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  function handleDelete(id) {
    const ok = window.confirm("Yakin ingin menghapus produk ini?");
    if (!ok) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEdit(id) {
    alert("Buka halaman edit untuk " + id + " (mock)");
  }

  function handleExport() {
    alert("Ekspor CSV (mock) — implementasikan dengan backend ketika siap.");
  }

  function handleOpenMoreFilters() {
    alert("Filter Lainnya (mock) — tambahkan modal ketika diperlukan.");
  }

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col">
          <div className="text-sm text-gray-500">Total Produk</div>
          <div className="text-2xl font-semibold mt-3">{products.length}</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col">
          <div className="text-sm text-gray-500">Produk Aktif</div>
          <div className="text-2xl font-semibold mt-3">{products.filter((p) => p.status === "Aktif").length}</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col">
          <div className="text-sm text-gray-500">Produk Non Aktif</div>
          <div className="text-2xl font-semibold mt-3">{products.filter((p) => p.status !== "Aktif").length}</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col">
          <div className="text-sm text-gray-500">Kategori</div>
          <div className="text-2xl font-semibold mt-3">{categories.length - 1}</div>
        </div>
      </div>

      {/* Filter bar (revised styling) */}
      <FilterBar
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={(v) => { setCategoryFilter(v); setPage(1); }}
        statuses={statuses}
        statusFilter={statusFilter}
        setStatusFilter={(v) => { setStatusFilter(v); setPage(1); }}
        query={query}
        setQuery={(v) => { setQuery(v); setPage(1); }}
        sortBy={sortBy}
        setSortBy={(v) => { setSortBy(v); setPage(1); }}
        onExport={handleExport}
        onOpenMoreFilters={handleOpenMoreFilters}
        view={view}
        setView={setView}
      />

      {/* Results count */}
      <div className="text-sm text-gray-500">Menampilkan {visible.length} dari {total} produk</div>

      {/* Product grid */}
      <div>
        {visible.length === 0 ? (
          <div className="bg-white p-6 rounded border text-center text-gray-500">Tidak ada produk</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((p) => (
              <article key={p.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="relative">
                  <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
                  {p.popular && <div className="absolute left-3 top-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Popular</div>}
                  <div className="absolute right-3 top-3">
                    <StatusBadge status={p.status} />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{p.name}</h3>
                      <div className="text-xs text-gray-500 mt-1">Kode: {p.code}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-600 font-semibold">{formatIDR(p.price)}</div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-600 space-y-1">
                    <div>Bahan: {p.material}</div>
                    <div>Estimasi: {p.estimasi}</div>
                    <div>Kategori: <span className="text-gray-700 font-medium">{p.category}</span></div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => handleEdit(p.id)} className="flex-1 text-sm px-4 py-2 bg-blue-600 text-white rounded-md inline-flex items-center justify-center gap-2">
                      <MdEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="w-12 h-10 rounded-md bg-red-500 text-white flex items-center justify-center">
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">Menampilkan {(page - 1) * perPage + 1}-{Math.min(page * perPage, total)} dari {total} produk</div>

        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="p-2 border rounded">Prev</button>
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "border"}`}>{i + 1}</button>
          ))}
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))} className="p-2 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
