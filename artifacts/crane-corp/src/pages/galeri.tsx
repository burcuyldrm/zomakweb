import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85", alt: "Vinç Operasyonu 1", cat: "Vinç" },
  { src: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=1200&q=85", alt: "Mobil Vinç", cat: "Vinç" },
  { src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=85", alt: "Şantiye Çalışması", cat: "Şantiye" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85", alt: "Platform Çalışması", cat: "Platform" },
  { src: "https://images.unsplash.com/photo-1590141837800-79b87ece2f6e?w=1200&q=85", alt: "Sanayi Projesi", cat: "Sanayi" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85", alt: "Kurtarma Operasyonu", cat: "Kurtarıcı" },
  { src: "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=1200&q=85", alt: "Hidrolik Sistem", cat: "Sanayi" },
  { src: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=1200&q=85", alt: "Vinç Montajı", cat: "Vinç" },
  { src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=85", alt: "Teknik Bakım", cat: "Bakım" },
  { src: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1200&q=85", alt: "Ağır Taşıma", cat: "Vinç" },
  { src: "https://images.unsplash.com/photo-1461016203741-ef2ebfd0e2c0?w=1200&q=85", alt: "Liman Operasyonu", cat: "Liman" },
  { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=85", alt: "İnşaat Destek", cat: "Şantiye" },
];

const categories = ["Tümü", ...Array.from(new Set(images.map(i => i.cat)))];

export default function Galeri() {
  const [activeFilter, setActiveFilter] = useState("Tümü");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeFilter === "Tümü"
    ? images
    : images.filter(img => img.cat === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c00]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-3">Projelerimiz</div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">Galeri</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Gerçekleştirdiğimiz projelerden ve ekipmanlarımızdan kareler.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="border-b border-gray-200 sticky top-[96px] md:top-[116px] bg-white z-30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 whitespace-nowrap transition-colors ${
                  activeFilter === cat
                    ? "border-[#c00] text-[#c00]"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="aspect-square overflow-hidden group cursor-pointer relative"
                onClick={() => setLightbox(images.indexOf(img))}
                data-testid={`gallery-img-${i}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-white text-xs font-black uppercase">{img.cat}</div>
                  <div className="text-white/70 text-xs">{img.alt}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
              className="absolute top-4 right-4 text-white hover:text-[#c00] z-10"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <div className="text-white font-black">{images[lightbox].alt}</div>
              <div className="text-gray-400 text-xs">{lightbox + 1} / {images.length}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
