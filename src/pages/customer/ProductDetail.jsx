// src/pages/customer/ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams(); // kalau route pake /product/:id

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Detail Produk</h1>
      <p className="text-sm text-gray-500">ID produk: {id || "(tidak ada id)"}</p>

      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="text-lg font-semibold">Nama Produk (Placeholder)</div>
        <p className="text-sm text-gray-600 mt-2">Deskripsi singkat produk akan ditampilkan di sini.</p>
        <div className="mt-4">
          <button className="px-4 py-2 rounded bg-gray-800 text-white">Tambah ke keranjang</button>
        </div>
      </div>
    </div>
  );
}
