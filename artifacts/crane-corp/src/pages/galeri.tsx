import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";
import { PageHero } from "@/components/layout/page-hero";

const images = [
  { src: craneImg, alt: "Mobil Katlanır Vinç" },
  { src: truckImg, alt: "Hidrolik Gözlüklü Kurtarıcı — Pekgöz" },
];

export default function Galeri() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="PROJELERİMİZDEN"
        title="GALERİ"
        description="Gerçekleştirdiğimiz projeler ve ürettiğimiz ekipmanlardan görüntüler."
      />

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
