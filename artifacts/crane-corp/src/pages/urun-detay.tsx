import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/products";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";

const productImages: Record<string, string> = {
  "mobil-katlanir-vinc": craneImg as unknown as string,
  kurtarici: truckImg as unknown as string,
  "kayar-kasa": truckImg as unknown as string,
  "ozel-hidrolik-makineler":
    "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=900&q=80",
};

export default function UrunDetay() {
  const [, params] = useRoute("/urunler/:slug");
  const slug = params?.slug ?? "";
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-2xl font-black uppercase">
          Kategori Bulunamadı
        </h1>
        <Link href="/urunler">
          <Button className="rounded-sm border-none bg-[#8B1A1A] font-bold text-white">
            Ürünlere Dön
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-gray-50 py-3">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/">
              <span className="cursor-pointer hover:text-[#8B1A1A]">
                Ana Sayfa
              </span>
            </Link>
            <span>/</span>
            <Link href="/urunler">
              <span className="cursor-pointer hover:text-[#8B1A1A]">
                Ürünler
              </span>
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 md:px-8">
        <Link href="/urunler">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 mb-8 rounded-sm text-xs font-bold uppercase text-gray-500 hover:text-[#8B1A1A]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Ürünler
          </Button>
        </Link>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[28px] bg-[#f3f3f3] p-8 shadow-sm"
          >
            <div className="flex min-h-[420px] items-center justify-center">
              <img
                src={productImages[product.slug]}
                alt={product.title}
                className="max-h-[420px] w-auto max-w-full object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.16)]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2 text-[10px] font-bold tracking-widest text-[#8B1A1A]">
              ÜRÜN GRUBU
            </div>

            <h1 className="mb-3 text-3xl font-black leading-tight text-gray-900 md:text-4xl">
              {product.title}
            </h1>

            <p className="mb-5 border-l-2 border-[#8B1A1A] pl-4 text-sm font-medium italic text-gray-500">
              {product.shortDesc}
            </p>

            <p className="mb-7 text-sm leading-relaxed text-gray-700">
              {product.description}
            </p>
          </motion.div>
        </div>

        {product.models.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <div className="text-[10px] font-bold tracking-widest text-[#8B1A1A]">
                MODEL LİSTESİ
              </div>
              <h2 className="mt-2 text-2xl font-black text-gray-900">
                {product.title} Modelleri
              </h2>
              <div className="mt-3 h-[4px] w-14 rounded-full bg-[#B3201D]" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {product.models.map((model, i) => (
                <motion.div
                  key={model.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/urunler/${product.slug}/${model.slug}`}>
                    <article className="group relative min-h-[220px] cursor-pointer overflow-hidden rounded-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                      <div
                        className="absolute inset-0 bg-[#f3f3f3] transition-colors duration-300 group-hover:bg-[#ececec]"
                        style={{
                          clipPath:
                            "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)",
                        }}
                      />

                      <div className="relative z-10 flex h-full flex-col px-6 py-6">
                        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                          Model
                        </div>

                        <h3 className="text-3xl font-black text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#8B1A1A]">
                          {model.code}
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-gray-500">
                          {model.shortDesc}
                        </p>

                        <div className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold uppercase tracking-[0.12em] text-[#8B1A1A] transition-all duration-300 group-hover:gap-3">
                          Detayı Aç
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {product.models.length === 0 && (
          <div className="mt-16 rounded-[24px] border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
            <h3 className="text-lg font-bold text-gray-800">
              Model listesi yakında eklenecek
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Bu kategori için projeye özel ürünler sunulmaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
