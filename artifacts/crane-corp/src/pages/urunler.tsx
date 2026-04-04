import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";

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
      <div className="bg-[--brand-charcoal] text-white py-20 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[--brand-red]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-3">Ekipman Portföyü</div>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-3">Ürünlerimiz</h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Endüstriyel kaldırma, kurtarma ve platform çözümlerinde kapsamlı ürün yelpazesi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={productImages[product.slug]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-base font-black uppercase mb-2 text-gray-900">{product.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.shortDesc}</p>
                <Link href={`/urunler/${product.slug}`}>
                  <Button size="sm" className="bg-[--brand-red] hover:bg-[--brand-red-light] text-white rounded-sm border-none font-bold uppercase text-xs">
                    İncele <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-200 py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black uppercase text-gray-900 mb-3">Özel Çözüm mü Arıyorsunuz?</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-lg mx-auto">
            Standart ürün portföyümüzün dışında projeye özel tasarım ve üretim kapasitemiz mevcuttur.
          </p>
          <Link href="/teklif">
            <Button className="bg-[--brand-red] hover:bg-[--brand-red-light] text-white font-bold px-8 h-11 rounded-sm border-none uppercase">
              Teklif Talebi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
