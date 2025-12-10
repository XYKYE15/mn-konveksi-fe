import React from "react";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-12 mt-10">
      <p className="text-sm text-gray-700 mb-6">
        Jadilah yang pertama mengetahui koleksi terbaru & kabar produksi kami.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700 px-4 md:px-20">

        {/* ===================== MENU LINK ===================== */}
        <div className="space-y-2">
          <a
            href="/"
            className="font-medium hover:text-blue-600 transition"
          >
            Beranda
          </a>

          <a
            href="/produk"
            className="font-medium hover:text-blue-600 transition"
          >
            Produk Kami
          </a>

          <a
            href="/tentang"
            className="font-medium hover:text-blue-600 transition"
          >
            Tentang Kami
          </a>
        </div>

        {/* ===================== GOOGLE MAPS ===================== */}
        <div>
          <p className="font-medium mb-3">Lokasi Produksi Kami</p>

          <div className="w-full h-24 md:h-32 overflow-hidden rounded-lg border">
            <iframe
              title="Lokasi MN Konveksi"
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8527396481535!2d107.60589047480373!3d-7.027681069204159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e8548db7e47f%3A0xa40e3b6f2e0c87c0!2sContoh%20Lokasi%20Konveksi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            ></iframe>
          </div>
        </div>

        {/* ===================== SOSIAL MEDIA ===================== */}
        <div>
          <p className="font-medium mb-3">Ikuti Kami</p>

          <div className="flex justify-center gap-4 text-lg">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <Icon icon="mdi:facebook" className="text-2xl" />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600"
            >
              <Icon icon="mdi:instagram" className="text-2xl" />
            </a>

            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600"
            >
              <Icon icon="mdi:youtube" className="text-2xl" />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <Icon icon="mdi:twitter" className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-8 text-xs text-gray-600">
        &copy; {new Date().getFullYear()} MN Konveksi. Semua hak dilindungi.
      </div>
    </footer>
  );
}
