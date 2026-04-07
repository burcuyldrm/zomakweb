import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";
import { PageHero } from "@/components/layout/page-hero";

const productImages: Record<string, string> = {
  "mobil-katlanir-vinc": craneImg as unknown as string,
  "kurtarici": truckImg as unknown as string,
  "kayar-kasa": truckImg as unknown as string,
  "ozel-hidrolik-makineler":
    "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&q=80",
};

export default function Urunler() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="EKİPMAN PORTFÖYÜMÜZ"
        title="ÜRÜNLERİMİZ"
        description="Endüstriyel kaldırma, kurtarma ve özel hidrolik çözümlerimiz."
      />

      <div className="container mx-auto px-4 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link href={`/urunler/${product.slug}`}>
                <article
                  className="group relative h-full min-h-[500px] cursor-pointer overflow-hidden rounded-[28px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                  data-testid={`product-card-${product.slug}`}
                >
                  <div
                    className="absolute inset-0 bg-[#f3f3f3] transition-colors duration-300 group-hover:bg-[#ececec]"
                    style={{
                      clipPath: "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)",
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col px-7 pt-8 pb-6 md:px-8">
                    <div className="mb-6">
                      <h3 className="max-w-[240px] text-[28px] leading-[1.08] font-black text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#8B1A1A]">
                        {product.title}
                      </h3>
                      <span className="mt-4 block h-[6px] w-12 rounded-full bg-[#B3201D]" />
                    </div>

                    <div className="flex min-h-[230px] flex-1 items-center justify-center">
                      <img
                        src={productImages[product.slug]}
                        alt={product.title}
                        className="max-h-[220px] w-auto max-w-full object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.14)] transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="mt-5">
                      <p className="mb-4 text-sm leading-relaxed text-gray-500">
                        {product.shortDesc}
                      </p>

                      {product.models.length > 0 && (
                        <div className="mb-5">
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                            Modeller
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {product.models.map((model) => (
                              <span
                                key={model.slug}
                                className="rounded-full border border-gray-300 bg-white px-3 py-1 text-[11px] font-semibold text-gray-700"
                              >
                                {model.code}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#8B1A1A] transition-all duration-300 group-hover:gap-3">
                        İncele
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#111111] py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-3 text-[10px] font-bold tracking-widest text-[#8B1A1A]">
            ÖZEL PROJE
          </div>
          <h2 className="mb-3 text-2xl font-black text-white">
            Özel Çözüm mü Arıyorsunuz?
          </h2>
          <p className="mx-auto mb-7 max-w-lg text-sm text-gray-400">
            Standart ürün portföyümüzün dışında projeye özel tasarım ve üretim
            kapasitemiz mevcuttur.
          </p>
          <Link href="/teklif">
            <Button className="h-12 rounded-sm border-none bg-[#8B1A1A] px-9 font-bold tracking-wide text-white hover:bg-[#A52020]">
              TEKLİF TALEBİ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}