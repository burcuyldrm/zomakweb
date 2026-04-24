import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useListCategories } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHero } from "@/components/layout/page-hero";

export default function Urunler() {
  const { data: categories, isLoading } = useListCategories();

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="Ürün Portföyü"
        title="Ürünlerimiz"
        description="Kategori bazlı ürün gruplarımızı inceleyin ve ihtiyacınıza uygun modeli seçin."
      />

      <div className="container mx-auto px-4 py-14 md:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[430px] rounded-[28px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
            {(categories ?? []).map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="h-full"
              >
                <Link href={`/urunler/${cat.slug}`} className="h-full flex flex-col">
                  <article className="group relative flex flex-col flex-1 min-h-[430px] cursor-pointer overflow-hidden rounded-[28px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
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
                          {cat.name}
                        </h3>
                        <span className="mt-4 block h-[5px] w-10 rounded-full bg-[#B3201D]" />
                      </div>

                      <div className="flex min-h-[180px] items-center justify-center">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="max-h-[170px] w-auto max-w-full object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.14)] transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="h-[170px] w-full rounded-xl bg-gray-200" />
                        )}
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-gray-500">
                        {cat.description}
                      </p>

                      <div className="mt-3 text-xs font-semibold text-gray-400">
                        {cat.productCount} model
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
        )}
      </div>
    </div>
  );
}
