import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";

const productImages: Record<string, string> = {
  "mobil-katlanir-vinc": craneImg as unknown as string,
  "hidrolik-gozluklu-kurtarici": truckImg as unknown as string,
  "hidrolik-kurtarici": truckImg as unknown as string,
  "ozel-hidrolik-makineler":
    "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&q=80",
  "sepetli-platform":
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
};

export default function Urunler() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-gray-50 py-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B1A1A]">
            Ürün Portföyü
          </div>
          <h1 className="mt-3 text-4xl font-black text-gray-900">
            Ürünlerimiz
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">
            Kategori bazlı ürün gruplarımızı inceleyin ve ihtiyacınıza uygun
            modeli seçin.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link href={`/urunler/${product.slug}`}>
                <article className="group relative min-h-[430px] cursor-pointer overflow-hidden rounded-[28px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                  <div
                    className="absolute inset-0 bg-[#f3f3f3] transition-colors duration-300 group-hover:bg-[#ececec]"
                    style={{
                      clipPath:
                        "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)",
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col px-6 pt-7 pb-6">
                    <div className="mb-5">
                      <h3 className="max-w-[220px] text-[24px] leading-[1.08] font-black text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#8B1A1A]">
                        {product.title}
                      </h3>
                      <span className="mt-4 block h-[5px] w-10 rounded-full bg-[#B3201D]" />
                    </div>

                    <div className="flex min-h-[180px] items-center justify-center">
                      <img
                        src={productImages[product.slug]}
                        alt={product.title}
                        className="max-h-[170px] w-auto max-w-full object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.14)] transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-gray-500">
                      {product.shortDesc}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.models.slice(0, 4).map((model) => (
                        <span
                          key={model.slug}
                          className="rounded-full border border-gray-300 bg-white px-3 py-1 text-[10px] font-semibold text-gray-700"
                        >
                          {model.code}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold uppercase tracking-[0.12em] text-[#8B1A1A] transition-all duration-300 group-hover:gap-3">
                      İncele
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
