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
  "hidrolik-gozluklu-kurtarici": truckImg as unknown as string,
  "hidrolik-kurtarici": truckImg as unknown as string,
  "ozel-hidrolik-makineler": "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&q=80",
  "sepetli-platform": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
};

export default function Urunler() {
  return (
    <div className="min-h-screen bg-white">

      <PageHero
        label="EKİPMAN PORTFÖYÜMÜZ"
        title="ÜRÜNLERİMİZ"
        description="Endüstriyel kaldırma, kurtarma ve platform çözümlerinde kapsamlı ürün yelpazesi."
      />

      {/* Grid */}
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/urunler/${product.slug}`}>
                <div
                  className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-[#8B1A1A] hover:shadow-lg transition-all duration-300 group cursor-pointer h-full"
                  data-testid={`product-card-${product.slug}`}
                >
                  <div className="relative h-52 overflow-hidden bg-gray-900">
                    <img
                      src={productImages[product.slug]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">ZOMAK</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-black mb-2 text-gray-900 group-hover:text-[#8B1A1A] transition-colors leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.shortDesc}</p>
                    <div className="inline-flex items-center gap-1.5 text-[#8B1A1A] font-bold text-xs tracking-wide group-hover:gap-2.5 transition-all">
                      İncele <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#111111] py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="text-[10px] font-bold text-[#8B1A1A] tracking-widest mb-3">ÖZEL PROJE</div>
          <h2 className="text-2xl font-black text-white mb-3">Özel Çözüm mü Arıyorsunuz?</h2>
          <p className="text-gray-400 text-sm mb-7 max-w-lg mx-auto">
            Standart ürün portföyümüzün dışında projeye özel tasarım ve üretim kapasitemiz mevcuttur.
          </p>
          <Link href="/teklif">
            <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold px-9 h-12 rounded-sm border-none tracking-wide">
              TEKLİF TALEBİ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
