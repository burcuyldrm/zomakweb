import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";

const images = [
  { src: craneImg, alt: "Mobil Katlanır Vinç" },
  { src: truckImg, alt: "Hidrolik Gözlüklü Kurtarıcı — Pekgöz" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85", alt: "Vinç Operasyonu" },
  { src: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=1200&q=85", alt: "Kaldırma Operasyonu" },
  { src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=85", alt: "Şantiye Çalışması" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85", alt: "Platform Çalışması" },
  { src: "https://images.unsplash.com/photo-1590141837800-79b87ece2f6e?w=1200&q=85", alt: "Sanayi Projesi" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85", alt: "Kurtarma Operasyonu" },
  { src: "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=1200&q=85", alt: "Hidrolik Sistem" },
  { src: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=1200&q=85", alt: "Vinç Montajı" },
  { src: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1200&q=85", alt: "Ağır Taşıma" },
  { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=85", alt: "İnşaat Destek" },
];

export default function Galeri() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#111111] text-white py-20 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8B1A1A]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-bold text-[#8B1A1A] tracking-widest uppercase mb-2">Projelerimizden</div>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-3">Galeri</h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Gerçekleştirdiğimiz projeler ve ürettiğimiz ekipmanlardan görüntüler.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="aspect-square overflow-hidden rounded-sm group cursor-pointer relative bg-gray-100"
              onClick={() => setLightbox(i)}
              data-testid={`gallery-img-${i}`}
            >
              <img
                src={img.src as unknown as string}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[#8B1A1A] z-10 p-2"
              onClick={() => setLightbox(null)}
            >
              <X className="w-7 h-7" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={images[lightbox].src as unknown as string}
              alt={images[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <div className="text-white font-semibold text-sm">{images[lightbox].alt}</div>
              <div className="text-gray-400 text-xs mt-1">{lightbox + 1} / {images.length}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
