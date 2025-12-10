// src/pages/Home.jsx
import React from "react";
import { Icon } from "@iconify/react";
import Footer from "../../components/common/Footer";

export default function Home() {
  const products = [
    { id: 1, name: "Rompi", image: null },
    { id: 2, name: "Jaket", image: null },
    { id: 3, name: "PDL", image: null },
    { id: 4, name: "PDH", image: null },
  ];

  return (
    <div className="w-full text-gray-800 bg-white">
      {/* HERO */}
      <section className="bg-[#57595B] text-center py-10">
        <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-white">
          MN KONVEKSI
        </h1>
        <p className="text-lg text-white mt-2">Dari Kain Menjadi Karya</p>
        <p className="text-sm text-white mt-4 max-w-3xl mx-auto px-4 leading-relaxed">
          Setiap lembar kain kami olah dengan presisi, kreativitas, dan ketelitian
          untuk menghasilkan produk yang memenuhi kebutuhan serta selera pelanggan.
        </p>

        <div className="mt-8 w-full max-w-6xl mx-auto overflow-hidden rounded">
          <img
            src="https://images.unsplash.com/photo-1580719482203-7925f23d2c34?auto=format&fit=crop&w=1400&q=80"
            alt="Banner Produk"
            className="w-full object-cover h-56 md:h-80"
          />
        </div>
      </section>

      {/* PRODUK KAMI*/}
      <section className="text-center py-10">
        <h2 className="text-2xl md:text-3xl font-serif mb-8">Produk Kami</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-20">
          {products.map((p) => (
            <article
              key={p.id}
              className="bg-white border border-gray-100 rounded-md overflow-hidden shadow-sm flex flex-col"
            >
              {/* image area */}
              <div className="bg-gray-100 h-64 md:h-72 w-full flex items-end">
                {/* bottom white strip to match design */}
                <div className="w-full bg-white/90 border-t border-gray-200 py-4 px-4">
                  {/* left: product title, right: empty (title placed below in content) */}
                </div>
              </div>

              {/* bottom content area */}
              <div className="p-4 bg-white flex flex-col flex-1">
                {/* product title larger & bold */}
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                  {p.name}
                </h3>

                {/* action row */}
                <div className="flex items-center gap-3 mt-auto">
                  {/* Pesan button (large, pale) */}
                  <button
                    onClick={() => {
                      const wa = `https://wa.me/6285860333077?text=Halo%20MN%20Konveksi%20saya%20ingin%20memesan%20${encodeURIComponent(
                        p.name
                      )}`;
                      window.open(wa, "_blank");
                    }}
                    className="flex-1 text-left px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 font-semibold text-lg hover:bg-gray-100 transition"
                  >
                    Pesan
                  </button>

                  {/* WhatsApp small boxed circle */}
                  <button
                    onClick={() => {
                      const wa = `https://wa.me/6285860333077?text=Halo%20MN%20Konveksi%20saya%20ingin%20memesan%20${encodeURIComponent(
                        p.name
                      )}`;
                      window.open(wa, "_blank");
                    }}
                    aria-label={`Pesan ${p.name} via WhatsApp`}
                    title="Pesan via WhatsApp"
                    className="w-12 h-12 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:shadow-md transition"
                  >
                    <Icon icon="mdi:whatsapp" className="text-2xl text-green-700" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="mt-10 px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm">
          Lihat Semua
        </button>
      </section>

      {/* EDISI TERBAIK & KOLEKSI BAHAN */}
      <section className="px-6 md:px-20 py-12 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Edisi Terbaik (kiri - besar) */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Edisi Terbaik</h3>
              <div className="w-full h-64 md:h-140 bg-gray-200 rounded-md"></div>
            </div>

            {/* Koleksi Bahan (kanan - sesuai gambar) */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center md:text-left">
                Koleksi Bahan
              </h3>

              <div className="space-y-10">
                {["American Drill", "American Drill", "American Drill"].map((label, i) => (
                  <div
                    key={i}
                    className="w-full h-40 bg-gray-300 rounded-md relative flex items-end"
                  >
                    {/* Label putih di dalam kotak, pojok kiri bawah */}
                    <div className="bg-gray-100 px-6 py-3 text-base text-gray-800 absolute left-6 bottom-6 rounded-sm">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESKRIPSI UTAMA */}
      <section className="px-6 md:px-20 py-12 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-medium">
            MN Konveksi - Solusi Pakaian Custom Berkualitas & Desain Eksklusif
          </h2>

          <p className="mt-6 text-sm md:text-base text-justify leading-relaxed text-gray-700">
            Merupakan mitra terpercaya untuk memenuhi kebutuhan produksi pakaian dengan kualitas terbaik.
            Tim desain dan produksi kami berkomitmen menghadirkan layanan konveksi yang profesional, cepat, dan presisi.
            Dengan proses yang mudah, transparan, dan fleksibel, kami memastikan setiap klien mendapatkan hasil pakaian
            sesuai keinginan—baik untuk kebutuhan bisnis, komunitas, maupun acara spesial.
          </p>
        </div>

        {/* Dua kolom list */}
        <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-left md:pr-8">
            <h3 className="font-medium mb-4">Pengalaman Produksi Terbaik</h3>
            <ul className="list-disc list-inside space-y-3 text-sm text-gray-700 leading-relaxed">
              <li>Mengerjakan berbagai jenis pakaian dari ratusan model.</li>
              <li>Update desain baru secara berkala untuk tren yang relevan.</li>
              <li>Proses produksi dilakukan dengan sistem terstandarisasi sehingga hasil rapi dan konsisten.</li>
              <li>Tersedia layanan konsultasi material, warna, dan teknik sablon/bordir untuk memastikan hasil maksimal.</li>
            </ul>
          </div>

          <div className="text-left md:pl-8">
            <h3 className="font-medium mb-4">Layanan dan Kualitas</h3>
            <ul className="list-disc list-inside space-y-3 text-sm text-gray-700 leading-relaxed">
              <li>Produk dijamin rapi, kuat, dan sesuai spesifikasi pesanan.</li>
              <li>Garansi perbaikan & penyesuaian apabila ditemukan cacat produksi.</li>
              <li>Pelayanan pelanggan responsif, tersedia setiap hari untuk membantu konsultasi desain dan pemesanan.</li>
              <li>Pengiriman ke seluruh Indonesia dengan proses packing rapi dan aman.</li>
            </ul>
          </div>
        </div>

        {/* Ikon + caption (centered, 3 kolom) */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center">
          <div className="flex flex-col items-center">
            <Icon icon="mdi:star-outline" className="text-[72px] md:text-[88px] text-gray-600" />
            <p className="mt-4 text-sm text-gray-700">Edisi terbaik di setiap masa</p>
          </div>

          <div className="flex flex-col items-center">
            <Icon icon="mdi:account-group-outline" className="text-[72px] md:text-[88px] text-gray-600" />
            <p className="mt-4 text-sm text-gray-700">Kepercayaan Anda, Prioritas Kami.</p>
          </div>

          <div className="flex flex-col items-center">
            <Icon icon="mdi:truck-delivery-outline" className="text-[72px] md:text-[88px] text-gray-600" />
            <p className="mt-4 text-sm text-gray-700">Pengiriman keseluruh Indonesia</p>
          </div>
        </div>
      </section>

      {/* gunakan Footer terpisah */}
      <Footer />
    </div>
  );
}
