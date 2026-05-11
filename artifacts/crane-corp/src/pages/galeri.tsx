import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

interface MediaItem {
  id: number;
  title: string;
  url: string;
}

export default function Galeri() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { data: images = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ["gallery-media"],
    queryFn: () => fetch("/api/media?type=gallery").then((r) => r.json()),
  });

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="PROJELERİMİZDEN"
        title="GALERİ"
        description="Gerçekleştirdiğimiz projeler ve ürettiğimiz ekipmanlardan görüntüler."
      />

      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {isLoading
            ? [...Array(8)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))
            : images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="aspect-square overflow-hidden rounded-2xl group cursor-pointer relative bg-gray-100"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && images[lightbox] && (
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
              src={images[lightbox].url}
              alt={images[lightbox].title}
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <div className="text-white font-semibold text-sm">{images[lightbox].title}</div>
              <div className="text-gray-400 text-xs mt-1">{lightbox + 1} / {images.length}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
